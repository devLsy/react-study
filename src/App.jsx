import { useEffect, useState, useRef } from 'react';
import MoneyInput from './MoneyInput';
import LogList from './LogList';
import './App.css'; 

function App() {

  const [money, setMoney] = useState('');
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState('전체'); 
  const [category, setCategory] = useState('식비');
  const inputRef = useRef(null);  

  // const displayLogs = filter === '전체' ? logs : logs.filter(item => item.category === filter);
  const displayLogs = (filter === '전체' ? logs : logs.filter(item => item.category === filter))
    .sort((a,b) => Number(b.val) - Number(a.val));
  
  const filteredTotal = displayLogs.reduce(( sum, item ) => sum + Number(item.val), 0);
  const summary = logs.reduce((acc, item) => {
    const cat = item.category || '미분류';
    acc[cat] = (acc[cat] || 0) + Number(item.val);    
    return acc;
  }, {});

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

  // 머니 체인지  
  const moneyChange = (e) => setMoney(e.target.value);  

  // 카테고리 체인지
  const categoryChange = (e) => setCategory(e.target.value);

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

  const setClearlocalStorage = () => {
    if(!confirm('정말 모든 기록을 삭제할꺼야?')) return;
      setLogs([]);
      localStorage.removeItem('moneyLogs');
  } 
  
  const onKeyDown = (e) => {  
    if(e.key === 'Enter') addLog();
  }

  // 로그 삭제  
  const delLog = (id) => setLogs(logs.filter(item => item.id !== id)); 

  // 로그 수정
    const updateLog = (id) => {   
      if (money === '' || Number(money) < 1) return;

      setLogs(logs.map((item) => item.id === id ? { ...item, val: Number(money) } : item));
      setMoney('');
  }

  return (  
    <div className='card'> 
      <MoneyInput   
        inputRef = {inputRef}
        moneyChange = {moneyChange}
        onKeyDown = {onKeyDown}
        money = {money}
        category = {category}
        categoryChange = {categoryChange}
        addLog = {addLog}
      />                

      <div className="filter-group" style={{ marginBottom: '15px' }}>
        {['전체', '식비', '교통비', '고정지출', '기타'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                marginRight: '5px',
                backgroundColor: filter === cat ? '#2ecc71' : '#eee',
                color: filter === cat ? 'white' : '#333',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '4px',  
                cursor: 'pointer'                                  
              }}
            >
            {cat}
            </button>
        ))}
      </div>

      <h1>로그 길이: {logs.length}</h1>
      <button onClick={setClearlocalStorage}>로컬스토리지 초기화</button>
      <div style={{ margin: '20px 0', padding: '10px', background: '#f4f4f4', borderRadius: '8px' }}>
        <h1 style={{ color: '#2ecc71' }}>총 지출: {filteredTotal.toLocaleString()}원</h1>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {Object.entries(summary).map(([name, value]) => (
          <div key={name} style={{ 
            background: '#fff', 
            padding: '15px', 
            borderRadius: '8px', 
            minWidth: '100px',
            textAlign: 'center',
            color: '#333' // 검은색 배경 대비 가독성
          }}>
            <div style={{ fontSize: '12px', color: '#888', marginBottom: '5px' }}>{name}</div>
            <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
              {value.toLocaleString()}원
            </div>
          </div>
        ))}
      </div>

      <LogList 
        logs = {displayLogs}
        delLog = {delLog}
        updateLog = {updateLog}
      />  
    </div>
  ) 
} 
export default App;