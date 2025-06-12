<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ViewLog extends Model
{
    protected $fillable = [
        'user_id',
        'article_id',
        'created_at',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'created_at' => 'datetime',
    ];

    /**
     * Get the user that owns the view log.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the article that was viewed.
     */
    public function article()
    {
        return $this->belongsTo(Article::class);
    }
    /**
     * Scope a query to only include views by a specific user.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param int $userId
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }
}
