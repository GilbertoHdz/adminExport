'use strict';

angular.module('appAdminApp')
  .controller('PersonaCtrl', function ($scope) {
    $scope.message = 'Hi controller';
    $scope.imageSrc = "";

  }).directive('myUpload', [function () {
    return {
        restrict: 'A',
        div: function (scope, elem, attrs) {
            var reader = new FileReader();
            reader.onload = function (e) {
                scope.imageSrc = e.target.result;
                scope.$apply();
                console.log(scope.imageSrc);
            }

            elem.on('change', function() {
                reader.readAsDataURL(elem[0].files[0]);
            });
        }
    };
}]);
