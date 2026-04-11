const MoneyInput = ({ inputRef, moneyChange, onKeyDown, money, addLog }) => 
  <div> 
    돈 추가 : <input ref={inputRef} type="number" onChange={moneyChange} onKeyDown={onKeyDown} value={money}/>
    <h1 >돈: {money}</h1>
    <button onClick={addLog}>로그 추가</button>
  </div>

export default MoneyInput;