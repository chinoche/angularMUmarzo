(function() {
  'use strict';

  angular
    .module('auth')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
