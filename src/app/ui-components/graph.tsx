"use client";

import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadarController,
  PolarAreaController,
  PieController,
  DoughnutController,
  BubbleController,
  ScatterController,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  ScriptableContext,
  ChartType,
  // Easing,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { useTheme } from "next-themes";
import type { ChartOptions, ChartData } from "chart.js";

// Register all chart types
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadarController,
  PolarAreaController,
  PieController,
  DoughnutController,
  BubbleController,
  ScatterController,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

export type GlobalGraphProps = {
  // Basic chart configuration
  type?: ChartType; // Chart type: 'line', 'bar', 'pie', etc.
  labels: string[]; // X-axis labels or category names
  data: number[] | { x: number; y: number; r?: number }[]; // Data values
  title?: string; // Chart title
  height?: number; // Chart container height

  // Color customization
  lineColor?: string; // Color of lines/borders in the chart
  fillColor?: string; // Solid fill color for charts
  gradientColors?: [string, string]; // Gradient colors for fill areas [start, end]
  textColor?: string; // Color of title and legend text
  labelColor?: string; // Color of axis labels (Jan, Feb, etc.)
  valueColor?: string; // Color of axis values (10, 20, etc.)
  gridColor?: string; // Color of grid lines
  pointColor?: string; // Color of data points
  tooltipBgColor?: string; // Background color of tooltips
  tooltipTextColor?: string; // Text color of tooltips

  // Points & bars
  pointRadius?: number; // Size of data points
  pointHoverRadius?: number; // Size of data points on hover
  borderRadius?: number; // Border radius for bar charts

  // Grid
  showGrid?: boolean; // Whether to show grid lines
  gridStyle?: "l-shape" | "horizontal" | "vertical" | "none"; // Grid line style

  // Animation
  animationDuration?: number; // Duration of animations in milliseconds
  // animationEasing?: Easing; // Easing function for animations

  // Line tension (for line charts)
  tension?: number; // Curvature of line charts (0 = straight, 1 = very curved)

  // Extra dataset options
  datasetOptions?: Record<string, unknown>; // Additional Chart.js dataset options
};

export default function GlobalGraph({
  type = "line",
  labels,
  data,
  title = "",
  height = 400,
  lineColor,
  fillColor,
  gradientColors,
  textColor,
  labelColor,
  valueColor,
  gridColor,
  pointColor,
  tooltipBgColor,
  tooltipTextColor,
  pointRadius = 6,
  pointHoverRadius = 8,
  borderRadius = 8,
  showGrid = true,
  gridStyle = "vertical",
  animationDuration = 1000,
  // animationEasing = "easeOutQuart",
  tension = 0.4,
  datasetOptions = {},
}: GlobalGraphProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);
  
  // Calculate theme-aware colors
  const isDark = theme === "dark";
  
  // Default theme-aware colors (only if not provided by user)
  const defaultLineColor = lineColor || (isDark ? "#3b82f6" : "#2563eb");
  const defaultTextColor = textColor || (isDark ? "#f9fafb" : "#111827");
  const defaultLabelColor = labelColor || (isDark ? "#d1d5db" : "#4b5563");
  const defaultValueColor = valueColor || (isDark ? "#e5e7eb" : "#374151");
  const defaultGridColor = gridColor || (isDark ? "#374151" : "#e5e7eb");
  const defaultPointColor = pointColor || defaultLineColor;
  const defaultTooltipBgColor = tooltipBgColor || (isDark ? "#374151" : "#f9fafb");
  const defaultTooltipTextColor = tooltipTextColor || (isDark ? "#f9fafb" : "#111827");

  const chartData = React.useMemo(() => {
    if (!mounted) return { labels: [], datasets: [] };
    
    let background: string | ((ctx: ScriptableContext<"line">) => CanvasGradient) = fillColor || "transparent";

    if (type === "line" && gradientColors) {
      background = (ctx: ScriptableContext<"line">) => {
        const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, ctx.chart.height);
        g.addColorStop(0, gradientColors[0]);
        g.addColorStop(1, gradientColors[1]);
        return g;
      };
    } else if (type !== "line" && gradientColors) {
      background = gradientColors[0];
    } else if (type !== "line" && fillColor) {
      background = fillColor;
    }

    return {
      labels,
      datasets: [
        {
          label: title,
          data,
          borderColor: defaultLineColor,
          backgroundColor: background,
          pointBackgroundColor: defaultPointColor,
          borderWidth: 2,
          tension,
          pointRadius,
          pointHoverRadius,
          borderRadius,
          ...datasetOptions,
        },
      ],
    };
  }, [
    labels,
    data,
    title,
    defaultLineColor,
    defaultPointColor,
    fillColor,
    gradientColors,
    pointRadius,
    pointHoverRadius,
    tension,
    borderRadius,
    datasetOptions,
    type,
    mounted
  ]);

  const options = React.useMemo(() => {
    if (!mounted) return {};
    
    const xGrid = {
      display: showGrid && (gridStyle === "l-shape" || gridStyle === "horizontal"),
      color: defaultGridColor,
    };
    const yGrid = {
      display: showGrid && (gridStyle === "l-shape" || gridStyle === "vertical"),
      color: defaultGridColor,
    };

    const baseOptions: ChartOptions<ChartType> = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top' as const,
          labels: {
            color: defaultTextColor,
            usePointStyle: true,
            padding: 20,
          },
        },
        title: {
          display: !!title,
          text: title,
          color: defaultTextColor,
          font: {
            size: 18,
            weight: 'bold',
          },
          padding: {
            top: 10,
            bottom: 30,
          },
        },
        tooltip: {
          titleColor: defaultTooltipTextColor,
          bodyColor: defaultTooltipTextColor,
          backgroundColor: defaultTooltipBgColor,
          titleFont: {
            weight: 'bold',
          },
          padding: 12,
          boxPadding: 6,
          usePointStyle: true,
        },
      },
      animation: {
        duration: animationDuration,
        // easing: animationEasing,
      },
    };

    // Add scales for cartesian charts (line, bar)
    if (type === "line" || type === "bar") {
      baseOptions.scales = {
        x: {
          grid: xGrid,
          ticks: {
            color: defaultLabelColor,
          },
        },
        y: {
          grid: yGrid,
          ticks: {
            color: defaultValueColor,
          },
        },
      };
    }
    
    // Special options for radar charts
    if (type === "radar") {
      baseOptions.scales = {
        r: {
          grid: {
            color: defaultGridColor,
          },
          angleLines: {
            color: defaultGridColor,
          },
          pointLabels: {
            color: defaultLabelColor,
          },
          ticks: {
            color: defaultValueColor,
            backdropColor: 'transparent',
          },
        },
      };
    }

    return baseOptions;
  }, [
    defaultTextColor, 
    defaultLabelColor, 
    defaultValueColor, 
    defaultGridColor,
    defaultTooltipBgColor,
    defaultTooltipTextColor,
    title, 
    showGrid, 
    gridStyle, 
    animationDuration, 
    // animationEasing, 
    type, 
    mounted
  ]);

  const chartKey = `${theme}-${title}-${type}`;

  return (
    <>
      <div
        style={{
          padding: 20,
          borderRadius: 12,
          height,
          marginBottom: 30,
        }}
      >
        <Chart
          key={chartKey}
          type={type}
          data={chartData as ChartData<typeof type>}
          options={options as ChartOptions<typeof type>}
          height={height}
        />
      </div>
    </>
  );
}