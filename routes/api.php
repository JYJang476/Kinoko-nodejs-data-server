<?php

use Illuminate\Http\Request;
use App\Http\Controllers\ProgramController;
//use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['checkAuth'])->group(function() {
    Route::get('myfarm/id', 'UserController@GetMachineId');
    Route::put('myfarm/select', 'UserController@SelectMachine');
    Route::post('myfarm/list', 'MachineController@GetMachineList');
    Route::put('myfarm/register', 'MachineController@RegisterMachine');
});

Route::post('farm/custom', 'ProgramController@AddCustomProgram');
Route::get('farm/custom/list', 'ProgramController@CustomList');
Route::get('user/info/{id}', 'UserController@GetUserInfo');

Route::get('farm/data', 'ProgramController@GetGraphData');
Route::put('farm/compostname', 'ProgramController@SetCompostName');
Route::get('farm/compostname', 'ProgramController@GetCompostName');
Route::put('farm/period/extend', 'ProgramController@ExtendCustomPeriod');
Route::delete('farm', 'ProgramController@DeleteCustomProgram');
Route::get('farm/startdate', 'ProgramController@GetStartDate');
Route::get('farm/enddate', 'ProgramController@GetEndDate');
Route::put('farm/end', 'ProgramController@SetEndProgram');

Route::get('myfarm/data', 'MachineController@GetMachine');
Route::post('myfarm', 'MachineController@AddMachine');
Route::put('myfarm/program', 'MachineController@SetProgram');
Route::delete('myfarm', 'MachineController@DeleteMachine');

Route::get('myfarm/status', 'MachineController@GetIsOn');
Route::put('myfarm/status', 'MachineController@SetIsOn');
Route::get('myfarm/presence', 'MachineController@GetIsPresence');
Route::put('myfarm/presence', 'MachineController@SetIsPresence'); // 하드웨어용
Route::get('myfarm/info', 'MachineController@GetMachineData'); // 하드웨어용

Route::get('mushroom/{type}', 'MushroomController@GetMushRoom');
Route::get('mushroom', 'MushroomController@GetMushRoomAll');
Route::get('machine/test', 'MachineController@MachineTest');

Route::get('pin/check', 'PinController@CheckPin');
Route::get('pin/auth', 'PinController@AuthPin');

Route::put('myfarm/register/ip', 'MachineController@SetMachineIP');

// 배지 데이터 관리
Route::get('myfarm/data/hour', 'DataController@GetDataToHour');
Route::get('farm/logout/list', 'DataController@GetDataToLastlogout');
Route::post('data/add', 'DataController@AddData');
//

Route::post('auth', 'UserController@CheckLogin');

Route::post('register', 'UserController@RegisterUser');

Route::post('login', 'UserController@LoginUser');

Route::put('logout', 'UserController@LogoutUser');
Route::get('logout/date', 'UserController@GetLogoutDate');

Route::get('farm/exist', 'MachineController@IsExist');
Route::put('myfarm/register/ip', 'MachineController@SetMachineIP');

// 버섯 이미지 -----------
Route::post('image/upload', 'MushroomImageController@UploadImage');
Route::get('img/{id}', 'MushroomImageController@GetImage');
// ------------

// 도움말 -----------
Route::get('list/help', 'HelpController@GetHelpList');
Route::get('help/{id}', 'HelpController@GetHelpData');
Route::post('upload/help', 'HelpImageController@UploadImage');
Route::get('help/image/{id}', 'HelpImageController@GetImage');
// -------------

// 배지 이미지
Route::get('compost/image/cluster/{page}', 'CompostImageController@GetImageClusterList');
Route::get('compost/{id}', 'CompostImageController@GetImage');
Route::post('upload/compost', 'CompostImageController@UploadImage');
// 배지 이미지

// 3D 데이터
Route::get('ply/{id}', 'PlyController@GetFile');
Route::get('url/ply', 'PlyController@GetFileToURL');
Route::post('upload/ply', 'PlyController@UploadFile');
Route::get('url/ply/{id}', 'PlyController@GetFileURL');
// 3D 데이터

// 버섯 관리
Route::put('mushroom/growthrate', 'MushroomController@SetGrowthRate');
Route::put('mushroom/size', 'MushroomController@SetSize');
Route::post('mushroom/add', 'MushroomController@AddMushRoom');
//

