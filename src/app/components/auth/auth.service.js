(function() {
  'use strict';

  angular
    .module('auth')
    .factory('authService', authService);

  /** @ngInject */
  function authService($q, $http, API, $window) {

    var MEETUP_KEY = 'meetUpKey';
    var isAuthenticated = false;
    var authToken;

    function loadUserCredentials() {
      var token = $window.localStorage.getItem(MEETUP_KEY);
      if (token) {
        useCredentials(token);
      }
    }

    function storeUserCredentials(token) {
      $window.localStorage.setItem(MEETUP_KEY, token);
      useCredentials(token);
    }

    function useCredentials(token) {
      isAuthenticated = true;
      authToken = token;

      // Set the token as header for your requests!
      $http.defaults.headers.common.Authorization = authToken;
    }

    function destroyUserCredentials() {
      authToken = undefined;
      isAuthenticated = false;
      $http.defaults.headers.common.Authorization = undefined;
      $window.localStorage.removeItem(MEETUP_KEY);
    }

    var register = function(user) {
      return $q(function(resolve, reject) {
        $http.post(API + '/signup', user).then(function(result) {
          if (result.data.succes) {
            resolve(result.data.msg);
          } else {
            reject(result.data.msg);
          }
        });
      });
    };

    var login = function(user) {
      return $q(function(resolve, reject) {
        $http.post(API + '/authenticate', user).then(function(result) {
          if (result.data.success) {
            storeUserCredentials(result.data.token);
            resolve(result.data.msg);
          } else {
            reject(result.data.msg);
          }
        });
      });
    };

    var info = function() {
      return $q(function(resolve) {
        $http.get(API + '/memberinfo').then(function(result) {
          resolve(result.data.msg);
        });
      });
    };

    var logout = function() {
      destroyUserCredentials();
    };

    loadUserCredentials();

    return {
      login: login,
      register: register,
      logout: logout,
      info: info,
      isAuthenticated: function() {return isAuthenticated;}
    };
  }
})();
