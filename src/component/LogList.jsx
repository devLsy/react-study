const LogList = ({ logs, delLog, updateLog, CATEGORY_COLORS, startEdit}) => (
<div className="mt-4">
    <h3 className="text-sm font-bold text-gray-400 mb-3 ml-1 uppercase tracking-widest">Recent Logs</h3>
    <ul className="space-y-3">
      {logs.map((item) => (
        <li key={item.id} className="group flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 flex items-center justify-center rounded-full text-lg bg-gray-50" style={{ backgroundColor: `${CATEGORY_COLORS[item.category]?.color}20` }}>
              {CATEGORY_COLORS[item.category]?.emoji || '🏷️'}
            </span> 
            <div>
              <p className="font-bold text-gray-800">{item.category}</p>
              <p className="text-xs text-gray-400">{new Date(item.id).toLocaleTimeString()}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="font-black text-gray-900">{Number(item.val).toLocaleString()}원</span>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => startEdit(item)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg">✏️</button>
              <button onClick={() => delLog(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">🗑️</button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
)
export default LogList;