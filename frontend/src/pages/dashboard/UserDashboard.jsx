import { useEffect, useState } from "react";
import {
  FileText,
  Plus,
  Trash2,
  Pencil,
  Eye,
  Download,
  X,
  LogOut,
  Calendar,
  Search,
  RefreshCw,
  Moon,
  Sun,
  Globe,
  Filter,
  Grid,
  List
} from "lucide-react";
import api from "../../services/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { clearAuth } from "../../utils/auth";
import AddDocumentModal from "../../components/AddDocumentModal";

const DICT = {
  id: {
    myDocuments: "Dokumen Saya",
    subtitle: "Kelola dokumen pribadi Anda",
    upload: "Upload",
    logout: "Logout",
    searchPlaceholder: "Cari dokumen...",
    refresh: "Refresh",
    noDocuments: "Belum ada dokumen",
    loading: "Loading...",
    view: "Lihat File",
    download: "Download",
    edit: "Edit",
    delete: "Hapus",
    close: "Tutup",
    deleteConfirm: "Hapus dokumen ini?",
    editPrompt: "Judul baru:",
    gridView: "Grid",
    listView: "List",
    allCategories: "Semua Kategori",
    theme: "Tema",
    language: "Bahasa"
  },
  en: {
    myDocuments: "My Documents",
    subtitle: "Manage your personal documents",
    upload: "Upload",
    logout: "Logout",
    searchPlaceholder: "Search documents...",
    refresh: "Refresh",
    noDocuments: "No documents yet",
    loading: "Loading...",
    view: "View File",
    download: "Download",
    edit: "Edit",
    delete: "Delete",
    close: "Close",
    deleteConfirm: "Delete this document?",
    editPrompt: "New title:",
    gridView: "Grid",
    listView: "List",
    allCategories: "All Categories",
    theme: "Theme",
    language: "Language"
  }
};

