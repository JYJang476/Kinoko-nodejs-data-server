<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DateModel extends Model
{
    protected $table = 'Dates';
    protected $primaryKey = 'date_id';
    public $timestamps = false;

    protected $fillable = [
        'date_userid', 'date_start', 'date_start', 'date_end', 'date_prgid'
    ];

    public function users() {
        return $this->belongsTo('App\UserModel', 'date_userid');
    }
}
