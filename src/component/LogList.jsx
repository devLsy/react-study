const LogList = ({ logs, delLog, updateLog, CATEGORY_COLORS, startEdit}) => (
    <ul className="log-list">
      {logs.map((item) => (
        <li key={item.id} className="log-item">  
          <span className="category-badge"
                style={{  
                  background: CATEGORY_COLORS[item.category] || '#eee'
                }}    
          >[{item.category ? item.category: '미분류'}]</span> &nbsp;
          <span className="time">{new Date(item.id).toLocaleTimeString()}</span> &nbsp;
          <span className="money">{Number(item.val).toLocaleString()}원</span> &nbsp;
                
          <div className="btn-group">
            <button className="btn-default" onClick={() => startEdit(item)}>수정</button> &nbsp;
            <button className="btn-default" onClick={() => delLog(item.id)}>삭제</button>
          </div>
        </li> 
      ))}
    </ul>
)
export default LogList;