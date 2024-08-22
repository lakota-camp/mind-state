'use client';
import formateDateTime from '@/utils/formatDate';
import {
  ResponsiveContainer,
  Line,
  Tooltip,
  LineChart,
  XAxis,
  CartesianGrid,
  YAxis,
} from 'recharts';

// Do not quite understand this CustomToolTip component... going to look into it some more.
const CustomToolTip = ({ payload, label, active }) => {
  const dateLabel = new Date(label).toLocaleString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  if (active) {
    const analysis = payload[0].payload;
    return (
      <div className="p-8 custom-tooltip bg-white/5 shadow-md border border-black/10 rounded-lg backdrop-blur-md relative">
        <div
          className="absolute left-2 top-2 w-4 h-4 rounded-full"
          style={{ background: analysis.color }}
        ></div>
        <p className="label text-sm text-black/30">{dateLabel}</p>
        <p className="intro text-xl uppercase font-semibold">{analysis.mood}</p>
        <p className="intro text-xl uppercase font-semibold">
          {analysis.sentimentScore}
        </p>
      </div>
    );
  }

  return null;
};
// !FIXME: Format date in x-axis!!!
const HistoryChart = ({ data }) => {
  return (
    <ResponsiveContainer width={'90%'} height={500}>
      <LineChart width={300} height={100} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <Line
          dataKey="sentimentScore"
          stroke="#0180ff"
          strokeWidth={2}
          activeDot={{ r: 8 }}
          type="monotone"
        />
        <XAxis
          dataKey="createdAt"
          tickFormatter={(tick) =>
            new Date(tick).toLocaleDateString('en-us', {
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            })
          }
        />
        <YAxis />
        <Tooltip content={<CustomToolTip />} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default HistoryChart;
