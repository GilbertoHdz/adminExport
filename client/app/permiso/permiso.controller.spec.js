'use strict';

describe('Controller: PermisoCtrl', function () {

  // load the controller's module
  beforeEach(module('appAdminApp'));

  var PermisoCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PermisoCtrl = $controller('PermisoCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
