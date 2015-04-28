'use strict';

angular.module('appAdminApp')
  .controller('ArchivoCtrl', function ($scope, $upload, servicesHttp) {
    $scope.message = 'Hello Controller';
    $scope.esOculto = false;

    //$scope.$watch('files', function () {
  	//	if ($scope.files != undefined) { $scope.esOculto = false;}
    //});

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
            }).success(function (data, status, headers, config) {
                //console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                //console.log('success');
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
	}]);