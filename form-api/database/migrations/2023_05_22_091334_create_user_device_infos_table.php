<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserDeviceInfosTable extends Migration
{
    public function up()
    {
        Schema::create('user_device_infos', function (Blueprint $table) {
            $table->id();
            $table->string('ip_address');
            $table->string('device_type');
            $table->string('browser');
            $table->text('user_agent');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('user_device_infos');
    }
}
