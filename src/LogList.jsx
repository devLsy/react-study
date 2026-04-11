const LogList = ({ logs, delLog, updateLog}) => (
    <ul>
      {logs.map((item) => (
        <li key={item.id}>  
          시간: {new Date(item.id).toLocaleTimeString()}  
          금액: {item.val} &nbsp;       
          <button onClick={() => delLog(item.id)}>로그 삭제</button> &nbsp; 
          <button onClick={() => updateLog(item.id)}>로그 수정</button>
        </li> 
      ))}
    </ul>
)
export default LogList;