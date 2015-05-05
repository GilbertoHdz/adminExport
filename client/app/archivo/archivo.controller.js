'use strict';

angular.module('appAdminApp')
  .controller('ArchivoCtrl', function ($scope, $upload, servicesHttp) {

  	$scope.imageSrc = "";

    servicesHttp.getArchivos().then(function(data){
		$scope.listaArchivos = data.data;
	});

  	$scope.subir = function (archivos) {
  		if(archivos && archivos != undefined && archivos.files.length) {
		    carga(archivos.files);
		}
	    $scope.archivo = undefined; 
  	}

    function carga (archivos) {
        for (var i = 0; i < archivos.length; i++) {
             var file = archivos[i];

    		$upload.upload({
                url: '/api/archivos/',
                name: 'remasterizado',
                file: file
           }).progress(function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                 	console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name + '\n' + $scope.log);
            }).success(function (data, status, headers, config) {
                //$scope.log = 'file ' + config.file.name + 'uploaded. Response: ' + JSON.stringify(data) + '\n' + $scope.log;
            	servicesHttp.getArchivos().then(function(data){
					$scope.listaArchivos = data.data;
				});
            });

        }
    };

}).factory("servicesHttp", ['$http', function($http) {
		var serviceBase = '/api/archivos'
		var obj = {};

	    obj.getArchivos = function(){
	    	return $http.get(serviceBase);
	    }

	    obj.insertArchivo = function (archivo) {
	    	return $http.post(serviceBase + '/', {
	    		name: archivo.name,
		    	img: archivo.type
		    }).then(function (results) {
	    		return results;
	    	});
	    };

	    obj.getArchivo = function (id) {
	    	return $http.get(serviceBase + '/' + id);
	    };


	    return obj;

}]).directive('myUpload', [function () {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            var reader = new FileReader();
            reader.onload = function (e) {
                scope.imageSrc = e.target.result;
                scope.$apply();
            }

            elem.on('change', function() {
                reader.readAsDataURL(elem[0].files[0]);
            });
        }
    };
}]);