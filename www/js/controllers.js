﻿angular.module('starter.controllers', [])

.service('rodadaService', function() {
    this.meusPalpites;
})

.service('rankingService', function () {
    this.rankings;
})

.service('bolaoService', function () {
    this.bolao;
})

.service('jogostimeService', function () {
    this.jogostime;
})

.service('palpitadosService', function () {
    this.palpitados;
})

.service('campeonatosService', function () {
    this.campeonatos;
})

.service('transacoesService', function () {
    this.transacoes;
})

.service('aposSubmeterPalpite', function () {
    this.apos;
})

.factory('sessionService',['$http',function($http){
return {
   set:function(key,value){
      return localStorage.setItem(key,JSON.stringify(value));
   },
   get:function(key){
     return JSON.parse(localStorage.getItem(key));
   },
   destroy:function(key){
     return localStorage.removeItem(key);
   },
 };
}])

.factory('urlService', function () {
    //return "http://localhost/penca/public/";
    return "http://www.bolaocraquedebola.com.br/public/";
})

.service('jogosTimeConstructor', function(dataService, dataEncerrado, resultadoFinalService) {
    this.jogosTime = function(jogostime) {
        for (var i = 0; i < jogostime.jogos.length; i = i + 1) {
            

            jogostime.jogos[i].no_encerrado = dataEncerrado.no_encerrado(jogostime.jogos[i]);

            if (angular.isUndefined(jogostime.jogos[i].data_ya_paso)) {
                jogostime.jogos[i].mt_date_new = dataService.data_format(jogostime.jogos[i].mt_date);
            }

            jogostime.ch_nome = jogostime.jogos[i].ch_nome;

            jogostime.jogos[i].data_ya_paso = true;

            var resultado_marcado = false;
            if (jogostime.jogos[i].rs_res1 != null) {
                resultado_marcado = true;
            }
            jogostime.jogos[i].resultado_marcado = resultado_marcado;

            var acertou = resultadoFinalService.resultado_final(jogostime.jogos[i]);
            if (acertou) {
                jogostime.jogos[i].color = "background-color:green !important";
            }
        }
        return jogostime;
    }
})

.service('bolaoServiceConstructor', function (dataService, dataEncerrado, resultadoFinalService) {
    this.bolao = function (bolao) {

        for (var i = 0; i < bolao.rodada.length; i = i + 1) {
            bolao.rodada[i].mt_date_show = bolao.rodada[i].mt_date;
            var date = new Date(bolao.rodada[i].mt_date);
            var no_encerrado = dataEncerrado.no_encerrado(bolao.rodada[i]);

            var resultado_marcado = false;
            if (bolao.rodada[i].rs_res1 != null) {
                resultado_marcado = true;
            }
            bolao.rodada[i].pode_apagar = no_encerrado && resultado_marcado;

            bolao.rodada[i].mt_date_show = dataService.data_format(date);

            bolao.rodada[i].no_encerrado = no_encerrado;
            bolao.rodada[i].vivo = true;
            bolao.rodada[i].data_ya_paso = true;
            bolao.rodada[i].ch_nome = bolao.championship.ch_nome;

            var acertou = resultadoFinalService.resultado_final(bolao.rodada[i]);
            if (acertou) {
                bolao.rodada[i].color = "background-color:green !important";
            }
        }

        for (var i = 0; i < bolao.rondas.length; i = i + 1) {
            if (angular.equals(bolao.rondas[i].rd_id, bolao.n_rodada)) {
                bolao.rodada_sel = bolao.rondas[i];
            }
        }
        //bolao.ch_nome = bolao.championship.ch_nome;

        return bolao;
    }
})

.service('rodadaServiceConstructor', function (dataService, dataEncerrado, resultadoFinalService) {
    this.rodada = function (rodada) {
        for (var i = 0; i < rodada.meusPalpites.palpites.length; i = i + 1) {
            var date = new Date(rodada.meusPalpites.palpites[i].mt_date);            
            rodada.meusPalpites.palpites[i].no_encerrado = dataEncerrado.no_encerrado(rodada.meusPalpites.palpites[i]);
            rodada.meusPalpites.palpites[i].mt_date = dataService.data_format(date);
            rodada.meusPalpites.palpites[i].vivo = true;
            var acertou = resultadoFinalService.resultado_final(rodada.meusPalpites.palpites[i]);
            if (acertou) {
                rodada.meusPalpites.palpites[i].color = "background-color:green !important";
            }
        }

        for (var i = 0; i < rodada.meusPalpites.rondas.length; i = i + 1) {            
            if (angular.equals(rodada.meusPalpites.rondas[i].rd_id, rodada.meusPalpites.n_rodada)) {
                rodada.meusPalpites.rodada_sel = rodada.meusPalpites.rondas[i];
            }
        }

        for (var i = 0; i < rodada.meusPalpites.championships.length; i = i + 1) {
            if (angular.equals(rodada.meusPalpites.championships[i].ch_id, rodada.meusPalpites.champ)) {
                rodada.meusPalpites.ch_nome = rodada.meusPalpites.championships[i].ch_nome;
            }
        }

        var r = rodada.meusPalpites;
        return r;
    }
})

.factory('resultadoFinalService', function () {
    return {
        resultado_final: function (palpite) {
            if (palpite.rs_res1 == palpite.mt_goal1
                && palpite.rs_res2 == palpite.mt_goal2) {
                return true;
            }
            return false;
        }
    }
})

.factory('dataService', ['$filter', 
    function ($filter) {
        return {
            data_format : function (data) {
                var dataFinal = "";
                var date = new Date(data);
                var dia = $filter('date')(date, 'EEE');
                var numDia = $filter('date')(date, 'dd');
                var mes = $filter('date')(date, 'MMM');
                var hora = $filter('date')(date, 'HH:mm');

                if (angular.equals(dia, "Mon")) {
                    dataFinal = "Seg.";
                }
                if (angular.equals(dia, "Tue")) {
                    dataFinal = "Ter.";
                }
                if (angular.equals(dia, "Wed")) {
                    dataFinal = "Qua.";
                }
                if (angular.equals(dia, "Thu")) {
                    dataFinal = "Qui.";
                }
                if (angular.equals(dia, "Fri")) {
                    dataFinal = "Sex.";
                }
                if (angular.equals(dia, "Sat")) {
                    dataFinal = "Sab.";
                }
                if (angular.equals(dia, "Sun")) {
                    dataFinal = "Dom.";
                }

                dataFinal = dataFinal + " " + numDia + " " + mes + " " + hora + "hs";

                return dataFinal;
            }
        }
    }])

