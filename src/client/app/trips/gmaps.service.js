/**
 * Created by Vladyslav on 16.05.2016.
 */

(function () {
    angular
        .module('app.trips')
        .factory('gmapsService', GmapsService);

    GmapsService.$inject = ['$q'];

    function GmapsService($q) {
        var geocoder = new google.maps.Geocoder();

        function getAddress(latLng) {
            var deferred = $q.defer();

            geocoder.geocode({location: latLng}, geoCodecb);
            return deferred.promise;

            function geoCodecb(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    deferred.resolve(results[0].formatted_address);// jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
                }
                else {
                    deferred.reject(status);
                }
            }
        }

        return {
            getAddress: getAddress
        };
    }
})();
