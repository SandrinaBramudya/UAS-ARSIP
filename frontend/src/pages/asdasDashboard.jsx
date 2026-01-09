import { useState, useEffect } from "react";
import {
  FileText,
  Upload,
  Search,
  User,
  Bell,
  Settings,
  Menu,
  X,
  Folder,
  Download,
  Eye,
  Edit,
  Trash2,
  Calendar,
  ChevronRight,
  Moon,
  Sun,
  Globe,
  TrendingUp,
  Home,
  Users,
  FileArchive,
  CreditCard,
  LogOut,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  ChevronDown,
  RefreshCw,
  Shield,
  Database,
  Zap,
  BarChart3,
  Grid,
  Filter,
  List
} from "lucide-react";
import api from "./services/api";
import Header from "./components/Header";
import AddDocumentModal from "./components/AddDocumentModal";
import { toast } from "sonner";
const DICT = {
  id: {
    // Navigation
    dashboard: "Dashboard",
    documents: "Dokumen",
    upload: "Upload",
    finance: "Keuangan",
    reports: "Laporan",
    settings: "Pengaturan",
    profile: "Profil",
    
    // Header
    title: "ArsipKu",
    subtitle: "Digital Document Management",
    searchPlaceholder: "Cari dokumen, laporan...",
    
    // Buttons
    addDocument: "Tambah Dokumen",
    uploadFile: "Upload File",
    viewAll: "Lihat Semua",
    download: "Download",
    preview: "Preview",
    edit: "Edit",
    delete: "Hapus",
    save: "Simpan",
    cancel: "Batal",
    
    // Stats
    totalDocuments: "Total Dokumen",
    storageUsed: "Storage Digunakan",
    activeUsers: "Pengguna Aktif",
    monthlyGrowth: "Pertumbuhan Bulanan",
    
    // Table
    documentName: "Nama Dokumen",
    category: "Kategori",
    date: "Tanggal",
    size: "Ukuran",
    status: "Status",
    actions: "Aksi",
    
    // Status
    approved: "Disetujui",
    pending: "Menunggu",
    rejected: "Ditolak",
    archived: "Diarsipkan",
    
    // Theme
    theme: "Tema",
    darkMode: "Mode Gelap",
    lightMode: "Mode Terang",
    
    // Language
    language: "Bahasa",
    indonesian: "Indonesia",
    english: "English",
    
    // Messages
    welcome: "Selamat Datang Kembali",
    recentActivity: "Aktivitas Terbaru",
    noDocuments: "Belum ada dokumen",
    uploadSuccess: "Upload berhasil!",
    deleteConfirm: "Yakin menghapus dokumen?",
    
    // Financial
    totalRevenue: "Total Pendapatan",
    totalExpenses: "Total Pengeluaran",
    netProfit: "Laba Bersih",
    budget: "Anggaran",
  },
  en: {
    // Navigation
    dashboard: "Dashboard",
    documents: "Documents",
    upload: "Upload",
    finance: "Finance",
    reports: "Reports",
    settings: "Settings",
    profile: "Profile",
    
    // Header
    title: "ArchivePro",
    subtitle: "Digital Document Management",
    searchPlaceholder: "Search documents, reports...",
    
    // Buttons
    addDocument: "Add Document",
    uploadFile: "Upload File",
    viewAll: "View All",
    download: "Download",
    preview: "Preview",
    edit: "Edit",
    delete: "Delete",
    save: "Save",
    cancel: "Cancel",
    
    // Stats
    totalDocuments: "Total Documents",
    storageUsed: "Storage Used",
    activeUsers: "Active Users",
    monthlyGrowth: "Monthly Growth",
    
    // Table
    documentName: "Document Name",
    category: "Category",
    date: "Date",
    size: "Size",
    status: "Status",
    actions: "Actions",
    
    // Status
    approved: "Approved",
    pending: "Pending",
    rejected: "Rejected",
    archived: "Archived",
    
    // Theme
    theme: "Theme",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    
    // Language
    language: "Language",
    indonesian: "Indonesian",
    english: "English",
    
    // Messages
    welcome: "Welcome Back",
    recentActivity: "Recent Activity",
    noDocuments: "No documents yet",
    uploadSuccess: "Upload successful!",
    deleteConfirm: "Delete this document?",
    
    // Financial
    totalRevenue: "Total Revenue",
    totalExpenses: "Total Expenses",
    netProfit: "Net Profit",
    budget: "Budget",
  }
};

