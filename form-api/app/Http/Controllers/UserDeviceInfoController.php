<?php

namespace App\Http\Controllers;

use App\Models\UserDeviceInfo;
use Illuminate\Http\Request;
use Jenssegers\Agent\Agent;

class UserDeviceInfoController extends Controller
{
    public function store(Request $request)
    {

        $agent = new Agent();
        $userDetail = new UserDeviceInfo();
        $userDetail->ip_address = $request->ip();
        $userDetail->device_type = $agent->device();
        $userDetail->browser = $agent->browser();
        $userDetail->user_agent = $request->userAgent();
        $userDetail->save();

        return response()->json($userDetail);
    }

}
