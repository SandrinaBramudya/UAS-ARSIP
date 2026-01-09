import { useEffect, useState } from "react";
import {
  Trash2,
  FileText,
  Users,
  FileArchive,
  UserPlus,
  LogOut,
  Eye,
  Calendar,
  RefreshCw,
  Search,
  Moon,
  Sun,
  Globe
} from "lucide-react";
import api from "../../services/api";
import { toast } from "sonner";

const DICT = {
  id: {
    adminDashboard: "Dashboard Admin",
    totalDocuments: "Total Dokumen",
    totalUsers: "Total User",
    newUsersToday: "User Baru Hari Ini",
    allDocuments: "Semua Dokumen",
    userManagement: "Manajemen User",
    title: "Judul",
    category: "Kategori",
    uploader: "Uploader",
    date: "Tanggal",
    actions: "Aksi",
    name: "Nama",
    email: "Email",
    role: "Role",
    registerDate: "Tanggal Daftar",
    logout: "Logout",
    searchPlaceholder: "Cari dokumen, user...",
    refresh: "Refresh",
    deleteConfirm: "Hapus item ini?",
    language: "Bahasa",
    theme: "Tema"
  },
  en: {
    adminDashboard: "Admin Dashboard",
    totalDocuments: "Total Documents",
    totalUsers: "Total Users",
    newUsersToday: "New Users Today",
    allDocuments: "All Documents",
    userManagement: "User Management",
    title: "Title",
    category: "Category",
    uploader: "Uploader",
    date: "Date",
    actions: "Actions",
    name: "Name",
    email: "Email",
    role: "Role",
    registerDate: "Register Date",
    logout: "Logout",
    searchPlaceholder: "Search documents, users...",
    refresh: "Refresh",
    deleteConfirm: "Delete this item?",
    language: "Language",
    theme: "Theme"
  }
};