.factory('dataEncerrado', ['$filter','dataService', 
    function ($filter, dataService) {
        return {
            no_encerrado : function(palpite) {
                var dateDoJogo = dataService.data_format(palpite.mt_date);

                var dataJogo = new Date(palpite.mt_date);
                var dataAgora = new Date();

                var dataFinal = "";
                var date = new Date(palpite.mt_date);
                var numDia = $filter('date')(date, 'dd');
                var mes = $filter('date')(date, 'MMM');

                var date1 = new Date();
                var numDiaHoje = $filter('date')(date1, 'dd');
                var mesHoje = $filter('date')(date1, 'MMM');

                var no_encerrado = true;
                if (dataJogo < dataAgora) {
                    no_encerrado = false;
                }
                return no_encerrado;
            }
        }
}])



.service('usuarioService', function () {
    var usuario;
    var senha;
    var dinheiro;
    var id;
    var grito;

    this.guardar = function (us, pass, din, id, grito) {
        this.usuario = us;
        this.senha = pass;
        this.dinheiro = din;
        this.id = id;
        this.grito = grito;
    }

    this.getUsuario = function () {
        return usuario;
    }

    this.getSenha = function () {
        return senha;
    }

    this.getDinheiro = function () {
        return dinheiro;
    }
    this.getId = function () {
        return id;
    }
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});
  
    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
            $scope.closeLogin();
        }, 1000);
    };
})

.controller("MenuCtrl", ['$scope', '$http', '$state', '$rootScope', '$ionicHistory', 'usuarioService', 'sessionService',
    function ($scope, $http, $state, $rootScope, $ionicHistory, usuarioService, sessionService) {
        $scope.cash = usuarioService.dinheiro;
        $scope.usuario = usuarioService.usuario;

        $rootScope.$on('atualizar_cash', function (event, data) {
            $scope.cash = data;
        });

        $scope.logout = function () {
            usuarioService.guardar("", "", "","");
            sessionService.set("usuario", null);
            $scope.cash = 0.00;
            $ionicHistory.clearCache();
            $ionicHistory.clearHistory();
            $state.go("login");
        }
}])

.controller('PalpitesCtrl', ['$scope', '$http', '$state', '$filter', '$ionicLoading', 'dataService', 'rodadaService', 'usuarioService', 'urlService', 'bolaoService', 'campeonatosService', 'sessionService',
        function($scope, $http, $state, $filter, $ionicLoading, dataService, rodadaService, usuarioService, urlService, bolaoService, campeonatosService, sessionService) {

            //$ionicLoading.show();

    //        $http.post(urlService + 'mobile/celproximojogos/?', {us_id : usuarioService.id})
    //         .success(function (data) {

    //    $scope.palpites = data;
    //    $scope.limit = 0;

    //    console.log(data);

    //    $scope.alert = function (palpite) {
    //        console.log(palpite);
    //    }

    //    for (var i = 0; i < $scope.palpites.length; i = i + 1) {

    //        var dateDoJogo = dataService.data_format($scope.palpites[i].mt_date);

    //        var dataJogo = new Date($scope.palpites[i].mt_date);
    //        var dataAgora = new Date();

    //        var dataFinal = "";
    //        var date = new Date($scope.palpites[i].mt_date);
    //        var numDia = $filter('date')(date, 'dd');
    //        var mes = $filter('date')(date, 'MMM');

    //        var date1 = new Date();
    //        var numDiaHoje = $filter('date')(date1, 'dd');
    //        var mesHoje = $filter('date')(date1, 'MMM');


    //        var estado = "";
    //        var badget = "";
    //        var no_encerrado = true;
    //        if (numDia == numDiaHoje && mes == mesHoje) {
    //            estado = "Hoje";
    //            badget = "balanced";
    //        }

    //        if (dataJogo < dataAgora) {
    //            estado = "Encerrado";
    //            badget = "assertive";
    //            no_encerrado = false;
    //        }

    //        var palpitado = "";
    //        if ($scope.palpites[i].rs_res1 != null
    //            && $scope.palpites[i].rs_res2 != null) {
    //            palpitado = "Palpitado";
    //        }

    //        $scope.palpites[i].mt_date = dateDoJogo;
    //        $scope.palpites[i].estado = estado;
    //        $scope.palpites[i].badget = badget;
    //        $scope.palpites[i].no_encerrado = no_encerrado;
    //        $scope.palpites[i].palpitado = palpitado;
    //    }
    //    $ionicLoading.hide();
    //});

            $http.get(urlService + 'mobile/cellgetcampeonatosabertos/?')
        .success(function (data) {
            $scope.campeonatos = data;
            campeonatosService.campeonatos = data;
            console.log($scope.campeonatos);
        });


        $scope.doRefresh = function () {
            alert("refersh");
        };


    $scope.setPalpite = function (p) {

        $state.go('app.detail', {
            mt_id: p.mt_id, tm1_logo: p.tm1_logo, tm2_logo: p.tm2_logo, t1nome: p.t1nome, t2nome: p.t2nome,
            ch_id: p.ch_id, ch_nome: p.ch_nome, mt_acumulado: p.mt_acumulado, mt_date: p.mt_date,
            mt_idround: p.mt_idround, mt_idteam1: p.mt_idteam1, mt_idteam2: p.mt_idteam2, mt_round: p.mt_round,
            rd_round : p.rd_round, no_encerrado : p.no_encerrado, rs_res1 : p.rs_res1, rs_res2 : p.rs_res2
        });

    };

    $scope.meuspalpitescampeonato = function (opcao) {
        $ionicLoading.show();
        $http.post(urlService + 'mobile/cellmeuspalpites', { champ: opcao, id: usuarioService.id })
            .success(function (data) {
                rodadaService.meusPalpites = data;
                $ionicLoading.hide();
                $state.go("app.meuspalpitesrodadas");
            });
    }

    $scope.palpitarcampeonato = function (campeonato) {
        $ionicLoading.show();
        $http.post(urlService + '/mobile/cellbolao', { champ: campeonato.ch_id, id: usuarioService.id })
            .success(function (data) {
                bolaoService.bolao = data;
                console.log(bolaoService.bolao);
                $ionicLoading.hide();
                $state.go("app.listjogosrodada");
            });
    }

    $scope.loadMore = function () {

        if (angular.isUndefined($scope.limit)) {
            $scope.limit = 0;
        } else {
            $scope.limit = $scope.limit + 12;
        }

        console.log($scope.limit);

        $http.post(urlService + 'mobile/celproximojogoslimit/?', { us_id: usuarioService.id, limit: $scope.limit })
           .success(function (data) {

               console.log("limit " + $scope.limit);
               console.log(data);
               

               for (var i = 0; i < data.length; i = i + 1) {

                   var dateDoJogo = dataService.data_format(data[i].mt_date);

                   var dataJogo = new Date(data[i].mt_date);
                   var dataAgora = new Date();

                   var dataFinal = "";
                   var date = new Date(data[i].mt_date);
                   var numDia = $filter('date')(date, 'dd');
                   var mes = $filter('date')(date, 'MMM');

                   var date1 = new Date();
                   var numDiaHoje = $filter('date')(date1, 'dd');
                   var mesHoje = $filter('date')(date1, 'MMM');


                   var estado = "";
                   var badget = "";
                   var no_encerrado = true;
                   if (numDia == numDiaHoje && mes == mesHoje) {
                       estado = "Hoje";
                       badget = "balanced";
                   }

                   if (dataJogo < dataAgora) {
                       estado = "Encerrado";
                       badget = "assertive";
                       no_encerrado = false;
                   }

                   var palpitado = "";
                   if (data[i].rs_res1 != null
                       && data[i].rs_res2 != null) {
                       palpitado = "Palpitado";
                   }

                   data[i].mt_date = dateDoJogo;
                   data[i].estado = estado;
                   data[i].badget = badget;
                   data[i].no_encerrado = no_encerrado;
                   data[i].palpitado = palpitado;

                   
               }
               if (angular.isUndefined($scope.palpites)) {
                   $scope.palpites = data;
               } else {
                   $scope.palpites = $scope.palpites.concat(data);
                   //$scope.palpites.push(data[i]);
               }

               $scope.$broadcast('scroll.infiniteScrollComplete');
           });
    }
}])

