const MoneyInput = ({ inputRef, moneyChange, onKeyDown, money, addLog, category, categoryChange, CATEGORY_COLORS, CATEGORIES, editId, handleUpdate }) => (
  <div className="flex flex-col gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
    <select className="flex-1 p-3 rounded-lg border border-gray-300 bg-white text-sm focus:ring-2 focus:ring-green-500 outline-none transition-all" 
            value={category} 
            onChange={categoryChange}
  >
      {
        CATEGORIES.map((cat) => ( 
          <option key={cat} value={cat}>
            {cat} {CATEGORY_COLORS[cat]?.emoji || ''}
          </option>
      ))}
    </select>
    
    <input 
      className="flex-[2] p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none text-right font-bold transition-all"
      ref={inputRef} 
      type="number" 
      onChange={moneyChange} 
      onKeyDown={onKeyDown} 
      value={money}
      placeholder="금액 입력"
    />    

    <button className={`w-full py-3 rounded-lg font-black text-white transition-all transform active:scale-95 ${
        editId ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'
      }`}
      onClick={editId ? () => handleUpdate(editId) : addLog}>
      {editId ? '로그 수정' : '로그 추가'}  
    </button> 
  </div>
)
export default MoneyInput;