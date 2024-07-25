"use client";

import { BarChart, Title } from "@tremor/react";

const chartdata = [
  {
    name: "Amphi",
    "Number of threatened species": 888,
    "Other products": 245,
  },
  {
    name: "Birds",
    "Number of threatened species": 488,
    "Other products": 645,
  },
  {
    name: "Crusta",
    "Number of threatened species": 443,
    "Other products": 443,
  },
  {
    name: "Ferns",
    "Number of threatened species": 281,
    "Other products": 681,
  },
  {
    name: "Arach",
    "Number of threatened species": 451,
    "Other products": 251,
  },
  {
    name: "Corals",
    "Number of threatened species": 751,
    "Other products": 232,
  },
  {
    name: "Algae",
    "Number of threatened species": 98,
    "Other products": 232,
  },
];

const dataFormatter = (number: number) =>
  Intl.NumberFormat("us").format(number).toString();

export default function BarChartOverview() {
  return (
    <div className="w-full h-[500px] p-2 border overflow-hidden rounded-xl border-foreground/10">
      <Title>Overview Bar Chart</Title>
      <BarChart
        className="w-[96%] h-[90%] mx-auto"
        data={chartdata}
        index="name"
        categories={["Number of threatened species", "Other products"]}
        colors={["blue", "red"]}
        valueFormatter={dataFormatter}
        yAxisWidth={48}
        onValueChange={(v) => console.log(v)}
      />
    </div>
  );
}
