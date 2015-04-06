'use strict';

//angular.module('appAdminApp')
//  .directive('customer', function () {
//    return {
//      templateUrl: 'app/customer/customer.html',
//      restrict: 'EA',
//      link: function (scope, element, attrs) {
//      }
//    };
//  });

angular.module('appAdminApp')

//Datepicker
.directive("mydatepicker", function(){
  return {
    restrict: "E",
    scope:{
      ngModel: "=",
      dateOptions: "=",
      opened: "=",
    },
    link: function($scope, element, attrs) {
      $scope.open = function(event){
        console.log("open");
        event.preventDefault();
        event.stopPropagation();
        $scope.opened = true;
      };

      $scope.clear = function () {
        $scope.ngModel = null;
      };
    },
    templateUrl: 'app/customer/dir-customer.html'
  }
})
.config(function($datepickerProvider) {
    angular.extend($datepickerProvider.defaults, {
      dateFormat: 'dd/MM/yyyy',
      startWeek: 1
    });
});