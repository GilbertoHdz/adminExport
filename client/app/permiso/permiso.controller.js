'use strict';

angular.module('appAdminApp')
  .controller('PermisoCtrl', function ($scope, $http) {
    $scope.message = 'Hello';

    $scope.getPdf = function() {
      $http.get('/api/permisos/getPdf');
    };

  });
