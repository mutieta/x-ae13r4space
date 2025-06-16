<?php

namespace App\Http\Controllers;

use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Http\Request;

class ImageUploadController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'image' => 'required|image|max:5120', // max 5MB
        ]);

        $uploadedFileUrl = Cloudinary::upload($request->file('profile_picture')->getRealPath(), [
            'folder' => 'uploads',
            'public_id' => uniqid('image_'),
            'overwrite' => true,
        ])->getSecurePath();
        $uploadedFileUrl = Cloudinary::upload($request->file('thumbnail')->getRealPath(), [
            'folder' => 'uploads',
            'public_id' => uniqid('thumbnail_'),
            'overwrite' => true,
        ])->getSecurePath();

        return response()->json([
            'url' => $uploadedFileUrl,
        ]);
    }
}
