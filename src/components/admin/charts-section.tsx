"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export function ChartsSection() {
  const [monthlyData, setMonthlyData] = useState([])
  const [templateData, setTemplateData] = useState([])

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/stats/user-growth`)
      .then((res) => res.json())
      .then((data) => setMonthlyData(data))

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/stats/template-distribution`)
      .then((res) => res.json())
      .then((data) => setTemplateData(data))
  }, [])

  return (
    <div className="space-y-6">
      <Card className="bg-white/90 backdrop-blur-xl border border-purple-200/50 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/30 to-purple-400/30 -z-10" />
        <CardHeader>
          <CardTitle className="text-purple-900">User Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 92, 246, 0.2)" />
              <XAxis dataKey="name" stroke="#7c3aed" />
              <YAxis stroke="#7c3aed" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "1px solid rgba(139, 92, 246, 0.3)",
                  borderRadius: "8px",
                  color: "#581c87",
                }}
              />
              <Line type="monotone" dataKey="users" stroke="#8b5cf6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-white/90 backdrop-blur-xl border border-purple-200/50 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400/30 to-pink-400/30 -z-10" />
        <CardHeader>
          <CardTitle className="text-purple-900">Template Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={templateData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                dataKey="value"
              >
                {templateData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "1px solid rgba(139, 92, 246, 0.3)",
                  borderRadius: "8px",
                  color: "#581c87",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
