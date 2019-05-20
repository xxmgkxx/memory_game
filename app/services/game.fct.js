(function() {
    'use strict';
    var app = angular.module('app');

    var factoryId = 'GameFct';
    app.factory(factoryId, ['MESSAGE', 'rankingFct', function(mensagem, RankingFct) {
        var cartasNome = ['ADePaus', '2DePaus', '3DePaus', '4DePaus', '5DePaus', '6DePaus', '7DePaus', '8DePaus', '9DePaus', '10DePaus'];
        var vm = this;
        RankingFct.initial();
        
        function Carta(nome) {
            this.nome = nome;
            this.virada = false;
        }
    
        Carta.prototype.virar = function() {
            this.virada = !this.virada;
        };

        vm.Game = function(cartas){
            this.iniciarGame = function(cartas) {
                var cartasNoDeck = criarDeck(cartas);
                this.gameGanhou = false;
                this.quantidadeDeJodadas = 0;
    
                this.rankingListaPessoa = RankingFct.getRanking();
                
                
                this.grid = fazerGrid(cartasNoDeck);
                this.mensagem = mensagem.CLICK;
                this.unmatchedPairs = cartas.length;
            };

            this.iniciarGame(cartas);

            this.saveRanking = function(nomeParticiante, quantidadeDeRodadas) { 
                RankingFct.saveRanking(nomeParticiante, quantidadeDeRodadas);
                
                this.iniciarGame(cartas);
            };            

            this.virarCarta = function(carta) {
                if (carta.virada) {
                    return;
                }    
                carta.virar();
                
                this.quantidadeDeJodadas++;
                this.quantidadeDeRodadas = this.quantidadeDeJodadas/2;
                
                if (!this.primeiraEscolha || this.segundaEscolha) {
    
                    if (this.segundaEscolha) {
                        this.primeiraEscolha.virar();
                        this.segundaEscolha.virar();
                        this.primeiraEscolha = this.segundaEscolha = undefined;
                    }
    
                    this.primeiraEscolha = carta;
                    this.mensagem = mensagem.ONE_MORE;
    
                } else {    
                    if (this.primeiraEscolha.nome === carta.nome) {
                        this.unmatchedPairs--;
                        
                        if(this.unmatchedPairs > 0) {
                            this.mensagem = mensagem.MATCH;
                        } else { 
                            this.mensagem = mensagem.WON; 
                            this.gameGanhou = true;
                        }
                        this.primeiraEscolha = this.segundaEscolha = undefined;
                    } else {
                        this.segundaEscolha = carta;
                        this.mensagem = mensagem.MISS;
                    }
                }
            };
        };
        
        function criarDeck(cartasNome) {
            var cartasNoDeck = [];
            cartasNome.forEach(function(name) {
                cartasNoDeck.push(new Carta(name));
                cartasNoDeck.push(new Carta(name));
            });

            return cartasNoDeck;
        }

        function fazerGrid(cartasNoDeck) {
            var gridDimension = Math.sqrt(cartasNoDeck.length),
                grid = [];

            for (var row = 0; row < gridDimension; row++) {
                grid[row] = [];
                for (var col = 0; col < gridDimension; col++) {
                    var carta = spliceCardRan(cartasNoDeck);
                    if(!angular.isUndefined(carta)) 
                        grid[row][col] = carta;
                }
            }
            return grid;
        }


        function spliceCardRan(cartasNoDeck) {
            var cartaSelectionada = Math.floor(Math.random()*cartasNoDeck.length);
            
            return cartasNoDeck.splice(cartaSelectionada, 1)[0];
        }

        return new vm.Game(cartasNome);        
    }]);        
})();