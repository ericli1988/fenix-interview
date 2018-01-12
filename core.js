var app = angular.module('basicApp', []);
app.controller('homeController', function ($scope, $http) {
   //form fields
   $scope.AccountNumber = "a11235";
   $scope.PaymentReference = "x2b2v";
   $scope.PaymentDate = "2018-01-12";
   $scope.PaymentAmount = "10";
   
   $scope.status = ""; //display status of whether payment is successful
   
   //button click
   $scope.submit = function() {
		$scope.status = "";
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
		
		//post to second node.js application hosted on port 3001
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