.controller('CadastroCtrl', function ($scope, $http, $state, $ionicLoading, $ionicPopup, urlService, usuarioService) {

    $scope.cadastro = function (user) {
        $ionicLoading.show();
        var certo = true;
        var mensaje = "";
        console.log(user);
        if (typeof user.usuario == "undefined") {
            certo = false;
            mensaje = "Nome do usuario não pode ter espaços em branco nem caracteres especiais.";
            $ionicLoading.hide();
        }
        if (typeof user.senha == "undefined") {
            certo = false;
            mensaje = "Senha incorrecta.";
            $ionicLoading.hide();
        }
        if (typeof user.email == "undefined") {
            certo = false;
            mensaje = "Email não pode ser vazio.";
            $ionicLoading.hide();
        }
        if (user.niver == null) {
            certo = false;
            mensaje = "Aniversario não pode ser vazio.";
            $ionicLoading.hide();
        }

        if (certo) {
            mensaje = "";
            $http.post(urlService + 'mobile/celcadastro/?', { username: user.usuario, password: user.senha, email: user.email, niver: user.niver, grito: user.grito })
                .success(function (data) {
                    console.log(data);
                    if (data == 200) {

                        $ionicLoading.show();
                        $http.post(urlService + 'mobile/cellogin/?', { us: user.usuario, pass: user.senha })
                            .success(function (data) {
                                console.log(data);
                                if (!data) {
                                    $ionicLoading.hide();
                                    var alertpopup = $ionicPopup.alert({
                                        title: 'Erro!',
                                        template: 'Nome de usuario e/ou senha incorretos.'
                                    });
                                } else {
                                    $scope.time = data;
                                    usuarioService.guardar(data.us_username, data.us_password, data.us_cash, data.us_id, data.us_grito);
                                    $scope.cash = data.us_cash;

                                    $ionicLoading.hide();
                                    $state.go('app.list');
                                }
                            });
                    } else {
                        if (data == 401) {
                            $ionicLoading.hide();
                            var alertpopup = $ionicPopup.alert({
                                title: 'Erro!',
                                template: 'Nome de usuario já existe.'
                            });
                        }
                    }
                });
        } else {
            $scope.error = mensaje;
        }
    }

    $scope.voltarinicio = function () {
        $state.go("login");
    }
})

