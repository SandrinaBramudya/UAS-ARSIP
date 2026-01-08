<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;

class DocumentController extends Controller
{
    // GET: ambil semua dokumen
    public function index()
    {
        return response()->json(
            Document::latest()->get()
        );
    }

    // POST: simpan dokumen baru
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'category' => 'required',
            'file' => 'required|file'
        ]);

        $filePath = $request->file('file')->store('uploads/documents', 'public');

        $document = Document::create([
            'document_number' => $request->document_number,
            'title' => $request->title,
            'category' => $request->category,
            'unit' => $request->unit,
            'document_date' => $request->document_date,
            'file_path' => $filePath,
        ]);

        return response()->json($document, 201);
    }

    // DELETE: hapus dokumen
    public function destroy($id)
    {
        Document::findOrFail($id)->delete();

        return response()->json([
            'message' => 'Document deleted'
        ]);
    }
}
