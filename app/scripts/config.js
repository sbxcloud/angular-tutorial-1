'use strict';
(function(angular){
    angular
        .module('library')
        .config(['$stateProvider', '$urlRouterProvider', Appconfig]);

        function Appconfig($stateProvider, $urlRouterProvider){

            $urlRouterProvider
                .otherwise('/');

            $stateProvider
                .state('home',{
                    url:'/',
                    templateUrl:'list.html',
                    controller:'listCtrl',
                    controllerAs:'list'
                })
                .state('detail',{
                    url:'/detail/:key',
                    templateUrl:'detail.html',
                    controller:'detailCtrl',
                    controllerAs:'obj'
                });

        };


})(angular);