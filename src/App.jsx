import { useEffect, useState, useRef } from 'react';
import MoneyInput from './component/MoneyInput';
import LogList from './component/LogList';
import Summary from './component/Summary';
import Chart from './component/Chart';
import './App.css'; 

  // [1] 컴포넌트 밖: 상수 데이터 (OK)
  const CATEGORY_COLORS = {
    식비: '#ff7675',
    교통비: '#74b9ff',
    고정지출: '#55efc4',
    기타: '#ffeaa7'
  };

  // [2] 컴포넌트 밖: 계산기 함수 (logs를 인자로 받아야 함)
  const getSummary = (logs) => logs.reduce((acc, item) => {
    const cat = item.category || '미분류';
    acc[cat] = (acc[cat] || 0) + Number(item.val);    
    return acc;
  }, {});
  
function App() {
  const [money, setMoney] = useState('');
  const [logs, setLogs] = useState([]);
  // 1. 필터 상태: 어떤 카테고리를 보여줄지 결정 (기본값 '전체')
  const [filter, setFilter] = useState('전체'); 
  const [category, setCategory] = useState('식비');
  const inputRef = useRef(null);  

  // 2. 데이터 가공(Filtering): 원본 logs는 보존하고, 화면용 복사본(displayLogs)만 생성
  // filter가 '전체'면 logs 전체, 아니면 해당 카테고리만 filter 메서드로 추출
  const displayLogs = filter === '전체' ? logs : logs.filter(item => item.category === filter)
    .sort((a,b) => Number(b.val) - Number(a.val));

  const filteredTotal = displayLogs.reduce(( sum, item ) => sum + Number(item.val), 0);
  
  // 함수 밖으로 뺀 계산기를 여기서 사용 (logs를 전달)
  const summary = getSummary(logs);

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
        {['전체', ...Object.keys(CATEGORY_COLORS)].map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                marginRight: '5px',
                backgroundColor: filter === cat ? (CATEGORY_COLORS[cat] || '#2ecc71') : '#eee',
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

      <Summary summary={summary} 
      CATEGORY_COLORS = {CATEGORY_COLORS} 
      />

      <Chart
        summary={summary}
        CATEGORY_COLORS = {CATEGORY_COLORS}
      />

      <LogList 
        logs = {displayLogs}
        delLog = {delLog}
        updateLog = {updateLog}
        CATEGORY_COLORS = {CATEGORY_COLORS}
      />  
    </div>
  ) 
} 
export default App;