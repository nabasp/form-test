<?php

namespace App\Http\Controllers;

use App\Models\UserDetails;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Carbon\Carbon;


class UserController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'firstName' => 'required|string',
            'lastName' => 'required|string',
            'email' => [
                'required',
                'email',
                Rule::unique('user_details'),
            ],
            'phone' => ['required', 'numeric', 'digits:10','unique:user_details'],
            'dateOfBirth' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = new UserDetails();
        $user->first_name = $request['firstName'];
        $user->last_name = $request['lastName'];
        $user->email = $request['email'];
        $user->phone = $request['phone'];
        $user->date_of_birth = Carbon::createFromFormat('d/m/Y', $request['dateOfBirth'])->toDateString();
        $user->save();

        return response()->json(['userId' => $user->id], 201);
    }
}
