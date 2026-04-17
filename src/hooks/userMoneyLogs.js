import { useState, useEffect, useRef } from 'react';
import { db } from "../firebase"; 
import { 
  collection, getDocs, query, orderBy, 
  addDoc, deleteDoc, updateDoc, doc, serverTimestamp 
} from "firebase/firestore";

const getSummary = (logs) => logs.reduce((acc, item) => {
    const cat = item.category || '미분류';
    acc[cat] = (acc[cat] || 0) + Number(item.val);    
    return acc;
  }, {});

export const useMoneyLogs = () => {
    const [logs, setLogs] = useState([]);
    const [money, setMoney] = useState('');
    const [editId, setEditId] = useState(null);
    const [filter, setFilter] = useState('전체'); 
    const [category, setCategory] = useState('');
    const inputRef = useRef(null);  

    // 초기 데이터 로드(Read)
    useEffect(() => {
        const fetchLogs = async () => {
          try {
            const q = query(collection(db, "money-logs"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);

            const fetchedLogs = querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),  
              createdAt: doc.data().createdAt?.toDate() || new Date()
            }));

            setLogs(fetchedLogs);
            console.log("팩트: 클라우드 데이터 로드 완료");
          } catch (error) {
            console.error("데이터 불러오기 실패:", error);
            alert("데이터를 불러오는 데 실패했습니다.");
          }
        }
        fetchLogs();
    }, []); 

     
  // 로그 추가
  const addLog = async () => {  
    if(!category){  
      alert('카테고리를 선택해야해!!!');
      return;
    } 

    if (money === '' || Number(money) < 1) {
      alert('금액을 1원 이상 입력해야해!!!');
      return;
    }

    if(!confirm('정말 추가할꺼야?')) return;

    const logObj = {
      val: Number(money),
      category: category, 
      createdAt: serverTimestamp() 
    }

    try {
      // firebase 'monry-logs' 컬렉션에 저장
      const docRef = await addDoc(collection(db, "money-logs"), logObj);
      const newLogs = [{ id: docRef.id, ...logObj, createdAt: new Date() }, ...logs];

      setLogs(newLogs);
      setCategory('');    
      setMoney(''); 
      setFilter('전체');
      inputRef.current.focus(); 

      console.log("클라우드 저장 완료. ID:", docRef.id);
    } catch (error) {
      console.error("클라우드 저장 실패:", error);
      alert("데이터 저장에 실패했습니다.");
    }
  }  

  // 로그 삭제  
  const delLog = async (id) =>  {
    if(!confirm('정말 삭제할꺼야?')) return;
    try {
        await deleteDoc(doc(db, "money-logs", id));
        setLogs(logs.filter(item => item.id !== id));
        console.log("클라우드 삭제 완료. ID:", id);
    } catch (error) {
      console.error("클라우드 삭제 실패:", error);
      alert("데이터 삭제에 실패했습니다.");
    }
  };  

    // 로그 수정  
  const updateLog = async (id) => {   
    if (money === '' || Number(money) < 1) return;
    if(!confirm('정말 수정할꺼야?')) return;

    try {
      const logRef = doc(db, "money-logs", id);
      await updateDoc(logRef, {
        val: Number(money),
        category: category,
      });

      setLogs(logs.map((item) => item.id === id ? 
        { ...item, val: Number(money), category: category } : item)
      );

      setCategory('');
      setMoney('');
      setEditId(null);
      setFilter('전체');  

      console.log("클라우드 수정 완료. ID:", id);
    } catch (error) {
      console.error("클라우드 수정 실패:", error);
      alert("데이터 수정에 실패했습니다.");
    }
  }
  
  const displayLogs = filter === '전체' 
    ? logs : logs.filter(item => item.category === filter);

  const filteredTotal = displayLogs.reduce(( sum, item ) => sum + Number(item.val), 0);
  const summary = getSummary(logs); 

  const onKeyDown = (e) => {  
    const forbiddenKeys = ['e', 'E', '+', '-'];
    if (forbiddenKeys.includes(e.key)) {
      e.preventDefault();
    }

    if(e.key === 'Enter') {
      if (editId) {
        updateLog(editId);
      } else {
        addLog();
      } 
    } 
  }

  const startEdit = (log) => {
    setMoney(log.val);
    setCategory(log.category);
    setEditId(log.id);
    inputRef.current.focus();
  }

  const handleUpdate = () => {
    if(editId) {
      updateLog(editId);
      setEditId(null);  
    } else {
      addLog();
    }
  }  

  return {
        logs, money, setMoney, category, setCategory, editId, filter, setFilter, inputRef,
        displayLogs, filteredTotal, summary, getSummary,
        addLog, delLog, updateLog, startEdit, onKeyDown, handleUpdate
  };
}