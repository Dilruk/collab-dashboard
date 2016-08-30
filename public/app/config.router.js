(() => {
  angular
    .module('app')
    .run(runBlock)
    .config(config);

  runBlock.$inject = ['$rootScope', '$state', '$stateParams'];

  function runBlock($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  }

  config.$inject = ['$stateProvider', '$urlRouterProvider', 'MODULE_CONFIG'];

  function config($stateProvider, $urlRouterProvider, MODULE_CONFIG) {
    const layout = 'layout/layout.html';
    const dashboard = 'dashboard/dashboard.html';
    const projects = 'projects/global/projects.html';
    const users = 'users/global/users.html';
    const github = 'github/github.html';
    const drive = 'drive/drive.html';
    const cloud = 'cloud/cloud.html';
    const milestones = 'milestones/milestones.html';
    const tasks = 'tasks/tasks.html';
    const userOverview = 'users/narrow/overview.html';
    const projectOverview = 'projects/narrow/overview.html';

    $urlRouterProvider.otherwise('/app/dashboard');

    $stateProvider
      .state('app', {
        abstract: true,
        url: '/app',
        views: {
          '': {
            templateUrl: layout
          }
        }
      })
      .state('app.dashboard', {
        url: '/dashboard',
        templateUrl: dashboard,
        data: {
          title: 'Collab Dashboard'
        },
        controller: 'dashboardCtrl',
        controllerAs: 'vm',
        resolve: load(['dashboard/dashboard.controller.js'])
      })
      .state('app.projects', {
        url: '/projects',
        templateUrl: projects,
        data: {
          title: 'Projects'
        },
        controller: 'projectsCtrl',
        controllerAs: 'vm',
        resolve: load(['projects/global/projects.controller.js'])
      })
      .state('app.users', {
        url: '/users',
        templateUrl: users,
        data: {
          title: 'Users'
        },
        controller: 'usersCtrl',
        controllerAs: 'vm',
        resolve: load(['users/global/users.controller.js'])
      })
      .state('app.github', {
        url: '/github',
        templateUrl: github,
        data: {
          title: 'GitHub'
        },
        controller: 'githubCtrl',
        controllerAs: 'vm',
        resolve: load(['github/github.controller.js'])
      })
      .state('app.drive', {
        url: '/drive',
        templateUrl: drive,
        data: {
          title: 'Google Drive'
        },
        controller: 'driveCtrl',
        controllerAs: 'vm',
        resolve: load(['drive/drive.controller.js'])
      })
      .state('app.cloud', {
        url: '/cloud',
        templateUrl: cloud,
        data: {
          title: 'Cloud IDE'
        },
        controller: 'cloudCtrl',
        controllerAs: 'vm',
        resolve: load(['cloud/cloud.controller.js'])
      })
      .state('app.tasks', {
        url: '/tasks',
        templateUrl: tasks,
        data: {
          title: 'Tasks'
        },
        controller: 'tasksCtrl',
        controllerAs: 'vm',
        resolve: load(['tasks/tasks.controller.js'])
      })
      .state('app.milestones', {
        url: '/milestones',
        templateUrl: milestones,
        data: {
          title: 'Milestones'
        },
        controller: 'milestonesCtrl',
        controllerAs: 'vm',
        resolve: load(['milestones/milestones.controller.js'])
      })
      .state('app.user', {
        url: '/user',
        templateUrl: userOverview,
        data: {
          title: 'User Overview: Hooi Tong'
        },
        controller: 'userOverviewCtrl',
        controllerAs: 'vm',
        resolve: load(['users/narrow/overview.controller.js'])
      })
      .state('app.project', {
        url: '/project',
        templateUrl: projectOverview,
        data: {
          title: 'Project Overview: Project Gene'
        },
        controller: 'projectOverviewCtrl',
        controllerAs: 'vm',
        resolve: load(['projects/narrow/overview.controller.js'])
      });

    function load(srcs, callback) {
      return {
        deps: ['$ocLazyLoad', '$q',
          function ($ocLazyLoad, $q) {
            const deferred = $q.defer();
            let promise = false;
            srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
            if (!promise) {
              promise = deferred.promise;
            }
            angular.forEach(srcs, (src) => {
              promise = promise.then(() => {
                angular.forEach(MODULE_CONFIG, (module) => {
                  if (module.name === src) {
                    src = module.module ? module.name : module.files;
                  }
                });
                return $ocLazyLoad.load(src);
              });
            });
            deferred.resolve();
            return callback ? promise.then(() => {
              return callback();
            }) : promise;
          }
        ]
      };
    }
  }
})();
