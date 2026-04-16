const Summary = ({ summary, CATEGORY_COLORS }) => (
  <div className="grid grid-cols-2 gap-3 mt-4"> {/* 2열 그리드로 팩트상 정렬 */}
    {Object.entries(summary).map(([name, value]) => (
      <div 
        key={name} 
        className="flex flex-col p-3 rounded-xl border border-gray-100 bg-gray-50/50"
      >
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-sm">
            {CATEGORY_COLORS[name]?.emoji || '🏷️'}
          </span>
          <span className="text-xs font-bold text-gray-500 uppercase tracking-tight">
            {name}
          </span>
        </div>
        <div className="text-sm font-black text-gray-800">
          {value.toLocaleString()}원
        </div>
      </div>
    ))}
  </div>
);

export default Summary;