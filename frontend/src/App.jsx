import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
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
  Filter,
  ChevronRight,
  Moon,
  Sun,
  Globe,
  TrendingUp,
  PieChart,
  BarChart3,
  Home,
  Users,
  FileArchive,
  CreditCard,
  LogOut,
  HelpCircle,
  CheckCircle,
  Clock,
  AlertCircle,
  MoreVertical,
  Grid,
  List,
  Plus,
  ChevronDown,
  ExternalLink,
  RefreshCw,
  Shield,
  Database,
  Cloud,
  Zap,
  Star,
  Target
} from "lucide-react";

/* =========================
   DICTIONARY MULTI-LANGUAGE
========================= */
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

/* =========================
   MAIN APP COMPONENT
========================= */
export default function App() {
  const [documents, setDocuments] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState("id");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  const t = DICT[language];

  // Sample data for demo
  const sampleDocuments = [
    { id: 1, title: "Laporan Keuangan Q1 2024", category: "Finance", date: "2024-03-15", size: "2.4 MB", status: "approved", color: "bg-gradient-to-r from-green-500 to-emerald-600" },
    { id: 2, title: "Kontrak Kerja Karyawan", category: "HR", date: "2024-03-10", size: "1.8 MB", status: "pending", color: "bg-gradient-to-r from-yellow-500 to-amber-600" },
    { id: 3, title: "Proposal Project XYZ", category: "Project", date: "2024-03-05", size: "3.2 MB", status: "approved", color: "bg-gradient-to-r from-blue-500 to-cyan-600" },
    { id: 4, title: "Invoice Vendor ABC", category: "Finance", date: "2024-03-01", size: "1.2 MB", status: "archived", color: "bg-gradient-to-r from-purple-500 to-pink-600" },
    { id: 5, title: "Manual SOP Operasional", category: "Documentation", date: "2024-02-28", size: "4.5 MB", status: "approved", color: "bg-gradient-to-r from-indigo-500 to-blue-600" },
  ];

  const statsData = [
    { label: t.totalDocuments, value: "1,248", change: "+12.5%", icon: <FileText size={20} />, color: "from-blue-500 to-cyan-500" },
    { label: t.storageUsed, value: "4.2/10 GB", change: "42% used", icon: <Database size={20} />, color: "from-green-500 to-emerald-500" },
    { label: t.activeUsers, value: "28", change: "+3 this week", icon: <Users size={20} />, color: "from-purple-500 to-pink-500" },
    { label: t.monthlyGrowth, value: "18.2%", change: "+2.4%", icon: <TrendingUp size={20} />, color: "from-orange-500 to-red-500" },
  ];

  const recentActivity = [
    { user: "John Doe", action: "uploaded", document: "Laporan Keuangan.pdf", time: "10 minutes ago", icon: <Upload size={16} /> },
    { user: "Jane Smith", action: "edited", document: "Kontrak Kerja.docx", time: "1 hour ago", icon: <Edit size={16} /> },
    { user: "Admin", action: "approved", document: "Proposal Project XYZ", time: "3 hours ago", icon: <CheckCircle size={16} /> },
    { user: "Bob Wilson", action: "archived", document: "Manual SOP.pdf", time: "1 day ago", icon: <FileArchive size={16} /> },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDocuments(sampleDocuments);
      setIsLoading(false);
    }, 1000);

    // Apply dark mode class
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setOpenModal(false);
    // Show success toast here
  };

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
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Background Gradient Animation */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 transform ${darkMode ? 'bg-gray-900/90' : 'bg-white/90'} backdrop-blur-lg border-r ${darkMode ? 'border-gray-800' : 'border-gray-200'} md:translate-x-0 transition-transform duration-300`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
                <FileText size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {t.title}
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">{t.subtitle}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {[
              { id: "dashboard", label: t.dashboard, icon: <Home size={20} /> },
              { id: "documents", label: t.documents, icon: <Folder size={20} /> },
              { id: "upload", label: t.upload, icon: <Upload size={20} /> },
              { id: "finance", label: t.finance, icon: <CreditCard size={20} /> },
              { id: "reports", label: t.reports, icon: <BarChart3 size={20} /> },
              { id: "settings", label: t.settings, icon: <Settings size={20} /> },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
                <ChevronRight size={16} className={`ml-auto transition-transform ${activeTab === item.id ? 'rotate-90' : 'opacity-0 group-hover:opacity-100'}`} />
              </button>
            ))}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User size={20} className="text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">Admin User</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">admin@arsipku.com</p>
              </div>
              <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className={`md:ml-64 transition-all duration-300 ${sidebarOpen ? 'ml-64' : ''}`}>
        {/* Header */}
        <header className={`sticky top-0 z-40 ${darkMode ? 'bg-gray-900/80' : 'bg-white/80'} backdrop-blur-lg border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Left: Mobile Menu & Search */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden"
                >
                  {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Search Bar */}
                <div className="relative flex-1 max-w-xl">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder={t.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Right: Controls */}
              <div className="flex items-center space-x-3">
                {/* View Toggle */}
                <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded ${viewMode === "grid" ? 'bg-white dark:bg-gray-700 shadow' : ''}`}
                  >
                    <Grid size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded ${viewMode === "list" ? 'bg-white dark:bg-gray-700 shadow' : ''}`}
                  >
                    <List size={18} />
                  </button>
                </div>

                {/* Language Selector */}
                <div className="relative group">
                  <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                    <Globe size={20} />
                    <span className="font-medium hidden sm:inline">{language.toUpperCase()}</span>
                    <ChevronDown size={16} />
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <button
                      onClick={() => setLanguage("id")}
                      className={`w-full px-4 py-3 text-left flex items-center justify-between ${language === "id" ? 'bg-blue-50 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                    >
                      <span>🇮🇩 Indonesia</span>
                      {language === "id" && <CheckCircle size={16} className="text-blue-500" />}
                    </button>
                    <button
                      onClick={() => setLanguage("en")}
                      className={`w-full px-4 py-3 text-left flex items-center justify-between ${language === "en" ? 'bg-blue-50 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                    >
                      <span>🇺🇸 English</span>
                      {language === "en" && <CheckCircle size={16} className="text-blue-500" />}
                    </button>
                  </div>
                </div>

                {/* Theme Toggle */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 relative"
                  title={darkMode ? t.lightMode : t.darkMode}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={darkMode ? 'dark' : 'light'}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                    >
                      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </motion.div>
                  </AnimatePresence>
                </button>

                {/* Notifications */}
                <button className="relative p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                </button>

                {/* Add Document Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setOpenModal(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2.5 rounded-xl font-medium hover:shadow-lg transition-shadow flex items-center space-x-2"
                >
                  <Plus size={20} />
                  <span className="hidden sm:inline">{t.addDocument}</span>
                </motion.button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-4 sm:p-6">
          {/* Welcome Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-6 text-white mb-6 shadow-xl"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">{t.welcome}, Admin! 👋</h2>
                <p className="opacity-90">
                  {language === "id" 
                    ? "Kelola arsip dokumen dan keuangan perusahaan dengan mudah" 
                    : "Manage company documents and finances easily"}
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <Shield size={20} />
                  <span className="font-medium">99.9% Uptime</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <Zap size={20} />
                  <span className="font-medium">Fast & Secure</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {statsData.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-100'} hover:shadow-xl transition-shadow`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                    {stat.icon}
                  </div>
                </div>
                <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                  <TrendingUp size={16} className="mr-1" />
                  <span>{stat.change}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Documents Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Documents Table */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold">{t.documents}</h3>
                      <p className="text-gray-600 dark:text-gray-400">Dokumen yang baru diupload</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700">
                        <Filter size={18} />
                        <span>{language === "id" ? "Filter" : "Filter"}</span>
                      </button>
                      <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
                        <RefreshCw size={18} />
                        <span>{language === "id" ? "Refresh" : "Refresh"}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Documents Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left p-4 font-medium text-gray-600 dark:text-gray-400">{t.documentName}</th>
                        <th className="text-left p-4 font-medium text-gray-600 dark:text-gray-400">{t.category}</th>
                        <th className="text-left p-4 font-medium text-gray-600 dark:text-gray-400">{t.date}</th>
                        <th className="text-left p-4 font-medium text-gray-600 dark:text-gray-400">{t.status}</th>
                        <th className="text-left p-4 font-medium text-gray-600 dark:text-gray-400">{t.actions}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {isLoading ? (
                        // Loading skeletons
                        Array.from({ length: 3 }).map((_, index) => (
                          <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                            <td className="p-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                                <div className="space-y-2">
                                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
                                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse"></div>
                                </div>
                              </div>
                            </td>
                            {[...Array(4)].map((_, i) => (
                              <td key={i} className="p-4">
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
                              </td>
                            ))}
                          </tr>
                        ))
                      ) : documents.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="p-8 text-center">
                            <div className="flex flex-col items-center justify-center text-gray-500">
                              <FileText size={48} className="mb-4 opacity-50" />
                              <p className="text-lg">{t.noDocuments}</p>
                              <button
                                onClick={() => setOpenModal(true)}
                                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                              >
                                {t.addDocument}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        documents.map((doc) => (
                          <motion.tr
                            key={doc.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                          >
                            <td className="p-4">
                              <div className="flex items-center space-x-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${doc.color}`}>
                                  <FileText size={20} className="text-white" />
                                </div>
                                <div>
                                  <p className="font-medium">{doc.title}</p>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">{doc.size}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">
                                {doc.category}
                              </span>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center space-x-2">
                                <Calendar size={16} className="text-gray-400" />
                                <span>{doc.date}</span>
                              </div>
                            </td>
                            <td className="p-4">
                              {getStatusBadge(doc.status)}
                            </td>
                            <td className="p-4">
                              <div className="flex items-center space-x-2">
                                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors" title={t.preview}>
                                  <Eye size={18} />
                                </button>
                                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors" title={t.download}>
                                  <Download size={18} />
                                </button>
                                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors" title={t.edit}>
                                  <Edit size={18} />
                                </button>
                                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-red-600" title={t.delete}>
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </td>
                          </motion.tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">{t.recentActivity}</h3>
                <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center">
                  {t.viewAll}
                  <ChevronRight size={16} />
                </button>
              </div>
              
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-750 rounded-xl transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {activity.user.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium truncate">{activity.user}</p>
                        <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">{activity.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        {activity.action} <span className="text-blue-600 dark:text-blue-400 font-medium">{activity.document}</span>
                      </p>
                    </div>
                    <div className="text-gray-400">
                      {activity.icon}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {openModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setOpenModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-gray-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold">{t.addDocument}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">{t.uploadFile}</p>
                    </div>
                    <button
                      onClick={() => setOpenModal(false)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    >
                      <X size={24} />
                    </button>
                  </div>
                </div>

                {/* Modal Body */}
                <form onSubmit={handleUpload} className="p-6">
                  <div className="space-y-4">
                    {/* File Drop Zone */}
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-blue-500 transition-colors">
                      <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                      <p className="font-medium mb-2">Drop files here or click to upload</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">PDF, DOC, XLS up to 10MB</p>
                      <input
                        type="file"
                        name="file"
                        className="hidden"
                        id="file-upload"
                        required
                      />
                      <label
                        htmlFor="file-upload"
                        className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
                      >
                        Browse Files
                      </label>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">{t.documentName}</label>
                        <input
                          name="title"
                          placeholder="Enter document name"
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">{t.category}</label>
                        <select
                          name="category"
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        >
                          <option value="">Select category</option>
                          <option value="Finance">Finance</option>
                          <option value="HR">HR</option>
                          <option value="Project">Project</option>
                          <option value="Documentation">Documentation</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Description (Optional)</label>
                        <textarea
                          name="description"
                          placeholder="Enter document description"
                          rows="3"
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Modal Footer */}
                  <div className="flex justify-end space-x-3 mt-8">
                    <button
                      type="button"
                      onClick={() => setOpenModal(false)}
                      className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      {t.cancel}
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-shadow font-medium"
                    >
                      {t.save}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}