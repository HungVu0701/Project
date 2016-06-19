<?php

namespace Visionone\Providers;

use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        // homebook
        $this->app->bind(
            'Visionone\Repositories\InformRepositoryInterface',
            'Visionone\Repositories\Eloquent\InformRepository'
        );
        $this->app->bind(
            'Visionone\Repositories\RoomRepositoryInterface',
            'Visionone\Repositories\Eloquent\RoomRepository'
        );
        $this->app->bind(
            'Visionone\Repositories\ResidentRepositoryInterface',
            'Visionone\Repositories\Eloquent\ResidentRepository'
        );
        $this->app->bind(
            'Visionone\Repositories\FeeRepositoryInterface',
            'Visionone\Repositories\Eloquent\FeeRepository'
        );
        // homebook

        $this->app->bind(
            'Visionone\Repositories\UserRepositoryInterface',
            'Visionone\Repositories\Eloquent\UserRepository'
        );
        $this->app->bind(
            'Visionone\Repositories\LicenseRepositoryInterface',
            'Visionone\Repositories\Eloquent\LicenseRepository'
        );
        $this->app->bind(
            'Visionone\Repositories\SubAdminRepositoryInterface',
            'Visionone\Repositories\Eloquent\SubAdminRepository'
        );
        $this->app->bind(
            'Visionone\Repositories\ConfigurationRepositoryInterface',
            'Visionone\Repositories\Eloquent\ConfigurationRepository'
        );
    }
}
