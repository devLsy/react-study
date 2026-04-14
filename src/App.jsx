import { useMoneyLogs } from './hooks/userMoneyLogs';
import MoneyInput from './component/MoneyInput';
import LogList from './component/LogList';
import Summary from './component/Summary';
import Chart from './component/Chart';
import './App.css'; 

  const CATEGORY_COLORS = {
    식비: '#ff7675',
    교통비: '#74b9ff',
    고정지출: '#55efc4',
    기타: '#ffeaa7'
  };
  
function App() {
  const { 
    logs, money, setMoney, editId, filter, category, filteredTotal, displayLogs, summary, inputRef, addLog, delLog, setClearlocalStorage, onKeyDown, updateLog, startEdit 
  } = useMoneyLogs();

  const moneyChange = (e) => setMoney(e.target.value);  
  const categoryChange = (e) => setCategory(e.target.value);

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
        editId = {editId}
        updateLog = {updateLog}
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
        startEdit = {startEdit}
      />  
    </div>
  ) 
} 
export default App;