export default function UserDashboard() {
  const [documents, setDocuments] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [viewFile, setViewFile] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState("id");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  const t = DICT[language];

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const res = await api.get("/documents/my");
      setDocuments(res.data);
    } catch {
      toast.error("Gagal mengambil dokumen");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleLogout = async () => {
    try {
      await api.post("/logout");
      toast.success("Logout berhasil 👋");
    } catch (e) {
      console.warn("Token sudah tidak valid");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm(t.deleteConfirm)) return;

    try {
      await api.delete(`/documents/${id}`);
      toast.success("Dokumen dihapus");
      setDocuments((prev) => prev.filter((d) => d.id !== id));
    } catch (error) {
      toast.error("Gagal menghapus dokumen");
    }
  };

  const handleEdit = async (doc) => {
    const title = prompt(t.editPrompt, doc.title);
    if (!title) return;

    try {
      await api.put(`/documents/${doc.id}`, {
        title,
        category: doc.category,
      });

      toast.success("Dokumen diperbarui");
      fetchDocuments();
    } catch {
      toast.error("Gagal update dokumen");
    }
  };

  const handleView = (doc) => {
    setViewFile(doc);
  };

  const handleDownload = (doc) => {
    const fileUrl = `http://localhost:8000/storage/${doc.file_path}`;
    window.open(fileUrl, '_blank');
    toast.success("File sedang diunduh");
  };

  const filteredDocuments = documents.filter((doc) => {
    const matchSearch =
      doc.title.toLowerCase().includes(search.toLowerCase()) ||
      doc.category.toLowerCase().includes(search.toLowerCase());

    const matchCategory =
      categoryFilter === "all" || doc.category === categoryFilter;

    return matchSearch && matchCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="px-4 sm:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                📁 {t.myDocuments}
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {t.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* Language Toggle */}
              <button
                onClick={() => setLanguage(language === "id" ? "en" : "id")}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                title={t.language}
              >
                <Globe size={18} />
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                title={t.theme}
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* Upload Button */}
              <button
                onClick={() => setOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 shadow-lg shadow-blue-500/25 transition-all"
              >
                <Plus size={18} />
                <span className="hidden sm:inline text-sm font-medium">{t.upload}</span>
              </button>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-xl hover:from-red-600 hover:to-rose-600 shadow-lg shadow-red-500/25 transition-all"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline text-sm font-medium">{t.logout}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="p-4 sm:p-8">
        <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 rounded-3xl overflow-hidden">
          {/* Toolbar */}
          <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                {/* Category Filter */}
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="all">{t.allCategories}</option>
                  <option value="Akademik">Akademik</option>
                  <option value="Keuangan">Keuangan</option>
                  <option value="Administrasi">Administrasi</option>
                </select>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-700/50 rounded-xl">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === "grid"
                        ? "bg-white dark:bg-slate-600 text-blue-600 dark:text-blue-400 shadow-sm"
                        : "text-slate-600 dark:text-slate-400"
                    }`}
                    title={t.gridView}
                  >
                    <Grid size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === "list"
                        ? "bg-white dark:bg-slate-600 text-blue-600 dark:text-blue-400 shadow-sm"
                        : "text-slate-600 dark:text-slate-400"
                    }`}
                    title={t.listView}
                  >
                    <List size={18} />
                  </button>
                </div>

                {/* Refresh */}
                <button
                  onClick={fetchDocuments}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 shadow-lg shadow-blue-500/25 transition-all"
                >
                  <RefreshCw size={16} />
                  <span className="hidden sm:inline text-sm font-medium">{t.refresh}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Documents Display */}
          <div className="p-6">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-slate-500 dark:text-slate-400">{t.loading}</p>
              </div>
            ) : filteredDocuments.length === 0 ? (
              <div className="text-center py-12">
                <FileText size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
                <p className="text-slate-500 dark:text-slate-400">{t.noDocuments}</p>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="group bg-white dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-5 hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-500/50 transition-all duration-300"
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                        <FileText size={24} className="text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100 truncate mb-1">
                          {doc.title}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {(doc.file_size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 rounded-lg">
                        {doc.category}
                      </span>
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                        <Calendar size={14} />
                        <span className="text-xs">
                          {new Date(doc.document_date).toLocaleDateString('id-ID')}
                        </span>
                      </div>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="grid grid-cols-4 gap-1 pt-4 border-t border-slate-100 dark:border-slate-700/50">
                      <button
                        onClick={() => handleView(doc)}
                        className="p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                        title={t.view}
                      >
                        <Eye size={16} className="mx-auto" />
                      </button>

                      <button
                        onClick={() => handleDownload(doc)}
                        className="p-2 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
                        title={t.download}
                      >
                        <Download size={16} className="mx-auto" />
                      </button>

                      <button
                        onClick={() => handleEdit(doc)}
                        className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                        title={t.edit}
                      >
                        <Pencil size={16} className="mx-auto" />
                      </button>

                      <button
                        onClick={() => handleDelete(doc.id)}
                        className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title={t.delete}
                      >
                        <Trash2 size={16} className="mx-auto" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // List View
              <div className="space-y-2">
                {filteredDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50 rounded-xl hover:shadow-lg hover:border-blue-500/50 transition-all"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center flex-shrink-0">
                      <FileText size={20} className="text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-900 dark:text-slate-100 truncate">
                        {doc.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {doc.category}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {(doc.file_size / 1024 / 1024).toFixed(2)} MB
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {new Date(doc.document_date).toLocaleDateString('id-ID')}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleView(doc)}
                        className="p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                        title={t.view}
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() => handleDownload(doc)}
                        className="p-2 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
                        title={t.download}
                      >
                        <Download size={18} />
                      </button>

                      <button
                        onClick={() => handleEdit(doc)}
                        className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                        title={t.edit}
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(doc.id)}
                        className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title={t.delete}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* MODAL PREVIEW FILE */}
      {viewFile && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setViewFile(null)}
        >
          <div
            className="bg-white dark:bg-slate-800 rounded-3xl w-full max-w-6xl h-[90vh] flex flex-col shadow-2xl border border-slate-200/50 dark:border-slate-700/50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-200/50 dark:border-slate-700/50">
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                  {viewFile.title}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {viewFile.category}
                </p>
              </div>
              <button
                onClick={() => setViewFile(null)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-hidden p-4">
              <iframe
                src={`http://localhost:8000/storage/${viewFile.file_path}`}
                className="w-full h-full rounded-2xl border border-slate-200 dark:border-slate-700"
                title={viewFile.title}
              />
            </div>

            <div className="p-6 border-t border-slate-200/50 dark:border-slate-700/50 flex justify-end gap-3">
              <button
                onClick={() => handleDownload(viewFile)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 shadow-lg shadow-blue-500/25 transition-all font-medium"
              >
                <Download size={18} />
                {t.download}
              </button>
              <button
                onClick={() => setViewFile(null)}
                className="px-6 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors font-medium"
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AddDocumentModal - mock component */}
      {open && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Upload Document</h3>
            <p className="text-sm text-slate-500 mb-4">Modal placeholder</p>
            <button
              onClick={() => setOpen(false)}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
            <AddDocumentModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={fetchDocuments}
      />
    </div>
  );
}