export default function Dashboard() {
  const [documents, setDocuments] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState("id");
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const t = DICT[language];
  const recentActivity = [
    { user: "John Doe", action: "uploaded", document: "Laporan Keuangan.pdf", time: "10 minutes ago", icon: <Upload size={16} /> },
    { user: "Jane Smith", action: "edited", document: "Kontrak Kerja.docx", time: "1 hour ago", icon: <Edit size={16} /> },
    { user: "Admin", action: "approved", document: "Proposal Project XYZ", time: "3 hours ago", icon: <CheckCircle size={16} /> },
    { user: "Bob Wilson", action: "archived", document: "Manual SOP.pdf", time: "1 day ago", icon: <FileArchive size={16} /> },
  ];

  const fetchDocuments = async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/documents");
      setDocuments(res.data);
    } catch (error) {
      console.error("Gagal mengambil dokumen", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await api.get("/documents");
        setDocuments(res.data);
      } catch (error) {
        console.error("Failed to fetch documents", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchDocuments();
  }, []);
  
const handleUpload = async (e) => {
  e.preventDefault();

  try {
    await api.post("/documents", formData);
    toast.success("Dokumen berhasil diupload");
    setOpenModal(false);
    fetchDocuments();
  } catch (error) {
    toast.error("Upload gagal");
  }
};
const handleDelete = async (id) => {
  try {
    await api.delete(`/documents/${id}`);
    setDocuments(prev => prev.filter(d => d.id !== id));
    toast.success("Dokumen berhasil dihapus");
  } catch {
    toast.error("Gagal menghapus dokumen");
  }
};



  const filteredDocuments = documents.filter((doc) => {
    const matchSearch =
      doc.title.toLowerCase().includes(search.toLowerCase()) ||
      doc.category.toLowerCase().includes(search.toLowerCase());

    const matchCategory =
      categoryFilter === "all" || doc.category === categoryFilter;

    return matchSearch && matchCategory;
  });

  const getStatusBadge = (status) => {
    const config = {
      approved: { color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400", icon: <CheckCircle size={14} /> },
      pending: { color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400", icon: <Clock size={14} /> },
      rejected: { color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400", icon: <AlertCircle size={14} /> },
      archived: { color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400", icon: <FileArchive size={14} /> },
    };
    
    const { color, icon } = config[status] || config.pending;
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${color}`}>
        {icon}
        {t[status]}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Main Content */}
      <div>
      <Header
        title={t.title}
        subtitle={t.subtitle}
        language={language}
        setLanguage={setLanguage}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onAdd={() => setOpenModal(true)}
      />
        <main className="p-4 sm:p-8">
          {/* Documents Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Documents Table */}
            <div className="lg:col-span-2">
              <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                        {t.documents}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Dokumen yang baru diupload
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                      {/* SEARCH */}
                      <div className="relative">
                        <Search
                          size={16}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                          type="text"
                          placeholder="Cari dokumen..."
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          className="pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 outline-none w-full sm:w-56"
                        />
                      </div>

                      {/* FILTER */}
                      <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                      >
                        <option value="all">Semua</option>
                        <option value="Akademik">Akademik</option>
                        <option value="Keuangan">Keuangan</option>
                        <option value="Administrasi">Administrasi</option>
                      </select>

                      {/* REFRESH */}
                      <button
                        onClick={fetchDocuments}
                        className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 shadow-lg shadow-blue-500/25 transition-all"
                      >
                        <RefreshCw size={16} />
                        <span className="text-sm font-medium">Refresh</span>
                      </button>
                    </div>

                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    {/* ===== THEAD ===== */}
                    <thead>
                      <tr className="border-b border-slate-200/50 dark:border-slate-700/50">
                        <th className="text-left p-4 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                          {t.documentName}
                        </th>
                        <th className="text-left p-4 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                          {t.category}
                        </th>
                        <th className="text-left p-4 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                          {t.date}
                        </th>
                        <th className="text-left p-4 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                          {t.status}
                        </th>
                        <th className="text-left p-4 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                          {t.actions}
                        </th>
                      </tr>
                    </thead>

                    {/* ===== TBODY ===== */}
                    <tbody>
                      {isLoading ? (
                        <tr>
                          <td colSpan="5" className="p-8 text-center text-slate-500">
                            Loading...
                          </td>
                        </tr>
                      ) : filteredDocuments.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="p-12 text-center text-slate-500">
                            Tidak ada dokumen yang sesuai
                          </td>
                        </tr>
                      ) : (
                        filteredDocuments.map((doc) => (
                          <tr
                            key={doc.id}
                            className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors"
                          >
                            {/* Nama + Size */}
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-xl bg-blue-500 flex items-center justify-center">
                                  <FileText size={20} className="text-white" />
                                </div>
                                <div>
                                  <p className="font-semibold text-slate-900 dark:text-slate-100">
                                    {doc.title}
                                  </p>
                                  <p className="text-xs text-slate-500 dark:text-slate-400">
                                    {(doc.file_size / 1024 / 1024).toFixed(2)} MB
                                  </p>
                                </div>
                              </div>
                            </td>

                            {/* Kategori */}
                            <td className="p-4">
                              <span className="px-3 py-1.5 text-slate-900 dark:text-slate-200 bg-slate-100 dark:bg-slate-700/50 rounded-lg text-sm">
                                {doc.category}
                              </span>
                            </td>

                            {/* Tanggal */}
                            <td className="p-4">
                              <div className="flex items-center gap-2 text-slate-900 dark:text-slate-200">
                                <Calendar size={14} />
                                <span className="text-sm">
                                  {new Date(doc.document_date).toLocaleDateString("id-ID")}
                                </span>
                              </div>
                            </td>

                            {/* Status */}
                            <td className="p-4">
                              <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                Aktif
                              </span>
                            </td>

                            {/* Aksi */}
                            <td className="p-4 flex items-center gap-1">
                              <a
                                href={`http://localhost:8000/storage/${doc.file_path}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-slate-900 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-lg"
                              >
                                <Eye size={16} />
                              </a>

                              <button
                                onClick={() => handleDelete(doc.id)}
                                className="p-2 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg text-rose-500"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* Recent Activity */}
            <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                  {t.recentActivity}
                </h3>
                <button className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1 font-medium transition-colors">
                  {t.viewAll}
                  <ChevronRight size={14} />
                </button>
              </div>
              
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 hover:bg-slate-50/50 dark:hover:bg-slate-700/30 rounded-xl transition-colors cursor-pointer"
                  >
                    <div className="w-9 h-9 bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-400 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg flex-shrink-0">
                      {activity.user.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <p className="font-semibold text-slate-900 dark:text-slate-100 text-sm truncate">
                          {activity.user}
                        </p>
                        <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap ml-2">
                          {activity.time}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
                        {activity.action}{' '}
                        <span className="text-blue-500 dark:text-blue-400 font-medium">
                          {activity.document}
                        </span>
                      </p>
                    </div>
                    <div className="text-slate-400 dark:text-slate-500 flex-shrink-0">
                      {activity.icon}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
      <AddDocumentModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={fetchDocuments}
      />
    </div>
  );
}