(function(angular){
    angular
        .module('library')
        .controller('detailCtrl',['$scope','common',detailCtrl]);

        function detailCtrl($scope, common){
            const obj = this, fac = common;

            function init(){

            }

            init();

        }

})(angular);