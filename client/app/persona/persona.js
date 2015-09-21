'use strict';

angular.module('appAdminApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/persona', {
        templateUrl: 'app/persona/persona.html',
        controller: 'PersonaCtrl'
      })
      .when('/list-persona', {
        templateUrl: 'app/persona/persona-list.html',
        controller: 'PersonaListCtrl'
      })
      .when('/list-detalle/:personID', {
        templateUrl: 'app/persona/detalle-list.html',
        controller: 'PersonaListDetalleCtrl',
        resolve: {
          persona: function(servHttp, $route){
            var personID = $route.current.params.personID;
                return servHttp.getByPerson(personID);
          }
        }
      })
  });