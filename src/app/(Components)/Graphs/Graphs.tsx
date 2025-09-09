"use client";

import React, { useState, useEffect } from "react";
import GlobalGraph from "@/app/Ui components/graph";
import { useTheme } from "next-themes";

export default function GraphsPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <div style={{ padding: 20, minHeight: "100vh"}}>
      <h1 style={{ textAlign: "center", marginBottom: 40 }}>
        Easy-to-Use Customizable Charts
      </h1>

      {/* Simple line chart with minimal customization */}
      <GlobalGraph
        type="line"
        labels={["Jan", "Feb", "Mar", "Apr", "May"]}
        data={[15, 25, 35, 45, 30]}
        title="Monthly Growth"
        lineColor="#3b82f6" // Blue line
        fillColor="#3b82f620" // Light blue fill with transparency
      />

      {/* Bar chart with custom colors */}
      <GlobalGraph
      // Type of the chart
        type="bar"
        // Labels in horizontal
        labels={["Q1", "Q2", "Q3", "Q4"]}
        // data in vertican
        data={[50, 80, 65, 95]}
        // upper title
        title="Quarterly Sales"
        // Border of the bars 
        lineColor="#10b981" 
        // Color of the bars
        fillColor="#10b981" 
        // Color for the title text and the total labels
        // textColor="#111827" 
        //label for the x-axis labels
        // labelColor="#4b5563" 
        // label for y-axis value
        // valueColor="#374151"
      />

      {/* Chart with gradient */}
      <GlobalGraph
        type="line"
        labels={["Week 1", "Week 2", "Week 3", "Week 4"]}
        data={[12, 25, 18, 30]}
        title="Weekly Activity"
        lineColor="#f59e0b" // Orange line
        gradientColors={["#f59e0b40", "#f59e0b00"]} // Orange gradient
        pointColor="#f59e0b" // Orange points
      />

      {/* Dark-themed chart */}
      <GlobalGraph
        type="bar"
        labels={["Product A", "Product B", "Product C"]}
        data={[35, 50, 25]}
        title="Product Performance"
        lineColor="#8b5cf6" // Purple line
        fillColor="#8b5cf6" // Purple fill
        // textColor="#f3f4f6" // Light text
        // labelColor="#d1d5db" // Light gray labels
        // valueColor="#e5e7eb" // Light values
        gridColor="#4b5563" // Dark grid
      />

      {/* Pie chart with custom colors */}
      <GlobalGraph
        type="pie"
        labels={["Apple", "Samsung", "Xiaomi", "Oppo"]}
        data={[45, 25, 15, 15]}
        labelColor="#d1d5db"
        title="Market Share"
        fillColor="#ef4444" // Red fill
        // textColor="#111827" // Dark text
      />

      {/* Chart with custom tooltips */}
      <GlobalGraph
        type="line"
        labels={["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"]}
        // labelColor="#fff"
        data={[22, 35, 28, 40, 32]}
        title="Daily Performance"
        lineColor="#ec4899" // Pink line
        tooltipBgColor="#1f2937" // Dark tooltip background
        tooltipTextColor="#f9fafb" // Light tooltip text
      />
    </div>
  );
}