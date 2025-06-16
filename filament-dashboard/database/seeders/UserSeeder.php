<?php

namespace Database\Seeders;

use Attribute;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create(Attributes:[
            'name' => 'Test User',
            'email' => 'tester@gmail.com',
            'email_verfied_at' => now(),
            'password' => bcrypt('password'), // password
            'role' => 'admin', // Default role]
        ]);
    }

}
