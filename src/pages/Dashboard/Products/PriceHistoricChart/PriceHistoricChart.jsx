import PropTypes from 'prop-types';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import CustomTooltip from './CustomTooltip/CustomTooltip';

const PriceHistoricChart = ({ data }) => {
  return (
    <div className='d-flex justify-content-center'>
      <ResponsiveContainer width='100%' height={140}>
        <AreaChart
          data={data}
          fill='#7DB7FD'
          stroke='#7DB7FD'
          margin={{
            top: 10,
            right: 0,
            left: -40,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray='6 3' />
          <XAxis
            dataKey='date'
            interval='preserveStartEnd'
            style={{ padding: 20 }}
            tick={false}
          />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Area
            connectNulls
            type='monotone'
            dataKey='price'
            fill='#00708A80'
            stroke='#00708A80'
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

PriceHistoricChart.propTypes = {
  data: PropTypes.array,
};
export default PriceHistoricChart;
