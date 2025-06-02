// npm install recharts
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
  LineChart, Line,
} from "recharts";


const COLORS = ["#9D00FF", "#6A0DAD", "#483D8B", "#2E2B5F"];

const deviceData = [
  { name: "Router A", vulnerabilities: 7 },
  { name: "Switch B", vulnerabilities: 5 },
  { name: "Firewall C", vulnerabilities: 9 },
  { name: "AP D", vulnerabilities: 3 },
];

const severityData = [
  { name: "Critical", value: 4 },
  { name: "High", value: 7 },
  { name: "Medium", value: 10 },
  { name: "Low", value: 6 },
];

const progressData = [
  { device: "Router A", patched: 5, total: 7 },
  { device: "Switch B", patched: 3, total: 5 },
  { device: "Firewall C", patched: 4, total: 9 },
];

const timeData = [
  { time: "Week 1", detected: 25, resolved: 5 },
  { time: "Week 2", detected: 30, resolved: 15 },
  { time: "Week 3", detected: 35, resolved: 25 },
];

const scriptData = [
  { script: "Fix-SSH", fixed: 10 },
  { script: "Update-SNMP", fixed: 6 },
  { script: "Patch-SSL", fixed: 8 },
];

export default function DashboardCharts() {
  return (
    <div className="dash_board_cont">
      {/* Bar Chart: Vulnerabilities per Device */}
      <div className="bg-black rounded-xl p-2">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={deviceData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="vulnerabilities" fill="#9D00FF" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Donut Chart: Severity Distribution */}
      <div className="bg-black rounded-xl p-2">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={severityData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={60}
              innerRadius={30}
              fill="#8884d8"
              label
            >
              {severityData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Progress Bars */}
      <div className="bg-black rounded-xl p-4">
        {progressData.map(({ device, patched, total }) => (
          <div key={device} className="mb-2">
            <div className="text-sm text-white">{device}</div>
            <div className="w-full bg-gray-700 h-3 rounded">
              <div
                className="h-3 bg-purple-700 rounded"
                style={{ width: `${(patched / total) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Line Chart: Evolution Over Time */}
      <div className="bg-black rounded-xl p-2">
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={timeData}>
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="detected" stroke="#8884d8" />
            <Line type="monotone" dataKey="resolved" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Script Effectiveness */}
      <div className="bg-black rounded-xl p-4 col-span-2">
        {scriptData.map(({ script, fixed }) => (
          <div key={script} className="mb-2">
            <div className="text-sm text-white">{script}</div>
            <div className="w-full bg-gray-700 h-3 rounded">
              <div
                className="h-3 bg-purple-500 rounded"
                style={{ width: `${fixed * 10}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
