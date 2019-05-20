(function() {
    'use strict';
    var app = angular.module('app');

    var factoryId = 'rankingFct';
    app.factory(factoryId, [function() {
        return {
            rankingList: [],
            initial: function() {
                
                var pessoaRankingInicial = {
                    nome : "Aluan",
                    rodadasFeitas: 27 
                };
                
                this.rankingList.push(pessoaRankingInicial);
            },
            getRanking: function(){
                console.log(this.rankingList);
                
                 return this.rankingList;
            },
            saveRanking: function(nome, rodadasFeitas){
                var pessoaRanking = {
                    nome: nome,
                    rodadasFeitas: rodadasFeitas
                };

                this.rankingList.push(pessoaRanking);
                
                return this.rankingList;
            }
        };
    }]);

})();