.controller('MeusPalpitesCtrl', ['$scope', '$http', '$state', '$stateParams', '$filter', '$ionicPopup', '$ionicLoading', 'rodadaService', 'dataService', 'usuarioService', 'urlService', 'rodadaServiceConstructor', 'jogostimeService', 'rankingService', 'palpitadosService',
function ($scope, $http, $state, $stateParams, $filter, $ionicPopup, $ionicLoading, rodadaService, dataService, usuarioService, urlService, rodadaServiceConstructor, jogostimeService, rankingService, palpitadosService) {

        $scope.r = rodadaServiceConstructor.rodada(rodadaService);
        $scope.rodadas = $scope.r.rondas;
        $scope.ch_nome = $stateParams.ch_nome;
        $scope.n_rodada = $scope.r.n_rodada;
        $scope.palpites = $scope.r.palpites;
        $scope.champ = $scope.r.champ;
        $scope.rodada_sel = $scope.r.rodada_sel;
        $scope.ch_nome = $scope.r.ch_nome;
        console.log($scope);

        $scope.selecionarRodada = function () {
            alert($scope.selectedItem.id);
        }

        $scope.rankingrodada = function(mt_round) {
            alert(mt_round);
        }

        $scope.palpitesjogo = function (mt_id, ch_id) {
            $ionicLoading.show();
            $http.post(urlService + 'mobile/cellpalpites', { match : mt_id , champ: ch_id })
                .success(function (data) {
                    palpitadosService.palpitados = data;
                    $ionicLoading.hide();
                    $state.go("app.palpitados");
                });
        }

        $scope.editarpalpite = function (p) {
            $state.go('app.detail', {
                mt_id: p.mt_id, tm1_logo: p.tm1_logo, tm2_logo: p.tm2_logo, t1nome: p.t1nome, t2nome: p.t2nome,
                ch_id: p.ch_id, ch_nome: p.ch_nome, mt_acumulado: p.mt_acumulado, mt_date: p.mt_date,
                mt_idround: p.mt_idround, mt_idteam1: p.mt_idteam1, mt_idteam2: p.mt_idteam2, mt_round: p.mt_round,
                rd_round: p.rd_round, no_encerrado: p.no_encerrado, rs_res1 : p.rs_res1, rs_res2 : p.rs_res2
            });
        }

        $scope.trocarrodada = function (rodada) {
            $http.post(urlService + 'mobile/cellmeuspalpites', { champ: rodada.rd_idchampionship, id: usuarioService.id, rodada : rodada.rd_id })
                .success(function (data) {
                    rodadaService.meusPalpites = data;
                    $scope.r = rodadaServiceConstructor.rodada(rodadaService);
                    $scope.rodadas = $scope.r.rondas;
                    $scope.ch_nome = $stateParams.ch_nome;
                    $scope.n_rodada = $scope.r.n_rodada;
                    $scope.palpites = $scope.r.palpites;
                    $scope.champ = $scope.r.champ;
                    $scope.rodada_sel = $scope.r.rodada_sel;
                    $scope.ch_nome = $scope.r.ch_nome;
                    console.log($scope);
                    if ($scope.palpites.length == 0) {
                        var alertpopup = $ionicPopup.alert({
                            title: 'Aviso!',
                            template: 'Nao existem palpites para esta rodada.'
                        });
                    }
            });
        }

        // Triggered on a button click, or some other target
        $scope.apagar = function (rs_id, ch_id, rd_id, mt_id) {
            $scope.data = {};

            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template:'Deseja apagar o palpite?',
                title: 'Apagar palpite',
                scope: $scope,
                buttons: [                  
                  {
                      text: '<b>Sim</b>',
                      type: 'button-positive',
                      onTap: function (e) {
                            $http.post(urlService + 'mobile/cellexcluirpalpite', { result: rs_id, champ: ch_id, round: rd_id, match: mt_id, user_id : usuarioService.id })
                                .success(function (data) {
                                    //console.log(data);
                                    console.log($scope);
                                    var j = 0;
                                    for (var i = 0; i < $scope.palpites.length; i = i + 1) {
                                        if ($scope.palpites[i].rs_id == rs_id) {
                                            j = i;
                                            //$scope.palpites[i].vivo = false;
                                            //$scope.palpites[i].rs_res1 = null;
                                            //$scope.palpites[i].rs_res2 = null;
                                            //$scope.palpites[i].pode_apagar = false;
                                        }
                                    }
                                    $scope.palpites.splice(j, 1);
                                    //$scope.palpites = $filter('filter')($scope.palpites, { mt_id: j })
                            });
                      }
                  },
                  { text: 'No' }
                ]
            });
        };

        // A confirm dialog
        $scope.showConfirm = function () {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Consume Ice Cream',
                template: 'Are you sure you want to eat this ice cream?'
            });

            confirmPopup.then(function (res) {
                if (res) {
                    console.log('You are sure');
                } else {
                    console.log('You are not sure');
                }
            });
        };

        // An alert dialog
        $scope.showAlert = function () {
            var alertPopup = $ionicPopup.alert({
                title: 'Don\'t eat that!',
                template: 'It might taste good'
            });

            alertPopup.then(function (res) {
                console.log('Thank you for not eating my delicious ice cream cone');
            });
        };

        $scope.ranking_rodada = function (ch_id, rd_id) {
            console.log(ch_id + " - " + rd_id);
            $http.post(urlService + 'mobile/cellrankinground?', { champ: ch_id, round: rd_id })
                .success(function (data) {
                    console.log(data);
                    if (angular.isNumber(data) && data.length > 0) {
                        rankingService.rankings = data;
                        $state.go('app.rankingrodada');
                    } else {
                        var alertpopup = $ionicPopup.alert({
                            title: 'Aviso!',
                            template: 'O Ranking desta rodada está vazio.'
                        });
                    }
                });
        }

    }])

.controller('LoginCtrl', function ($scope, $http, $state, $ionicLoading, $rootScope, $ionicPopup, usuarioService, urlService, sessionService) {

    console.log(sessionService.get("usuario"));

    $scope.loguearse = function () {
        $scope.logon($scope.login.usuario, $scope.login.senha);
    }

    $scope.logon = function (usuario, senha) {
        $ionicLoading.show();

        
        $http.post(urlService + 'mobile/cellogin/?', { us: usuario, pass: senha })
            .success(function (data) {
                console.log(data);
                if (!data) {
                    $ionicLoading.hide();
                    var alertpopup = $ionicPopup.alert({
                        title: 'Erro!',
                        template: 'Nome de usuario e/ou senha incorretos.'
                    });
                } else {
                    $scope.time = data;
                    usuarioService.guardar(data.us_username, data.us_password, data.us_cash, data.us_id, data.us_grito);
                    sessionService.set("usuario", usuarioService);
                    $scope.cash = data.us_cash;
                    $rootScope.$emit('atualizar_cash', $scope.cash);
                    $ionicLoading.hide();
                    $state.go('app.list');
                }
         });

    }

    $scope.forget = function() {
        $ionicPopup.prompt({
            title: 'Resetar senha',
            inputType: 'email',
            inputPlaceholder: 'Qual é seu email?'
        }).then(function (res) {
            $ionicLoading.show();
            $http.post(urlService + 'mobile/cellesqueceusenha/?', { email : res })
                .success(function (data) {
                    $ionicLoading.hide();
                    console.log(data);
                    if (data == 200) {
                        var alertpopup = $ionicPopup.alert({
                            title: 'Exito!',
                            template: 'Email enviado com éxito.'
                        });
                    } else {
                        var alertpopup = $ionicPopup.alert({
                            title: 'Erro!',
                            template: 'O email não existe.'
                        });
                    }
                });
        });
    }

})

