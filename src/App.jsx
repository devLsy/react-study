import { useMoneyLogs } from './hooks/userMoneyLogs';
import MoneyInput from './component/MoneyInput';
import LogList from './component/LogList';
import Summary from './component/Summary';
import Chart from './component/Chart';
import { CATEGORY_COLORS, CATEGORIES } from './constants/constants';

function App() {
  const { 
    logs, money, setMoney, setCategory, setFilter, editId, filter, category, filteredTotal, displayLogs, summary, inputRef, addLog, delLog, setClearlocalStorage, onKeyDown, updateLog, startEdit 
  } = useMoneyLogs();

  const moneyChange = (e) => setMoney(e.target.value);  
  const categoryChange = (e) => setCategory(e.target.value);

  return (      
    <div className="min-h-screen bg-gray-100 p-8"> 
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-500">
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
          CATEGORY_COLORS= {CATEGORY_COLORS}
          CATEGORIES = {CATEGORIES}
        />                  

        <div className="filter-group">
          {['전체', ...Object.keys(CATEGORY_COLORS)].map(cat => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
              >
              {cat}
              </button>
          ))}
        </div>

        <h1>로그 길이: {logs.length}</h1>
        <button onClick={setClearlocalStorage}>로컬스토리지 초기화</button>
        <div>
          <h1>총 지출: {filteredTotal.toLocaleString()}원</h1>
        </div>

        <Summary summary={summary} 
        CATEGORY_COLORS = {CATEGORY_COLORS} 
        />

        <Chart
          summary={summary}
          CATEGORY_COLORS= {CATEGORY_COLORS}
          CATEGORIES = {CATEGORIES}
        />

        <LogList 
          logs = {displayLogs}
          delLog = {delLog}
          updateLog = {updateLog}
          CATEGORY_COLORS = {CATEGORY_COLORS}
          startEdit = {startEdit}
        />
      </div>  
    </div>
  ) 
} 
export default App;