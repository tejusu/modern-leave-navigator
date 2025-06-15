
import * as React from "react"
import { Pie, PieChart, Cell } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"

const chartData = [
  { type: "sick", count: 275 },
  { type: "casual", count: 200 },
  { type: "earned", count: 187 },
  { type: "maternity", count: 50 },
]

const chartConfig = {
  count: {
    label: "Count",
  },
  sick: {
    label: "Sick Leave",
    color: "hsl(var(--chart-1))",
  },
  casual: {
    label: "Casual Leave",
    color: "hsl(var(--chart-2))",
  },
  earned: {
    label: "Earned Leave",
    color: "hsl(var(--chart-3))",
  },
  maternity: {
    label: "Maternity",
    color: "hsl(var(--chart-4))",
  },
}

export function LeaveDistributionChart() {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel nameKey="type" />}
        />
        <Pie
          data={chartData}
          dataKey="count"
          nameKey="type"
          innerRadius={60}
          strokeWidth={5}
        >
          {chartData.map((entry) => (
            <Cell
              key={`cell-${entry.type}`}
              fill={`var(--color-${entry.type})`}
              className="stroke-background"
            />
          ))}
        </Pie>
        <ChartLegend
          content={<ChartLegendContent nameKey="type" />}
          className="-translate-y-[2px] flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
        />
      </PieChart>
    </ChartContainer>
  )
}
