import { useMoneyLogs } from './hooks/userMoneyLogs';
import { useExchangeRate } from './hooks/useExchangeRate';
import MoneyInput from './component/MoneyInput';
import LogList from './component/LogList';
import Summary from './component/Summary';
import CategoryFilter from './component/CategoryFilter';
import TotalSummary from './component/TotalSummary';
import Chart from './component/Chart';
import { CATEGORY_COLORS, CATEGORIES } from './constants/constants';
import { useEffect, useRef } from 'react';

function App() {
  const { 
    logs, money, setMoney, setCategory, setFilter, editId, filter, category, filteredTotal, 
    displayLogs, summary, getSummary, inputRef, addLog, delLog, setClearlocalStorage, onKeyDown, 
    updateLog, handleUpdate, startEdit, fetchMore, hasMore, loading 
  } = useMoneyLogs();

  const observerRef = useRef();

  // 팩트: 하단 감지 로직
  useEffect(() => {
    if (!observerRef.current || !hasMore) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading) {
        console.log("팩트: 바닥 도달, 데이터 추가 로드");
        fetchMore();
      }
    });

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading]);

  // 실시간 환율정보 가져오기
  const rate = useExchangeRate();

  const moneyChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 허용
    setMoney(value);  
  }   

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
            setCategory = {setCategory}
          />

          <CategoryFilter 
            filter={filter} 
            CATEGORIES={CATEGORIES} 
            CATEGORY_COLORS = {CATEGORY_COLORS} 
            setFilter={setFilter} 
          />

          <TotalSummary 
            rate={rate} 
            filteredTotal={filteredTotal}
          />

          {displayLogs.length > 0 && (  
          <div className="space-y-6">
            <Summary summary={summary} CATEGORY_COLORS={CATEGORY_COLORS} />
            <Chart summary={getSummary(displayLogs)} displayLogs={displayLogs} CATEGORY_COLORS={CATEGORY_COLORS} />
          </div>
          )}
          
          <LogList 
            logs = {displayLogs}
            delLog = {delLog}
            updateLog = {updateLog}
            CATEGORY_COLORS = {CATEGORY_COLORS}
            startEdit = {startEdit}
          />  
        {/* 무한 스크롤 타겟팅 요소 추가 */}  
          <div 
            ref={observerRef} 
            className="h-10 flex justify-center items-center mt-4"
          >
            {loading && (
              <p className="text-xs text-green-600 font-bold animate-pulse">
                데이터 불러오는 중...
              </p>
            )}  
            {!hasMore && logs.length > 0 && (
              <p className="text-xs text-gray-400 font-medium">
                마지막 기록입니다.
              </p>
            )}
          </div>          
        </section>
            
        <footer className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center"/>
      </div>
    </div>
  )
} 
export default App;