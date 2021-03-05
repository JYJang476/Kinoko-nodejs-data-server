<?php

namespace App\Http\Controllers;

use App\MushRoomImageModel;
use App\MushroomModel;
use App\ProgramModel;
use App\DateModel;
use App\CompostImageModel;
use App\UserModel;
use Carbon\Carbon;
use Cassandra\Date;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use mysql_xdevapi\Exception;
use phpDocumentor\Reflection\DocBlock\Tags\Throws;
use function foo\func;

class CompostImageController extends Controller
{
    public function GetImage($id) {
        $compostImage = CompostImageModel::where('id', $id)->first();

        if($compostImage == null || $compostImage->compostimg_url == null)
            return response('파일 없음', 404);

        return Storage::get($compostImage->compostimg_url);
    }

    public function GetImageClusterList(Request $request, $page) {

        $user = UserModel::select('Users.id', 'token.user_no', 'token.token')->join('token', 'Users.id', 'token.user_no')
            ->where('token', '=', $request->token)->first();

//        $compostImage = CompostImageModel::selectRaw('id, count(*) as count, compostimg_date')
//            ->where('compostimg_userid', '=', $user->id)
//            ->groupByRaw('floor(day(compostimg_date)/3)');
        $dateTable = DateModel::where('date_userid', '=', $user->id)->whereNotNull("date_start")->get()->map(function ($date) {
            $compostTable = CompostImageModel::where("compostimg_userid", "=", $date->date_userid)
                ->whereBetween("compostimg_date", [$date->date_start, $date->date_end])
                ->get()->map(function ($item) {
                    return $item->id;
                });

            $compostid = 0;
            if($compostTable->count() > 0)
                $compostid = $compostTable[0];
            else if($compostTable->count() == 0)
                return null;

            return [
                'id' => $compostid,
                'date' => $date->date_start,
                'members' => $compostTable
            ];
        })->forPage($page, 3);

//        foreach($dateTable as $date) {
//            if($date == 0)
//                $dateTable->pull(0);
//        }
        if($dateTable->count() == 0)
            return response('해당 데이터가 없습니다.', 404);

        return response($dateTable, 200);
    }


    public function UploadImage(Request $request) {

        $path = $request->file('compost')->store('compost');

        $user = UserModel::where('user_machineid', '=', $request->machineid)->first();

        if($user == null)
            return response('해당 기기가 등록된 계정을 찾을 수 없습니다.', 404);

        $result = CompostImageModel::insert([
            'compostimg_userid' => $user->id,
            'compostimg_url' => $path,
        ]);

        if(!$result)
            return response('업로드에 실패하였습니다.', 403);

        return response('업로드 성공', 201);
    }
}
