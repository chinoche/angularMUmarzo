(function() {
  'use strict';

  angular
    .module('auth')
    .config(config);
  /** @ngInject */
  function config($logProvider, toastrConfig, $httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;
  }

})();
