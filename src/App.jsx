import { useState } from 'react';
import './App.css'

function App() {

  const [money, setMoney] = useState('');
  const [logs, setLogs] = useState([]);

  // 머니 체인지
  const moneyChange = (e) => {
    setMoney(e.target.value);
  }
  // 로그 추가
  const addLog = () => {  
    if(money < 1 || money === '') return;
    setLogs([money, ...logs]);
    setMoney('');     
  }
  // 로그 삭제
  const delLog = (index) => {
    setLogs(logs.filter((_, i) => i !== index));
  }
  // 로그 수정
    const updateLog = (index) => {
      const newLogs = logs.map((item, i) => i === index ? money : item);
      setLogs(newLogs);
  }
  
  return (  
    <div className='card'>  
        돈 추가 : <input type="number" onChange={moneyChange} value={money}/>
        <h1>돈: {money}</h1>
        <button onClick={addLog}>로그 추가</button>
        <h1>로그 길이: {logs.length}</h1>

        <ul>
          {logs.map((item, index) => (
              <li key={index}>
                  {index}번 째 로그: {item} &nbsp;
                  <button onClick={() => delLog(index)}>로그 삭제</button> &nbsp; 
                  <button onClick={() => updateLog(index)}>로그 수정</button> &nbsp; 
              </li>
          ))}
        </ul>

    </div>
  ) 
} 
export default App;