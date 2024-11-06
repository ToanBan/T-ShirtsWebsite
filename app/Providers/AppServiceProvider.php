<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Http\Middleware\CheckAdmin;
use App\Http\Middleware\CheckOrderSuccess;
use Illuminate\Support\Facades\Route;
use Laravel\Cashier\Cashier;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Route::aliasMiddleware('admin', CheckAdmin::class);
        Cashier::calculateTaxes();
        Route::aliasMiddleware('checkOrderSuccess', CheckOrderSuccess::class);
    }
}
