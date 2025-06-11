"use client"

import type * as React from "react"
import {
  Area,
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { cn } from "@/lib/utils"

interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: any[]
}

export function Chart({ data, className, ...props }: ChartProps) {
  return (
    <div className={cn("h-[350px] w-full", className)} {...props}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

interface ChartTooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean
  payload?: any[]
  label?: string
  formatter?: (value: number, name: string) => React.ReactNode
  labelFormatter?: (label: string) => React.ReactNode
}

export function ChartTooltip({
  active,
  payload,
  label,
  formatter,
  labelFormatter,
  className,
  ...props
}: ChartTooltipProps) {
  if (active && payload?.length) {
    return (
      <div className={cn("rounded-lg border bg-background p-2 shadow-sm", className)} {...props}>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              {labelFormatter ? labelFormatter(label as string) : label}
            </span>
          </div>
          <div className="flex flex-col">
            {payload.map((entry, index) => (
              <div key={`item-${index}`} className="flex items-center justify-between gap-2">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-[0.70rem] uppercase text-muted-foreground">{entry.name}</span>
                <span className="font-bold">{formatter ? formatter(entry.value, entry.name) : entry.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return null
}

interface ChartAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  data: any[]
  dataKey: string
  xAxisKey?: string
  xAxisFormatter?: (value: string) => string
  yAxisFormatter?: (value: number) => string
  tooltipFormatter?: (value: number) => string
  tooltipLabelFormatter?: (label: string) => string
}

export function ChartArea({
  data,
  dataKey,
  xAxisKey = "date",
  xAxisFormatter,
  yAxisFormatter,
  tooltipFormatter,
  tooltipLabelFormatter,
  className,
  ...props
}: ChartAreaProps) {
  return (
    <div className={cn("h-[350px] w-full", className)} {...props}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey={xAxisKey}
            tickFormatter={xAxisFormatter}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
            tickMargin={10}
            minTickGap={10}
          />
          <YAxis
            tickFormatter={yAxisFormatter}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
            tickMargin={10}
            minTickGap={10}
          />
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" vertical={false} />
          <Tooltip
            content={({ active, payload, label }) => (
              <ChartTooltip
                active={active}
                payload={payload}
                label={label}
                formatter={(value, _name) => {
                  return tooltipFormatter ? tooltipFormatter(value) : value.toFixed(2)
                }}
                labelFormatter={(label) => {
                  return tooltipLabelFormatter ? tooltipLabelFormatter(label) : label
                }}
              />
            )}
          />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

interface ChartBarProps extends React.HTMLAttributes<HTMLDivElement> {
  data: any[]
  dataKey: string
  xAxisKey?: string
  xAxisFormatter?: (value: string) => string
  yAxisFormatter?: (value: number) => string
  tooltipFormatter?: (value: number) => string
  tooltipLabelFormatter?: (label: string) => string
}

export function ChartBar({
  data,
  dataKey,
  xAxisKey = "date",
  xAxisFormatter,
  yAxisFormatter,
  tooltipFormatter,
  tooltipLabelFormatter,
  className,
  ...props
}: ChartBarProps) {
  return (
    <div className={cn("h-[350px] w-full", className)} {...props}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 5,
          }}
        >
          <XAxis
            dataKey={xAxisKey}
            tickFormatter={xAxisFormatter}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
            tickMargin={10}
            minTickGap={10}
          />
          <YAxis
            tickFormatter={yAxisFormatter}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
            tickMargin={10}
            minTickGap={10}
          />
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" vertical={false} />
          <Tooltip
            content={({ active, payload, label }) => (
              <ChartTooltip
                active={active}
                payload={payload}
                label={label}
                formatter={(value, _name) => {
                  return tooltipFormatter ? tooltipFormatter(value) : value.toFixed(2)
                }}
                labelFormatter={(label) => {
                  return tooltipLabelFormatter ? tooltipLabelFormatter(label) : label
                }}
              />
            )}
          />
          <Bar dataKey={dataKey} fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

interface ChartPieProps extends React.HTMLAttributes<HTMLDivElement> {
  data: any[]
  dataKey: string
  nameKey: string
  colors?: string[]
  tooltipFormatter?: (value: number) => string
  tooltipLabelFormatter?: (label: string) => string
}

export function ChartPie({
  data,
  dataKey,
  nameKey,
  colors,
  tooltipFormatter,
  tooltipLabelFormatter,
  className,
  ...props
}: ChartPieProps) {
  const defaultColors = [
    "hsl(var(--primary))",
    "hsl(var(--primary) / 0.8)",
    "hsl(var(--primary) / 0.6)",
    "hsl(var(--primary) / 0.4)",
    "hsl(var(--primary) / 0.2)",
  ]

  return (
    <div className={cn("h-[350px] w-full", className)} {...props}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey={dataKey}
            nameKey={nameKey}
            label
          >
            {data.map((_entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors ? colors[index % colors.length] : defaultColors[index % defaultColors.length]}
              />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload, label }) => (
              <ChartTooltip
                active={active}
                payload={payload}
                label={label}
                formatter={(value, _name) => {
                  return tooltipFormatter ? tooltipFormatter(value) : value.toFixed(2)
                }}
                labelFormatter={(label) => {
                  return tooltipLabelFormatter ? tooltipLabelFormatter(label) : label
                }}
              />
            )}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
