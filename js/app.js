var myApp = angular.module('myApp',['firebase']);

myApp.controller('formCtrl', function ($scope, $firebase) {
    // firebase
    var ref = new Firebase("https://evs.firebaseio.com/");
    var sync = $firebase(ref);
    var formsArray = sync.$asArray();

    $scope.forms = formsArray;

    console.log('forms', formsArray);

    // array of questions
    $scope.questions = [
        "",
        "What is a fish?",
    ];

    $scope.submitForm = function (form) {
        console.log('You sumbitted: ', form);
        formsarray.$add(form).then(function (newChildRef) {
            console.log("added record with id " + newChildRef.name());
        });
        console.log('forms', forms);
        $scope.form = {};      
    };
});