// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
// 09876angular.module('starter', ['ngCordova'])
angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers','ngSanitize'])


.run(function($ionicPlatform,$rootScope,$location,$ionicModal,$ionicPopup) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
  
  	  
	$rootScope.forget_password=function (){	
	$ionicPopup.show({
	template: 'Enter your email address below.<label class="item item-input" style="  height: 34px; margin-top: 10px;"><input  type="email"  /></label>',
	title: 'Forget Password',
	subTitle: ' ',
	scope: $rootScope,
	buttons: [
	{text: '<b>Send</b>',
	type: 'button-positive'},
	{ text: 'Cancel' ,
	type: 'button-positive'},
	
	]
	});	 
	};
	

   $rootScope.changestatus=function(item){
	   if(item.type==1) item.type=2
	   else item.type=1
  }
 $rootScope.goto=function(url){
	 $location.path(url)
	 }
  $rootScope.gotolistPage=function(index){
	   $rootScope.activitytab=index;
	$rootScope.goto('/app/list')
	 }
	 
	 
	//  $rootScope.logout=function(){
	//  $rootScope.activeselect_tab=1;
	//$rootScope.goto('/login')
	// }
  $rootScope.activitytab=1;
  $rootScope.activeselect_tab=1;	 
	 
  $rootScope.select_tab=function(index){
	   $rootScope.activeselect_tab=index;
}

  
  $rootScope.message=[{id:"1",img:"img/011.png",title:"Leonardo"},{id:"2",img:"img/def.png",title:"Anna Bomato"}]
  
  $rootScope.discover=[{id:"1",img:"img/011.png",type:"0"},{id:"2",img:"img/022.png",type:"0"},{id:"3",img:"img/033.png",type:"0"},{id:"4",img:"img/011.png",type:"0"},{id:"5",img:"img/022.png",type:"0"}]
  $rootScope.items=[{id:"1",img:"img/011.png",type:"1"},{id:"2",img:"img/022.png",type:"0"},{id:"3",img:"img/033.png",type:"1"}]
  $rootScope.activity=[{id:"1",img:"img/l1.png",title:"BUSTOP Brand Identity"},{id:"2",img:"img/l2.png",title:"The emoji redesign project"},{id:"3",img:"img/l3.png",title:"The emoji redesign project"},{id:"3",img:"img/l1.png",title:"The emoji redesign project"}]
  $rootScope.setting=[{title:"Random news"},{title:"Local news"},{title:"Sport news"},{title:"Notification allert"}]	

$rootScope.active_icon=function(type){
	if(type=='fav')  $rootScope.coloractive_fav=!$rootScope.coloractive_fav;
	else if(type=='mark')  $rootScope.coloractive_mark=!$rootScope.coloractive_mark;
	else if(type=='font')  $rootScope.coloractive_font=!$rootScope.coloractive_font;
	else if(type=='share')  $rootScope.coloractive_share=!$rootScope.coloractive_share;
	} 		
	
	
	  /*************************************upload_img.html******************/
	$ionicModal.fromTemplateUrl('templates/upload_img.html',function(modal){
	$rootScope.upload_img=modal;
	}, {
		scope: $rootScope,
		animation: 'slide-in-up'
	});
	
	$rootScope.openupload_img = function(){
		$rootScope.upload_img.show();
	};
	
	$rootScope.closeupload_img = function() {	
		$rootScope.upload_img.hide();
	};
	$rootScope.$on('$destroy', function() {
		$rootScope.upload_img.remove();
	});
	$rootScope.$on('modal.hidden', function() {
    // Execute action
  });
 /*************************************sub_modal.html******************/
  /*************************************search_modal.html******************/
	$ionicModal.fromTemplateUrl('templates/search_modal.html',function(modal){
	$rootScope.search_modal=modal;
	}, {
		scope: $rootScope,
		animation: 'slide-in-up'
	});
	
	$rootScope.opensearch_modal= function(){
		$rootScope.search_modal.show();
	};
	
	$rootScope.closesearch_modal= function() {	
		$rootScope.search_modal.hide();
	};
	$rootScope.$on('$destroy', function() {
		$rootScope.search_modal.remove();
	});
	$rootScope.$on('modal.hidden', function() {
    // Execute action
  });
 /*************************************search_modal.html******************/

})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
	$ionicConfigProvider.backButton.text('').previousTitleText('')  ;
	$stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })
    .state('app.rankinglistacampeonato', {
        url: "/rankinglistacampeonato",
        abstract: true,
        templateUrl: "templates/rankinglistacampeonato.html",
        controller: 'AppCtrl'
    })


          .state('app.rankingrodada', {
              url: "/rankingrodada",
              views: {
                  'menuContent': {
                      templateUrl: "templates/rankingRodada.html"
                  }
              }
          })

  .state('app.profile', {
    url: "/profile",
    views: {
      'menuContent': {
        templateUrl: "templates/profile.html"
      }
    }
  })
  .state('app.meusboloes', {
      url: "/meusboloes",
      views: {
          'menuContent': {
              templateUrl: "templates/meusboloes.html"
          }
      }
  })

  .state('app.entrarbolao', {
      url: "/detail/:idpenca",
      views: {
          'menuContent': {
              templateUrl: "templates/entrarbolao.html"
          }
      }
  })

  .state('app.meusboloescriar', {
      url: "/meusboloescriar",
      views: {
          'menuContent': {
              templateUrl: "templates/meusboloescriar.html"
          }
      }
  })

  .state('app.bolao', {
      url: "/bolao",
      views: {
          'menuContent': {
              templateUrl: "templates/bolao.html"
          }
      }
  })

  .state('app.confirmaremail', {
      url: "/confirmaremail",
      views: {
          'menuContent': {
              templateUrl: "templates/confirmaremail.html"
          }
      }
  })

  .state('app.browse', {
    url: "/browse",
    views: {
      'menuContent': {
        templateUrl: "templates/browse.html"
      }
    }
  })
 .state('login', {
    url: "/login",
        templateUrl: "templates/login.html"
 })
         .state('blanco', {
             url: "/blanco",
             templateUrl: "templates/blanco.html"
         })
  .state('register', {
    url: "/register",
        templateUrl: "templates/register.html"
  })
    .state('app.list', {
      url: "/list",
      views: {
        'menuContent': {
          templateUrl: "templates/list.html"
        }
      }
    })
	  .state('app.detail', {
	      url: "/detail/:t1nome/:t2nome/:ch_id/:ch_nome/:mt_acumulado/:mt_date/:mt_id/:mt_idround:/:mt_idteam1/:mt_idteam2/:mt_round/:tm1_logo/:tm2_logo/:rd_round/:no_encerrado/:rs_res1/:rs_res2/:pn_id",
      views: {
        'menuContent': {
          templateUrl: "templates/detail.html"
        }
      }
    })
	.state('app.contact', {
      url: "/contact",
      views: {
        'menuContent': {
          templateUrl: "templates/contact.html"
        }
      }
	})
	.state('app.listjogosrodada', {
	    url: "/listjogosrodada",
	    views: {
	        'menuContent': {
	            templateUrl: "templates/listjogosrodada.html"
	        }
	    }
	})
	.state('app.jogostime', {
	    url: "/jogostime",
	    views: {
	        'menuContent': {
	            templateUrl: "templates/jogostime.html"
	        }
	    }
	})
	.state('app.setting', {
      url: "/setting",
      views: {
        'menuContent': {
          templateUrl: "templates/setting.html"
        }
      }
    })
	  .state('app.add_post', {
      url: "/add_post",
      views: {
        'menuContent': {
          templateUrl: "templates/add_post.html"
        }
      }
    })
	 .state('app.message', {
      url: "/message",
      views: {
        'menuContent': {
          templateUrl: "templates/message.html"
        }
      }
	 })
	 .state('app.caixa', {
	     url: "/caixa",
	     views: {
	         'menuContent': {
	             templateUrl: "templates/caixa.html"
	         }
	     }
	 })
	 .state('app.campeonatos', {
	     url: "/campeonatos",
	     views: {
	         'menuContent': {
	             templateUrl: "templates/campeonatos.html"
	         }
	     }
	 })
	 .state('app.vercampeonatospararanking', {
	     url: "/vercampeonatospararanking",
	     views: {
	         'menuContent': {
	             templateUrl: "templates/vercampeonatospararanking.html"
	         }
	     }
	 })
	 .state('app.ranking', {
	     url: "/ranking",
	     views: {
	         'menuContent': {
	             templateUrl: "templates/ranking.html"
	         }
	     }
	 })
	 .state('app.transacoescampeonato', {
	     url: "/transacoescampeonato",
	     views: {
	         'menuContent': {
	             templateUrl: "templates/transacoescampeonato.html"
	         }
	     }
	 })
	 .state('app.transacoes', {
	     url: "/transacoes",
	     views: {
	         'menuContent': {
	             templateUrl: "templates/transacoes.html"
	         }
	     }
	 })
	 .state('app.msg_detail', {
      url: "/msg_detail",
      views: {
        'menuContent': {
          templateUrl: "templates/msg_detail.html"
        }
      }
    })
.state('app.meuspalpitesrodadas', {
    url: "/meuspalpitesrodadas/:ch_nome",
    views: {
        'menuContent': {
            templateUrl: "templates/meuspalpitesrodadas.html"
        }
    }
})

.state('app.meuperfil', {
    url: "/meuperfil",
    views: {
        'menuContent': {
            templateUrl: "templates/meuperfil.html"
        }
    }
})

        .state('app.perfilusuario', {
            url: "/perfilusuario/:userid/:username/:grito",
            views: {
                'menuContent': {
                    templateUrl: "templates/perfilusuario.html"
                }
            }
        })

.state('app.palpitados', {
    url: "/palpitados",
    views: {
        'menuContent': {
            templateUrl: "templates/palpitados.html"
        }
    }
})


.state('app.blanco', {
    url: "/blanco",
    views: {
        'menuContent': {
            templateUrl: "templates/blanco.html"
        }
    }
})

    .state('app.share', {
        url: "/share",
        views: {
            'menuContent': {
                templateUrl: "templates/share.html",
                controller: 'shareCtrl'
            }
        }
    })

  .state('app.single', {
    url: "/playlists/:playlistId",
    views: {
      'menuContent': {
        templateUrl: "templates/playlist.html",
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/blanco');
});