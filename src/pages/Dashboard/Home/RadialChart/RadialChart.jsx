import PropTypes from 'prop-types';
import { RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';
import './RadialChart.scss';

export default function RadialChart(props) {
  const { valuePercentage, color, titleValuePercentage, index } = props;
  const data = [
    {
      uv: valuePercentage,
      fill: `${color}`,
    },
  ];
  return (
    <RadialBarChart
      className='radial-chart-container'
      width={74}
      height={70}
      cx={37}
      cy={32}
      innerRadius={23}
      outerRadius={140}
      barSize={5}
      data={data}
      title={titleValuePercentage}
    >
      <PolarAngleAxis
        type='number'
        domain={[0, 100]}
        dataKey={'uv'}
        angleAxisId={0}
        tick={false}
      />
      <RadialBar
        angleAxisId={0}
        animationDuration={650}
        animationBegin={250 * index}
        animationEasing='ease'
        label={{
          fontSize: '1.2rem',
          fontWeight: '700',
          position: 'center',
          fill: `${color}`,
        }}
        background={{ fill: '#e9dbdb' }}
        clockWise
        dataKey='uv'
        data={data}
      />
    </RadialBarChart>
  );
}

RadialChart.propTypes = {
  index: PropTypes.number.isRequired,
  valuePercentage: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  titleValuePercentage: PropTypes.string.isRequired,
};
