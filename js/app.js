var myApp = angular.module('myApp',['firebase']);

myApp.controller('formCtrl', function ($scope, $firebase) {
    // firebase
    var ref = new Firebase("https://evs.firebaseio.com/");
    var sync = $firebase(ref);
    var formsArray = sync.$asArray();

    $scope.forms = formsArray;

    $scope.revealText = false;

    console.log('forms', formsArray);

    var initForm = function () {
        return {
            person: {
                firstname: "",
                lastname: "",
                email: "",
            },
            questions: [
                {question: "Do you consider the small scale fishery that you are studying, economically viable", type: 'boolean'}
                // these questions must be completed
            ],
        };
    };

    $scope.formObj = initForm();

    $scope.submitForm = function (formObj) {
        var isDupe = false;
        angular.forEach($scope.forms, function(value, key) {
            //console.log('formObj.person.email', formObj.person.email);
            //console.log('value.person.email', value.person.email);
            isDupe = (formObj.person.email == value.person.email) ? true : false;
        });
        if (!isDupe) {
            var formComplete = angular.copy(formObj);
            formsArray.$add(formComplete).then(function (newChildRef) {
                console.log("added record with id " + newChildRef.name());
            });
        } else {
            console.log('email address already used.');
        }
        // return form to virgin state
        $scope.formObj = initForm();

        // reset reveal text
        $scope.revealText = false;
    };
});