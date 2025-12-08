<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{
    private function addCorsHeaders($response)
    {
        return $response->header('Access-Control-Allow-Origin', '*')
                        ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
                        ->header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Authorization');
    }

    public function index(Request $request)
    {
        $tasks = Task::query();

        if ($request->has('title')) {
            $searchTerm = '%' . $request->query('title') . '%';
            $tasks->where('title', 'like', $searchTerm);
        }

        $completedFilter = $request->query('completed');
        
        if (in_array($completedFilter, ['true', 'false', '1', '0'], true)) {
            
            $tasks->where('completed', $completedFilter);
        }

        $response = response()->json($tasks->get());
        return $this->addCorsHeaders($response);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'sometimes|string|nullable',
            'completed' => 'sometimes|boolean',
        ]);

        $task = Task::create($validated);

        $response = response()->json($task, 201);
        return $this->addCorsHeaders($response); 
    }

    
    public function show(Task $task)
    {
        $response = response()->json($task);
        return $this->addCorsHeaders($response);
    }

 
    public function update(Request $request, Task $task)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255', 
            'description' => 'sometimes|string',
            'completed' => 'sometimes|boolean',
        ]);
        $task->update($validated);
        $response = response()->json($task, 200);
        return $this->addCorsHeaders($response);
    }

    
    public function destroy(string $id)
    {
        $task = Task::findOrFail($id);
        $task->delete();
        
        $response = response()->json(null, 204);
        return $this->addCorsHeaders($response);
    }
}