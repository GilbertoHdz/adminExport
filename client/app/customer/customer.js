'use strict';

angular.module('appAdminApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/customer', {
        templateUrl: 'app/customer/customer.html',
        controller: 'CustomerCtrl'
      })
      .when('/edit-customer/:customerID', {
        templateUrl: 'app/customer/edit-customer.html',
        controller: 'ListCustomerCtrl',
        resolve: {
          customer: function(services, $route){
            var customerID = $route.current.params.customerID;
              if(customerID != 0){
                return services.getCustomer(customerID);
              } else {return ;}
          }
        }
      }).when('/customer/archivo', {
        templateUrl: 'app/customer/customer.html',
        controller: 'CustomerCtrl',
        resolve: {
          customer: function(services, $route){
              return services.getExcel();
          }
        }
      });
  });
