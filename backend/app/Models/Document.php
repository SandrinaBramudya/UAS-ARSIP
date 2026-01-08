<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    protected $fillable = [
        'user_id',
        'document_number',
        'title',
        'category',
        'unit',
        'document_date',
        'file_path',
        'file_size',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
