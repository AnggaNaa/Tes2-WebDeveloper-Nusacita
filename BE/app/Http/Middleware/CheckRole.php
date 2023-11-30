<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Log;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next, $role)
    {
        // $user = Auth::user();

        // if ($user && in_array($user->role->role, $roles)) {
        //     return $next($request);
        // }

        // return response()->json(['error' => 'Unauthorized'], 403)
        if (!Auth::check()) {
            return redirect('/login');
        }

        $user = Auth::user();

        // if ($user->role != $role) {
        //     abort(403, 'Unauthorized action.');
        // }
        Log::info('User Role:', ['user_id' => $user->id, 'role' => $user->role, 'required_role' => $role]);

        if ($user->role != $role) {
            // Tambahkan pesan log untuk debug
            Log::warning('Unauthorized Action:', ['user_id' => $user->id, 'role' => $user->role, 'required_role' => $role]);

            abort(403, 'Unauthorized action.');
        }

        return $next($request);

    }

}
