import angular from 'angular';
import "@uirouter/angularjs";

angular.module('todoApp', ['ui.router']);

angular.module('todoApp')
    .controller('myController', ($scope) => {
        $scope.name = 'Harshal';
    });

/*     .config(($stateProvider, $urlServiceProvider) => {
        'ngInject';

        $urlServiceProvider.rules.otherwise({ state: 'main' });

        $stateProvider
            .state('main', {
                url: '/',
                component: TodoComponent
            });
    });
 */
// angular.bootstrap(document, ['todoApp'], {
//     strictDi: true
// });