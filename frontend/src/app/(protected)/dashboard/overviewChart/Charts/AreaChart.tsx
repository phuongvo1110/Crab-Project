"use client";

import { AreaChart, Title } from "@tremor/react";

const chartdata = [
  {
    date: "Jan 22",
    SemiAnalysis: 890,
    "The Pragmatic Engineer": 338,
  },
  {
    date: "Feb 22",
    SemiAnalysis: 756,
    "The Pragmatic Engineer": 103,
  },
  {
    date: "Mar 22",
    SemiAnalysis: 322,
    "The Pragmatic Engineer": 194,
  },
  {
    date: "Apr 22",
    SemiAnalysis: 470,
    "The Pragmatic Engineer": 108,
  },
  {
    date: "May 22",
    SemiAnalysis: 475,
    "The Pragmatic Engineer": 512,
  },
  {
    date: "Jun 22",
    SemiAnalysis: 129,
    "The Pragmatic Engineer": 326,
  },
  {
    date: "Jul 22",
    SemiAnalysis: 490,
    "The Pragmatic Engineer": 582,
  },
  {
    date: "Aug 22",
    SemiAnalysis: 903,
    "The Pragmatic Engineer": 412,
  },
  {
    date: "Sep 22",
    SemiAnalysis: 643,
    "The Pragmatic Engineer": 342,
  },
  {
    date: "Oct 22",
    SemiAnalysis: 837,
    "The Pragmatic Engineer": 473,
  },
  {
    date: "Nov 22",
    SemiAnalysis: 954,
    "The Pragmatic Engineer": 748,
  },
  {
    date: "Dec 22",
    SemiAnalysis: 239,
    "The Pragmatic Engineer": 736,
  },
];

const dataFormatter = (number: number) =>
  `$${Intl.NumberFormat("us").format(number).toString()}`;

export default function AreaChartOverview() {
  return (
    <div className="w-full h-[500px] p-2 border overflow-hidden rounded-xl border-foreground/10">
      <Title>Overview Area Chart</Title>
      <AreaChart
        className="w-[96%] h-[90%] mx-auto"
        data={chartdata}
        index="date"
        categories={["SemiAnalysis", "The Pragmatic Engineer"]}
        colors={["indigo", "rose"]}
        valueFormatter={dataFormatter}
        yAxisWidth={60}
        onValueChange={(v) => console.log(v)}
      />
    </div>
  );
}