export default function AdminDashboard() {
  const [documents, setDocuments] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState("id");
  const [searchDoc, setSearchDoc] = useState("");
  const [searchUser, setSearchUser] = useState("");
  
  const t = DICT[language];

  // ================= FETCH DATA =================
  const fetchAll = async () => {
    try {
      setLoading(true);
      const [docRes, userRes] = await Promise.all([
        api.get("/documents"),
        api.get("/users"),
      ]);

      setDocuments(docRes.data);
      setUsers(userRes.data);
    } catch {
      toast.error("Gagal mengambil data admin");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
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

  // ================= DELETE DOCUMENT =================
  const deleteDocument = async (id) => {
    if (!confirm(t.deleteConfirm)) return;

    try {
      await api.delete(`/documents/${id}`);
      setDocuments(prev => prev.filter(d => d.id !== id));
      toast.success("Dokumen dihapus");
    } catch {
      toast.error("Gagal menghapus dokumen");
    }
  };

  // ================= DELETE USER =================
  const deleteUser = async (id) => {
    if (!confirm(t.deleteConfirm)) return;

    try {
      await api.delete(`/users/${id}`);
      setUsers(prev => prev.filter(u => u.id !== id));
      toast.success("User dihapus");
    } catch {
      toast.error("Gagal menghapus user");
    }
  };

  // ================= STATISTIK =================
  const totalDocuments = documents.length;
  const totalUsers = users.length;
  const newUsers = users.filter(u => {
    const created = new Date(u.created_at);
    const today = new Date();
    return created.toDateString() === today.toDateString();
  }).length;

  const filteredDocuments = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchDoc.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchDoc.toLowerCase())
  );

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchUser.toLowerCase()) ||
    user.email.toLowerCase().includes(searchUser.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <p className="text-slate-600 dark:text-slate-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {t.adminDashboard}
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Kelola dokumen dan pengguna sistem
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

      <main className="p-4 sm:p-8 space-y-8">
        {/* ================= STAT CARDS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            icon={<FileArchive size={24} />}
            label={t.totalDocuments}
            value={totalDocuments}
            gradient="from-blue-400 to-indigo-500"
          />
          <StatCard
            icon={<Users size={24} />}
            label={t.totalUsers}
            value={totalUsers}
            gradient="from-purple-400 to-pink-500"
          />
          <StatCard
            icon={<UserPlus size={24} />}
            label={t.newUsersToday}
            value={newUsers}
            gradient="from-green-400 to-emerald-500"
          />
        </div>

        {/* ================= DOKUMEN ================= */}
        <section className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                  📁 {t.allDocuments}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Kelola semua dokumen dalam sistem
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder={t.searchPlaceholder}
                    value={searchDoc}
                    onChange={(e) => setSearchDoc(e.target.value)}
                    className="pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 outline-none w-full sm:w-56"
                  />
                </div>
                
                <button
                  onClick={fetchAll}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 shadow-lg shadow-blue-500/25 transition-all"
                >
                  <RefreshCw size={16} />
                  <span className="hidden sm:inline text-sm font-medium">{t.refresh}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200/50 dark:border-slate-700/50">
                  <th className="text-left p-4 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    {t.title}
                  </th>
                  <th className="text-left p-4 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    {t.category}
                  </th>
                  <th className="text-left p-4 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    {t.uploader}
                  </th>
                  <th className="text-left p-4 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    {t.date}
                  </th>
                  <th className="text-left p-4 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    {t.actions}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredDocuments.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-12 text-center text-slate-500">
                      Tidak ada dokumen yang sesuai
                    </td>
                  </tr>
                ) : (
                  filteredDocuments.map(doc => (
                    <tr
                      key={doc.id}
                      className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors"
                    >
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
                      <td className="p-4">
                        <span className="px-3 py-1.5 text-slate-900 dark:text-slate-200 bg-slate-100 dark:bg-slate-700/50 rounded-lg text-sm">
                          {doc.category}
                        </span>
                      </td>
                      <td className="p-4 text-slate-900 dark:text-slate-200">
                        {doc.user?.name || "-"}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-slate-900 dark:text-slate-200">
                          <Calendar size={14} />
                          <span className="text-sm">
                            {new Date(doc.document_date).toLocaleDateString("id-ID")}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <button className="p-2 text-slate-900 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-lg">
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => deleteDocument(doc.id)}
                            className="p-2 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg text-rose-500"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* ================= USER ================= */}
        <section className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                  👥 {t.userManagement}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Kelola pengguna sistem
                </p>
              </div>
              
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchUser}
                  onChange={(e) => setSearchUser(e.target.value)}
                  className="pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 outline-none w-full sm:w-56"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200/50 dark:border-slate-700/50">
                  <th className="text-left p-4 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    {t.name}
                  </th>
                  <th className="text-left p-4 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    {t.email}
                  </th>
                  <th className="text-left p-4 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    {t.role}
                  </th>
                  <th className="text-left p-4 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    {t.registerDate}
                  </th>
                  <th className="text-left p-4 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    {t.actions}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-12 text-center text-slate-500">
                      Tidak ada user yang sesuai
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map(user => (
                    <tr
                      key={user.id}
                      className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-400 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg">
                            {user.name.charAt(0)}
                          </div>
                          <p className="font-semibold text-slate-900 dark:text-slate-100">
                            {user.name}
                          </p>
                        </div>
                      </td>
                      <td className="p-4 text-slate-900 dark:text-slate-200">{user.email}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.role === 'admin' 
                            ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                            : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-slate-900 dark:text-slate-200">
                          <Calendar size={14} />
                          <span className="text-sm">
                            {new Date(user.created_at).toLocaleDateString("id-ID")}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        {user.role !== "admin" && (
                          <button
                            onClick={() => deleteUser(user.id)}
                            className="p-2 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg text-rose-500"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

// ================= STAT CARD COMPONENT =================
function StatCard({ icon, label, value, gradient }) {
  return (
    <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 p-6 hover:shadow-2xl transition-shadow">
      <div className="flex items-center gap-4">
        <div className={`p-4 bg-gradient-to-br ${gradient} rounded-2xl text-white shadow-lg`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{label}</p>
          <p className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}