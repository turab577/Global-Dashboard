"use client";

import React, { useState } from "react";
import { Table, TableControl } from "@/app/Ui components/table";

interface TeamMember {
  name: string;
  age: number;
  role: string;
}



const initialData: TeamMember[] = [
  { name: "Alice", age: 25, role: "Developer" },
  { name: "Bob", age: 30, role: "Designer" },
  { name: "Charlie", age: 22, role: "Intern" },
];

export default function TablesPage() {
  const [data] = useState(initialData);

  const tableConfigs: { title: string; control: TableControl }[] = [
    {
      title: "Default Table",
      control: { bordered: true, borderStyle:"dashed", hover: true },
    },
    {
      title: "No Border Table",
      control: { bordered: false, hover: true },
    },
    {
      title: "Double Border Table",
      control: { bordered: true, borderStyle: "double", hover: true },
    },
    {
      title: "Zebra Table",
      control: { striped: true, bordered: true, hover: true },
    },
    {
      title: "Filled Hover Table",
      control: { hover: true, hoverBgColor: "#1d4ed8", hoverTextColor: "#000000", striped: false },
    },
    {
      title: "Right-Aligned Table",
      control: { textAlign: "right", striped: true, bordered: true, hover: true },
    },
    {
      title: "Large Font Table",
      control: { fontSize: 18, striped: true, bordered: true, hover: true },
    },
    {
      title: "Card Shadow Table",
      control: { shadow: false, striped: true, bordered: true, hover: true, borderRadius: 12 },
    },
    {
      title: "Nth-Child Contrast Table",
      control: {
        striped: true,
        bordered: true,

        hover: true,
        rowBgColor: "#fff",
        zebraColor: "#fde68a",
        hoverBgColor: "#f59e0b",
        hoverTextColor: "#fff",
      },
    },
    {
      title: "Custom Colors Table",
      control: {
        headerBgColor: "#f97316",
        headerTextColor: "#fff",
        rowBgColor: "#fff7ed",
        rowTextColor: "#b45309",
        zebraColor: "#fde68a",
        hoverBgColor: "#f59e0b",
        hoverTextColor: "#fff",
        striped: true,
        bordered: true,
        shadow: false,
        borderRadius: 10,
      },
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ textAlign: "center", marginBottom: 20 }}>
        Team Members - Full Modern Table Playground
      </h1>

      {tableConfigs.map((config, idx) => (
  <Table 
    key={idx} 
    data={data.map(item => ({
      ...item,
      age: item.age.toString() // Convert age to string
    }))} 
    title={config.title} 
    control={config.control} 
  />
))}
    </div>
  );
}
