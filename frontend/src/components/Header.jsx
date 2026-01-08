import { motion } from "framer-motion";
import {
  Sun,
  Moon,
  Plus,
  Globe
} from "lucide-react";

export default function Header({
  title,
  subtitle,
  language,
  setLanguage,
  darkMode,
  setDarkMode,
  onAdd
}) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Left */}
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {subtitle}
          </p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Language */}
          <div className="flex items-center gap-1 px-3 py-2 border text-slate-900 dark:text-slate-200 border-slate-200 dark:border-slate-600 rounded-xl">
            <Globe size={16} />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent text-sm outline-none "
            >
              <option value="id">ID</option>
              <option value="en">EN</option>
            </select>
          </div>

          {/* Theme */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-xl border text-slate-900 dark:text-slate-200 border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
            title="Toggle theme"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Upload */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAdd}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl shadow-lg shadow-blue-500/30 hover:from-blue-600 hover:to-indigo-600 transition-all"
          >
            <Plus size={18} />
            <span className="text-sm font-semibold hidden sm:inline">
              Upload
            </span>
          </motion.button>
        </div>
      </div>
    </header>
  );
}
