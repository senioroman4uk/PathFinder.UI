/**
 * Created by Vladyslav on 29.04.2016.
 */

(function() {
    'use strict';

    angular
        .module('app.trips')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'trips',
                config: {
                    url: '/trips',
                    templateUrl: 'app/trips/trips.html',
                    controller: 'TripsController',
                    controllerAs: 'vm',
                    title: 'trips',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-dashboard"></i> Trips'
                    }
                }
            }
        ];
    }
})();
