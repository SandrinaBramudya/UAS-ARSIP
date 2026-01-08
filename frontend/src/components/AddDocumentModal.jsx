import { motion, AnimatePresence } from "framer-motion";
import { X, Upload } from "lucide-react";

export default function AddDocumentModal({ open, onClose }) {
  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="w-full max-w-lg rounded-2xl bg-white shadow-xl p-6 relative"
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
            <h2 className="text-xl font-bold text-gray-800">
              Tambah Dokumen
            </h2>
            <p className="text-sm text-gray-500">
              Upload dan simpan dokumen baru
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Judul Dokumen
              </label>
              <input
                type="text"
                placeholder="Contoh: Surat Keputusan"
                className="mt-1 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Kategori
              </label>
              <select className="mt-1 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none">
                <option>Pilih kategori</option>
                <option>Akademik</option>
                <option>Keuangan</option>
                <option>Administrasi</option>
              </select>
            </div>

            <div className="border-2 border-dashed rounded-xl p-6 text-center hover:border-blue-400 transition">
              <Upload className="mx-auto text-blue-500 mb-2" />
              <p className="text-sm text-gray-600">
                Klik atau drag file ke sini
              </p>
              <input type="file" className="hidden" />
            </div>

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
                type="button"
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Simpan
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
