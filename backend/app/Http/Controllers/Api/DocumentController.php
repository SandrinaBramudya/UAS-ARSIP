<?php

namespace App\Http\Controllers\Api;

use App\Models\Document;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class DocumentController extends Controller
{
    public function update(Request $request, Document $document)
{
    $user = $request->user();
    
    // Cek kepemilikan dokumen
    if ($user->role === 'user' && $document->user_id !== $user->id) {
        abort(403, 'Tidak boleh mengubah dokumen orang lain');
    }

    $request->validate([
        'title' => 'required|string',
        'category' => 'required|string',
    ]);

    $document->update([
        'title' => $request->title,
        'category' => $request->category,
    ]);

    return response()->json($document);
}
public function destroy(Request $request, Document $document)
{
    $user = $request->user();
    
    // 🔍 DEBUG: Log untuk melihat data
    Log::info('Delete attempt', [
        'user_id' => $user->id,
        'user_role' => $user->role,
        'document_id' => $document->id,
        'document_user_id' => $document->user_id
    ]);

    if ($user->role === 'user' && $document->user_id !== $user->id) {
        Log::warning('Delete forbidden: User trying to delete others document');
        abort(403, 'Tidak boleh menghapus dokumen orang lain');
    }

    if ($document->file_path) {
        Storage::disk('public')->delete($document->file_path);
    }
    
    $document->delete();
    
    return response()->json([
        'message' => 'Dokumen berhasil dihapus'
    ]);
}

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

    public function myDocuments(Request $request)
    {
        return Document::where('user_id', $request->user()->id)->get();
    }

    public function index()
    {
    return Document::with('user')->latest()->get();
    }

}
