const TotalSummary = ({ rate, filteredTotal }) => (
    <div className="bg-green-50 rounded-xl p-4 border border-green-100">  
        <p className="text-xs text-green-600 font-bold uppercase tracking-wider">Total Spending (Current Rate: ₩{rate || '로딩 중...'})</p>
        <h2 className="text-3xl font-black text-green-700">{filteredTotal.toLocaleString()}원</h2>  
        <span className="text-sm text-green-500 ml-2">(약 { rate ? (filteredTotal / rate).toFixed(2) : '0.00'} USD)</span> 
    </div>
);

export default TotalSummary;