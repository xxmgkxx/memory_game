(function(){
    'use strict';

    var app = angular.module('app');

    /* Business Logic in game factory: app/services/game.fct.js */
    var controllerId = 'GameCtrl';
    app.controller(controllerId, ['$scope', 'game', function($scope, game) {
            $scope.game = game;
        }
    ]);    
})();