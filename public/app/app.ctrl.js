(() => {
  angular
    .module('app')
    .controller('AppCtrl', AppCtrl);

  AppCtrl.$inject = [
    '$scope', '$localStorage', '$location', '$rootScope',
    '$anchorScroll', '$timeout', '$window'
  ];

  function AppCtrl($scope, $localStorage, $location, $rootScope, $anchorScroll, $timeout, $window) {
    const vm = this;

    vm.isIE = isIE();
    vm.isMobile = isSmartDevice();
    vm.app = {
      name: 'Collab',
      version: '0.0.1',
      color: {
        primary: '#0cc2aa',
        accent: '#a88add',
        warn: '#fcc100',
        info: '#6887ff',
        success: '#6cc788',
        warning: '#f77a99',
        danger: '#f44455',
        white: '#ffffff',
        light: '#f1f2f3',
        dark: '#2e3e4e',
        black: '#2a2b3c'
      }
    };

    $scope.$on('$stateChangeSuccess', openPage);

    function openPage() {
      $location.hash('content');
      $anchorScroll();
      $location.hash('');
    }

    vm.goBack = function () {
      $window.history.back();
    };

    function isSmartDevice() {
      const ua = $window.navigator.userAgent || $window.navigator.vendor || $window.opera;
      return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/)
        .test(ua);
    }

    function isIE() {
      return !!navigator.userAgent.match(/MSIE/i) ||
        !!navigator.userAgent.match(/Trident.*rv:11\./);
    }
  }
})();
