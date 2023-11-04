import CustomTooltip from './CustomToolTip/CustomTooltip';
import './LineBarAreaComposedChart.scss';
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Janv', uv: 200, pv: 2400, amt: 2400, cnt: 50 },
  { name: 'Fev', uv: 300, pv: 1398, amt: 3800, cnt: 120 },
  { name: 'Mars', uv: 200, pv: 9800, amt: 13600, cnt: 150 },
  { name: 'Avril', uv: 278, pv: 3908, amt: 17400, cnt: 200 },
  { name: 'Mai', uv: 189, pv: 4800, amt: 22200, cnt: 250 },
  { name: 'Juin', uv: 239, pv: 3800, amt: 26000, cnt: 300 },
  { name: 'Juil', uv: 349, pv: 4300, amt: 30300, cnt: 350 },
  { name: 'Aout', uv: 200, pv: 2400, amt: 32700, cnt: 400 },
  { name: 'Sept', uv: 300, pv: 1398, amt: 34100, cnt: 450 },
  { name: 'Oct', uv: 200, pv: 9800, amt: 43900, cnt: 500 },
  { name: 'Nov', uv: 278, pv: 3908, amt: 47800, cnt: 550 },
  { name: 'Dec', uv: 189, pv: 4800, amt: 52600, cnt: 600 },
];

const LineBarAreaComposedChart = () => {
  return (
    <>
      <h3 className='h5 title-chart text-center mb-4'>
        Performance Mensuelle: Membres et Ventes
      </h3>
      <ResponsiveContainer height='100%' width='100%'>
        <ComposedChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <XAxis dataKey='name' scale='band' />
          <YAxis yAxisId='left' />
          <YAxis yAxisId='right' orientation='right' />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area
            yAxisId='right'
            type='monotone'
            dataKey='amt'
            fill='#7DB7FD'
            stroke='#7DB7FD'
            name='Ventes Cumulées'
          />
          <Bar
            yAxisId='left'
            dataKey='pv'
            barSize={120}
            fill='#388e3c8a'
            name='Total Ventes en Ligne'
          />
          <Line
            yAxisId='left'
            type='monotone'
            dataKey='uv'
            stroke='#FF9800'
            name='Membres Connectés'
          />
          <Scatter
            yAxisId='left'
            dataKey='cnt'
            fill='#D32F2F'
            name='Nouveaux Membres'
          />
          <CartesianGrid stroke='#bababa6b' strokeDasharray='2 2' />
        </ComposedChart>
      </ResponsiveContainer>
    </>
  );
};

export default LineBarAreaComposedChart;
