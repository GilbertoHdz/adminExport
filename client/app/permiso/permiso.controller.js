'use strict';

angular.module('appAdminApp')
  .controller('PermisoCtrl', function ($scope, $http) {
    $scope.message = 'Hello';

    $scope.getPdf = function() {
      //$http.get('/api/permisos/getPdf');

       var pom = document.createElement('a'); 
       pom.setAttribute('href', 'api/permisos/getPdf'); 
       pom.setAttribute('download', ''); //Colocar para que no aparesca esta leyenda en el consol "http://localhost:3000/customers/excel".
       pom.click();

       console.log('pdf');

    };

  });
