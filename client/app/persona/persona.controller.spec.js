'use strict';

describe('Controller: PersonaCtrl', function () {

  // load the controller's module
  beforeEach(module('appAdminApp'));

  var PersonaCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PersonaCtrl = $controller('PersonaCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
