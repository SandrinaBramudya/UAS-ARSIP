import { useState, useEffect } from "react";
import api from "../services/api";
import { saveAuth } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle,
  Globe,
  Moon,
  Sun,
  Building,
  Phone,
  Shield
} from "lucide-react";

export default function AuthPages() {
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true);
    const [darkMode, setDarkMode] = useState(true);
    const [language, setLanguage] = useState("id");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    organization: "",
    phone: ""
  });

  const DICT = {
    id: {
      // Common
      title: "ArsipKu",
      subtitle: "Digital Document Management",
      email: "Email",
      password: "Password",
      
      // Login
      loginTitle: "Selamat Datang Kembali",
      loginSubtitle: "Masuk ke akun Anda untuk melanjutkan",
      loginButton: "Masuk",
      forgotPassword: "Lupa password?",
      noAccount: "Belum punya akun?",
      signUp: "Daftar sekarang",
      rememberMe: "Ingat saya",
      
      // Register
      registerTitle: "Buat Akun Baru",
      registerSubtitle: "Mulai kelola dokumen Anda hari ini",
      registerButton: "Daftar",
      fullName: "Nama Lengkap",
      organization: "Organisasi",
      phone: "Nomor Telepon",
      confirmPassword: "Konfirmasi Password",
      haveAccount: "Sudah punya akun?",
      signIn: "Masuk di sini",
      agreeTerms: "Saya setuju dengan",
      terms: "Syarat & Ketentuan",
      and: "dan",
      privacy: "Kebijakan Privasi",
      
      // Placeholders
      emailPlaceholder: "nama@email.com",
      passwordPlaceholder: "Masukkan password",
      fullNamePlaceholder: "John Doe",
      organizationPlaceholder: "Nama Perusahaan (Opsional)",
      phonePlaceholder: "+62 812 3456 7890",
      
      // Features
      feature1: "Penyimpanan Cloud Aman",
      feature2: "Akses Multi-Device",
      feature3: "Enkripsi End-to-End",
    },
    en: {
      // Common
      title: "ArchivePro",
      subtitle: "Digital Document Management",
      email: "Email",
      password: "Password",
      
      // Login
      loginTitle: "Welcome Back",
      loginSubtitle: "Sign in to your account to continue",
      loginButton: "Sign In",
      forgotPassword: "Forgot password?",
      noAccount: "Don't have an account?",
      signUp: "Sign up now",
      rememberMe: "Remember me",
      
      // Register
      registerTitle: "Create New Account",
      registerSubtitle: "Start managing your documents today",
      registerButton: "Sign Up",
      fullName: "Full Name",
      organization: "Organization",
      phone: "Phone Number",
      confirmPassword: "Confirm Password",
      haveAccount: "Already have an account?",
      signIn: "Sign in here",
      agreeTerms: "I agree to the",
      terms: "Terms & Conditions",
      and: "and",
      privacy: "Privacy Policy",
      
      // Placeholders
      emailPlaceholder: "name@email.com",
      passwordPlaceholder: "Enter password",
      fullNamePlaceholder: "John Doe",
      organizationPlaceholder: "Company Name (Optional)",
      phonePlaceholder: "+1 234 567 8900",
      
      // Features
      feature1: "Secure Cloud Storage",
      feature2: "Multi-Device Access",
      feature3: "End-to-End Encryption",
    }
  };

  const t = DICT[language];

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (isLogin) {
      // LOGIN
      const res = await api.post("/login", {
        email: formData.email,
        password: formData.password,
      });

      saveAuth(res.data);
      navigate("/dashboard");
    } else {
      // REGISTER
      if (formData.password !== formData.confirmPassword) {
        alert("Password tidak sama");
        return;
      }

      const res = await api.post("/register", {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
        role: "user",
      });

      saveAuth(res.data);
      navigate("/dashboard");
    }
  } catch (error) {
    console.error(error.response?.data || error);
    alert(error.response?.data?.message || "Gagal autentikasi");
  }
};
    

  const features = [
    { icon: <Shield size={20} />, text: t.feature1 },
    { icon: <FileText size={20} />, text: t.feature2 },
    { icon: <Lock size={20} />, text: t.feature3 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding & Features */}
          <div className="hidden lg:block">
            <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-slate-200/50 dark:border-slate-700/50">
              {/* Logo & Title */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <FileText size={28} className="text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                    {t.title}
                  </h1>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {t.subtitle}
                  </p>
                </div>
              </div>

              {/* Illustration */}
              <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-500/5 dark:to-indigo-500/5 rounded-2xl p-8 mb-8">
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg aspect-square flex items-center justify-center transform hover:scale-105 transition-transform">
                      <FileText size={32} className="text-blue-500" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
                      {feature.icon}
                    </div>
                    <span className="font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Auth Form */}
          <div className="w-full">
            <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 p-8 sm:p-10">
              {/* Language & Theme Toggle */}
              <div className="flex justify-end gap-2 mb-6">
                <button
                  onClick={() => setLanguage(language === "id" ? "en" : "id")}
                  className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
                  title={language === "id" ? "Switch to English" : "Ganti ke Indonesia"}
                >
                  <Globe size={20} />
                </button>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
                  title={darkMode ? "Light Mode" : "Dark Mode"}
                >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>

              {/* Mobile Logo */}
              <div className="lg:hidden flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <FileText size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                    {t.title}
                  </h1>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {t.subtitle}
                  </p>
                </div>
              </div>

              {/* Header */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent mb-2">
                  {isLogin ? t.loginTitle : t.registerTitle}
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  {isLogin ? t.loginSubtitle : t.registerSubtitle}
                </p>
              </div>

              {/* Form */}
              <div className="space-y-5">
                {/* Register Only Fields */}
                {!isLogin && (
                  <>
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        {t.fullName}
                      </label>
                      <div className="relative">
                        <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder={t.fullNamePlaceholder}
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Organization */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        {t.organization}
                      </label>
                      <div className="relative">
                        <Building size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          name="organization"
                          value={formData.organization}
                          onChange={handleInputChange}
                          placeholder={t.organizationPlaceholder}
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        {t.phone}
                      </label>
                      <div className="relative">
                        <Phone size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder={t.phonePlaceholder}
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    {t.email}
                  </label>
                  <div className="relative">
                    <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t.emailPlaceholder}
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    {t.password}
                  </label>
                  <div className="relative">
                    <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder={t.passwordPlaceholder}
                      className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password - Register Only */}
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      {t.confirmPassword}
                    </label>
                    <div className="relative">
                      <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder={t.passwordPlaceholder}
                        className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>
                )}

                {/* Remember Me & Forgot Password - Login Only */}
                {isLogin && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-slate-300 text-blue-500 focus:ring-blue-500"
                      />
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        {t.rememberMe}
                      </span>
                    </label>
                    <button
                      type="button"
                      className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
                    >
                      {t.forgotPassword}
                    </button>
                  </div>
                )}

                {/* Terms & Conditions - Register Only */}
                {!isLogin && (
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-slate-300 text-blue-500 focus:ring-blue-500 mt-0.5"
                    />
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {t.agreeTerms}{" "}
                      <a href="#" className="text-blue-500 hover:text-blue-600 font-medium">
                        {t.terms}
                      </a>{" "}
                      {t.and}{" "}
                      <a href="#" className="text-blue-500 hover:text-blue-600 font-medium">
                        {t.privacy}
                      </a>
                    </span>
                  </label>
                )}

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 font-semibold shadow-xl shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
                >
                  {isLogin ? t.loginButton : t.registerButton}
                  <ArrowRight size={20} />
                </button>
              </div>

              {/* Toggle Form */}
              <div className="mt-6 text-center">
                <p className="text-slate-600 dark:text-slate-400">
                  {isLogin ? t.noAccount : t.haveAccount}{" "}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors"
                  >
                    {isLogin ? t.signUp : t.signIn}
                  </button>
                </p>
              </div>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                    atau
                  </span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-3">
                <button className="py-3 px-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 font-medium text-slate-700 dark:text-slate-300 transition-colors flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </button>
                <button className="py-3 px-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 font-medium text-slate-700 dark:text-slate-300 transition-colors flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  GitHub
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}