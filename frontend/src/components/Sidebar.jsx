import { FileText, Moon, Sun } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

export default function Sidebar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-900 border-r">
      <div className="p-6 font-bold text-xl">📁 Arsip</div>

      <nav className="flex-1 px-4 space-y-2">
        <button className="flex items-center gap-2 w-full p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
          <FileText size={18} /> Dokumen
        </button>
      </nav>

      <div className="p-4">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 text-sm"
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          Toggle Theme
        </button>
      </div>
    </aside>
  );
}
