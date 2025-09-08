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

  // Theme-aware gradients
  // Theme-aware gradients - use tuples instead of arrays
const gradients = {
  red: isDark ? ["#f8717155", "#f8717100"] as [string, string] : ["#ef444455", "#ef444400"] as [string, string],
  blue: isDark ? ["#3b82f655", "#3b82f600"] as [string, string] : ["#2563eb55", "#2563eb00"] as [string, string],
  green: isDark ? ["#10b98155", "#10b98100"] as [string, string] : ["#22c55e55", "#22c55e00"] as [string, string],
  yellow: isDark ? ["#fbbf2455", "#fbbf2400"] as [string, string] : ["#facc1555", "#facc1500"] as [string, string],
  purple: isDark ? ["#a78bfa55", "#a78bfa00"] as [string, string] : ["#8b5cf655", "#8b5cf600"] as [string, string],
};

  return (
    <div style={{ padding: 20, minHeight: "100vh"}}>
      <h1 style={{ textAlign: "center", color: isDark ? "#f9fafb" : "#111827", marginBottom: 40 }}>
        Advanced Theme-Responsive Charts
      </h1>

      {/* Line Chart */}
      <GlobalGraph
        type="line"
        labels={["Jan", "Feb", "Mar", "Apr", "May"]}
        data={[15, 25, 35, 45, 30]}
        title="Monthly Growth"
        lineColor={isDark ? "#f87171" : "#2563eb"}
        gradientColors={gradients.red}
        // pointGlow={true}
        pointRadius={6}
        pointHoverRadius={10}
        tension={0.5}
      />

      {/* Bar Chart */}
      <GlobalGraph
        type="bar"
        labels={["Q1", "Q2", "Q3", "Q4"]}
        data={[50, 80, 65, 95]}
        title="Quarterly Sales"
        lineColor={isDark ? "#10b981" : "#3b82f6"}
        borderRadius={12}
        gradientColors={gradients.green}
        showGrid={true}
        gridStyle="horizontal"
      />

      {/* Radar Chart */}
      <GlobalGraph
        type="radar"
        labels={["Week 1", "Week 2", "Week 3", "Week 4"]}
        data={[12, 25, 18, 30]}
        title="Weekly Activity"
        lineColor={isDark ? "#fbbf24" : "#ef4444"}
        gradientColors={gradients.yellow}
        // pointGlow={true}
        pointRadius={8}
        pointHoverRadius={12}
        tension={0.6}
        animationDuration={1500}
        animationEasing="easeInOutQuart"
      />

      {/* Polar Area */}
      <GlobalGraph
        type="polarArea"
        labels={["Red", "Blue", "Green", "Yellow", "Purple"]}
        data={[11, 16, 7, 14, 9]}
        title="Polar Distribution"
        lineColor={isDark ? "#f87171" : "#3b82f6"}
        gradientColors={gradients.purple}
      />

      {/* Pie Chart */}
      <GlobalGraph
        type="pie"
        labels={["Apple", "Samsung", "Xiaomi", "Oppo"]}
        data={[45, 25, 15, 15]}
        title="Market Share"
        gradientColors={gradients.blue}
      />

      {/* Doughnut Chart */}
      <GlobalGraph
        type="doughnut"
        labels={["Chrome", "Firefox", "Edge", "Safari"]}
        data={[60, 20, 10, 10]}
        title="Browser Usage"
        gradientColors={gradients.green}
      />

      {/* Scatter Chart */}
      <GlobalGraph
        type="scatter"
        labels={["Point 1", "Point 2", "Point 3", "Point 4"]}
        data={[
          { x: 5, y: 10 },
          { x: 10, y: 15 },
          { x: 15, y: 8 },
          { x: 20, y: 20 },
        ]}
        title="Scatter Plot"
        lineColor={isDark ? "#fbbf24" : "#ef4444"}
        pointRadius={7}
        pointHoverRadius={10}
      />

      {/* Bubble Chart */}
      <GlobalGraph
        type="bubble"
        labels={["Bubble 1", "Bubble 2", "Bubble 3"]}
        data={[
          { x: 10, y: 20, r: 15 },
          { x: 15, y: 10, r: 10 },
          { x: 20, y: 25, r: 20 },
        ]}
        title="Bubble Chart"
        lineColor={isDark ? "#a78bfa" : "#8b5cf6"}
        gradientColors={gradients.purple}
      />
    </div>
  );
}
