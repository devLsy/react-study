const MoneyInput = ({ inputRef, moneyChange, onKeyDown, money, addLog, category, categoryChange, CATEGORY_COLORS, CATEGORIES, editId, handleUpdate }) => (
  <div className="input-group"> 
    <select className="category-select" value={category} onChange={categoryChange}>
      {
        CATEGORIES.map((cat) => ( 
          <option key={cat} value={cat}>
            {cat} {CATEGORY_COLORS[cat]?.emoji || ''}
          </option>
      ))}
    </select>
    
    <input 
      className="money-input"
      ref={inputRef} 
      type="number" 
      onChange={moneyChange} 
      onKeyDown={onKeyDown} 
      value={money}
      placeholder="금액 입력"
    />    

    <button className="add-btn" onClick={editId ? () => handleUpdate(editId) : addLog}>
      {editId ? '로그 수정' : '로그 추가'}  
    </button> 
  </div>
)
export default MoneyInput;