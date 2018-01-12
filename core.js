var app = angular.module('basicApp', []);
app.controller('homeController', function ($scope, $http) {
   //form fields
   $scope.AccountNumber = "1";
   $scope.PaymentReference = "2";
   $scope.PaymentDate = "3";
   $scope.PaymentAmount = "4";
   
   $scope.status = ""; //display status of whether payment is successful
   
   //button click
   $scope.submit = function() {
		$scope.status = "";
		 /*var data = $.param({
	                accountNumber: $scope.AccountNumber,
	                paymentReference: $scope.PaymentReference,
					paymentDate: $scope.PaymentDate,
					paymentAmount: $scope.PaymentAmount

	     });
		*/
		
		//var data = "test";
		var myObj = { accountNumber: $scope.AccountNumber,
	                  paymentReference: $scope.PaymentReference,
					  paymentDate: $scope.PaymentDate,
					  paymentAmount: $scope.PaymentAmount };
		var data = JSON.stringify(myObj);


		var config = {
	        headers : {
	             'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
	        }
	    }

		 $http.post('http://localhost:3001', myObj)
		   .then(
			   function(response){
				 // success callback
				 console.log(data);
				 $scope.status = "Successfully paid";
			   }, 
			   function(response){
				 // failure callback
				 $scope.status = "fail to pay.";
			   }
			);  
	   }
   
   
});
