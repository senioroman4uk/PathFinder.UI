(function () {
    'use strict';

    angular.module('app', [
        'app.core',
        'app.widgets',
        'app.admin',
        'app.dashboard',
        'app.layout',
        'app.trips',
        'dndLists',
        'google.places',
        'ngMap',
        'ui.bootstrap'
    ]).config(config);

    config.$inject = ['$httpProvider'];

    function config($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
})();
