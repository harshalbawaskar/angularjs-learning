import angular from 'angular';
import "@uirouter/angularjs";

import { TodoComponent } from './components/todo-component';

angular.module('todoApp', ['ui.router'])
    .component('todoComponent', TodoComponent)
    .config(['$locationProvider', '$stateProvider', '$urlServiceProvider', ($locationProvider, $stateProvider, $urlServiceProvider) => {
        $locationProvider.hashPrefix('');
        $urlServiceProvider.rules.otherwise({ state: 'main' });

        $stateProvider
            .state('main', {
                url: '/',
                component: 'todoComponent'
            });
    }]);