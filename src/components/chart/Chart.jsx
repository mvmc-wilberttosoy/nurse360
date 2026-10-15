import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

const data = [
    { name: 'Completed', value: 78, color: '#00897b' },  // Teal primary
    { name: 'Ongoing', value: 22, color: '#cbd5e1' },    // Muted gray/soft color
];

export default function CompletionChart() {
    return (
        <div style={{ width: '100%', height: '100%', minHeight: '280px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#0f172a', margin: 0 }}>Training Status</h3>
                <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '500' }}>Overall Rate</span>
            </div>

            <div style={{ flex: 1, width: '100%', position: 'relative', minHeight: '200px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={75}
                            outerRadius={105}
                            paddingAngle={4}
                            dataKey="value"
                            startAngle={90}
                            endAngle={-270}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value) => [`${value}%`, 'Share']}
                            contentStyle={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '12px' }}
                        />
                    </PieChart>
                </ResponsiveContainer>

                {/* Center Percentage Label */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    pointerEvents: 'none'
                }}>
                    <span style={{ display: 'block', fontSize: '1.5rem', fontWeight: '800', color: '#0f172a' }}>78%</span>
                    <span style={{ display: 'block', fontSize: '0.7rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Completed</span>
                </div>
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#64748b' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00897b' }}></span>
                    <span>Completed (78%)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#64748b' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#cbd5e1' }}></span>
                    <span>Ongoing (22%)</span>
                </div>
            </div>
        </div>
    );
}