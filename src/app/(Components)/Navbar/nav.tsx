"use client";

import { Home, Search, Sun, Moon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const path = usePathname();

  // Fix hydration mismatch
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <nav
      className="w-full  backdrop-blur-md max-h-[70px] shadow-md border-b px-6 py-3 flex items-center justify-between"
      style={{
        backgroundColor: "var(--bg-color)",
        color: "var(--text-color)",
        borderColor: "var(--border-color)",
      }}
    >
      {/* Left: Route/Home */}
      <div className="flex items-center gap-3 ml-10 sm:ml-0">
        <Home className="sm:w-7 sm:h-7" />
        <span className="sm:font-bold sm:text-lg">{path}</span>
      </div>

      {/* Middle: Search */}
      <div className="relative w-1/3 hidden sm:block">
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

      {/* Right: Dark/Light Toggle */}
      <div>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-16 h-9 flex items-center rounded-full p-1 transition duration-300 shadow-inner"
          style={{
            backgroundColor: "#d2d2d2",
            color: "var(--text-color)",
          }}
        >
          <div
            className={`w-7 h-7 flex items-center justify-center rounded-full shadow-md transform transition-transform duration-300 ${
              theme === "dark" ? "translate-x-7" : "translate-x-0"
            }`}
          >
            {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
          </div>
        </button>
      </div>
    </nav>
  );
}
