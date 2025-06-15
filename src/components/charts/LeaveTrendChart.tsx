
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", sick: 12, casual: 18 },
  { month: "February", sick: 15, casual: 20 },
  { month: "March", sick: 10, casual: 22 },
  { month: "April", sick: 18, casual: 25 },
  { month: "May", sick: 20, casual: 23 },
  { month: "June", sick: 22, casual: 28 },
];

const chartConfig = {
  sick: {
    label: "Sick Leave",
    color: "hsl(var(--chart-1))",
  },
  casual: {
    label: "Casual Leave",
    color: "hsl(var(--chart-2))",
  },
}

export function LeaveTrendChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="sick" fill="var(--color-sick)" radius={4} />
        <Bar dataKey="casual" fill="var(--color-casual)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
