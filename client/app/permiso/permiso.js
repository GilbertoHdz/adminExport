'use strict';

angular.module('appAdminApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/permiso', {
        templateUrl: 'app/permiso/permiso.html',
        controller: 'PermisoCtrl'
      })
  });