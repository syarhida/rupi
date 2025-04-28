
import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { formatCurrency } from "@/lib/utils";

interface CashflowChartProps {
  data: {
    name: string;
    income: number;
    expense: number;
  }[];
}

export function CashflowChart({ data }: CashflowChartProps) {
  const formatYAxis = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(0)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value;
  };

  return (
    <div className="rupi-card h-80">
      <h3 className="font-medium mb-4 text-lg">Monthly Cashflow</h3>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            tickFormatter={formatYAxis} 
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
            formatter={(value: number) => [formatCurrency(value), ""]}
            contentStyle={{ 
              backgroundColor: "hsl(var(--card))",
              borderRadius: "var(--radius)",
              border: "1px solid hsl(var(--border))"
            }}
          />
          <Legend />
          <Bar dataKey="income" name="Income" fill="hsl(var(--rupi-positive))" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expense" name="Expense" fill="hsl(var(--rupi-negative))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
