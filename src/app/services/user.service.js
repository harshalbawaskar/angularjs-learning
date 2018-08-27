export class UserService {

    getUsers() {
        console.log('***Returning users***');

        users = [
            {
                name: 'Harshal',
                id: 1
            },
            {
                name: 'Thor',
                id: 2
            },
            {
                name: 'Heimdall',
                id: 3
            }
        ];

        return this.users;
    }
}