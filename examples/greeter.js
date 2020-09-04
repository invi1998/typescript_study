var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
function createSquare(config) {
    var newSquare = { color: 'white', area: 100 };
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}
var mySquare = createSquare({ color: 'red' });
var p1 = { x: 10, y: 20 };
// p1.x = 5
var g = [1, 2, 3, 4];
var ro = g;
var mySearch;
mySearch = function (src, sub) {
    var result = src.search(sub);
    return result > -1;
};
var myArray;
myArray = ['safd', 'biog'];
var myStr = myArray[0];
var Clock = /** @class */ (function () {
    function Clock(h, m) {
    }
    Clock.prototype.setTime = function (d) {
        this.currentTime = d;
    };
    return Clock;
}());
var Greeter = /** @class */ (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return 'Hello, ' + this.greeting;
    };
    return Greeter;
}());
var greeters = new Greeter('world');
greeters.greet();
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    Animal.prototype.move = function (distance) {
        if (distance === void 0) { distance = 0; }
        console.log(this.name + " moved " + distance + " Km");
    };
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dog.prototype.barck = function () {
        console.log('woof! woof!');
    };
    return Dog;
}(Animal));
var dog = new Dog('狗');
dog.barck();
dog.move(111);
var Snake = /** @class */ (function (_super) {
    __extends(Snake, _super);
    function Snake(name) {
        return _super.call(this, name) || this;
    }
    Snake.prototype.move = function (distance) {
        if (distance === void 0) { distance = 5; }
        console.log('si si si ..... ');
        _super.prototype.move.call(this, distance);
    };
    return Snake;
}(Animal));
var Horse = /** @class */ (function (_super) {
    __extends(Horse, _super);
    function Horse(name) {
        if (name === void 0) { name = '马'; }
        return _super.call(this, name) || this;
    }
    Horse.prototype.move = function (distance) {
        if (distance === void 0) { distance = 1000; }
        console.log('deng deng deng ... ');
        _super.prototype.move.call(this, distance);
    };
    return Horse;
}(Animal));
var sam = new Snake('Samy');
var tom = new Horse('大仲马');
sam.move(32);
tom.move(46643);
var passcode = 'secret passcode';
var Employee = /** @class */ (function () {
    function Employee() {
    }
    Object.defineProperty(Employee.prototype, "fullName", {
        // fullName: string
        get: function () {
            return this._fullName;
        },
        set: function (fullName) {
            if (passcode && passcode === 'secret passcode') {
                this._fullName = fullName;
            }
            else {
                console.error('unauthorized update of employee');
            }
        },
        enumerable: false,
        configurable: true
    });
    return Employee;
}());
var emplopyee = new Employee();
emplopyee.fullName = 'Bob Smith';
if (emplopyee.fullName) {
    console.log(emplopyee.fullName);
}
var Grid = /** @class */ (function () {
    function Grid(scale) {
        this.scale = scale;
    }
    Grid.prototype.claculateDistanceFromOrigin = function (point) {
        var xDist = point.x - Grid.origin.x;
        var yDist = point.y - Grid.origin.y;
        return Math.sqrt(xDist * xDist + yDist * yDist) * this.scale;
    };
    Grid.origin = { x: 0, y: 0 };
    return Grid;
}());
var grid1 = new Grid(2.3);
var grid2 = new Grid(6.2);
console.log(grid1.claculateDistanceFromOrigin({ x: 4, y: 3 }));
console.log(grid2.claculateDistanceFromOrigin({ x: 5, y: 9 }));
