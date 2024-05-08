import React from 'react'
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function BarChartDashboard({budgetList}) {
  return (
    <div className='border rounded-lg p-6'>
        <h2 className='font-bold text-lg mb-4'>Activity</h2>
        <ResponsiveContainer width={'60%'} height={300}>
          <BarChart
              data={budgetList}
            margin={{
              top:7
            }}
            
          >
              <XAxis dataKey='name' />
              <YAxis/>
              <Tooltip/>
              <Legend/>
              <Bar dataKey='totalSpend' stackId="a" fill='#27272a'/>
              <Bar dataKey='amount' stackId="a" fill='#000000'  />

          </BarChart>
        </ResponsiveContainer>
    </div>
  )
}

export default BarChartDashboard