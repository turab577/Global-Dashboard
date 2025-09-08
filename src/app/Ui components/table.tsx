"use client";

import React from "react";

export type TableControl = {
  hover?: boolean;
  striped?: boolean;
  bordered?: boolean;
  shadow?: boolean;
  borderStyle?: "solid" | "double" | "dashed";
  borderRadius?: number;
  fontSize?: number;
  textAlign?: "left" | "center" | "right";
  // Optional custom colors
  headerBgColor?: string;
  headerTextColor?: string;
  rowBgColor?: string;
  rowTextColor?: string;
  zebraColor?: string;
  hoverBgColor?: string;
  hoverTextColor?: string;
};

interface TableProps<T> {
  title?: string;
  data: T[];
  control?: TableControl;
}



export function Table<T extends Record<string, string>>({
  title,
  data,
  control = {},
}: TableProps<T>) {
  const keys = data[0] ? Object.keys(data[0]) : [];

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
            ? `2px ${control.borderStyle || "solid"} currentColor`
            : undefined,
          boxShadow: control.shadow ? "0 4px 6px rgba(0,0,0,0.1)" : undefined,
          borderRadius: control.borderRadius || 0,
          overflow: "hidden",
          color: control.rowTextColor || "inherit",
        }}
      >
        {/* Table Head */}
        <thead>
          <tr>
            {keys.map((key) => (
              <th
                key={key}
                style={{
                  padding: "10px 15px",
                  backgroundColor:
                    control.headerBgColor || "var(--table-header-bg)",
                  color: control.headerTextColor || "var(--table-header-text)",
                  borderBottom: control.bordered ? "2px solid currentColor" : undefined,
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
            const isStriped = control.striped && idx % 2 === 1;

            return (
              <tr
                key={idx}
                className={`theme-row ${isStriped ? "striped" : ""}`}
                style={{
                  backgroundColor: control.rowBgColor || "var(--table-row-bg)",
                  color: control.rowTextColor || "var(--table-row-text)",
                  cursor: control.hover ? "pointer" : "default",
                  transition: "0.2s",
                }}
                onMouseEnter={(e) => {
                  if (control.hover) {
                    (e.currentTarget as HTMLTableRowElement).style.backgroundColor =
                      control.hoverBgColor || "var(--table-row-hover-bg)";
                    (e.currentTarget as HTMLTableRowElement).style.color =
                      control.hoverTextColor || "var(--table-row-hover-text)";
                  }
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLTableRowElement).style.backgroundColor =
                    isStriped
                      ? control.zebraColor || "var(--table-row-zebra)"
                      : control.rowBgColor || "var(--table-row-bg)";
                  (e.currentTarget as HTMLTableRowElement).style.color =
                    control.rowTextColor || "var(--table-row-text)";
                }}
              >
                {keys.map((key) => (
                  <td
                    key={key}
                    style={{
                      padding: "10px 15px",
                      borderBottom: control.bordered ? "1px solid currentColor" : undefined,
                    }}
                  >
                    {row[key]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Theme variables for dark/light mode */}
      <style jsx>{`
        :root {
          --table-header-bg: #1f2937;
          --table-header-text: #fff;
          --table-row-bg: #1f2937;
          --table-row-text: #fff;
          --table-row-hover-bg: #2563eb;
          --table-row-hover-text: #fff;
          --table-row-zebra: #374151;
        }
        @media (prefers-color-scheme: light) {
          :root {
            --table-header-bg: #f3f4f6;
            --table-header-text: #111827;
            --table-row-bg: #f3f4f6;
            --table-row-text: #111827;
            --table-row-hover-bg: #dbeafe;
            --table-row-hover-text: #111827;
            --table-row-zebra: #e5e7eb;
          }
        }
      `}</style>
    </div>
  );
}
