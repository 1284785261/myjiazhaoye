﻿"use strict";function UserController(){}function EncryptedController(e){e.encrypt=function(){var t=new JSEncrypt;t.setPublicKey(e.pubkey),e.encrypted=t.encrypt(e.phone+";"+e.pwd)},e.decrypt=function(){var t=new JSEncrypt;t.setPrivateKey(e.prikey),e.uncrypted=t.decrypt(e.encrypted)}}angular.element(document).ready(function(){var e=angular.module("airZuche",["ngRoute"]);e.config(["$routeProvider","$httpProvider",function(e){e.when("/",{title:"空中租车",templateUrl:"views/home.html"}).when("/user",{title:"个人中心",templateUrl:"views/user.html"}).when("/order",{title:"订单",templateUrl:"views/order.html"}).when("/test",{title:"encrypted",templateUrl:"views/test.html",controller:EncryptedController}).otherwise({redirectTo:"/"})}]),e.run(["$rootScope","$http","$route","$location",function(e,t,r){e.$on("$routeChangeSuccess",function(){e.pageTitle=r.current.title})}]),angular.bootstrap(document,["airZuche"])}),EncryptedController.$inject=["$scope"];
