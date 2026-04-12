const LogList = ({ logs, delLog, updateLog}) => (
    <ul className="log-list">
      {logs.map((item) => (
        <li key={item.id} className="log-item">  
          <span className="category-badge">[{item.category ? item.category: '미분류'}]</span> &nbsp;
          <span className="time">{new Date(item.id).toLocaleTimeString()}</span> &nbsp;
          <span className="money">{Number(item.val).toLocaleString()}원</span> &nbsp;
          
          <div className="btn-group">
            <button onClick={() => updateLog(item.id)}>수정</button>
            <button onClick={() => delLog(item.id)}>삭제</button>
          </div>
        </li> 
      ))}
    </ul>
)
export default LogList;