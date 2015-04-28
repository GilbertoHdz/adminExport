'use strict';

angular.module('appAdminApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Customer',
      'link': '/customer'
    },{
      'title': 'Documento',
      'link': '/permiso'
    },{
      'title': 'Archivo',
      'link': '/archivo'
    },{
      'title': 'Datos',
      'link': '/persona'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });