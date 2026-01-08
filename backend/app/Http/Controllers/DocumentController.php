<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;
use Carbon\Carbon;

class DocumentController extends Controller
{
    // GET: ambil semua dokumen
    // public function index()
    // {
    //     return response()->json(
    //         Document::latest()->get()
    //     );
    // }

    // POST: simpan dokumen baru

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'category' => 'required|string',
            'file' => 'required|file|max:10240', // 10MB
        ]);

        $file = $request->file('file');

        $document = Document::create([
            'user_id' => $request->user()->id, // 🔑 otomatis
            'document_number' => $request->document_number,
            'title' => $request->title,
            'category' => $request->category,
            'unit' => $request->unit,
            'document_date' => now(),
            'file_path' => $file->store('uploads/documents', 'public'),
            'file_size' => $file->getSize(),
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
    public function myDocuments(Request $request)
    {
        return Document::where('user_id', $request->user()->id)->get();
    }

    public function index()
    {
        return Document::all(); // ADMIN
    }

}
