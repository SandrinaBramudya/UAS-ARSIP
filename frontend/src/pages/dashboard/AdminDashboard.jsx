import { useEffect, useState } from "react";
import api from "../../services/api";
import { Trash2, FileText } from "lucide-react";
import { toast } from "sonner";

export default function AdminDashboard() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDocuments = async () => {
    try {
      const res = await api.get("/documents");
      setDocuments(res.data);
    } catch {
      toast.error("Gagal mengambil data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Hapus dokumen ini?")) return;

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
      <h1 className="text-2xl font-bold mb-6">📊 Admin Dashboard</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border rounded-lg overflow-hidden">
          <thead className="bg-gray-100 dark:bg-slate-700">
            <tr>
              <th className="p-3 text-left">Judul</th>
              <th className="p-3">Kategori</th>
              <th className="p-3">Tanggal</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {documents.map(doc => (
              <tr key={doc.id} className="border-t">
                <td className="p-3 flex items-center gap-2">
                  <FileText size={18} />
                  {doc.title}
                </td>
                <td className="p-3 text-center">{doc.category}</td>
                <td className="p-3 text-center">
                  {new Date(doc.document_date).toLocaleDateString()}
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
