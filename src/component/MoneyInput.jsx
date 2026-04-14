const MoneyInput = ({ inputRef, moneyChange, onKeyDown, money, addLog, category, categoryChange, CATEGORY_COLORS, editId, handleUpdate }) => (
  <div className="input-group"> 
    <select className="category-select" value={category} onChange={categoryChange}>
      <option value="식비">식비 🍕</option>
      <option value="교통비">교통비 🚌</option>
      <option value="고정지출">고정지출 🏠</option>
      <option value="기타">기타 🏷️</option>
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