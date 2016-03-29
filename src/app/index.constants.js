/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('auth')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('API', 'http://127.0.0.1:8080/api' )
    .constant('AuthEvents', {
      notAuthenticated: 'auth-not-authenticated'
    });
})();
