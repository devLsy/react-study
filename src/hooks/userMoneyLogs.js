import { useState, useEffect, useRef } from 'react';

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
    const [category, setCategory] = useState('식비');
    const inputRef = useRef(null);  

    useEffect(() => {
        const saved = localStorage.getItem('moneyLogs');
        if(saved) {
            setLogs(JSON.parse(saved));
            console.log('초기 데이터 로딩 완료!');  
        }    
    }, []); 

    useEffect(() => { 
        localStorage.setItem('moneyLogs', JSON.stringify(logs));
        console.log('데이터 동기화 완료!');
  }, [logs]);

  const displayLogs = filter === '전체' ? logs : logs.filter(item => item.category === filter)
    .sort((a,b) => Number(b.val) - Number(a.val));

  const filteredTotal = displayLogs.reduce(( sum, item ) => sum + Number(item.val), 0);
  const summary = getSummary(logs);    
  // 로그 추가
  const addLog = () => {  
    if (money === '' || Number(money) < 1) return;

    const logObj = {
      id: Date.now(),
      val: Number(money),
      category: category  
    }

    const newLogs = [logObj, ...logs];
        setLogs(newLogs);
        setMoney('');    
        inputRef.current.focus();
  }  

  // 로그 삭제  
  const delLog = (id) =>  {
    if(!confirm('정말 삭제할꺼야?')) return;
    setLogs(logs.filter(item => item.id !== id)); 
  };  

    // 로그 수정  
  const updateLog = (id) => {   
    if (money === '' || Number(money) < 1) return;
    if(!confirm('정말 수정할꺼야?')) return;

    setLogs(logs.map((item) => item.id === id ? 
      { ...item, val: Number(money), category: category } : item)
    );  
    setMoney('');
    setEditId(null);
  } 
    
  const setClearlocalStorage = () => {
    if(!confirm('정말 모든 기록을 삭제할꺼야?')) return;
      setLogs([]);
      localStorage.removeItem('moneyLogs');
  }   

  const onKeyDown = (e) => { 
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
        displayLogs, filteredTotal, summary,
        addLog, delLog, updateLog, startEdit, setClearlocalStorage, onKeyDown, handleUpdate
  };
}