import { useMoneyLogs } from './hooks/userMoneyLogs';
import MoneyInput from './component/MoneyInput';
import LogList from './component/LogList';
import Summary from './component/Summary';
import Chart from './component/Chart';
import { CATEGORY_COLORS, CATEGORIES } from './constants/constants';

function App() {
  const { 
    logs, money, setMoney, setCategory, setFilter, editId, filter, category, filteredTotal, displayLogs, summary, inputRef, addLog, delLog, setClearlocalStorage, onKeyDown, updateLog, handleUpdate, startEdit 
  } = useMoneyLogs();

  const moneyChange = (e) => setMoney(e.target.value);  
  const categoryChange = (e) => setCategory(e.target.value);

// App.jsx
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <header className="mb-8">
          <h1 className="text-2xl font-black text-gray-800 flex items-center gap-2">
            <span className="text-green-500">💰</span> 가성비 가계부
          </h1>
          <p className="text-sm text-gray-500 mt-1">꼬비의 소비 기록</p>
        </header>

        {/* 여기에 컴포넌트들 나열 */}
        <section className="space-y-6">
          <MoneyInput   
            inputRef = {inputRef}
            moneyChange = {moneyChange}
            onKeyDown = {onKeyDown}
            money = {money} 
            category = {category} 
            categoryChange = {categoryChange}
            addLog = {addLog}
            editId = {editId}
            handleUpdate = {handleUpdate}
            CATEGORY_COLORS= {CATEGORY_COLORS}
            CATEGORIES = {CATEGORIES}
          />
            
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {['전체', ...CATEGORIES].map(cat => (
              // <button 
              //   key={cat}
              //   onClick={() => setFilter(cat)}
              //   className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              //     filter === cat 
              //     ? 'bg-green-500 text-white shadow-md' 
              //     : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              //   }`}
              // >
              // App.jsx 버튼 부분
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  // 활성화 시에만 해당 카테고리의 고유 색상을 배경으로 꽂습니다.
                  backgroundColor: filter === cat 
                    // ? CATEGORY_COLORS[cat]?.color 
                    ? (cat === '전체' ? '#22c55e' : CATEGORY_COLORS[cat]?.color)
                    : '#F3F4F6',
                  color: filter === cat ? 'white' : '#4B5563'
                }}  
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  filter === cat ? 'shadow-md scale-105' : 'hover:bg-gray-200'
                }`}
              > 
                {cat}
              </button>
            ))}
          </div>

          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
            <p className="text-xs text-green-600 font-bold uppercase tracking-wider">Total Spending</p>
            <h2 className="text-3xl font-black text-green-700">{filteredTotal.toLocaleString()}원</h2>
          </div>

          <Summary summary={summary} CATEGORY_COLORS={CATEGORY_COLORS} />
          <Chart summary={summary} CATEGORY_COLORS={CATEGORY_COLORS} />
          <LogList 
            logs = {displayLogs}
            delLog = {delLog}
            updateLog = {updateLog}
            CATEGORY_COLORS = {CATEGORY_COLORS}
            startEdit = {startEdit}
          />
        </section>

        <footer className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center">
          <span className="text-xs text-gray-400 font-medium">로그: {logs.length}개</span>
        </footer>
      </div>
    </div>
  )
} 
export default App;