.controller('JogoCtrl', function ($scope, $http, $stateParams, $state, $rootScope, $ionicHistory, $ionicLoading, $ionicPopup, dataService, rankingService, urlService, usuarioService, bolaoService, rodadaService, jogostimeService, palpitadosService) {
    $ionicLoading.show();

    $scope.t1nome = $stateParams.t1nome;
    $scope.t2nome = $stateParams.t2nome;
    $scope.tm1_logo = $stateParams.tm1_logo;
    $scope.tm2_logo = $stateParams.tm2_logo;
    $scope.ch_nome = $stateParams.ch_nome;
    $scope.mt_date = $stateParams.mt_date; 
    $scope.mt_id = $stateParams.mt_id;
    $scope.mt_idround = $stateParams.mt_idround;
    $scope.ch_id = $stateParams.ch_id;
    $scope.rd_round = $stateParams.rd_round;
    $scope.no_encerrado = $stateParams.no_encerrado;
    $scope.rs_res1 = parseInt($stateParams.rs_res1);
    $scope.rs_res2 = parseInt($stateParams.rs_res2);
    $scope.mt_acumulado = $stateParams.mt_acumulado;

    $http.post(urlService + 'mobile/cellgetcampeonato/?', { rd_id: $scope.mt_idround, mt_id : $scope.mt_id })
        .success(function (data) {
            $scope.campeonato = data.champ;
            $scope.palpites = data.palpites;
            console.log($scope);
            $ionicLoading.hide();
        });

    $scope.palpitesjogo = function (mt_id, ch_id) {
        $ionicLoading.show();
        $http.post(urlService + 'mobile/cellpalpites', { match : mt_id , champ: ch_id })
            .success(function (data) {
                palpitadosService.palpitados = data;
                $ionicLoading.hide();
                $state.go("app.palpitados");
            });
    }

    $scope.realizar_palpite = function (rs_res1, rs_res2, mt_id, mt_idround, ch_id) {
        if (isFinite(rs_res1) && rs_res1 != null
            && isFinite(rs_res2) && rs_res2 != null) {

            $ionicLoading.show();
            $http.post(urlService + 'mobile/cellsubmeterpalpite/?', { result1: rs_res1, result2: rs_res2, match: mt_id, round: mt_idround, champ: ch_id, us_id : usuarioService.id  })
                .success(function (data) {
                    console.log(data);
                    if (angular.equals(data.sucesso, 200)) {
                        console.log(bolaoService);
                        if (!angular.isUndefined(bolaoService)
                            && !angular.isUndefined(bolaoService.bolao)
                            && !angular.isUndefined(bolaoService.bolao.rodada)) {

                            for (var i = 0; i < bolaoService.bolao.rodada.length; i = i + 1) {
                                if (angular.equals(bolaoService.bolao.rodada[i].mt_id, data.rs_idmatch)) {
                                    bolaoService.bolao.rodada[i].rs_res1 = data.rs_res1;
                                    bolaoService.bolao.rodada[i].rs_res2 = data.rs_res2;
                                    bolaoService.bolao.rodada[i].vivo = false;
                                }
                            }
                        }

                        if (!angular.isUndefined(jogostimeService)
                            && !angular.isUndefined(jogostimeService.jogostime)
                            && !angular.isUndefined(jogostimeService.jogostime.jogos)) {
                            for (var i = 0; i < jogostimeService.jogostime.jogos.length; i = i + 1) {
                                if (angular.equals(jogostimeService.jogostime.jogos[i].mt_id, data.rs_idmatch)) {
                                    jogostimeService.jogostime.jogos[i].rs_res1 = data.rs_res1;
                                    jogostimeService.jogostime.jogos[i].rs_res2 = data.rs_res2;
                                    jogostimeService.jogostime.jogos[i].vivo = true;
                                }
                            }
                        }


                        $ionicLoading.hide();
                        $ionicHistory.goBack();
                        $rootScope.$emit('atualizar_cash', data.total_usuario);
                    }
                    if (angular.equals(data.sucesso, 402)) {

                        if (!angular.isUndefined(rodadaService)
                        && !angular.isUndefined(rodadaService.meusPalpites)
                        && !angular.isUndefined(rodadaService.meusPalpites.palpites)) {
                            for (var i = 0; i < rodadaService.meusPalpites.palpites.length; i = i + 1) {

                                if (angular.equals(rodadaService.meusPalpites.palpites[i].mt_id, data.rs_idmatch)) {
                                    rodadaService.meusPalpites.palpites[i].rs_res1 = data.rs_res1;
                                    rodadaService.meusPalpites.palpites[i].rs_res2 = data.rs_res2;
                                    rodadaService.meusPalpites.palpites[i].vivo = true;
                                }
                            }
                        }

                        if (!angular.isUndefined(bolaoService)
                            && !angular.isUndefined(bolaoService.bolao)
                            && !angular.isUndefined(bolaoService.bolao.rodada)) {

                            for (var i = 0; i < bolaoService.bolao.rodada.length; i = i + 1) {
                                if (angular.equals(bolaoService.bolao.rodada[i].mt_id, data.rs_idmatch)) {
                                    bolaoService.bolao.rodada[i].rs_res1 = data.rs_res1;
                                    bolaoService.bolao.rodada[i].rs_res2 = data.rs_res2;
                                    bolaoService.bolao.rodada[i].vivo = true;
                                }
                            }
                        }
                        if (!angular.isUndefined(jogostimeService)
                            && !angular.isUndefined(jogostimeService.jogostime)
                            && !angular.isUndefined(jogostimeService.jogostime.jogos)) {
                            for (var i = 0; i < jogostimeService.jogostime.jogos.length; i = i + 1) {
                                if (angular.equals(jogostimeService.jogostime.jogos[i].mt_id, data.rs_idmatch)) {
                                    jogostimeService.jogostime.jogos[i].rs_res1 = data.rs_res1;
                                    jogostimeService.jogostime.jogos[i].rs_res2 = data.rs_res2;
                                    jogostimeService.jogostime.jogos[i].vivo = true;
                                }
                            }
                        }

                        $ionicLoading.hide();
                        var alertpopup = $ionicPopup.alert({
                            title: 'Sucesso!',
                            template: 'Palpite alterado.'
                        });
                        $ionicHistory.goBack();


                    }

                    if (angular.equals(data.sucesso, 401)) {
                        $ionicloading.hide();
                        var alertpopup = $ionicpopup.alert({
                            title: 'erro!',
                            template: 'dinheiro insuficente.'
                        });
                    }

            });
        } else {
            $ionicLoading.hide();
            var alertpopup = $ionicPopup.alert({
                title: 'erro!',
                template: 'palpite incorrecto.'
            });
        }
    }

    $scope.ranking_campeonato = function (ch_id) {
        $ionicLoading.show();
        $http.post(urlService + 'mobile/cellrankingcampeonato?', { champ: ch_id })
            .success(function (data) {
                rankingService.rankings = data;
                $ionicLoading.hide();
                $state.go('app.ranking');
            });
    };

    $scope.ranking_rodada = function (ch_id, rd_id, ch_name) {
        $ionicLoading.show();
        $http.post(urlService + 'mobile/cellrankinground?', { champ: ch_id, round: rd_id })
            .success(function (data) {
                console.log(data);
                if (data.length > 0) {
                    rankingService.rankings = data;
                    rankingService.rankings.ch_name = ch_name;
                    $state.go('app.rankingrodada');
                    $ionicLoading.hide();
                } else {
                    $ionicLoading.hide();
                    var alertpopup = $ionicPopup.alert({
                        title: 'Aviso!',
                        template: 'O Ranking desta rodada está vazio.'
                    });
                }
            });
    }
})

