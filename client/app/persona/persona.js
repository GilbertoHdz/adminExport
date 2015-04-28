'use strict';

angular.module('appAdminApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/persona', {
        templateUrl: 'app/persona/persona.html',
        controller: 'PersonaCtrl'
      })
  });