'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function ApplicationStatistics({ applications }) {
  // Başvuru kategorilerine göre dağılım
  const applicationCategories = applications.reduce((acc, app) => {
    acc[app.eventCategory] = (acc[app.eventCategory] || 0) + 1;
    return acc;
  }, {});

  const applicationCategoryData = Object.entries(applicationCategories).map(([name, value]) => ({
    name,
    value,
  }));

  // Aylık başvuru sayıları
  const monthlyCounts = applications.reduce((acc, app) => {
    const month = new Date(app.date).getMonth();
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const monthlyData = Object.entries(monthlyCounts).map(([month, count]) => ({
    month: new Date(2023, month).toLocaleString('default', { month: 'long' }),
    count,
  }));

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 text-gray-100">
        <CardHeader>
          <CardTitle>Başvuru Kategorilerine Göre Dağılım</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={applicationCategoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {applicationCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 text-gray-100">
        <CardHeader>
          <CardTitle>Aylık Başvuru Sayıları</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
