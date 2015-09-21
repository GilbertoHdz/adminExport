'use strict';

angular.module('appAdminApp')
.controller('PersonaListCtrl', function ($scope, servHttp) {
    $scope.message = 'Hi List controller';

    servHttp.getListPersons().then(function(data){
        $scope.listaPersonas = data.data;
    });

}).controller('PersonaListDetalleCtrl', function ($scope, servHttp, persona) {
    $scope.message = 'Hi List Detalle controller';
    console.log(persona.data);

}).controller('PersonaCtrl', function ($scope, $upload, servHttp) {
    $scope.message = 'Hi controller';
    //$scope.imageSrc = "";
    $scope.skill = [];
    $scope.count = 0;

    $scope.agrgarSkill = function(addSkill) {
        if (addSkill === undefined) return false;
            $scope.skill.push({nSkill:addSkill, index: $scope.count++});
            $scope.addSkill = undefined;
    }

    $scope.savePerson = function(person) {
        if (person === undefined) return false;
        person['skills'] = $scope.skill;
        //person['archivos'] = $scope.archivo.files;
        person['img'] = $scope.imageSrc;

        //servHttp.insertPerson(person);
        carga (person);
    };


    function carga (archivos) {
        console.log(archivos);

        $upload.upload({
            url: '/api/personas/',
            name: 'remasterizado',
            data: archivos,
            file: $scope.archivo.files
        })
        .progress(function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name + '\n' + $scope.log);
        })
        .success(function (data, status, headers, config) {
            //$scope.log = 'file ' + config.file.name + 'uploaded. Response: ' + JSON.stringify(data) + '\n' + $scope.log;
            //servicesHttp.getArchivos().then(function(data){
            //        $scope.listaArchivos = data.data;
            //});
        });

    };

}).factory("servHttp", ['$http', function($http) {
    var serviceBase = '/api/personas'
    var obj = {};

    obj.getListPersons = function(){
        return $http.get(serviceBase);
    }

    obj.getByPerson = function(id){
        return $http.get(serviceBase + '/' + id);
    }


    obj.insertPerson = function (person) {
        console.log(person);
        
        return $http.post(serviceBase + '/', {
            name: person.name,
            info: person.info,
            skills: person.skills,
            img: person.img,
            archivo: person.archivos
        }).then(function (results) {
            return results;
        });
    };

    obj.updatePerson = function (id, person) {
        return $http.put(serviceBase + '/'+ id, {
            name: person.name,
            update: person.update
        }).then(function (status) {
            return status.data;
        });
    };

    obj.deletePerson = function (id) {
        return $http.delete(serviceBase + '/' + id).then(function (status) {
            return status.data;
        });
    };

    return obj;

}]).directive('myUpload', [function () {
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