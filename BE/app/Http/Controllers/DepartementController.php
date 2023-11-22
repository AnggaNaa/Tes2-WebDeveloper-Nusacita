<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Departement;
use Ramsey\Uuid\Uuid;

class DepartementController extends Controller
{
    public function getDepartements()
    {
        return $departements = Departement::with('unit')->get();

    }

    public function search(Request $request)
    {
    try {
        $searchTerm = $request->input('name');

        $result = Departement::with('unit')
            ->where('name', 'LIKE', "%$searchTerm%")
            ->orWhereHas('unit', function ($query) use ($searchTerm) {
                $query->where('name', 'LIKE', "%$searchTerm%");
            })
            ->get();

            if ($result->isEmpty()) {
                return response()->json(['message' => 'No departements found for the given search term.']);
            }

        return $result;
    } catch (\Throwable $th) {
        return response()->json(['error' => 'Error searching departements: ' . $th->getMessage()], 500);
    }
    }


    public function getDetailDepartement($id)
    {
        try{
            $departements = Departement::find($id);
            if (!$departements) {
                return response()->json(['error' => 'Departement not found.'], 404);
            }
            return $departements;

        } catch (\Throwable $th) {
            return response()->json(['error' => 'Error getting departement: ' . $th->getMessage()], 500);
        }
    }

    public function create(Request $request)
    {
        try{
            $uuid = Uuid::uuid4()->toString();
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'slug' => 'required|string|max:10',
                'unit_id' => 'required',
            ]);

            $data = [
                'id' => $uuid,
                'name' => $validated['name'],
                'slug' => $validated['slug'],
                'unit_id' => $validated['unit_id'],
            ];

            Departement::create($data);
            return $data;


        } catch (\Throwable $th) {
            return response()->json(['error' => 'Error creating unit: ' . $th->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try{
            $departements = Departement::find($id);
            if (!$departements) {
                return response()->json(['error' => 'Unit not found.'], 404);
            }
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'slug' => 'required|string|max:10',
                'unit_id' => 'required',
            ]);
            $data = [
                'name' => $validated['name'],
                'slug' => $validated['slug'],
            ];
            $departements->update($data);
            return $departements;
        } catch (\Throwable $th) {
            return response()->json(['error' => 'Error updating departement: ' . $th->getMessage()], 500);
        }
    }

    public function delete($id)
    {
        try{
            $record = Departement::findOrFail($id);
            $record->delete();
            return $record;
        } catch (\Throwable $th) {
            return response()->json(['error' => 'Error deleting departement: ' . $th->getMessage()], 500);
        }
    }
}
