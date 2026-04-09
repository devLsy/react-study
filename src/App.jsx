import { useState } from 'react';
import './App.css'

function App() {

  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [money, setMoney] = useState('');
  const [logs, setLogs] = useState([]);

  const plus = () => {
    setCount(count+1)
  }

  const miuus = () => {
    if(count < 1) {
      alert('1미만까지는 마이너스 못한다.');
      return;
    }
    setCount(count-1)
  }

  const reset = () => { 
    if(count < 1) {
      alert('카운트가 0이므로 초기화 할 필요가 없어.');
      return;
    } 
    setCount(0)
  }

  const changeMoney = (e) => {
    setMoney(e.target.value);
  }

  const changeName = (e) => {
    setName(e.target.value);
  }

  const changeLog = () => {
    if(!money) return;
    setLogs([...logs, money]);
    setMoney(''); 
  }

  const deleteLog = (index) => {
    setLogs(logs.filter((_, i) => i !== index));
  }

  const updateLog = (index) => {
    const newLogs = logs.map((item, i) => {
      if(i === index) {
        return money;
      } else {
        return item;
      }
    });

    setLogs(newLogs);
    setMoney(''); 
  }

  return (
    <div className='card'>
      <h1>name: {name}</h1>
      <input type="text" value={name} onChange={changeName}/>
      <h1>count: {count}</h1>
      <button onClick={plus}>플러스</button> &nbsp;
      <button onClick={miuus}>마이너스</button> &nbsp;
      <button onClick={reset}>초기화</button><br/> 
      input money: <input type="number" value={money} onChange={changeMoney}/> &nbsp;
      <button onClick={changeLog}>로그기록</button>
      <h1>money: {money}</h1>
      <ul>    
        {logs.map((item, index) => (  
          <li key={index}>{item}원 기록되었다.  
            <button onClick={() => deleteLog(index)}>로그삭제</button>
            <button onClick={() => updateLog(index)}>로그수정</button>
          </li> 
        ))}
      </ul>
    </div>
  )
}
export default App