'use client';
import React from 'react';
import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  // ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

export const description: string = 'A multiple bar chart';

type ChartData = {
  month: string;
  desktop: number;
  mobile: number;
  review: number;
};

const chartData: ChartData[] = [
  { month: 'January', desktop: 120, mobile: 80, review: 100 },
  { month: 'February', desktop: 170, mobile: 200, review: 100 },
  { month: 'March', desktop: 200, mobile: 120, review: 100 },
  { month: 'April', desktop: 80, mobile: 190, review: 100 },
  { month: 'May', desktop: 140, mobile: 130, review: 100 },
  { month: 'June', desktop: 200, mobile: 140, review: 100 },
];

type ChartConfigType = {
  desktop: {
    label: string;
    color: string;
  };
  mobile: {
    label: string;
    color: string;
  };
  review: {
    label: string;
    color: string;
  };
};

const chartConfig: ChartConfigType = {
  desktop: {
    label: 'Desktop',
    color: '#EB4F47',
  },
  mobile: {
    label: 'Mobile',
    color: '#F79A1F',
  },
  review: {
    label: 'Review',
    color: '#0096FF',
  },
};

export function InsightChart() {
  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle>Bar Chart - Multiple</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value: string) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
            <Bar dataKey="review" fill="var(--color-review)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
