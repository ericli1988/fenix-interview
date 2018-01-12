var app = angular.module('basicApp', []);
app.controller('homeController', function ($scope, $http) {
   $scope.AccountNumber = "";
   $scope.PaymentReference = "";
   $scope.PaymentDate = "";
   $scope.PaymentAmount = "";
   $scope.status = "";
   
   
   $scope.submit = function() {
	 $scope.status = "";
	 var data = $.param({
                accountNumber: $scope.accountNumber,
                paymentReference: $scope.paymentReference,
				paymentDate: $scope.paymentDate,
				paymentAmount: $scope.paymentAmount

     });

	 $http.post('http://localhost:3001', data, config)
	   .then(
		   function(response){
			 // success callback
			 $scope.status = "Successfully paid";
		   }, 
		   function(response){
			 // failure callback
			 $scope.status = "fail to pay.";
		   }
		);  
   }
   
   
});
