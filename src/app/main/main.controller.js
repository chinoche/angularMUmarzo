(function() {
  'use strict';

  angular
    .module('auth')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr, authService, $log) {
    var vm = this;

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1457930117364;
    vm.showToastr = showToastr;
    vm.login = Login;
    vm.logout = LogOut;
    vm.getQuote = GetQuote
    vm.visible = Visible;
    vm.hideRegister = HideRegister;
    vm.register = Register;
    activate();

    function Visible (){
      return !authService.isAuthenticated();
    }
    function HideRegister (){
      return !authService.isAuthenticated();
    }

    function Register () {
      var user = {
        name: vm.username,
        password: vm.password
      }
      authService.register(user).then(function(msg) {
        showToastr(msg,0)
      }, function(errMsg) {
        showToastr(errMsg,1)
        $log.error(errMsg);
      });
    }

    function Login (){
      var user = {
        name: vm.username,
        password: vm.password
      }
      authService.login(user).then(function(msg) {
        showToastr(msg,0)
      }, function(errMsg) {
        showToastr(errMsg,1)
        $log.error(errMsg);
      });
    }
    function GetQuote (){
      authService.info().then(function(msg) {
        $log(msg);
      });
    }
    function LogOut (){
      authService.logout();
    }

    function activate() {
      getWebDevTec();
      $timeout(function() {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function showToastr(message,type) {
      switch (type) {
        case 0:
          toastr.info(message);
          break;
        case 1:
          toastr.info(message);
          break;
      }
      vm.classAnimation = '';
    }

    function getWebDevTec() {
      vm.awesomeThings = webDevTec.getTec();

      angular.forEach(vm.awesomeThings, function(awesomeThing) {
        awesomeThing.rank = Math.random();
      });
    }

  }
})();
