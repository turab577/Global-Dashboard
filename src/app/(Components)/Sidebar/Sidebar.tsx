

"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import {
  LayoutDashboard,
  BarChart2,
  Table,
  Settings,
  SquarePlus,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // 👈 for active route

const components = [
  { id: 0, label: "Overview", icon: LayoutDashboard, link: "/Overview" },
  { id: 1, label: "Graphs", icon: BarChart2, link: "/Graphs" },
  { id: 2, label: "Tables", icon: Table, link: "/Tables" },
  { id: 3, label: "Buttons", icon: SquarePlus, link: "/Buttons" },
  { id: 4, label: "Settings", icon: Settings, link: "/Settings" },
];

export default function SidebarLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [expanded, setExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsDesktop(window.innerWidth >= 640);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Close mobile sidebar when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        isMobileOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setIsMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileOpen]);

  return (
    <div className="sm:flex">
      {/* Sidebar (fixed) */}
      <motion.div
        animate={{ width: expanded ? 250 : 80 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 80 }}
        className="fixed top-0 left-0 h-screen z-40 flex-col shadow-xl hidden sm:flex"
        style={{
          backgroundColor: "var(--bg-color)",
          color: "var(--text-color)",
          borderRight: "1px solid var(--border-color)",
        }}
      >
        <SidebarContent
          expanded={expanded}
          setExpanded={setExpanded}
          setIsMobileOpen={setIsMobileOpen}
        />
      </motion.div>

      {/* Mobile Burger Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="sm:hidden fixed top-3 left-4 z-50 p-2 rounded-lg shadow-md"
        style={{ color: "var(--text-color)" }}
      >
        <Menu size={22} />
      </button>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 80 }}
            ref={sidebarRef}
            className={`fixed top-0 left-0 h-full ${
              expanded ? "w-64" : "w-20"
            } z-50 flex flex-col shadow-xl sm:hidden`}
            style={{
              backgroundColor: "var(--bg-color)",
              color: "var(--text-color)",
              borderRight: "1px solid var(--border-color)",
            }}
          >
            <SidebarContent
              expanded={expanded}
              setExpanded={setExpanded}
              setIsMobileOpen={setIsMobileOpen}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content wrapper */}
      <motion.main
        animate={{ marginLeft: isDesktop ? (expanded ? 250 : 80) : 0 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 80 }}
        className="flex-1 min-h-screen"
        style={{
          backgroundColor: "var(--page-bg)",
          color: "var(--text-color)",
        }}
      >
        {children}
      </motion.main>
    </div>
  );
}

function SidebarContent({
  expanded,
  setExpanded,
  setIsMobileOpen,
}: {
  expanded: boolean;
  setExpanded: (val: boolean) => void;
  setIsMobileOpen: (val: boolean) => void;
}) {
  const pathname = usePathname(); // 👈 current route

  return (
    <>
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-4"
        style={{ borderBottom: "1px solid var(--border-color)" }}
      >
        <AnimatePresence>
          {expanded && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xl font-bold"
            >
              Dashboard
            </motion.span>
          )}
        </AnimatePresence>
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-2 rounded-full transition cursor-pointer"
          style={{ backgroundColor: "var(--button-bg)" }}
        >
          {expanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 flex flex-col gap-2 p-3">
        {components.map((item) => {
          const isActive = pathname === item.link; // 👈 check if active
          return (
            <Link
              key={item.id}
              href={item.link}
              onClick={() => setIsMobileOpen(false)}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition ${
                  isActive
                    ? "bg-[var(--primary-bg)] text-[var(--primary-text)]"
                    : "hover:bg-[var(--hover-bg)] hover:text-[var(--hover-text)]"
                }`}
              >
                <div style={{ color: "var(--icon-color)" }}>
                  <item.icon size={20} />
                </div>
                <AnimatePresence>
                  {expanded && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="font-medium"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          );
        })}

        {/* Mobile Search */}
        <div className="relative sm:hidden mt-4">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
            style={{ color: "var(--text-color)" }}
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-xl focus:outline-none focus:ring-2 transition"
            style={{
              backgroundColor: "var(--input-bg)",
              color: "var(--input-text)",
              border: "1px solid var(--border-color)",
            }}
          />
        </div>
      </nav>

      {/* Footer */}
      <div
        className="p-4"
        style={{ borderTop: "1px solid var(--border-color)" }}
      >
        <button
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl transition"
          style={{
            backgroundColor: "var(--danger-bg)",
            color: "var(--danger-text)",
          }}
          onClick={() => setIsMobileOpen(false)}
        >
          <LogOut size={18} />
          <motion.span className="font-medium">Log out</motion.span>
        </button>
      </div>
    </>
  );
}
