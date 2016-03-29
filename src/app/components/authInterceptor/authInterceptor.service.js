(function() {
  'use strict';

  angular
    .module('auth')
    .factory('authInterceptor', authInterceptor);

  /** @ngInject */
  function authInterceptor($rootScope, $q, AuthEvents) {
    return {
      responseError: function (response) {
        $rootScope.$broadcast({
          401: AuthEvents.notAuthenticated
        }[response.status], response);
        return $q.reject(response);
      }
    };
  }
})();
