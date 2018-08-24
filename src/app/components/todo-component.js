import { TodoController } from './todo-controller';

const TodoComponent = {
    templateUrl: './todo-component.html',
    controller: TodoController
};

angular.module('todoApp')
    .component('TodoComponent', TodoComponent);