'use strict';

angular.module('appAdminApp')
  .controller('CustomerCtrl', function ($scope, $http, socket, services) {
    $scope.message = '777 Super Fucking Luky';
    services.getCustomers().then(function(data){
		$scope.customers = data.data;
	});

    $scope.exportData = function () {
	
	    //alasql('SELECT name as NAME INTO XLSX("../template.xlsx",{headers:true}) FROM ?',[$scope.customers]);

        //alasql('SELECT * INTO XLSX("customers.xlsx",{headers:true}) FROM HTML("#table1",{headers:true})');
        //alasql('SELECT * INTO XLSX("table.xlsx",{headers:true}) \
        //            FROM HTML("#table1",{headers:true,skipdisplaynone:true})');

	};

  })
  .controller('ListCustomerCtrl', function ($scope, $rootScope, $http, $routeParams, socket, customer, services) {
    	var customerID = ($routeParams.customerID) ? $routeParams.customerID : 0;
		$rootScope.title = (customerID != 0) ? 'Edit Customer' : 'Add Customer';
		$scope.message = $rootScope.title;
		$scope.buttonText = (customerID != 0) ? 'Update Customer' : 'Add New Customer';

		if(customerID != 0){
			var original = customer.data;
			original._id = customerID;
			$scope.customer = angular.copy(original);
			$scope.customer._id = customerID;
        }

		$scope.saveCustomer = function(customer) {
		    if (customerID != 0) {
				services.updateCustomer(customerID, customer);
			} else {
				services.insertCustomer(customer);
		    }
	    };

	    $scope.deleteCustomer = function(customer) {
	      $http.delete('/api/customers/' + customer._id);
	    };

	    $scope.$on('$destroy', function () {
	      socket.unsyncUpdates('customer');
	    });

  }).factory("services", ['$http', function($http) {
		var serviceBase = '/api/customers'
		var obj = {};

	    obj.getCustomers = function(){
	    	return $http.get(serviceBase + '/');
	    }

	    obj.getCustomer = function(id){
	    	return $http.get(serviceBase + '/' + id);
	    }

	    obj.insertCustomer = function (customer) {
	    	return $http.post(serviceBase + '/', {
	    		name: customer.name,
		    	info: customer.info,
		    	author: customer.author,
		    	active: customer.active,
		    	f_ini: customer.f_ini != undefined ? customer.f_ini : undefined,
		    	f_fin: customer.f_fin != undefined ? customer.f_fin : undefined
		    }).then(function (results) {
	    		return results;
	    	});
	    };

	    obj.updateCustomer = function (id,customer) {
	    	return $http.put(serviceBase + '/'+ id, {
	    		name:customer.name,
	    		update:customer.update
	    	}).then(function (status) {
	    		return status.data;
	    	});
	    };

	    obj.deleteCustomer = function (id) {
	    	return $http.delete(serviceBase + '/' + id).then(function (status) {
	    		return status.data;
	    	});
	    };

	    return obj;
	}]);