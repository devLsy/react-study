import { useState, useEffect, useRef } from 'react';
import { db } from "../firebase"; 
import { 
  collection, getDocs, query, orderBy, startAfter, limit,
  addDoc, deleteDoc, updateDoc, doc, serverTimestamp 
} from "firebase/firestore";

const getSummary = (logs) => logs.reduce((acc, item) => {
    const cat = item.category || '미분류';
    acc[cat] = (acc[cat] || 0) + Number(item.val);    
    return acc;
  }, {}); 
  
export const useMoneyLogs = () => {
    const [logs, setLogs] = useState([]);
    const [lastVisible, setLastVisible] = useState(null); // 팩트: 마지막 문서 저장소
    const [hasMore, setHasMore] = useState(true); // 팩트: 더 가져올 데이터가 있는지 여부
    const [loading, setLoading] = useState(false);
    const [money, setMoney] = useState('');
    const [editId, setEditId] = useState(null);
    const [filter, setFilter] = useState('전체'); 
    const [category, setCategory] = useState('');
    const inputRef = useRef(null);      // 금액 입력창용
    const categoryRef = useRef(null);   // 카테고리 선택창용

    const PAGE_SIZE = 5; // 한 번에 가져올 개수

    const fetchLogs = async (isFirst = false) => {  
      if(loading || (!isFirst && !hasMore)) return; // 로딩 중이거나 추가 로드 불가 시 중단
      setLoading(true);

      try {
        let q = query(
            collection(db, "money-logs"), 
            orderBy("createdAt", "desc"),
            limit(PAGE_SIZE)
        );
        // 첫 로드가 아니면 마지막 문서 이후부터 가져옴
        if(!isFirst && lastVisible) {
          q = query(q, startAfter(lastVisible)); // 마지막 문서 이후부터 시작
        }

        const querySnapshot = await getDocs(q); 
        const fetchedLogs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),  
          createdAt: doc.data().createdAt?.toDate() || new Date()
        }));

        // 마지막 문서 업데이트
        const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
        setLastVisible(lastDoc);

        // 더 가져올 데이터 없는지 확인
        if(querySnapshot.docs.length < PAGE_SIZE) { 
          setHasMore(false);
        }
        // setLogs(prev => isFirst ? fetchedLogs : [...prev, ...fetchedLogs]);
        setLogs(prev => {
          const allLogs = isFirst ? fetchedLogs : [...prev, ...fetchedLogs];
          // 팩트: ID를 기준으로 중복된 요소를 제거함
          const uniqueLogs = allLogs.filter((item, index) =>  
            allLogs.findIndex(target => target.id === item.id) === index
          );  
          return uniqueLogs;
        });

      } catch (error) {
        console.error("페이지네이션 로드 실패", error);   
        alert("데이터를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);  
      }
    }

    // 초기 데이터 로드(Read)
    useEffect(() => { 
      // 팩트: 브라우저가 DOM을 그리고 레이아웃을 계산할 시간을 줌
      // const timer = setTimeout(() => setRenderChart(true), 100);
      // return () => clearTimeout(timer);
    }, []);
     
  // 로그 추가
  const addLog = async () => {  
    if(!category){  
      alert('카테고리를 선택해주세요.');
      categoryRef.current?.focus();
      return;
    } 

    if (money === '' || Number(money) < 1) {
      alert('금액을 1원 이상 입력해주세요.');
      inputRef.current?.focus();
      return;
    }

    if(!confirm('추가하시겠습니까?')) return;

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
    if(!confirm('이 작업은 돌이킬 수 없습니다.\n정말 삭제하시겠습니까?')) return;
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
    if(!confirm('수정하시겠습니까?')) return;

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
        categoryRef, displayLogs, filteredTotal, summary, getSummary, addLog, delLog, updateLog, 
        startEdit, onKeyDown, handleUpdate,
        fetchMore: () => fetchLogs(false),
        hasMore, // 팩트: 더 가져올 게 있는지 상태 노출
        loading  // 팩트: 로딩 상태 노출
  };
}