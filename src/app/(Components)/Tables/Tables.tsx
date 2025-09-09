"use client";

import React, { useState } from "react";
import { Table } from "@/app/Ui components/table";

interface TeamMember {
  name: string;
  age: number;
  role: string;
  status: "Active" | "Inactive";
}

const initialData: TeamMember[] = [
  { name: "Alice Johnson", age: 25, role: "Senior Developer", status: "Active" },
  { name: "Bob Smith", age: 30, role: "UI/UX Designer", status: "Active" },
  { name: "Charlie Brown", age: 22, role: "Junior Intern", status: "Active" },
  { name: "Diana Prince", age: 28, role: "Project Manager", status: "Active" },
  { name: "Ethan Hunt", age: 35, role: "QA Engineer", status: "Inactive" },
];

export default function TablesPage() {
  const [data] = useState(initialData);

  const tableConfigs: { title: string; control: TableControl }[] = [
    {
      title: "Default Light Grey Table",
      control: { 
        bordered: true, 
        hover: true,
        striped: true
      },
    },
    {
      title: "Custom Light Grey Contrast",
      control: {
        striped: true,
        bordered: true,
        hover: true,
        // Custom light grey shades
        nthChildColors: [
          "#ffffff",     // White
          "#f5f5f5",     // Very light grey
          "#eeeeee",     // Light grey
          "#e0e0e0",     // Medium light grey
        ],
        borderColor: "#bdbdbd",
        headerBgColor: "#616161",
        headerTextColor: "#ffffff",
        rowTextColor: "#424242",
        hoverBgColor: "#bdbdbd",
        hoverTextColor: "#212121",
        borderRadius: 8,
        shadow: true
      },
    },
    {
      title: "Blue-Grey Theme",
      control: {
        striped: true,
        bordered: true,
        hover: true,
        // Blue-grey shades
        nthChildColors: [
          "#eceff1",     // Blue grey 50
          "#cfd8dc",     // Blue grey 100
          "#b0bec5",     // Blue grey 200
          "#90a4ae",     // Blue grey 300
        ],
        borderColor: "#78909c",
        headerBgColor: "#546e7a",
        headerTextColor: "#ffffff",
        rowTextColor: "#37474f",
        hoverBgColor: "#90a4ae",
        hoverTextColor: "#000000",
        borderRadius: 6,
        shadow: false
      },
    },
    {
      title: "Minimal Grey Theme",
      control: {
        striped: true,
        bordered: false,
        hover: true,
        // Very subtle grey shades
        nthChildColors: [
          "#fafafa",     // Grey 50
          "#f5f5f5",     // Grey 100
          "#eeeeee",     // Grey 200
        ],
        headerBgColor: "#f5f5f5",
        headerTextColor: "#424242",
        rowTextColor: "#424242",
        hoverBgColor: "#e0e0e0",
        hoverTextColor: "#212121",
        borderRadius: 4,
        shadow: false
      },
    },
    {
      title: "Dark Header with Light Rows",
      control: {
        striped: true,
        bordered: true,
        hover: true,
        // Light grey rows with dark header
        nthChildColors: [
          "#ffffff",     // White
          "#fafafa",     // Very light grey
        ],
        borderColor: "#e0e0e0",
        headerBgColor: "#424242",
        headerTextColor: "#ffffff",
        rowTextColor: "#424242",
        hoverBgColor: "#f5f5f5",
        hoverTextColor: "#212121",
        borderRadius: 0,
        shadow: false
      },
    }
  ];

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ textAlign: "center", marginBottom: 20 }}>
        Team Members - Light Grey Table Variations
      </h1>

      {tableConfigs.map((config, idx) => (
        <Table 
          key={idx} 
          data={data.map(item => ({
            name: item.name,
            age: item.age.toString(),
            role: item.role,
            status: item.status
          }))} 
          title={config.title} 
          control={config.control} 
        />
      ))}
    </div>
  );
}