import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const Chart = ({ summary, CATEGORY_COLORS }) => {
    // 차트 데이터
    const data = Object.entries(summary).map(([name, value]) => ({ name, value }));

    return (
        <div>
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
            <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60} // 도넛 모양으로 만들기
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
            >   
                {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry.name]?.color || '#eee'} />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
            </PieChart>
        </ResponsiveContainer>
        </div>
    )
}
export default Chart;