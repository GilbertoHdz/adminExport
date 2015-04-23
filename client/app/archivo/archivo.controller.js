'use strict';

angular.module('appAdminApp')
  .controller('ArchivoCtrl', function ($scope, $upload, servicesHttp) {
    $scope.message = 'Hello Controller';

    $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });

    servicesHttp.getArchivos().then(function(data){
    	//angular.forEach(data.data, function(archivo, idx){
    	//	//var base64data = new Buffer(archivo.img.data.data, 'binary').toString('base64');
		//	//	console.log(base64data);
	    //  console.log('*-------*');
	    ////  console.log(archivo.img.data.data);
	    ////  console.log(archivo.img.contentType);
	    ////  console.log('///////');
	    //    console.log(archivo.img.data.data.toString('base64'));
	    //});

    	console.log(data.data);
		//$scope.customers = data.data;
	});

 

	//servicesHttp.getArchivo('55383953452456dc1ac8953f').then(function(data){
	//	$scope.img = data.data;
	//	console.log(data);
	//});
 
    $scope.upload = function (files) {

        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                console.log(file);

                $upload.upload({
                    url: '/api/archivos/',
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                	data = {name: 'asdasd'}
                    console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                });
            }
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