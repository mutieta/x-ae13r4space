<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\JsonResponse;


class ArticleController extends Controller
{
    public function index(): JsonResponse
    {
        $cloudName = 'dubjwhwn9';

        $articles = Article::with(['author', 'category']) // eager load here
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($article) use ($cloudName) {
                $article->thumbnail = "https://res.cloudinary.com/{$cloudName}/image/upload/{$article->thumbnail}";
                return $article;
            });

        return response()->json([
            'data' => $articles,
            'message' => 'Articles retrieved successfully',
        ]);
    }

    public function show($id): JsonResponse
    {
        $cloudName = 'dubjwhwn9';

        $article = Article::with(['author', 'category'])->find($id); // eager load here

        if (!$article) {
            return response()->json([
                'message' => 'Article not found',
            ], 404);
        }

        $article->thumbnail = $article->thumbnail
            ? "https://res.cloudinary.com/{$cloudName}/image/upload/{$article->thumbnail}"
            : null;

        return response()->json([
            'data' => $article,
            'message' => 'Article retrieved successfully',
        ]);
    }
}
