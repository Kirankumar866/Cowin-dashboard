import {PieChart, Pie, ResponsiveContainer} from 'recharts'

const VaccinationByGender = props => {
  const {genderList} = props
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          dataKey="count"
          startAngle={0}
          endAngle={180}
          data={genderList}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default VaccinationByGender
