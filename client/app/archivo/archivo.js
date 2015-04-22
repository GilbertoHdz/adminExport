'use strict';

angular.module('appAdminApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/archivo', {
        templateUrl: 'app/archivo/archivo.html',
        controller: 'ArchivoCtrl'
      })
  });