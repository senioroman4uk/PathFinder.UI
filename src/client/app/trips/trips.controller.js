/**
 * Created by Vladyslav on 29.04.2016.
 */

(function () {
    'use strict';

    angular
        .module('app.trips')
        .controller('TripsController', TripsController);

    TripsController.$inject = ['$q', 'logger', 'NgMap', 'tripsService'];
    /* @ngInject */
    function TripsController($q, logger, NgMap, tripsService) {
        var vm = this;

        vm.trip = {
            wayPoints: []
        };
        vm.dateOptions = {
            dateDisabled: false,
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };

        vm.title = 'PathFinder';
        vm.startChanged = function () {
            vm.trip.startPoint = this.getPlace();
        };

        vm.endChanged = function () {
            vm.trip.endPoint = this.getPlace();
        };

        vm.changed = function (_, waypoint) {
            waypoint.place = this.getPlace();
        };

        vm.addWaypoint = function () {
            vm.trip.wayPoints.push({});
        };

        activate();

        function activate() {

            vm.mapProperties = (function () {
                var center = [50.4493021, 30.5229788];
                var zoom = 12;

                return {
                    center: center,
                    zoom: zoom
                };
            }());

            $q.all([prepareMap()]).then(function () {
                logger.info('Activated Trips View');
            });
        }

        function prepareMap() {
            return NgMap.getMap().then(function (map) {
                vm.ngMap = map;
            });
        }

        vm.createTrip = function (trip) {
            tripsService.createTrip(trip).then(function () {
                logger.success('Trip created successfully');
            });
        };

        vm.openDepartureDatePicker = function () {
            vm.departurePickerOpen = true;
        };

        vm.openReturningDatePicker = function () {
            vm.returningDatePickerOpen = true;
        };
    }
})();
