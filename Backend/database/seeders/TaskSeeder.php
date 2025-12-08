<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Task;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Task::create([
            'title' => 'Sample Task 1',
            'description' => 'This is the description for Sample Task 1.',
            'completed' => false,
        ]);
        Task::create([
            'title' => 'Sample Task 2',
            'description' => 'This is the description for Sample Task 2.',
            'completed' => true,
        ]);
        Task::create([
            'title' => 'Sample Task 3',
            'description' => 'This is the description for Sample Task 3.',
            'completed' => false,
        ]);
    }
}
