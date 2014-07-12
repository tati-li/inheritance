/**
 * Created by ТАНЯ on 04.05.14.
 */
var myApp = angular.module('MyAppl', []);

myApp.factory('Data', function(){
    return {message: "I'm new string"}
});
myApp.filter('reversed', function(Data){
    return function(text){
        return text.split('').reverse().join('') + Data.message
    }
})
function firstCtrl($scope, Data){
    $scope.data = Data;
}
function secondCtrl($scope, Data){
    $scope.data = Data;

    $scope.reversedMessage = function(message){
        return message.split('').reverse().join('') + message;
    }
}

function thirdCtrl($scope, Data){
    $scope.data = Data;
}