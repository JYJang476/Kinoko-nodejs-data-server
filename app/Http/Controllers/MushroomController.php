<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\MushroomModel;
use Validator;

class MushroomController extends Controller
{
    // 새로운 버섯을 추가
    public function AddMushRoom(Request $request) {
        // 유효성 검사
        $validator = Validator::make($request->all(),[
            "prgId" => "required",
        ]);

        if($validator->fails())
            return response($validator->errors(), 400);

        $result = MushroomModel::insert([
            'mr_prgid' => $request->prgId,
            'mr_size' => 0,
            'mr_imgid' => 0
        ]);

        if(!$result)
            return response("버섯 추가 실패", 403);

        return reponse("추가 성공", 201);
    }

    // 버섯 생장률 설정
    function SetGrowthRate(Request $request) {
        // 유효성 검사
        $validator = Validator::make($request->all(),[
            "id" => "required", // 버섯 id
            "value" => "required",
        ]);

        if($validator->fails())
            return response($validator->errors(), 400);
        // 버섯 테이블 불러오기
        $mush = MushroomModel::where('id', '=', $request->id);

        if($mush->count() == 0)
            return response('해당 버섯 없음', 404);
        // 값 수정
        $result = $mush->update([
            "mr_growthrate" => $request->value
        ]);
        // 예외 처리
        if(!$result)
            return response('수정 실패', 403);
        // 성공
        return response('성공', 200);
    }

    // 사이즈를 설정
    function SetSize(Request $request) {
        // 유효성 검사
        $validator = Validator::make($request->all(),[
            "id" => "required", // 버섯 id
            "value" => "required", // 값
        ]);

        if($validator->fails())
            return response($validator->errors(), 400);

        // 버섯 테이블 불러오기
        $mush = MushroomModel::where('id', '=', $request->id);
        // 예외 처리
        if($mush->count() == 0)
            return response('해당 버섯 없음', 404);
        // 값 수정
        $result = $mush->update([
            "mr_size" => $request->value
        ]);
        // 예외 처리
        if(!$result)
            return response('수정 실패', 403);
        // 성공
        return response('성공', 200);
    }

    public function GetMushRoomAll(Request $request) {
        $validator = Validator::make($request->all(),[
            "prgId" => "required",
        ]);

        if($validator->fails())
            return response($validator->errors(), 400);

        $mushroom = MushroomModel::where('mr_prgid', '=', $request->prgId);

        if($mushroom->count() == 0)
            return response('해당 데이터를 찾지 못했습니다.', 404);

        return response($mushroom->get()->toArray(), 200);
    }

    public function GetMushRoom(Request $request, $type) {
        $validator = Validator::make($request->all(),[
            "prgId" => "required",
        ]);

        if($validator->fails())
            return response($validator->errors(), 400);

        $mushroom = MushroomModel::where([
            'mr_prgid' => $request->prgId,
            'mr_status' => $type
        ]);

        if(!$mushroom)
            return response('해당 데이터를 찾지 못했습니다.', 404);

        return response($mushroom->get()->toArray(), 200);
    }

    public function GetMushForStatus($prgId, $status='growing')
    {

        $mushrooms = MushroomModel::where([
            'mr_status' => $status,
            'mr_prgid' => $prgId
        ]);

        return response($mushrooms->toArray(), 200);
    }
}
