import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Shield,
  Zap,
  Users,
  Moon,
  Sun,
  Globe,
  Menu,
  X,
  CheckCircle,
  ArrowRight,
  Database,
  Lock,
  Cloud,
  Target,
  Eye,
  Heart
} from "lucide-react";

export default function LandingPage() {
     const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState("id");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const DICT = {
    id: {
      // Header
      title: "ArsipKu",
      login: "Masuk",
      register: "Daftar",
      
      // Hero
      heroTitle: "Kelola Dokumen Digital dengan Mudah dan Aman",
      heroSubtitle: "Platform manajemen dokumen modern yang membantu Anda mengorganisir, menyimpan, dan mengakses dokumen kapan saja, di mana saja.",
      getStarted: "Mulai Sekarang",
      learnMore: "Pelajari Lebih Lanjut",
      
      // About
      aboutTitle: "Tentang ArsipKu",
      aboutDesc: "Arsipku merupakan sistem informasi pengarsipan dokumen dan rekap keuangan berbasis web yang dirancang untuk mendukung kebutuhan pengelolaan data pada organisasi, khususnya di sektor publik dan swasta. Sistem ini menyediakan fasilitas penyimpanan dan pengelolaan arsip dokumen dalam format digital serta pencatatan dan rekapitulasi data keuangan secara terstruktur. Melalui penerapan teknologi web, Arsipku memungkinkan proses pengarsipan, pencarian, dan pengelolaan data dilakukan secara terpusat, sehingga mampu meningkatkan efisiensi, akurasi, dan keamanan data dalam mendukung operasional organisasi.",
      
      // Vision & Mission
      visionTitle: "Visi Kami",
      visionDesc: "Menjadi platform manajemen dokumen digital terdepan di Indonesia yang membantu transformasi digital organisasi menuju paperless office.",
      
      missionTitle: "Misi Kami",
      mission1: "Menyediakan platform yang mudah digunakan dan aman",
      mission2: "Membantu organisasi mengurangi penggunaan kertas",
      mission3: "Meningkatkan efisiensi dalam pengelolaan dokumen",
      mission4: "Memberikan layanan terbaik dengan teknologi modern",
      
      // Goals
      goalsTitle: "Tujuan Kami",
      goal1Title: "Efisiensi Maksimal",
      goal1Desc: "Menghemat waktu hingga 70% dalam pencarian dan pengelolaan dokumen",
      goal2Title: "Keamanan Terjamin",
      goal2Desc: "Enkripsi end-to-end untuk melindungi data sensitif Anda",
      goal3Title: "Akses Mudah",
      goal3Desc: "Akses dokumen dari mana saja, kapan saja dengan berbagai perangkat",
      goal4Title: "Ramah Lingkungan",
      goal4Desc: "Kurangi penggunaan kertas hingga 90% untuk lingkungan lebih baik",
      
      // Features
      featuresTitle: "Mengapa Memilih ArsipKu?",
      feature1: "Penyimpanan Cloud Unlimited",
      feature2: "Keamanan Berlapis dengan Enkripsi",
      feature3: "Pencarian Cepat & Akurat",
      feature4: "Kolaborasi Tim Real-time",
      feature5: "Backup Otomatis",
      feature6: "Support 24/7",
      
      // CTA
      ctaTitle: "Siap Memulai Transformasi Digital?",
      ctaDesc: "Bergabunglah dengan ribuan organisasi yang telah mempercayai ArsipKu untuk mengelola dokumen mereka.",
      ctaButton: "Daftar Gratis Sekarang",
      
      // Footer
      footerAbout: "Tentang",
      footerFeatures: "Fitur",
      footerPricing: "Harga",
      footerContact: "Kontak",
      footerPrivacy: "Kebijakan Privasi",
      footerTerms: "Syarat & Ketentuan",
    },
    en: {
      // Header
      title: "ArchivePro",
      login: "Login",
      register: "Sign Up",
      
      // Hero
      heroTitle: "Manage Digital Documents Easily and Securely",
      heroSubtitle: "Modern document management platform that helps you organize, store, and access documents anytime, anywhere.",
      getStarted: "Get Started",
      learnMore: "Learn More",
      
      // About
      aboutTitle: "About Us",
      aboutDesc: "ArchivePro is a digital document management solution designed to help individuals and organizations manage archives efficiently. With modern cloud technology and enterprise-level security, we ensure your documents are always safe and accessible.",
      
      // Vision & Mission
      visionTitle: "Our Vision",
      visionDesc: "To become the leading digital document management platform in Indonesia that helps organizations transform towards a paperless office.",
      
      missionTitle: "Our Mission",
      mission1: "Provide an easy-to-use and secure platform",
      mission2: "Help organizations reduce paper usage",
      mission3: "Increase efficiency in document management",
      mission4: "Deliver the best service with modern technology",
      
      // Goals
      goalsTitle: "Our Goals",
      goal1Title: "Maximum Efficiency",
      goal1Desc: "Save up to 70% of time in searching and managing documents",
      goal2Title: "Guaranteed Security",
      goal2Desc: "End-to-end encryption to protect your sensitive data",
      goal3Title: "Easy Access",
      goal3Desc: "Access documents from anywhere, anytime with various devices",
      goal4Title: "Eco-Friendly",
      goal4Desc: "Reduce paper usage by up to 90% for a better environment",
      
      // Features
      featuresTitle: "Why Choose Us?",
      feature1: "Unlimited Cloud Storage",
      feature2: "Multi-layer Security with Encryption",
      feature3: "Fast & Accurate Search",
      feature4: "Real-time Team Collaboration",
      feature5: "Automatic Backup",
      feature6: "24/7 Support",
      
      // CTA
      ctaTitle: "Ready to Start Your Digital Transformation?",
      ctaDesc: "Join thousands of organizations that trust ArchivePro to manage their documents.",
      ctaButton: "Sign Up Free Now",
      
      // Footer
      footerAbout: "About",
      footerFeatures: "Features",
      footerPricing: "Pricing",
      footerContact: "Contact",
      footerPrivacy: "Privacy Policy",
      footerTerms: "Terms & Conditions",
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

  const features = [
    { icon: <Cloud size={24} />, title: t.feature1 },
    { icon: <Lock size={24} />, title: t.feature2 },
    { icon: <Zap size={24} />, title: t.feature3 },
    { icon: <Users size={24} />, title: t.feature4 },
    { icon: <Database size={24} />, title: t.feature5 },
    { icon: <Shield size={24} />, title: t.feature6 },
  ];

  const goals = [
    { icon: <Zap size={32} />, title: t.goal1Title, desc: t.goal1Desc },
    { icon: <Shield size={32} />, title: t.goal2Title, desc: t.goal2Desc },
    { icon: <FileText size={32} />, title: t.goal3Title, desc: t.goal3Desc },
    { icon: <Heart size={32} />, title: t.goal4Title, desc: t.goal4Desc },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <FileText size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                {t.title}
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {/* Language Toggle */}
              <button
                onClick={() => setLanguage(language === "id" ? "en" : "id")}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Globe size={18} />
                <span className="text-sm font-medium">{language === "id" ? "EN" : "ID"}</span>
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Auth Buttons */}
              <button  onClick={() => navigate("/login")} className="px-4 py-2 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
                {t.login}
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 font-medium shadow-lg shadow-blue-500/25 transition-all">
                {t.register}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-200 dark:border-slate-700">
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setLanguage(language === "id" ? "en" : "id")}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Globe size={18} />
                  <span>{language === "id" ? "English" : "Indonesia"}</span>
                </button>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                  <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
                </button>
                <button className="px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg font-medium text-left">
                  {t.login}
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-medium shadow-lg">
                  {t.register}
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent mb-6">
            {t.heroTitle}
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-3xl mx-auto">
            {t.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 font-semibold shadow-xl shadow-blue-500/25 transition-all flex items-center justify-center gap-2">
              {t.getStarted}
              <ArrowRight size={20} />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 font-semibold border border-slate-200 dark:border-slate-700 transition-all">
              {t.learnMore}
            </button>
          </div>
        </div>

        {/* Hero Image/Illustration */}
        <div className="mt-16 relative">
          <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-500/5 dark:to-indigo-500/5 rounded-3xl p-8 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg aspect-square flex items-center justify-center">
                  <FileText size={32} className="text-blue-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white dark:bg-slate-800/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent mb-4">
              {t.aboutTitle}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              {t.aboutDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Vision */}
          <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-slate-200/50 dark:border-slate-700/50">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <Eye size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              {t.visionTitle}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {t.visionDesc}
            </p>
          </div>

          {/* Mission */}
          <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-slate-200/50 dark:border-slate-700/50">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <Target size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              {t.missionTitle}
            </h3>
            <ul className="space-y-3">
              {[t.mission1, t.mission2, t.mission3, t.mission4].map((mission, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-blue-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600 dark:text-slate-400">{mission}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Goals Section */}
      <section className="bg-white dark:bg-slate-800/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent mb-4">
              {t.goalsTitle}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {goals.map((goal, i) => (
              <div key={i} className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-6 shadow-xl border border-slate-200/50 dark:border-slate-700/50 hover:scale-105 transition-transform">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 text-white shadow-lg">
                  {goal.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                  {goal.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  {goal.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent mb-4">
            {t.featuresTitle}
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div key={i} className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-slate-200/50 dark:border-slate-700/50 hover:shadow-2xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {feature.title}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl p-12 text-center shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t.ctaTitle}
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            {t.ctaDesc}
          </p>
          <button className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-blue-50 font-semibold shadow-xl transition-all flex items-center gap-2 mx-auto">
            {t.ctaButton}
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <FileText size={16} className="text-white" />
                </div>
                <span className="font-bold text-slate-900 dark:text-slate-100">{t.title}</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {t.aboutDesc.substring(0, 100)}...
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li><a href="#" className="hover:text-blue-500">{t.footerFeatures}</a></li>
                <li><a href="#" className="hover:text-blue-500">{t.footerPricing}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li><a href="#" className="hover:text-blue-500">{t.footerAbout}</a></li>
                <li><a href="#" className="hover:text-blue-500">{t.footerContact}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li><a href="#" className="hover:text-blue-500">{t.footerPrivacy}</a></li>
                <li><a href="#" className="hover:text-blue-500">{t.footerTerms}</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-800 pt-8 text-center text-sm text-slate-600 dark:text-slate-400">
            © 2024 {t.title}. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}