import { useEffect, useState } from "react";
import api from "../../services/api";
import { FileText, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";
import AddDocumentModal from "../../components/AddDocumentModal";

export default function UserDashboard() {
  const [documents, setDocuments] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchDocuments = async () => {
    try {
      const res = await api.get("/documents");
      setDocuments(res.data);
    } catch {
      toast.error("Gagal mengambil dokumen");
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Hapus dokumen?")) return;

    try {
      await api.delete(`/documents/${id}`);
      toast.success("Dokumen dihapus");
      setDocuments(prev => prev.filter(d => d.id !== id));
    } catch {
      toast.error("Gagal menghapus");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📁 Dokumen Saya</h1>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} />
          Upload
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map(doc => (
          <div
            key={doc.id}
            className="border rounded-xl p-4 bg-white dark:bg-slate-800"
          >
            <div className="flex items-center gap-2 mb-2">
              <FileText />
              <h3 className="font-semibold">{doc.title}</h3>
            </div>

            <p className="text-sm text-gray-500">{doc.category}</p>
            <p className="text-xs text-gray-400 mt-1">
              {new Date(doc.document_date).toLocaleDateString()}
            </p>

            <div className="flex justify-end mt-3">
              <button
                onClick={() => handleDelete(doc.id)}
                className="text-red-500"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <AddDocumentModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={fetchDocuments}
      />
    </div>
  );
}
