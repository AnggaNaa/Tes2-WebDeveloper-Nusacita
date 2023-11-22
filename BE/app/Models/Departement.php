<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Departement extends Model
{
    use HasFactory;
    use softDeletes;

    protected $dates = ['deleted_at'];
    protected $keyType = 'uuid';
    public $incrementing = false;
    protected $primaryKey = 'id';
    protected $table = 'm_departements';

    protected $fillable = [
        'id',
        'name',
        'slug',
        'created_at',
        'updated_at',
        'deleted_at',
        'unit_id'
    ];

    public function unit()
    {
        return $this->belongsTo(Unit::class);
    }

}
