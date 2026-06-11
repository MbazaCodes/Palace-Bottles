"use client";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { REVENUE_SERIES, CATEGORY_SPLIT } from "@/data/admin";

const fmtM = (v: number) => `TZS ${(v / 1000000).toFixed(1)}M`;

export function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={REVENUE_SERIES} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
        <defs>
          <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#2563eb" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e8eaf0" vertical={false} />
        <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#5b6688" }} axisLine={false} tickLine={false} />
        <YAxis tickFormatter={fmtM} tick={{ fontSize: 11, fill: "#5b6688" }} axisLine={false} tickLine={false} width={70} />
        <Tooltip formatter={(v) => [fmtM(Number(v)), "Revenue"]} contentStyle={{ borderRadius: 12, border: "1px solid #e8eaf0", fontSize: 12 }} />
        <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2.5} fill="url(#rev)" dot={{ r: 3, fill: "#2563eb" }} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function CategoryDonut() {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie data={CATEGORY_SPLIT} dataKey="value" nameKey="name" innerRadius={58} outerRadius={85} paddingAngle={3} strokeWidth={0}>
          {CATEGORY_SPLIT.map((c) => <Cell key={c.name} fill={c.color} />)}
        </Pie>
        <Tooltip formatter={(v, n) => [`${Number(v).toLocaleString()} units`, n]} contentStyle={{ borderRadius: 12, border: "1px solid #e8eaf0", fontSize: 12 }} />
        <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}
