var User = /** @class */ (function () {
    function User(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = firstName + ' ' + lastName;
    }
    return User;
}());
function greeter(person) {
    return 'Hello,' + person.firstName + ' ' + person.lastName;
}
var user = {
    firstName: 'invi',
    lastName: '1998'
};
console.log(greeter(user));