.controller('RankingCtrl', function ($scope, $http, $stateParams, $state, dataService, rankingService) {
    var nome_champ = "";
    for (var i = 0; i < rankingService.rankings.length; i = i + 1) {
        rankingService.rankings[i].i = i + 1;
        nome_champ = rankingService.rankings[i].ch_nome;
        rankingService.rankings[i].mt_date = dataService.data_format(rankingService.rankings[i].mt_date);
    }

    $scope.rankings = rankingService.rankings;
    $scope.ch_nome = nome_champ;

    $scope.verusuario = function (userid, username) {

        $state.go('app.perfilusuario', {
            userid: userid,
            username:username
        });

    };

})

.controller('VerCampeonatosParaRankingCtrl', function ($scope, $state, $http, $ionicPopup, urlService, rankingService) {
    $http.get(urlService + 'mobile/cellgetcampeonatos/?')
        .success(function (data) {
            console.log(data);
            $scope.campeonatos = data;
        });

    $scope.selecionarcampeonato = function (campeonato) {
        $http.post(urlService + 'mobile/cellrankingcampeonato/?', {champ : campeonato.ch_id})
            .success(function (data) {
                console.log(data);
                rankingService.rankings = data;
                $state.go("app.ranking");
            });
    };
})

.controller('PalpitadosCtrl', function ($scope, $state, $ionicPopup, usuarioService, palpitadosService, dataService) {
    $scope.results = palpitadosService.palpitados.results;

    if (!angular.isUndefined($scope.results)) {

        for (var i = 0; i < $scope.results.length; i = i + 1) {
            var date = new Date(palpitadosService.palpitados.results[i].mt_date);
            $scope.results[i].mt_date = dataService.data_format(date);
            $scope.rd_round = palpitadosService.palpitados.results[i].rd_round;
            $scope.mt_date = $scope.results[i].mt_date;
        }
        $scope.ch_nome = palpitadosService.palpitados.championship.ch_nome;
        console.log(palpitadosService);

    } else {

        var alertpopup = $ionicPopup.alert({
            title: 'Aviso!',
            template: 'O jogo não teve palpites.'
        });

    }
})

.controller('ListaJogosRodadaCtrl', function ($scope, $http, $stateParams, $state, $filter, $ionicLoading, $ionicPopup, palpitadosService, bolaoService, dataService, bolaoServiceConstructor, urlService, usuarioService, jogostimeService, aposSubmeterPalpite, rankingService) {
    console.log($scope.bolao);
    $scope.bolao = bolaoServiceConstructor.bolao(bolaoService.bolao);
    $scope.ch_nome = $scope.bolao.ch_nome;

    $scope.acumulado = "Bolão acumulado: R$" + $scope.bolao.championship.ch_acumulado; 

    $scope.apagar = function (rs_id, ch_id, rd_id, mt_id) {
        $scope.data = {};

        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
            template: 'Deseja apagar o palpite?',
            title: 'Apagar palpite',
            scope: $scope,
            buttons: [
              {
                  text: '<b>Sim</b>',
                  type: 'button-positive',
                  onTap: function (e) {
                      $http.post(urlService + 'mobile/cellexcluirpalpite', { result: rs_id, champ: ch_id, round: rd_id, match: mt_id, user_id: usuarioService.id })
                          .success(function (data) {


                              $ionicLoading.show();
                              $http.post(urlService + '/mobile/cellbolao', { champ: ch_id, id: usuarioService.id, rodada: rd_id })
                                  .success(function (data) {
                                      bolaoService.bolao = data;
                                      $scope.bolao = bolaoServiceConstructor.bolao(bolaoService.bolao);
                                      $scope.ch_nome = $scope.bolao.ch_nome;
                                      console.log($scope);
                                      $ionicLoading.hide();
                                  });
                          });
                  }
              },
              { text: 'No' }
            ]
        });
    };

    $scope.trocarrodada = function (rodada) {
        $ionicLoading.show();
        $http.post(urlService + '/mobile/cellbolao', { champ: rodada.rd_idchampionship , id: usuarioService.id, rodada : rodada.rd_id })
            .success(function (data) {
                bolaoService.bolao = data;
                $scope.bolao = bolaoServiceConstructor.bolao(bolaoService.bolao);
                $scope.ch_nome = $scope.bolao.ch_nome;
                $ionicLoading.hide();
            });
    }

    $scope.setPalpite = function (p) {
        if (p.no_encerrado) {
            $state.go('app.detail', {
                mt_id: p.mt_id, tm1_logo: p.tm1_logo, tm2_logo: p.tm2_logo, t1nome: p.t1nome, t2nome: p.t2nome,
                ch_id: p.mt_idchampionship, ch_nome: p.ch_nome, mt_acumulado: p.mt_acumulado, mt_date: p.mt_date,
                mt_idround: p.mt_idround, mt_idteam1: p.mt_idteam1, mt_idteam2: p.mt_idteam2, mt_round: p.mt_round,
                rd_round: p.rd_round, no_encerrado: p.no_encerrado, rs_res1 : p.rs_res1, rs_res2 : p.rs_res2
            });
        }
    }

    $scope.jogos_do_time = function (time, ch_id) {
        $ionicLoading.show();
        $http.post(urlService + "/mobile/cellteam", { team: time.tm_id, champ : ch_id, us_id : usuarioService.id })
            .success(function (data) {
                jogostimeService.jogostime = data;
                $ionicLoading.hide();
                $state.go("app.jogostime");
            });
    }


    $scope.palpitesjogo = function (mt_id, ch_id) {
        console.log("match " + mt_id);
        console.log("champ " + ch_id);
        $ionicLoading.show();
        $http.post(urlService + 'mobile/cellpalpites', { match: mt_id, champ: ch_id })
            .success(function (data) {
                palpitadosService.palpitados = data;
                $ionicLoading.hide();
                $state.go("app.palpitados");
            });
    }

    $scope.ranking_rodada = function (ch_id, rd_id, ch_name) {
        $http.post(urlService + 'mobile/cellrankinground?', { champ: ch_id, round: rd_id })
            .success(function (data) {
                if (data.length > 0) {
                    rankingService.rankings = data;
                    rankingService.rankings.ch_name = ch_name;
                    $state.go('app.rankingrodada');
                } else {
                    var alertpopup = $ionicPopup.alert({
                        title: 'Aviso!',
                        template: 'O Ranking desta rodada está vazio.'
                    });
                }
            });
    }

})

