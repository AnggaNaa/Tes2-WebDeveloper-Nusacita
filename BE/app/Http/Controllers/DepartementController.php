<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Departement;
use Ramsey\Uuid\Uuid;

class DepartementController extends Controller
{
    public function getDepartements(Request $request)
    {
        try {
            $departements = Departement::with('unit')->orderBy('name', 'asc')->get();
            return $departements;

            // $limit = $request->input('limit', 5);
            // $offset = $request->input('offset', 0);

            // $departments = Departement::with('unit')
            //     ->skip($offset)
            //     ->take($limit)
            //     ->get();

            // return $departments;

        } catch (\Exception $th) {
            return response()->json(['error' => 'Error getting departements: ' . $th->getMessage()], 500);
        }

    }

    public function search(Request $request)
    {
        try {

            $query = $request->input("name");
            $departements = Departement::where("name", 'LIKE', "%$query%")->orWhere('slug', 'LIKE', "%$query%")->Get();

            return $departements;
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
                'slug' => 'required|string|max:100',
                'unit_id' => 'required',
                'm_power_2023' => 'required|numeric',
                'm_power_2024' => 'required|numeric',
            ]);

            $data = [
                'id' => $uuid,
                'name' => $validated['name'],
                'slug' => $validated['slug'],
                'unit_id' => $validated['unit_id'],
                'm_power_2023' => $validated['m_power_2023'],
                'm_power_2024' => $validated['m_power_2024'],

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
                'slug' => 'required|string|max:100',
                'unit_id' => 'required',
                'm_power_2023' => 'required|numeric',
                'm_power_2024' => 'required|numeric',
            ]);
            $data = [
                'name' => $validated['name'],
                'slug' => $validated['slug'],
                'unit_id' => $validated['unit_id'],
                'm_power_2023' => $validated['m_power_2023'],
                'm_power_2024' => $validated['m_power_2024'],
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