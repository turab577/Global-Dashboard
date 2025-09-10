"use client";

import React, { useState } from "react";
import { Table, TableControl } from "@/app/ui-components/table"; // ADJUST PATH AS NEEDED

// ============================================
// STEP 1: DEFINE YOUR DATA STRUCTURE - FIXED
// ============================================
interface TeamMember {
  name: string;
  age: number;
  role: string;
  status: "Active" | "Inactive";
  [key: string]: unknown; // Added index signature to fix TypeScript error
}

// ============================================
// STEP 2: CREATE YOUR DATA
// ============================================
const sampleData: TeamMember[] = [
  { name: "Alice Johnson", age: 25, role: "Senior Developer", status: "Active" },
  { name: "Bob Smith", age: 30, role: "UI/UX Designer", status: "Active" },
  { name: "Charlie Brown", age: 22, role: "Junior Intern", status: "Active" },
  { name: "Diana Prince", age: 28, role: "Project Manager", status: "Active" },
  { name: "Ethan Hunt", age: 35, role: "QA Engineer", status: "Inactive" },
  { name: "Frank Castle", age: 32, role: "DevOps Engineer", status: "Active" },
  { name: "Grace Hopper", age: 29, role: "Backend Developer", status: "Active" },
  { name: "Henry Ford", age: 40, role: "Tech Lead", status: "Active" },
];

// ============================================
// MAIN USAGE COMPONENT - ERROR FREE
// ============================================

export default function TablesUsage() {
  const [data] = useState<TeamMember[]>(sampleData);

  // Optional row click handler with proper typing
  const handleRowClick = (row: TeamMember, index: number) => {
    console.log("Table row clicked:", { row, index });
    // Add your custom logic here
  };

  return (
    <div style={{ padding: 20, maxWidth: 1200, margin: "0 auto" }}>
      
      <h1 style={{ 
        textAlign: "center", 
        marginBottom: 30, 
        fontSize: 24,
        fontWeight: 700
      }}>
        Fixed Table Component - Usage Examples
      </h1>

      {/* ==========================================
          BASIC USAGE EXAMPLES
          ========================================== */}

      {/* 1. Minimal Usage */}
      <Table 
        data={data}
        title="Basic Table (No Controls)"
        clickable={false}
        control={{}}
      />

      {/* 2. Double Border - FIXED */}
      <Table 
        data={data}
        title="Double Border - FIXED"
        clickable={false}
        control={{
          bordered: true,
          borderStyle: "double",
          borderColor: "#2196f3",
          hover: true
        }}
      />

      {/* 3. Dashed Border */}
      <Table 
        data={data}
        title="Dashed Border - WORKING"
        clickable={false}
        control={{
          bordered: true,
          borderStyle: "dashed",
          borderColor: "#ff5722",
          hover: true
        }}
      />

      {/* 4. Dotted Border */}
      <Table 
        data={data}
        title="Dotted Border - WORKING"
        clickable={false}
        control={{
          bordered: true,
          borderStyle: "dotted",
          borderColor: "#9c27b0",
          hover: true
        }}
      />

      {/* ==========================================
          ADVANCED STYLING EXAMPLES
          ========================================== */}

      {/* 5. All Borders Combined */}
      <Table 
        data={data}
        title="All Borders Combined - WORKING"
        clickable={false}
        control={{
          bordered: true,      // Outer border
          rowBorder: true,     // Lines between rows
          headerBorder: true,  // Line under header
          borderColor: "#9c27b0",
          nthChildColors: ["#fce4ec", "#f8bbd9"],
          hover: true
        }}
      />

      {/* 6. Only Row Borders */}
      <Table 
        data={data}
        title="Only Row Borders - WORKING"
        clickable={false}
        control={{
          rowBorder: true,        // Only lines between rows
          headerBorder: false,    // No header line
          bordered: false,        // No outer border
          nthChildColors: ["#fff3e0", "#ffcc80"],
          hover: true
        }}
      />

      {/* ==========================================
          CLICKABLE TABLE TESTS
          ========================================== */}

      {/* 7. Clickable Rows - Check Console */}
      <Table 
        data={data}
        title="Clickable Rows"
        clickable={true} // Enable clicking
        control={{
          bordered: true,
          hover: true,
          shadow: true,
          borderRadius: 10,
          hoverBgColor: "#fff3e0",
          hoverTextColor: "#e65100"
        }}
        onRowClick={handleRowClick}  // Enable row clicking
      />

      {/* 8. Striped Table */}
      <Table 
        data={data}
        title="Striped Table"
        clickable={false}
        control={{
          striped: true,
          zebraColor: "#f8f9fa",
          bordered: true,
          borderColor: "#dee2e6",
          hover: true
        }}
      />

      {/* 9. Compact Table */}
      <Table 
        data={data}
        title="Compact Table"
        clickable={false}
        control={{
          compact: true,
          bordered: true,
          fontSize: 12,
          headerBgColor: "#e9ecef",
          borderColor: "#ced4da"
        }}
      />

      {/* 10. Shadow Table */}
      <Table 
        data={data}
        title="Shadow Table"
        clickable={false}
        control={{
          shadow: true,
          borderRadius: 8,
          bordered: false,
          headerBgColor: "#6f42c1",
          headerTextColor: "#ffffff",
          hover: true
        }}
      />

      {/* ==========================================
          ULTIMATE TABLE - ALL FEATURES
          ========================================== */}

      {/* 11. Ultimate Table - All Features Working */}
      <Table 
        data={data}
        title="ULTIMATE TABLE - All Features Working"
        clickable={true} // Enable clicking for ultimate table
        control={{
          // Layout
          bordered: true,
          hover: true,
          shadow: true,
          borderRadius: 15,
          
          // Borders
          borderStyle: "solid",
          borderColor: "#795548",
          rowBorder: true,
          headerBorder: true,
          
          // Typography
          fontSize: 16,
          textAlign: "center",
          
          // Colors
          headerBgColor: "#5d4037",
          headerTextColor: "#ffffff",
          nthChildColors: ["#efebe9", "#d7ccc8", "#bcaaa4"],
          hoverBgColor: "#8d6e63",
          hoverTextColor: "#ffffff",
          
          // Advanced
          nthChildStart: 1,
          nthChildStep: 1,
          highlightRowOnHover: true
        }}
        onRowClick={handleRowClick}
        showModal={true}
        modalTitle="Team Member Details"
      />

      {/* 12. Right Aligned Table */}
      <Table 
        data={data}
        title="Right Aligned Table"
        clickable={false}
        control={{
          textAlign: "right",
          bordered: true,
          borderColor: "#007bff",
          headerBgColor: "#007bff",
          headerTextColor: "#ffffff",
          fontSize: 15
        }}
      />

      {/* 13. Minimal Hover Table */}
      <Table 
        data={data}
        title="Minimal Hover Table"
        clickable={false}
        control={{
          hover: true,
          hoverBgColor: "#e3f2fd",
          hoverTextColor: "#1976d2",
          fontSize: 14
        }}
      />

      {/* 14. Custom nth-child Pattern */}
      <Table 
        data={data}
        title="Custom nth-child Pattern (Every 3rd Row)"
        clickable={false}
        control={{
          nthChildColors: ["#fff9c4", "#f57f17", "#ffeb3b"],
          nthChildStart: 2,
          nthChildStep: 3,
          bordered: true,
          borderColor: "#fbc02d"
        }}
      />

    </div>
  );
}