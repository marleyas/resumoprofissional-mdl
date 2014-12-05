/*
 RESUMO PROFISSIONAL
 (c) 2014 Marley Adriano de Souza Silva - <marleyas@gmail.com>
 License: MIT
*/

'use strict';

var App = angular.module('AppMod', ['ngRoute', 'ngAnimate', 'firebase']);

App.factory('contato',[function(){
  return{ 
    nome: '',
    email: '',
    mensagem: '',
    showForm: false,
    hideForm: true
  };
}]);

App.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'FormCtrlr'
      }).
      when('/form', {
        templateUrl: 'partials/form.html',
        controller: 'FormCtrlr'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);  
      
  App.controller("FormCtrlr", function($scope, $firebase, $route, $routeParams, $location, contato) { 
    $scope.contato = contato;
    
    $scope.tabs = [{
            title: 'Desenvolvedor Web',
            url: 'partials/web.html'
        }, {
            title: 'Eletrotécnico',
            url: 'partials/eletro.html'
        }, {
            title: 'Gestor Público',
            url: 'partials/gestao.html',
        }, {
            title: 'Assistente Social',
            url: 'partials/social.html'
    }];

    $scope.currentTab = 'partials/web.html';

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.url;
    };
    
    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
    };    
    
    $scope.validaForm = function(){    
      var _ref = new Firebase("https://marleysilva.firebaseio.com/contato");
      var _sync = $firebase(_ref);      
      _sync.$push($scope.contato).then(function(newChildRef) {        
        if(newChildRef.key()){
          $scope.contato.hideForm = false;
          window.setTimeout($scope.returnToHome(), 1000);
        }
      });         
    };

    $scope.returnToHome = function(){
      $location.path('/home');
      $scope.contato.showForm = true;
    };
    
    $scope.scrollToTop = function(){    
      $('html, body').animate({
        scrollTop: $("#bandLink").offset().top
      }, 2000);
    };
    
    $scope.scrollToBottom = function(){
      $('html, body').animate({
        scrollTop: $("#textAtualized").offset().top      
      }, 2000);
      $('#formNome').focus();
    };
    
    $scope.$on('$viewContentLoaded', function() {      
      if($scope.contato.showForm){
        window.scrollTo(0, 1400);
      }
    });
    
  });       

  App.controller('CreditsCtrl', function($scope, $timeout){    

    $scope.tecnologias = [{
        src: 'img/HTML5.png',
        url: 'http://www.w3.org/html/wg/drafts/html/master/',
        name: 'HTML'
      }, {
        src: 'img/JavaScript.png',
        url: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript',
        name: 'Javascript'
      }, {
        src: 'img/CSS3.png',
        url: 'http://www.w3c.br/divulgacao/pdf/guia-css-w3cbr.pdf',
        name: 'CSS'
      }, {
        src: 'img/angular.png',
        url: 'https://angularjs.org/',
        name: 'AngularJS - HTML enhanced for web apps!'
      }, {
        src: 'img/firebase.png',
        url: 'https://www.firebase.com/',
        name: 'Firebase - Build Realtime Apps'
      }, {
        src: 'img/bootstrap.png',
        url: 'http://getbootstrap.com/',
        name: 'Bootstrap - The most popular HTML, CSS, and JS framework'
      }];
   
  });