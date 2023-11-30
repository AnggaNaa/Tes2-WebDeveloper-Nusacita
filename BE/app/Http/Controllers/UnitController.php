<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Unit;
use Ramsey\Uuid\Uuid;

class UnitController extends Controller
{
    public function getUnits(Request $request)
    {
        try{
            $units = Unit::orderBy('name', 'asc')->get();
            return $units;
        } catch (\Exception $th) {
            return response()->json(['error' => 'Error getting units: ' . $th->getMessage()], 500);
        }

    }

    public function search(Request $request)
    {
    try {
        $query = $request->input('name');

        $units = Unit::where('name', 'LIKE', "%$query%")
            ->orWhere('slug', 'LIKE', "%$query%")
            ->get();

        return $units;
    } catch (\Throwable $th) {
        return response()->json(['error' => 'Error searching units: ' . $th->getMessage()], 500);
    }
    }

    public function getDetailUnit($id)
    {
        try {
            $units = Unit::findOrFail($id);
            if (!$units) {
                return response()->json(['error' => 'Unit not found.'], 404);
            }
            $units = Unit::find($id);
            return $units;
        } catch (\Throwable $th) {
            return response()->json(['error' => 'Error getting unit: ' . $th->getMessage()], 500);
        }

    }

    public function create(Request $request)
    {
        try{
            $uuid = Uuid::uuid4()->toString();
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'slug' => 'required|string|max:100',
            ]);

            $data = [
                'id' => $uuid,
                'name' => $validated['name'],
                'slug' => $validated['slug'],
            ];

            Unit ::create($data);
            return $data;


        } catch (\Throwable $th) {
            return response()->json(['error' => 'Error creating unit: ' . $th->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try{
            $unit = Unit::find($id);
            if (!$unit) {
                return response()->json(['error' => 'Unit not found.'], 404);
            }

            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'slug' => 'required|string|max:100',
            ]);

            $data = [
                'name' => $validated['name'],
                'slug' => $validated['slug'],
            ];
            $unit->update($data);
            return $unit;

        } catch (\Throwable $th) {
            return response()->json(['error' => 'Error updating unit: ' . $th->getMessage()], 500);
        }
    }

    public function delete($id)
    {
        try{
            $record = Unit::findOrFail($id);
            $record->delete();
            return $record;
        } catch (\Throwable $th) {
            return response()->json(['error' => 'Error deleting unit: ' . $th->getMessage()], 500);
        }
    }
}