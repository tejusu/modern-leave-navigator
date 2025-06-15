
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"

const chartData = [
  { department: "Engineering", sick: 12, casual: 18, earned: 10 },
  { department: "Marketing", sick: 8, casual: 15, earned: 12 },
  { department: "Sales", sick: 15, casual: 10, earned: 8 },
  { department: "HR", sick: 5, casual: 7, earned: 5 },
  { department: "Support", sick: 10, casual: 20, earned: 15 },
];

const chartConfig = {
  sick: {
    label: "Sick",
    color: "hsl(var(--chart-1))",
  },
  casual: {
    label: "Casual",
    color: "hsl(var(--chart-2))",
  },
  earned: {
    label: "Earned",
    color: "hsl(var(--chart-3))",
  },
}

export function DepartmentLeaveChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
      <BarChart accessibilityLayer data={chartData} layout="vertical" stackOffset="expand">
        <CartesianGrid horizontal={false} />
        <YAxis
          dataKey="department"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          width={80}
        />
        <XAxis type="number" hide />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="sick" stackId="a" fill="var(--color-sick)" radius={4} />
        <Bar dataKey="casual" stackId="a" fill="var(--color-casual)" radius={4} />
        <Bar dataKey="earned" stackId="a" fill="var(--color-earned)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
