/* global toastr:false, moment:false */
(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('toastr', toastr)
        .constant('moment', moment)
        .constant('routes', (function () {
            var base = 'http://localhost:58877/api/v1';

            var trips = '/trips';

            return {
                createTrip : base + trips
            };
        })());
})();
