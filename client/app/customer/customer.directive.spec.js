'use strict';

describe('Directive: customer', function () {

  // load the directive's module and view
  beforeEach(module('appAdminApp'));
  beforeEach(module('app/customer/customer.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<customer></customer>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the customer directive');
  }));
});