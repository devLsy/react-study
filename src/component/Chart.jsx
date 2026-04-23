import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const Chart = ({ summary, CATEGORY_COLORS, displayLogs }) => {
    // 차트 데이터
    const data = Object.entries(summary).map(([name, value]) => ({ name, value }));

    return (
        <div className="h-64 w-full mt-4" style={{ minHeight: '256px' }}>
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={256}>    
            <PieChart>
            <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60} // 도넛 모양으로 만들기
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                isAnimationActive={false}    
            >   
                {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry.name]?.color || '#eee'} />
                ))} 
            </Pie>
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
            <Legend iconType="circle"/>
            </PieChart>
        </ResponsiveContainer>
        </div>
    )   
}
export default Chart;