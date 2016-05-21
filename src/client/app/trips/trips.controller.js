/**
 * Created by Vladyslav on 29.04.2016.
 */

(function () {
    'use strict';

    angular
        .module('app.trips')
        .controller('TripsController', TripsController);

    TripsController.$inject = ['$q', 'logger', 'NgMap', 'gmapsService'];
    /* @ngInject */
    function TripsController($q, logger, NgMap, gmapsService) {
        var vm = this;
        var geocoder = new google.maps.Geocoder();

        vm.trip = {};
        vm.dateOptions = {
            dateDisabled: false,
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };
        vm.markers = [];
        vm.wayPoints = [];

        vm.title = 'PathFinder';
        vm.startChanged = function () {
            vm.trip.startPoint = this.getPlace();
        };

        vm.endChanged = function () {
            vm.trip.endPoint = this.getPlace();
        };

        vm.dragEnd = function () {
            // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
            var length = this.directions.routes[0].overview_path.length;
            var start = this.directions.routes[0].overview_path[0];
            var end = this.directions.routes[0].overview_path[length - 1];
            // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

            $q.all([
                gmapsService.getAddress({lat: start.lat(), lng: start.lng()}),
                gmapsService.getAddress({lat: end.lat(), lng: end.lng()})
            ]).then(function (addresses) {
                vm.startAddress = addresses[0];
                vm.endAddress = addresses[1];
            });
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

        function watchCoordinates(markerIndex) {
            return function (newValue, oldValue) {
                var type = typeof newValue;
                if (type !== 'object') {
                    return;
                }
                console.log(newValue);

                vm.markers[markerIndex] = {
                    id: markerIndex,
                    latitude: newValue.geometry.location.lat(),
                    longitude: newValue.geometry.location.lng(),
                    title: markerIndex
                };
            };
        }

        vm.createTrip = function (trip) {
            trip.directions = JSON.stringify(vm.ngMap.directionsRenderers[0].directions);
            console.log(trip);
            // console.log(trip);
        };

        vm.openDepartureDatePicker = function () {
            vm.departurePickerOpen = true;
        };

        vm.openReturningDatePicker = function () {
            vm.returningDatePickerOpen = true;
        };
    }
})();
