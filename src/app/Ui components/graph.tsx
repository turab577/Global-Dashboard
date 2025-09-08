"use client";

import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadarController,
  RadialLinearScale,
  BubbleController,
  ScatterController,
  Title,
  Tooltip,
  Legend,
  ScriptableContext,
  ChartType,
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
  RadialLinearScale,
  BubbleController,
  ScatterController,
  Title,
  Tooltip,
  Legend
);

export type GlobalGraphProps = {
  type?: ChartType; // ✅ Fixed type
  labels: string[];
  data: number[] | { x: number; y: number; r?: number }[];
  title?: string;
  height?: number;

  // Theme & styling
  backgroundColor?: string;
  lineColor?: string;
  gradientColors?: [string, string] | null;
  textColor?: string;
  gridColor?: string;

  // Points & bars
  pointRadius?: number;
  pointHoverRadius?: number;
  borderRadius?: number;

  // Grid
  showGrid?: boolean;
  gridStyle?: "l-shape" | "horizontal" | "vertical" | "none";

  // Animation
  animationDuration?: number;
  animationEasing?: string;

  // Line tension (for line charts)
  tension?: number;

  // Extra dataset options
  datasetOptions?: Record<string, string>;
};

export default function GlobalGraph({
  type = "line",
  labels,
  data,
  title = "",
  height = 400,
  backgroundColor = "transparent",
  lineColor = "#3b82f6",
  gradientColors = null,
  textColor,
  gridColor,
  pointRadius = 6,
  pointHoverRadius = 8,
  borderRadius = 8,
  showGrid = true,
  gridStyle = "vertical",
  animationDuration = 1000,
  animationEasing = "easeOutQuart",
  tension = 0.4,
  datasetOptions = {},
}: GlobalGraphProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const text = textColor || (isDark ? "#f9fafb" : "#111827");
  const grid = gridColor || (isDark ? "#555" : "#ddd");

  const chartKey = `${theme}-${title}-${type}`;

  const chartData = useMemo(() => {
    let background: string | ((ctx: ScriptableContext<"line">) => CanvasGradient) = "transparent";

    if (type === "line" && gradientColors) {
      background = (ctx: ScriptableContext<"line">) => {
        const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, ctx.chart.height);
        g.addColorStop(0, gradientColors[0]);
        g.addColorStop(1, gradientColors[1]);
        return g;
      };
    } else if (type !== "line" && gradientColors) {
      background = gradientColors[0];
    }

    return {
      labels,
      datasets: [
        {
          label: title,
          data,
          borderColor: lineColor,
          backgroundColor: background,
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
    lineColor,
    gradientColors,
    pointRadius,
    pointHoverRadius,
    tension,
    borderRadius,
    datasetOptions,
    type,
  ]);

  const options = useMemo(() => {
    const xGrid = {
      display: showGrid && (gridStyle === "l-shape" || gridStyle === "horizontal"),
      color: grid,
    };
    const yGrid = {
      display: showGrid && (gridStyle === "l-shape" || gridStyle === "vertical"),
      color: grid,
    };

    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: text,
          },
        },
        title: {
          display: !!title,
          text: title,
          color: text,
          font: {
            size: 18,
          },
        },
        tooltip: {
          titleColor: text,
          bodyColor: text,
          backgroundColor: isDark ? "#222" : "#fff",
        },
      },
      scales:
        type === "line" || type === "bar"
          ? {
              x: {
                grid: xGrid,
                ticks: {
                  color: text,
                },
              },
              y: {
                grid: yGrid,
                ticks: {
                  color: text,
                },
              },
            }
          : undefined,
      animation: {
        duration: animationDuration,
        easing: animationEasing,
      },
    };
  }, [text, title, showGrid, gridStyle, grid, isDark, animationDuration, animationEasing, type]);

  return (
    <div
      style={{
        backgroundColor,
        padding: 20,
        borderRadius: 12,
        boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
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
  );
}
