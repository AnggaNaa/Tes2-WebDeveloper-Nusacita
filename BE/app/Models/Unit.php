<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Unit extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $date = ['deleted_at'];
    protected $keyType = 'uuid';
    public $incrementing = false;
    protected $primaryKey = 'id';
    protected $table = 'm_units';

    protected $fillable = [
        'id',
        'name',
        'slug',
        'created_at',
        'updated_at',
        'deleted_at'

    ];

    public function Departement()
    {
        return $this->hasMany(Departement::class);
    }

}
