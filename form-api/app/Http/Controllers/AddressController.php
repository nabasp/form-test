<?php
namespace App\Http\Controllers;

use App\Models\Address;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    public function store(Request $request,$user)
    {
        // Validate the request data
        $request->validate([
            'addressList' => 'required|array',
            'addressList.*.a1' => 'required',
            'addressList.*.a2' => 'required',
            'addressList.*.a3' => 'required',
        ]);

        // Get the user ID associated with the authenticated user or adjust as per your authentication logic
        $userId = $user;

        // Save each address in the list
        foreach ($request->input('addressList') as $addressData) {
            Address::create([
                'user_id' => $userId,
                'a1' => $addressData['a1'],
                'a2' => $addressData['a2'],
                'a3' => $addressData['a3'],
            ]);
        }

        // Return a response indicating successful address saving
        return response()->json(['message' => 'Address list saved successfully']);
    }
}