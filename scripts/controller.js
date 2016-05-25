"use strict";

angular.module("MyModule")

    .controller('Ctrl4', ['$scope', '$http', function ($scope, $http) {
        
        $scope.addCashFlowFields = function(){
            if($scope.years > 100){
            } else {
                $scope.cashFlowsArray = [];
                for (var i=0; i < $scope.years; ++i){
                    $scope.cashFlowsArray.push({});
                }
            }
        };
        
        $scope.sendPost = function(){
            if($scope.cashFlowsArray === undefined){
                console.log("Missing fields");
            } else {
                var cashFlow = [];
                for (var i=0; i < $scope.cashFlowsArray.length; ++i){
                    cashFlow.push($scope.cashFlowsArray[i].value);
                }
                $http({
                    url: 'http://localhost:3000/npv',
                    method: "POST",
                    data: {
                        "discountRate": $scope.discountRate,
                        "initialInvestment": $scope.initialInvestment,
                        "years": $scope.years,
                        cashFlow
                    },
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function (data, status, headers, config) {
                    $scope.npv = data;
                    console.log(data); // browser console.log
                });
            }
        };    
    }]);