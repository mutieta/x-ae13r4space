<?php

namespace App\Models;

use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Database\Eloquent\Model;
   

class Article extends Model
{
    protected $fillable = [
        'title',
        'thumbnail', 
        'slug',
        'content',
        'summary',
        'author_id',
        'category_id',
        'published_at',
        'status',
        'views_count',
        'comments_count',
    ];


    protected static function booted()
{
    static::creating(function ($article) {
        if (request()->hasFile('thumbnail')) {
            $uploaded = Cloudinary::upload(
                request()->file('thumbnail')->getRealPath(),
                ['public_id' => 'articles/' . uniqid()] // your own naming
            );
            $article->thumbnail = $uploaded->getPublicId();
        }
    });

    static::updating(function ($article) {
        if (request()->hasFile('thumbnail')) {
            // Optionally delete the old one
            Cloudinary::destroy($article->getOriginal('thumbnail'));

            $uploaded = Cloudinary::upload(
                request()->file('thumbnail')->getRealPath(),
                ['public_id' => 'articles/' . uniqid()]
            );
            $article->thumbnail = $uploaded->getPublicId();
        }
    });
}

    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($model) {
            if (empty($model->published_at)) {
                $model->published_at = now();
            }
        });
    }
    

    public function author()
    {
        return $this->belongsTo(Author::class, 'author_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'article_tags', 'article_id', 'tag_id');
    }
    }
