(function() {
    'use strict';
    var app = angular.module('app');

    app.factory('game', ['MESSAGE', function(mensagem) {
        var cartasNome = ['ADePaus', '2DePaus', '3DePaus', '4DePaus', '5DePaus', '6DePaus',
        '7DePaus', '8DePaus', '9DePaus', '10DePaus'];
        var vm = this;


        function Carta(nome) {
            this.nome = nome;
            this.virada = false;
        }
    
        Carta.prototype.virar = function() {
            this.virada = !this.virada;
        };
        
        vm.Game = function(){
            var cartasNoDeck = criarDeck(cartasNome);

            this.grid = fazerGrid(cartasNoDeck);
            this.mensagem = mensagem.CLICK;
            this.unmatchedPairs = cartasNome.length;
    
            this.virarCarta = function(carta) {
                if (carta.virada) {
                    return;
                }
    
                carta.virar();
    
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
                        this.mensagem = (this.unmatchedPairs > 0) ? mensagem.MATCH : mensagem.WON;
                        this.primeiraEscolha = this.segundaEscolha = undefined;
                    } else {
                        this.segundaEscolha = carta;
                        this.mensagem = mensagem.MISS;
                        }
                    }
                };
            };
        
        /* Create an array with two of each tileName in it */
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
                    grid[row][col] = removeRandomTile(cartasNoDeck);
                }
            }
            return grid;
        }


        function removeRandomTile(cartasNoDeck) {
            var cartaSelectionada = Math.floor(Math.random()*cartasNoDeck.length);
            return cartasNoDeck.splice(cartaSelectionada, 1)[0];
        }

        return new vm.Game(cartasNome);        
    }]);        
})();