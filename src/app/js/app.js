/*! Grunt, Gulp, and Broccoli Workshop by Jason Lengstorf */
'use strict';
(function(){

    var app = angular.module('gruntGulpBroccoliWorkshop', ['ngRoute']);
    app.config(function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {
                templateUrl: '/views/main.html',
                controller: 'MonsterCtrl'
            })
            .when('/monster/:name', {
                templateUrl: '/views/monster.html',
                controller: 'MonsterCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });

    app.factory('Page', function(){
        var title = 'Meet the Monsters';
        return {
            title: function() { return title; },
            setTitle: function(newTitle) { title = newTitle; }
        };
    });

}.call(this));
