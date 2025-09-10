"use client";

import React, { useState, useEffect } from "react";
import GlobalGraph from "@/app/ui-components/graph";
import { useTheme } from "next-themes";
import Loader from "@/app/ui-components/loaders";

export default function GraphsPage() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);
  
  if (!mounted) return (
    <div className="flex justify-center items-center h-[100vh]">
      <Loader type="fidget"/>
    </div>  
  );

  const isDark = resolvedTheme === "dark";

  return (
    <div style={{ 
      padding: 20, 
      minHeight: "100vh",
      color: isDark ? "#f9fafb" : "#111827",
      transition: "background-color 0.3s ease, color 0.3s ease"
    }}>
      <h1 style={{ textAlign: "center", marginBottom: 40 }}>
        Easy-to-Use Customizable Charts
      </h1>

      {/* Simple line chart with minimal customization */}
      <GlobalGraph
        type="line"
        labels={["Jan", "Feb", "Mar", "Apr", "May"]}
        data={[15, 25, 35, 45, 30]}
        title="Line Type Graph"
        lineColor="#3b82f6"
        fillColor="#3b82f620"
      />

      {/* Bar chart with custom colors */}
      <GlobalGraph
        type="bar"
        labels={["Q1", "Q2", "Q3", "Q4"]}
        data={[50, 80, 65, 95]}
        title="Bar Type Graph"
        lineColor="#10b981"
        fillColor="#10b981"
      />

      {/* Chart with gradient */}
      <GlobalGraph
        type="doughnut"
        labels={["Week 1", "Week 2", "Week 3", "Week 4"]}
        data={[12, 25, 18, 30]}
        title="Doughnut Type Graph"
        lineColor="#f59e0b"
        gradientColors={["#f59e0b40", "#f59e0b00"]}
        pointColor="#f59e0b"
      />

      {/* Dark-themed chart */}
      <GlobalGraph
        type="radar"
        labels={["Product A", "Product B", "Product C"]}
        data={[35, 50, 25]}
        title="Radar Type Graph"
        lineColor="#8b5cf6"
        fillColor="#8b5cf6"
      />

      {/* Pie chart with custom colors */}
      <GlobalGraph
        type="pie"
        labels={["Apple", "Samsung", "Xiaomi", "Oppo"]}
        data={[45, 25, 15, 15]}
        title="Pie Type Graph"
        fillColor="#ef4444"
      />

      {/* Chart with custom tooltips */}
      <GlobalGraph
        type="polarArea"
        labels={["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"]}
        data={[22, 35, 28, 40, 32]}
        title="Polar Area"
        lineColor="#ec4899"
        tooltipBgColor="#1f2937"
        tooltipTextColor="#f9fafb"
      />
    </div>
  );
}