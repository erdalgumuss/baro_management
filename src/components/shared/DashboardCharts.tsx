import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const generateData = () => {
  const data = []
  for (let i = 0; i < 7; i++) {
    data.push({
      name: `Gün ${i + 1}`,
      başvurular: Math.floor(Math.random() * 50) + 10,
      davalar: Math.floor(Math.random() * 30) + 5,
      ihlaller: Math.floor(Math.random() * 20) + 1,
    })
  }
  return data
}

export function DashboardCharts() {
  const [data, setData] = useState(generateData())

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateData())
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full h-[400px] mt-8">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="başvurular" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="davalar" stroke="#82ca9d" />
          <Line type="monotone" dataKey="ihlaller" stroke="#ffc658" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

