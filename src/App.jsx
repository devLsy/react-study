import { useEffect, useState, useRef } from 'react';
import MoneyInput from './MoneyInput';
import LogList from './LogList';

function App() {

  const [money, setMoney] = useState('');
  const [logs, setLogs] = useState([]);

  const inputRef = useRef(null);
  const total = logs.reduce(( sum, item ) => sum + Number(item.val), 0);

  useEffect(() => {
    const saved = localStorage.getItem('moneyLogs');
    if(saved) {
      setLogs(JSON.parse(saved));
      console.log('초기 데이터 로딩 완료!');  
    }    
  }, []); 

  useEffect(() => {
    if(logs.length > 0) {
      localStorage.setItem('moneyLogs', JSON.stringify(logs));
      console.log('데이터 동기화 완료!');
    } 
  }, [logs]);

  // 머니 체인지  
  const moneyChange = (e) => setMoney(e.target.value);

  // 로그 추가
  const addLog = () => {  
    if(money < 1 || money === '') return;

    const logObj = {
      id: Date.now(),
      val: money
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
  const delLog = (id) => {
    const newLogs = logs.filter(item => item.id !== id);
    setLogs(newLogs); 
  }
  // 로그 수정
    const updateLog = (id) => { 
      const newLogs = logs.map((item) => item.id === id ? { ...item, val: money } : item);
      setLogs(newLogs);
  }

  return (  
    <div className='card'>      
      <MoneyInput   
        inputRef = {inputRef}
        moneyChange = {moneyChange}
        onKeyDown = {onKeyDown}
        money = {money}
        addLog = {addLog}
      />                

      <h1>로그 길이: {logs.length}</h1>
      <button onClick={setClearlocalStorage}>로컬스토리지 초기화</button>
      <div style={{ margin: '20px 0', padding: '10px', background: '#f4f4f4', borderRadius: '8px' }}>
        <h1 style={{ color: '#2ecc71' }}>총 지출: {total.toLocaleString()}원</h1>
      </div>

      <LogList 
        logs = {logs}
        delLog = {delLog}
        updateLog = {updateLog}
      />  
    </div>
  ) 
} 
export default App;