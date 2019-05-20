(function() {
    'use strict';

    var app = angular.module('app');

    app.constant('MESSAGE', {
        CLICK: 'Selecione a sua primeira carta',
        ONE_MORE: 'Selecione a próxima carta.',
        MISS: 'Errado! Tente novamente selecionando uma nova carta.',
        MATCH: 'Boa! Continue assim.',
        WON: 'Ganhou! <a href="#">Jogar novamente</a>'
    });
        

})();