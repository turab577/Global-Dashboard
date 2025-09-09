"use client";

import React from "react";

export type TableControl = {
  hover?: boolean;
  striped?: boolean;
  bordered?: boolean;
  shadow?: boolean;
  borderStyle?: "solid" | "double" | "dashed" | "dotted";
  borderRadius?: number;
  fontSize?: number;
  textAlign?: "left" | "center" | "right";
  // Custom colors
  headerBgColor?: string;
  headerTextColor?: string;
  rowBgColor?: string;
  rowTextColor?: string;
  zebraColor?: string;
  hoverBgColor?: string;
  hoverTextColor?: string;
  borderColor?: string;
  // Custom nth-child colors
  nthChildColors?: string[];
};

interface TableProps<T> {
  title?: string;
  data: T[];
  control?: TableControl;
}

export function Table<T extends Record<string, any>>({
  title,
  data,
  control = {},
}: TableProps<T>) {
  const keys = data[0] ? Object.keys(data[0]) : [];
  
  // Default light grey nth-child colors if not provided
  const defaultNthColors = ["#fafafa", "#f5f5f5", "#eeeeee", "#e0e0e0"];
  const nthColors = control.nthChildColors || defaultNthColors;

  return (
    <div style={{ marginBottom: 40 }}>
      {title && <h2 style={{ marginBottom: 10 }}>{title}</h2>}
      <table
        className="theme-table"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: control.fontSize || 14,
          textAlign: control.textAlign || "left",
          border: control.bordered
            ? `2px ${control.borderStyle || "solid"} ${control.borderColor || "#e0e0e0"}`
            : undefined,
          boxShadow: control.shadow ? "0 4px 6px rgba(0,0,0,0.1)" : undefined,
          borderRadius: control.borderRadius ? `${control.borderRadius}px` : "0",
          overflow: "hidden",
        }}
      >
        {/* Table Head */}
        <thead>
          <tr>
            {keys.map((key) => (
              <th
                key={key}
                style={{
                  padding: "12px 16px",
                  backgroundColor: control.headerBgColor || "#f5f5f5",
                  color: control.headerTextColor || "#424242",
                  borderBottom: control.bordered 
                    ? `2px solid ${control.borderColor || "#e0e0e0"}` 
                    : undefined,
                  fontWeight: 600,
                }}
              >
                {key.toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data.map((row, idx) => {
            // Get the nth color based on index
            const nthColor = nthColors[idx % nthColors.length];
            const isStriped = control.striped && idx % 2 === 1;
            
            // Determine background color
            let bgColor = control.rowBgColor || "#ffffff";
            if (control.striped && control.nthChildColors) {
              bgColor = nthColor;
            } else if (isStriped) {
              bgColor = control.zebraColor || "#fafafa";
            }

            return (
              <tr
                key={idx}
                className={`theme-row ${isStriped ? "striped" : ""}`}
                style={{
                  backgroundColor: bgColor,
                  color: control.rowTextColor || "#424242",
                  cursor: control.hover ? "pointer" : "default",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (control.hover) {
                    e.currentTarget.style.backgroundColor = 
                      control.hoverBgColor || "#f5f5f5";
                    e.currentTarget.style.color = 
                      control.hoverTextColor || "#424242";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = bgColor;
                  e.currentTarget.style.color = 
                    control.rowTextColor || "#424242";
                }}
              >
                {keys.map((key) => (
                  <td
                    key={key}
                    style={{
                      padding: "12px 16px",
                      borderBottom: control.bordered 
                        ? `1px solid ${control.borderColor || "#e0e0e0"}` 
                        : undefined,
                    }}
                  >
                    {typeof row[key] === 'object' ? JSON.stringify(row[key]) : row[key]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}