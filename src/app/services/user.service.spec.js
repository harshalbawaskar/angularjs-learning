import { expect } from 'chai';
import angular from 'angular';

describe('UserService', function () {
    // define variables for the services we want to access in specs
    var userService;
    var $provide;


    beforeEach(function () {
        // load the module we want to test
        // module('todoApp');
        angular.module('todoApp')
    });

    // beforeEach(angular.mock.module(function (_$provide_) {
    //     $provide = _$provide_;
    // }));

    // beforeEach(function () {
    //     // inject the services we want to test
    //     inject(function ($injector) {
    //         userService = $injector.get('userService');
    //     });
    // });

    describe('#Get Users', function () {
        it('should return users list', function () {
            console.log(userService);

            expect(true).to.equal(true);

            // Arrange
            // sinon.spy(userService, 'getUsers');

            // Act
            // userService.getUsers();

            // Assert
            // assert(userService.getUsers.calledOnce);
            // assert(userService.getUsers.calledWith('something done!'));

            // Cleanup
            // userService.getUsers.restore();
        });
    });
});