.controller('JogosTimeCtrl', function ($scope, $http, $state, $ionicLoading, $ionicPopup, rankingService, palpitadosService, jogostimeService, bolaoServiceConstructor, urlService, usuarioService, dataService, dataEncerrado, jogosTimeConstructor) {

    $scope.jogosTime = jogosTimeConstructor.jogosTime(jogostimeService.jogostime);
    console.log("jogos time");
    console.log($scope.jogosTime);

    $scope.setPalpite = function (p) {
        if (p.no_encerrado) {
            $state.go('app.detail', {
                mt_id: p.mt_id, tm1_logo: p.tm1_logo, tm2_logo: p.tm2_logo, t1nome: p.t1nome, t2nome: p.t2nome,
                ch_id: p.mt_idchampionship, ch_nome: p.ch_nome, mt_acumulado: p.mt_acumulado, mt_date: p.mt_date_new,
                mt_idround: p.mt_idround, mt_idteam1: p.mt_idteam1, mt_idteam2: p.mt_idteam2, mt_round: p.mt_round,
                rd_round: p.rd_round, no_encerrado: p.no_encerrado, rs_res1 : p.rs_res1, rs_res2 : p.rs_res2
            });
        }
    }

    $scope.ranking_rodada = function (ch_id, rd_id, ch_name) {
        console.log(ch_id + " - " + ch_name);
        $http.post(urlService + 'mobile/cellrankinground?', { champ: ch_id, round: rd_id })
            .success(function (data) {
                console.log(data);
                if (data.length > 0) {
                    rankingService.rankings = data;
                    rankingService.rankings.ch_name = ch_name;
                    $state.go('app.rankingrodada');
                } else {
                    var alertpopup = $ionicPopup.alert({
                        title: 'Aviso!',
                        template: 'O Ranking desta rodada está vazio.'
                    });
                }
            });
    }

    $scope.palpitesjogo = function (mt_id, ch_id) {
        $ionicLoading.show();
        $http.post(urlService + 'mobile/cellpalpites', { match : mt_id , champ: ch_id })
            .success(function (data) {
                palpitadosService.palpitados = data;
                $ionicLoading.hide();
                $state.go("app.palpitados");
            });
    }
})

.controller("RankingRodadaCtrl", function ($scope, $http, $stateParams, $state, dataService, rankingService) {
    console.log(rankingService);
    if (!angular.isUndefined(rankingService.rankings)) {
        var rd_round = "";
        for (var i = 0; i < rankingService.rankings.length; i = i + 1) {
            rankingService.rankings[i].i = i + 1;
            rd_round = rankingService.rankings[i].rd_round;
            rankingService.rankings[i].mt_date = dataService.data_format(rankingService.rankings[i].mt_date);
        }

        $scope.rankings = rankingService.rankings;
        $scope.ch_nome = rankingService.rankings.ch_name;
        $scope.rd_round = rd_round;
    }

    $scope.verusuario = function (usuario,us_username, grito) {

        $state.go('app.perfilusuario', {
            userid: usuario, username: us_username, grito: grito
        });

    };
})

.controller("TransacoesCtrl", function ($scope, $state, $http, $ionicLoading, campeonatosService, usuarioService, urlService, transacoesService) {
    $scope.campeonatos = campeonatosService.campeonatos;
    console.log(campeonatosService);
    //console.log($scope);
    $ionicLoading.show();
    $http.post(urlService + '/mobile/cellrankingusuario', { us_id : usuarioService.id })
           .success(function (data) {
               console.log(data);
               $scope.ranking = data.ranking;
               $ionicLoading.hide();
    });


    $scope.transacoescampeonato = function (ch_id) {
        console.log("campeonato " + ch_id);
        $ionicLoading.show();
        $http.post(urlService + '/mobile/celltransacoes', { us_id : usuarioService.id,  campeonato: ch_id, rodada: "Vazio" })
           .success(function (data) {
               transacoesService.transacoes = data;
               console.log(data);
               $ionicLoading.hide();
               $state.go("app.transacoescampeonato");               
           });

    }
})

.controller("TransacoesCampeonatoCtrl", function ($scope, $http, usuarioService, transacoesService) {
    $scope.transacoes = transacoesService.transacoes;
    $scope.trs = $scope.transacoes.transactions;
    for (var i = 0 ; i < $scope.transacoes.champs.length; i = i + 1) {
        if (angular.equals($scope.transacoes.champ, $scope.transacoes.champs[i].ch_id)) {
            $scope.ch_nome = $scope.transacoes.champs[i].ch_nome;
        }
    }
    $scope.rodadas = transacoesService.transacoes.rondas;
    console.log($scope);

    $scope.trocarrodada = function (rodada_sel) {
        console.log(rodada_sel);
        $scope.transacoes = transacoesService.transacoes;
        $scope.trs = [];
        for (var i = 0; i < $scope.transacoes.transactions.length; i = i + 1) {
            if (angular.equals(rodada_sel.rd_id, $scope.transacoes.transactions[i].rd_id)) {
                $scope.trs.push($scope.transacoes.transactions[i]);
            }
        }
    }
})

