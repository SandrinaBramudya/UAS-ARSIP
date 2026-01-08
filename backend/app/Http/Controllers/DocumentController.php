<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;
use Carbon\Carbon;

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
            'title' => 'required|string',
            'category' => 'required|string',
            'file' => 'required|file|max:10240', // max 10MB
        ]);
    
        $file = $request->file('file');
    
        $filePath = $file->store('uploads/documents', 'public');
        $fileSize = $file->getSize(); // BYTES
        $fileDate = now(); // waktu upload
    
        $document = Document::create([
            'document_number' => $request->document_number,
            'title' => $request->title,
            'category' => $request->category,
            'unit' => $request->unit,
            'document_date' => $fileDate,
            'file_path' => $filePath,
            'file_size' => $fileSize,
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
