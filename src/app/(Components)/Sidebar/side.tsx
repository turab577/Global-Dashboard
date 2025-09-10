"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChartLine, FileAxis3DIcon, KeyRound, Loader, LogIn, Power, Search, ToggleRight } from "lucide-react";
import { useTheme } from "next-themes";
import Button from "@/app/ui-components/buttons";


import {
  // LayoutDashboard,
  Table,
  // Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// const dark = useTheme() === "dark"

const components = [
  { id: 1, label: "Graphs", icon: ChartLine, link: "/Graphs" },
  { id: 2, label: "Tables", icon: Table, link: "/Tables" },
  { id: 3, label: "Loaders", icon: Loader, link: "/Loaders" },
  { id: 4, label: "Buttons", icon: Power, link: "/Buttons" },
  { id: 5, label: "Toggles", icon: ToggleRight, link: "/Toggle" },
  { id: 6, label: "Modals", icon: FileAxis3DIcon, link: "/Modals" },
  { id: 7, label: "Login", icon: KeyRound, link: "/Login" },
  { id: 8, label: "Signup", icon: LogIn, link: "/Register" },
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
    const checkScreen = () => {
      const desktop = window.innerWidth >= 640;
      setIsDesktop(desktop);
      
      // On mobile, we don't want the sidebar to be in "collapsed" state
      // It should either be fully open or fully closed
      if (!desktop && expanded) {
        setExpanded(true); // Keep it expanded on mobile when open
      }
    };
    
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, [expanded]);

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

  // Handle toggle function differently for mobile vs desktop
  const handleToggle = () => {
    if (isDesktop) {
      setExpanded(!expanded);
    } else {
      // On mobile, we don't collapse - we just close the sidebar
      setIsMobileOpen(false);
    }
  };

  return (
    <div className="sm:flex">
      {/* Sidebar (fixed) - Desktop only */}
      <motion.div
        animate={{ width: expanded ? 250 : 70 }}
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
          isDesktop={isDesktop}
          onToggle={handleToggle}
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
            className="fixed top-0 left-0 h-full w-64 z-50 flex flex-col shadow-xl sm:hidden"
            style={{
              backgroundColor: "var(--bg-color)",
              color: "var(--text-color)",
              borderRight: "1px solid var(--border-color)",
            }}
          >
            <SidebarContent
              expanded={true} // Always expanded on mobile
              setExpanded={setExpanded}
              setIsMobileOpen={setIsMobileOpen}
              isDesktop={isDesktop}
              onToggle={handleToggle}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content wrapper */}
      <motion.main
        animate={{ 
          marginLeft: isDesktop ? (expanded ? 250 : 80) : 0 
        }}
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
  isDesktop,
  onToggle,
}: {
  expanded: boolean;
  setExpanded: (val: boolean) => void;
  setIsMobileOpen: (val: boolean) => void;
  isDesktop: boolean;
  onToggle: () => void;
}) {
  const pathname = usePathname();

    const [isModalOpen , setIsModalOpen] = useState(false);
      const { resolvedTheme } = useTheme();



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
        {isDesktop ? (
          <button
            onClick={onToggle}
            className="p-2 rounded-full transition cursor-pointer"
            style={{ backgroundColor: "var(--button-bg)" }}
          >
            {expanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        ) : (
          <button
            onClick={onToggle}
            className="p-2 rounded-full transition cursor-pointer"
            style={{ backgroundColor: "var(--button-bg)" }}
          >
            <ChevronLeft size={20} />
          </button>
        )}
      </div>

      {/* Menu */}
      <nav className="flex-1 flex flex-col gap-2 p-3">
        {components.map((item) => {
          const isActive = pathname === item.link;
          return (
            <Link
              key={item.id}
              href={item.link}
              onClick={() => setIsMobileOpen(false)}
              className={`hover:border-1 hover:border-blue-500 hover:rounded-2xl ${isActive ? "border-1 border-blue-500 rounded-2xl" : ""}`}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`flex items-center gap-3 p-3 !bg-transparent rounded-xl cursor-pointer transition ${
                  isActive
                    ? "bg-[var(--primary-bg)] text-[var(--primary-text)]"
                    : "hover:bg-[var(--hover-bg)] hover:text-[var(--hover-text)]"
                }`}
              >
                <div style={{ color: "var(--icon-color)" }}>
                  <item.icon size={20} className="!bg-transparent"/>
                </div>
                <AnimatePresence>
                  {expanded && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="font-medium !bg-transparent"
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

           {isModalOpen && (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[99999] flex items-center justify-center"
      style={{
        backgroundColor:
          resolvedTheme === "dark"
            ? "rgba(0,0,0,0.6)"
            : "rgba(0,0,0,0.4)", // always darker for overlay
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="w-[400px] rounded-xl shadow-xl p-6 text-center"
        style={{
          // backgroundColor: resolvedTheme === "dark" ? "#ffffff" : "#111111",
          color: resolvedTheme === "dark" ? "#111111" : "#ffffff",
          border: `1px solid ${resolvedTheme === "dark" ? "#ddd" : "#333"}`,
        }}
      >
        <h2 className="text-xl font-semibold mb-4">Confirm Logout</h2>
        <p className="mb-6">
          Are you sure you want to log out of your account?
        </p>

        <div className="flex justify-center gap-4">
          <Button variant="primary" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>

          <Button
            variant="filled"
            
          >
            Logout
          </Button>
        </div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
)}




      {/* Footer */}
      <div
        className="p-4"
        style={{ borderTop: "1px solid var(--border-color)" }}
      >
        <Button
          className="w-full flex cursor-pointer items-center justify-center gap-2 px-4 py-2 rounded-xl transition"
          variant="bordered"
          onClick={() => setIsModalOpen(true)}
        >
          <LogOut size={18} />
          <motion.span className={`font-medium ${ expanded ? "block" : "hidden" }`}>Log out</motion.span>
        </Button>
      </div>
    </>
  );
}