.controller("CaixaCtrl", function($scope, $http, $window, $location, urlService) {
    $scope.opcion = function (op) {

        $location.path('http://www.bolaocraquedebola.com.br');

        //$http.post(urlService + '/mobile/cellplano', { p : op })
        //    .success(function (data) {
        //        console.log(data);
        //        $window.location.href = data.url;
        //});

        //var serializedData = { token: '6363C4111D064931A0CC0F0330849143', email: 'martin@dymenstein.com', currency: 'BRL', itemId1: '0001', itemDescription1: 'Plano 1', itemAmount1: '10.80', itemQuantity1: '1', itemWeight1: '1000' };

        //$http({
        //    method: 'POST',
        //    url: 'https://ws.pagseguro.uol.com.br/v2/checkout',
        //    data: {
        //        token: '6363C4111D064931A0CC0F0330849143',
        //        email: 'martin@dymenstein.com',
        //        currency: 'BRL',
        //        itemId1: '0001',
        //        itemDescription1: 'Plano 1',
        //        itemAmount1: '10.80',
        //        itemQuantity1: '1',
        //        itemWeight1: '1000'
        //    },
        //    headers: {
        //        'Content-Type': 'application/x-www-form-urlencoded'
        //    }}).then(function(result) {
        //        console.log(result);
        //    }, function(error) {
        //        console.log(error);
        //    });
    }
})



.controller('CampeonatosCtrl', ['$scope', '$http', '$state', '$filter', '$ionicLoading', 'dataService', 'rodadaService', 'usuarioService', 'urlService', 'bolaoService', 'campeonatosService',
        function($scope, $http, $state, $filter, $ionicLoading, dataService, rodadaService, usuarioService, urlService, bolaoService, campeonatosService) {
            $ionicLoading.show();
            $http.post(urlService + 'mobile/cellgetcampeonatos?')
                .success(function (data) {
                    $scope.emandamento = [];
                    $scope.encerrados = [];
                    for (var i = 0; i < data.length; i = i + 1) {
                        if (data[i].ch_ativo == 1) {
                            $scope.emandamento.push(data[i]);
                        } else {
                            $scope.encerrados.push(data[i]);
                        }
                    }
                    $ionicLoading.hide();
                    console.log($scope);
                });

            $scope.palpitarcampeonato = function (ch_id) {
                $ionicLoading.show();
                $http.post(urlService + '/mobile/cellbolao', { champ: ch_id, id: usuarioService.id })
                    .success(function (data) {
                        bolaoService.bolao = data;
                        console.log(bolaoService.bolao);
                        $ionicLoading.hide();
                        $state.go("app.listjogosrodada");
                    });
            }

        }])


.controller('shareCtrl',['$scope',function($scope) {
   $scope.whatsappShare=function(){
       window.plugins.socialsharing.shareViaWhatsAppToReceiver(receiver, 'Message via WhatsApp', null /* img */, null /* url */, function () { console.log('share ok') });
  }
   $scope.twitterShare=function(){
    window.plugins.socialsharing.shareViaTwitter('Digital Signature Maker', null /* img */, 'https://play.google.com/store/apps/details?id=com.prantikv.digitalsignaturemaker', null, function(errormsg){alert("Error: Cannot Share")});
  }
   $scope.OtherShare=function(){
     window.plugins.socialsharing.share('Digital Signature Maker', null, null, 'https://play.google.com/store/apps/details?id=com.prantikv.digitalsignaturemaker');
  }

}])



.controller("MeuPerfilCtrl", function ($scope, $http, $ionicLoading, $location, urlService, usuarioService) {

    $ionicLoading.show();
    $scope.user = usuarioService.usuario;
    $scope.grito = usuarioService.grito;
    console.log("s");
    console.log(usuarioService);
    $scope.cash = usuarioService.dinheiro;
    $http.post(urlService + 'mobile/cellpalpitesusuario?', {user : usuarioService.id})
        .success(function (data) {
            $scope.resultados = data;
            $scope.resultados.porcentajeacertos = ($scope.resultados.acertos * 100) / $scope.resultados.palpitados;

            $ionicLoading.hide();
        });

    $scope.trocarsenha = function (u) {
        $ionicLoading.show();
        if (!angular.equals(u.atualsenha, usuarioService.senha)) {
            $scope.error = "Senha incorreta"
        }
        else if (angular.isUndefined(u.newpass, "")) {
            $scope.error = "Nova senha incorreta"
        }
        else if (!angular.equals(u.newpass, u.confirmpass)) {
            $scope.error = "Nova senha e confirmação são diferentes"
        } else {
            $http.post(urlService + 'mobile/celleditsenha?', { userId: usuarioService.id, novasenha: u.newpass })
                .success(function (data) {
                    if (data == 200) {
                        $scope.error = "";
                        alert("Senha trocada com éxito");
                    } else {
                        $scope.error = "Erro: Tente novamente o envie um email a contato";
                    }
                });
        }
        $ionicLoading.hide();
    }

    $scope.trocargrito = function (us_grito) {
        $http.post(urlService + 'mobile/celleditgrito?', { userId: usuarioService.id, grito: us_grito })
            .success(function (data) {
                console.log(data);
                if (data == 200) {
                    $scope.error = "";
                    alert("Grito de Guerra trocado com éxito");
                } else {
                    $scope.error = "Erro: Tente novamente o envie um email a contato";
                }
            });
    }
})


.controller("InicioCtrl", function ($scope, $http, $ionicLoading, $state, urlService, usuarioService, sessionService) {

    $ionicLoading.show();


    $scope.logon = function (usuario, senha) {


        $http.post(urlService + 'mobile/cellogin/?', { us: usuario, pass: senha })
            .success(function (data) {
                console.log(data);
                if (!data) {
                    $ionicLoading.hide();
                    var alertpopup = $ionicPopup.alert({
                        title: 'Erro!',
                        template: 'Nome de usuario e/ou senha incorretos.'
                    });
                } else {
                    $scope.time = data;
                    usuarioService.guardar(data.us_username, data.us_password, data.us_cash, data.us_id, data.us_grito);
                    sessionService.set("usuario", usuarioService);
                    $scope.cash = data.us_cash;

                    $ionicLoading.hide();
                    $state.go('app.list');
                }
            });

    }

    var usuario = sessionService.get("usuario");
    if (usuario != null) {
        $scope.logon(usuario.usuario, usuario.senha);
    } else {
        $ionicLoading.hide();
        $state.go("login");
    }

})

.controller("PerfilUsuarioCtrl", function ($scope, $state, $http, $ionicLoading, urlService, usuarioService, sessionService) {

    $ionicLoading.show();

    $http.post(urlService + 'mobile/cellpalpitesusuario/?', { user: $state.params.userid })
           .success(function (data) {
               $ionicLoading.hide();
               console.log($state);
               $scope.resultados = data;
               $scope.username = $state.params.username;
               $scope.grito = $state.params.grito;
           });

   

})

