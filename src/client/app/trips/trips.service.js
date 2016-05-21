/**
 * Created by Vladyslav on 30.04.2016.
 */

(function() {
    'use strict';

    angular
        .module('app.trips')
        .factory('tripsService', TripsService);

    TripsService.$inject = ['$http', 'routes'];

    function TripsService($http, routes) {
        function createTrip(trip) {
            return $http({
                method: 'POST',
                url: routes.createTrip,
                data: trip
            });
        }

        return {
            createTrip: createTrip
        };
    }
})();
