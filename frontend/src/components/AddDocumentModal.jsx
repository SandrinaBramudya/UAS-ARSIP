import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload } from "lucide-react";
import api from "../services/api";

export default function AddDocumentModal({ open, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    try {
      await api.post("/documents", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      onSuccess?.(); // refresh data di parent
      onClose();
    } catch (error) {
      console.error(error);
      alert("Gagal upload dokumen");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="w-full max-w-lg rounded-2xl bg-white dark:bg-gray-900 shadow-xl p-6 relative"
          initial={{ scale: 0.9, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 30 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X size={22} />
          </button>

          {/* Header */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold">
              Tambah Dokumen
            </h2>
            <p className="text-sm text-gray-500">
              Upload dan simpan dokumen baru
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label className="text-sm font-medium">
                Judul Dokumen
              </label>
              <input
                name="title"
                required
                placeholder="Contoh: Surat Keputusan"
                className="mt-1 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Category */}
            <div>
              <label className="text-sm font-medium">
                Kategori
              </label>
              <select
                name="category"
                required
                className="mt-1 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Pilih kategori</option>
                <option value="Akademik">Akademik</option>
                <option value="Keuangan">Keuangan</option>
                <option value="Administrasi">Administrasi</option>
              </select>
            </div>

            {/* Optional fields */}
            <div className="grid grid-cols-2 gap-3">
              <input
                name="document_number"
                placeholder="No Dokumen (opsional)"
                className="rounded-lg border px-4 py-2"
              />
              <input
                name="unit"
                placeholder="Unit (opsional)"
                className="rounded-lg border px-4 py-2"
              />
            </div>

            {/* File Upload */}
            <label className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:border-blue-400 transition block">
              <Upload className="mx-auto text-blue-500 mb-2" />
              <p className="text-sm text-gray-600">
                Klik atau drag file ke sini
              </p>
              <input
                type="file"
                name="file"
                required
                className="hidden"
              />
            </label>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg border hover:bg-gray-100"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
              >
                {loading ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
