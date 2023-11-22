// Write your code here
import './index.css'
import {BarChart, XAxis, YAxis, Legend, Bar, Rectangle, Tooltip} from 'recharts'

const VaccinationCoverage = props => {
  const {coverageList} = props

  const DataFormatter = number => `${(number * 1000).toString()}k`

  return (
    <BarChart
      width={800}
      height={400}
      data={coverageList}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <XAxis
        dataKey="vaccineDate"
        tick={{
          stroke: 'gray',
          strokeWidth: 1,
        }}
      />
      <YAxis
        tickFormatter={DataFormatter}
        tick={{
          stroke: 'gray',
          strokeWidth: 1,
        }}
      />
      <Tooltip />
      <Legend
        wrapperStyle={{
          padding: 50,
        }}
      />
      <Bar
        dataKey="dose1"
        fill="#5a8dee"
        activeBar={<Rectangle fill="pink" stroke="blue" />}
      />
      <Bar
        dataKey="dose2"
        fill="#f54394"
        activeBar={<Rectangle fill="gold" stroke="purple" />}
      />
    </BarChart>
  )
}

export default VaccinationCoverage
