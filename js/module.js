(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('./utils.js');

var _questions = require('./questions.js');

var _questions2 = _interopRequireDefault(_questions);

var _confetti = require('./confetti.js');

var _confetti2 = _interopRequireDefault(_confetti);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Balloon = function () {
    function Balloon() {
        var finale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        _classCallCheck(this, Balloon);

        this.game = null;
        this.finale = finale;
        this.id = _utils.idGen.create();
        this.question = '';
        this.x = (0, _utils.rand)(10000) / 100;
        this.delay = (0, _utils.rand)(8000);
        this.durations = [(0, _utils.rand)(3500, 5000), (0, _utils.rand)(4000, 12000)];
        this.color = ['red', 'green', 'blue', 'purple', 'orange'][(0, _utils.rand)(5)];
        this.element = null;
        this.confetti = null;
        this.popped = false;
        this.finalePopTimeoutId = null;
    }

    _createClass(Balloon, [{
        key: 'setGameReference',
        value: function setGameReference(game) {
            this.game = game;
        }
    }, {
        key: 'setFinale',
        value: function setFinale(finale) {
            var _this = this;

            this.finale = finale;
            if (finale && !this.finalePopTimeoutId) {
                this.finalePopTimeoutId = setTimeout(function () {
                    if (!_this.popped) {
                        _this.pop();
                    }
                }, (0, _utils.rand)(3000, 12000));
            }
        }
    }, {
        key: 'isCorrect',
        value: function isCorrect() {
            return _questions2.default.current && this.question === _questions2.default.current.questions[0];
        }
    }, {
        key: 'pop',
        value: function pop() {
            if (this.isCorrect()) {
                _confetti2.default.addBurst(this);
                var el = this.getElement();
                _utils.jq.addClass(el, 'popped');
                this.popped = true;
                this.remove();
                this.game.nextQuestion();
            } else if (this.finale) {
                _confetti2.default.addBurst(this);
                var _el = this.getElement();
                _utils.jq.addClass(_el, 'popped');
                this.popped = true;
                this.remove();
                this.game.addNewBalloon(true);
            }
        }
    }, {
        key: 'getElement',
        value: function getElement() {
            if (this.element !== null) {
                return this.element;
            }
            this.element = document.getElementById('balloon-' + this.id);
            return this.element;
        }
    }, {
        key: 'getConfettiElement',
        value: function getConfettiElement() {
            if (this.confetti !== null) {
                return this.confetti;
            }
            this.confetti = document.getElementById('confetti-' + this.id);
            return this.confetti;
        }
    }, {
        key: 'generateHTML',
        value: function generateHTML() {
            return '<div id="balloon-' + this.id + '" class="balloon balloon-' + this.color + ' ' + (this.finale ? 'finale' : '') + '" style="left: ' + this.x + '%; animation-delay: ' + this.delay + 'ms; animation-duration: ' + this.durations[0] + 'ms, ' + this.durations[1] + 'ms;"><span>' + (this.finale ? '' : this.question) + '</span></div>';
        }
    }, {
        key: 'generateConfettiHTML',
        value: function generateConfettiHTML() {
            return '<div id="confetti-' + this.id + '"></div>';
        }
    }, {
        key: 'remove',
        value: function remove() {
            var _this2 = this;

            var removeFromGame = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            this.getElement().remove();
            setTimeout(function () {
                return _this2.getConfettiElement().remove();
            }, 5000);
            if (removeFromGame) {
                var index = this.game.balloons.indexOf(this);
                if (index !== -1) {
                    this.game.balloons.splice(index, 1);
                }
            }
        }
    }, {
        key: 'updateView',
        value: function updateView() {
            var el = this.getElement();
            _utils.jq.removeClass(el, 'correct');
            _utils.jq.removeClass(el, 'finale');
            if (this.isCorrect()) {
                _utils.jq.addClass(el, 'correct');
            }
            if (this.finale) {
                _utils.jq.addClass(el, 'finale');
            }
            var span = el.querySelector('span');
            if (span.innerHTML !== this.question) {
                _utils.jq.changeText(span, this.question);
            }
        }
    }]);

    return Balloon;
}();

exports.default = Balloon;

},{"./confetti.js":3,"./questions.js":7,"./utils.js":8}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('./utils.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Coor = function () {
    function Coor(x, y) {
        _classCallCheck(this, Coor);

        this.x = x;
        this.y = y;
    }

    _createClass(Coor, [{
        key: 'distanceTo',
        value: function distanceTo(coor) {
            var x = Math.abs(this.x - coor.x);
            var y = Math.abs(this.y - coor.y);
            return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        }
    }], [{
        key: 'random',
        value: function random(w, h) {
            var centre = new Coor(w / 2, h / 2);
            var rnd = null;
            while (rnd === null) {
                rnd = new Coor((0, _utils.rand)(w), (0, _utils.rand)(h));
                if (rnd.distanceTo(centre) > Math.min(w, h) / 2) {
                    rnd = null;
                }
            }
            return rnd;
        }
    }]);

    return Coor;
}();

exports.default = Coor;

},{"./utils.js":8}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('./utils.js');

var _elements = require('./elements.js');

var _elements2 = _interopRequireDefault(_elements);

var _Coor = require('./Coor.js');

var _Coor2 = _interopRequireDefault(_Coor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var confetti = {
    addBurst: function addBurst(balloon) {
        var _this = this;

        var bound = balloon.getElement().getBoundingClientRect();
        var centre = new _Coor2.default(bound.left, bound.top);
        balloon.getConfettiElement().innerHTML = new Array(50).fill(1).map(function () {
            return _this.generateHTML(centre);
        }).join('');
    },
    // DO NOT USE. It's really laggy
    finale: function finale() {
        var _this2 = this;

        var maxWidth = window.innerWidth;
        var maxHeight = window.innerHeight / 2;
        new Array(50).fill(1).forEach(function () {
            var id = _utils.idGen.create();
            var centre = new _Coor2.default((0, _utils.rand)(maxWidth), (0, _utils.rand)(maxHeight));
            _elements2.default.confetti.innerHTML += '<div id="confetti-finale-' + id + '"></div>';
            var html = new Array(50).fill(1).map(function () {
                return _this2.generateHTML(centre);
            }).join('');
            setTimeout(function () {
                document.getElementById('confetti-finale-' + id).innerHTML = html;
            }, (0, _utils.rand)(10000));
        });
    },
    generateHTML: function generateHTML(centre) {
        var dir = (0, _utils.rand)(1, 4); // direction
        var color = ['red', 'green', 'blue', 'purple', 'orange'][(0, _utils.rand)(5)];
        var coor = _Coor2.default.random(126, 180);
        var d = (0, _utils.rand)(15) / 100; // animation delay

        var clss = 'particle particle-ani-' + dir + ' particle-' + color;
        var styl = 'top: ' + (centre.y + coor.y) + 'px; left: ' + (centre.x + coor.x) + 'px; animation-delay: -' + d + 's;';
        return '<span class="' + clss + '" style="' + styl + '"></span>';
    }
};

exports.default = confetti;

},{"./Coor.js":2,"./elements.js":4,"./utils.js":8}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    game: document.getElementById('game'),
    confetti: document.getElementById('confetti-box'),
    caption: document.getElementById('caption'),
    answer: document.getElementById('answer'),
    welcome: document.getElementById('welcome'),
    startBtn: document.getElementById('start-btn'),
    titleCard: {
        orig: document.getElementById('title-card-orig'),
        real: document.getElementById('title-card-real')
    },
    celeImgs: [document.getElementById('cele-gorilla'), document.getElementById('cele-diddy'), document.getElementById('cele-elmo'), document.getElementById('cele-giroud'), document.getElementById('cele-bear')]
};

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _elements = require('./elements.js');

var _elements2 = _interopRequireDefault(_elements);

var _questions = require('./questions.js');

var _questions2 = _interopRequireDefault(_questions);

var _Balloon = require('./Balloon.js');

var _Balloon2 = _interopRequireDefault(_Balloon);

var _utils = require('./utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var game = {
    balloons: [],
    addNewBalloons: function addNewBalloons() {
        var _this = this;

        var number = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
        var finale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        new Array(10).fill(1).map(function () {
            return new _Balloon2.default();
        }).forEach(function (balloon) {
            return _this.addBalloon(balloon, finale);
        });
    },
    addNewBalloon: function addNewBalloon() {
        var finale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        this.addBalloon(new _Balloon2.default(), finale);
    },
    addBalloon: function addBalloon() {
        var balloon = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _Balloon2.default();
        var finale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        if (this.balloons.indexOf(balloon) === -1) {
            this.balloons.push(balloon);
        }
        balloon.setGameReference(game);
        balloon.setFinale(finale);

        _elements2.default.game.insertAdjacentHTML('beforeend', balloon.generateHTML());
        _elements2.default.confetti.insertAdjacentHTML('beforeend', balloon.generateConfettiHTML());

        balloon.getElement().addEventListener('click', function () {
            return balloon.pop();
        });
    },
    nextQuestion: function nextQuestion() {
        if (_questions2.default.nextQuestion()) {
            this.balloons.filter(function (balloon) {
                return !balloon.popped;
            }).reverse().forEach(function (balloon, index) {
                balloon.question = _questions2.default.current.questions[index];
                balloon.updateView();
            });
            _elements2.default.caption.style.opacity = '1';
            _utils.jq.changeText(_elements2.default.answer, _questions2.default.current.answer);
            if (_questions2.default.more.length === 0) {
                document.title = 'Pop the Question';
                _utils.jq.removeClass(_elements2.default.titleCard.orig, 'show');
                _utils.jq.addClass(_elements2.default.titleCard.real, 'show');
            }
        } else {
            _elements2.default.caption.style.opacity = '0';
            _elements2.default.answer.style.opacity = '0';
            this.addNewBalloons(10, true);
            _elements2.default.celeImgs.forEach(function (el) {
                return _utils.jq.addClass(el, 'show');
            });
        }
    }
};

window.cheat = function () {
    [].concat(_toConsumableArray(document.getElementsByClassName('correct'))).forEach(function (el) {
        return el.click();
    });
};

exports.default = game;

},{"./Balloon.js":1,"./elements.js":4,"./questions.js":7,"./utils.js":8}],6:[function(require,module,exports){
'use strict';

var _game = require('./game.js');

var _game2 = _interopRequireDefault(_game);

var _elements = require('./elements.js');

var _elements2 = _interopRequireDefault(_elements);

var _utils = require('./utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_game2.default.addNewBalloons(10);
_elements2.default.startBtn.addEventListener('click', function () {
    _game2.default.nextQuestion();
    _elements2.default.welcome.style.display = 'none';
    _utils.jq.addClass(_elements2.default.titleCard.orig, 'show');
});

},{"./elements.js":4,"./game.js":5,"./utils.js":8}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    current: null,
    more: [{
        answer: 'Maldives',
        questions: ['Your favourite tropical place to visit?', 'Who are the domestic champions of France?', 'Which team\'s mascot is an eagle?', 'Where would one store their boating oars?', 'Where are<br/>the 13 most expensive rabbits?', 'What is the ‘Jewel of California Bay’?', 'What is the 13th month called?', 'Who founded Facebook?']
    }, {
        answer: 'Snow The Cat',
        questions: ['Who is the best cat in the world? 🐱', 'Who was Harry Potter’s best friend?', 'Who sang ‘Gangnam Style’?', 'Who painted the ‘Mona Lisa’?', 'Who has a vertical leap of 9 feet?', 'What is a village in Southern Italy?', 'What is a brand of Slug Repellent?', 'Who is the Gym Leader in Pallet Town?', 'Who is stuck on Mars in ‘The Martian’?']
    }, {
        answer: 'Ollivanders Diagon Alley',
        questions: ['Where does Harry buy his magic wand? 🪄', 'Who are the domestic champions of France?', 'Which team\'s mascot is an eagle?', 'Where would one store their boating oars?', 'Where are<br/>the 13 most expensive rabbits?', 'What is the ‘Jewel of California Bay’?', 'What is the 13th month called?', 'Who founded Facebook?']
    }, {
        answer: 'Netherlands',
        questions: ['Which country has tulip fields?🌷', 'What is a type of biscuit?', 'What is an inland french town?', 'How do you spell ‘millennium’?', 'What letter comes after ‘J’?', 'Where does the Queen get buried?', 'Where are weetabix made?']
    }, {
        answer: '.xlsx',
        questions: ['Which is the file extension of excel?', 'Where did Andy Murray win the US Open?', 'Where is<br/>the world’s largest swimming pool?', 'Where are the Crown Jewels kept?', 'Where did Charles Darwin write Origin of Species?', 'Which UK Building is taller than Everest?']
    }, {
        answer: 'Dabbe 6',
        questions: ['What movie will I watch again?', 'What is a great Xbox game?', 'What does the Pope’s tattoo say?', 'What is JK Rowling’s best selling book?', 'What is UKIP’s official motto?']
    }, {
        answer: 'Penguin',
        questions: ['What is the best, cutest animal?', 'What is the fastest animal on earth?', 'What is bright red?', 'What does Pikachu evolve into?']
    }, {
        answer: 'Alizay',
        questions: ['Who is the reason for Hamza\'s smile?', 'Dude, where’s my car?', 'Where have all the muffins gone?']
    }, {
        answer: 'NO!',
        questions: ['Will I regret asking the next question?', 'How old is Elvis Presley?']
    }, {
        answer: 'YES!',
        questions: ['Alizay,<br/>will you<br/>marry me?']
    }],
    nextQuestion: function nextQuestion() {
        this.current = this.more.shift();
        return !!this.current;
    }
};

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var jq = {
    addClass: function addClass(el, className) {
        el.classList.add(className);
    },
    removeClass: function removeClass(el, className) {
        el.classList.remove(className);
    },
    hasClass: function hasClass(el, className) {
        el.classList.contains(className);
    },
    changeText: function changeText(el, newText) {
        var action = function action() {
            el.removeEventListener('transitionend', action);
            el.innerHTML = newText;
            el.style.opacity = '1';
        };
        el.style.opacity = '0';
        el.addEventListener('transitionend', action);
    }
};

var rand = function rand() {
    var frm = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var to = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    return Math.floor(Math.random() * Math.abs(to - frm)) + Math.min(frm, to);
};

var idGen = {
    chars: 'abcdefghijklmnopqrstuvwxyz0123456789',
    old: [],
    create: function create() {
        var gen = this.gen();
        if (this.old.indexOf(gen) !== -1) {
            return this.create();
        }
        this.old.push(gen);
        return gen;
    },
    gen: function gen() {
        var _this = this;

        return new Array(16).fill(1).map(function () {
            return _this.chars[rand(_this.chars.length)];
        }).join('');
    }
};

exports.jq = jq;
exports.idGen = idGen;
exports.rand = rand;

},{}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvQmFsbG9vbi5qcyIsImFwcC9qcy9Db29yLmpzIiwiYXBwL2pzL2NvbmZldHRpLmpzIiwiYXBwL2pzL2VsZW1lbnRzLmpzIiwiYXBwL2pzL2dhbWUuanMiLCJhcHAvanMvbWFpbi5qcyIsImFwcC9qcy9xdWVzdGlvbnMuanMiLCJhcHAvanMvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQ0FBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0lBRU0sTztBQUNGLHVCQUE0QjtBQUFBLFlBQWhCLE1BQWdCLHVFQUFQLEtBQU87O0FBQUE7O0FBQ3hCLGFBQUssSUFBTCxHQUFZLElBQVo7QUFDQSxhQUFLLE1BQUwsR0FBYyxNQUFkO0FBQ0EsYUFBSyxFQUFMLEdBQVUsYUFBTSxNQUFOLEVBQVY7QUFDQSxhQUFLLFFBQUwsR0FBZ0IsRUFBaEI7QUFDQSxhQUFLLENBQUwsR0FBUyxpQkFBSyxLQUFMLElBQWMsR0FBdkI7QUFDQSxhQUFLLEtBQUwsR0FBYSxpQkFBSyxJQUFMLENBQWI7QUFDQSxhQUFLLFNBQUwsR0FBaUIsQ0FBQyxpQkFBSyxJQUFMLEVBQVcsSUFBWCxDQUFELEVBQW1CLGlCQUFLLElBQUwsRUFBVyxLQUFYLENBQW5CLENBQWpCO0FBQ0EsYUFBSyxLQUFMLEdBQWEsQ0FBQyxLQUFELEVBQVEsT0FBUixFQUFpQixNQUFqQixFQUF5QixRQUF6QixFQUFtQyxRQUFuQyxFQUE2QyxpQkFBSyxDQUFMLENBQTdDLENBQWI7QUFDQSxhQUFLLE9BQUwsR0FBZSxJQUFmO0FBQ0EsYUFBSyxRQUFMLEdBQWdCLElBQWhCO0FBQ0EsYUFBSyxNQUFMLEdBQWMsS0FBZDtBQUNBLGFBQUssa0JBQUwsR0FBMEIsSUFBMUI7QUFDSDs7Ozt5Q0FDZ0IsSSxFQUFN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QUssR0FBTCxFQUFWO0FBQ0EsWUFBSSxLQUFLLEdBQUwsQ0FBUyxPQUFULENBQWlCLEdBQWpCLE1BQTBCLENBQUMsQ0FBL0IsRUFBa0M7QUFDOUIsbUJBQU8sS0FBSyxNQUFMLEVBQVA7QUFDSDtBQUNELGFBQUssR0FBTCxDQUFTLElBQVQsQ0FBYyxHQUFkO0FBQ0EsZUFBTyxHQUFQO0FBQ0gsS0FWUztBQVdWLFNBQUssZUFBVztBQUFBOztBQUNaLGVBQU8sSUFBSSxLQUFKLENBQVUsRUFBVixFQUFjLElBQWQsQ0FBbUIsQ0FBbkIsRUFBc0IsR0FBdEIsQ0FBMEIsWUFBTTtBQUNuQyxtQkFBTyxNQUFLLEtBQUwsQ0FBVyxLQUFLLE1BQUssS0FBTCxDQUFXLE1BQWhCLENBQVgsQ0FBUDtBQUNILFNBRk0sRUFFSixJQUZJLENBRUMsRUFGRCxDQUFQO0FBR0g7QUFmUyxDQUFkOztRQW1CSSxFLEdBQUEsRTtRQUNBLEssR0FBQSxLO1FBQ0EsSSxHQUFBLEkiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgeyBqcSwgaWRHZW4sIHJhbmQgfSBmcm9tICcuL3V0aWxzLmpzJztcbmltcG9ydCBxdWVzdGlvbnMgZnJvbSAnLi9xdWVzdGlvbnMuanMnO1xuaW1wb3J0IGNvbmZldHRpIGZyb20gJy4vY29uZmV0dGkuanMnO1xuXG5jbGFzcyBCYWxsb29uIHtcbiAgICBjb25zdHJ1Y3RvcihmaW5hbGUgPSBmYWxzZSkge1xuICAgICAgICB0aGlzLmdhbWUgPSBudWxsO1xuICAgICAgICB0aGlzLmZpbmFsZSA9IGZpbmFsZTtcbiAgICAgICAgdGhpcy5pZCA9IGlkR2VuLmNyZWF0ZSgpO1xuICAgICAgICB0aGlzLnF1ZXN0aW9uID0gJyc7XG4gICAgICAgIHRoaXMueCA9IHJhbmQoMTAwMDApIC8gMTAwO1xuICAgICAgICB0aGlzLmRlbGF5ID0gcmFuZCg4MDAwKTtcbiAgICAgICAgdGhpcy5kdXJhdGlvbnMgPSBbcmFuZCgzNTAwLCA1MDAwKSwgcmFuZCg0MDAwLCAxMjAwMCldO1xuICAgICAgICB0aGlzLmNvbG9yID0gWydyZWQnLCAnZ3JlZW4nLCAnYmx1ZScsICdwdXJwbGUnLCAnb3JhbmdlJ11bcmFuZCg1KV07XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IG51bGw7XG4gICAgICAgIHRoaXMuY29uZmV0dGkgPSBudWxsO1xuICAgICAgICB0aGlzLnBvcHBlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZpbmFsZVBvcFRpbWVvdXRJZCA9IG51bGw7XG4gICAgfVxuICAgIHNldEdhbWVSZWZlcmVuY2UoZ2FtZSkge1xuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgIH1cbiAgICBzZXRGaW5hbGUoZmluYWxlKSB7XG4gICAgICAgIHRoaXMuZmluYWxlID0gZmluYWxlO1xuICAgICAgICBpZiAoZmluYWxlICYmICF0aGlzLmZpbmFsZVBvcFRpbWVvdXRJZCkge1xuICAgICAgICAgICAgdGhpcy5maW5hbGVQb3BUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMucG9wcGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9wKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgcmFuZCgzMDAwLCAxMjAwMCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlzQ29ycmVjdCgpIHtcbiAgICAgICAgcmV0dXJuIHF1ZXN0aW9ucy5jdXJyZW50ICYmIHRoaXMucXVlc3Rpb24gPT09IHF1ZXN0aW9ucy5jdXJyZW50LnF1ZXN0aW9uc1swXTtcbiAgICB9XG4gICAgcG9wKCkge1xuICAgICAgICBpZiAodGhpcy5pc0NvcnJlY3QoKSkge1xuICAgICAgICAgICAgY29uZmV0dGkuYWRkQnVyc3QodGhpcyk7XG4gICAgICAgICAgICBsZXQgZWwgPSB0aGlzLmdldEVsZW1lbnQoKTtcbiAgICAgICAgICAgIGpxLmFkZENsYXNzKGVsLCAncG9wcGVkJyk7XG4gICAgICAgICAgICB0aGlzLnBvcHBlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICAgICAgdGhpcy5nYW1lLm5leHRRdWVzdGlvbigpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZmluYWxlKSB7XG4gICAgICAgICAgICBjb25mZXR0aS5hZGRCdXJzdCh0aGlzKTtcbiAgICAgICAgICAgIGxldCBlbCA9IHRoaXMuZ2V0RWxlbWVudCgpO1xuICAgICAgICAgICAganEuYWRkQ2xhc3MoZWwsICdwb3BwZWQnKTtcbiAgICAgICAgICAgIHRoaXMucG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgICAgICAgICB0aGlzLmdhbWUuYWRkTmV3QmFsbG9vbih0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRFbGVtZW50KCkge1xuICAgICAgICBpZiAodGhpcy5lbGVtZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYWxsb29uLScgKyB0aGlzLmlkKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudDtcbiAgICB9XG4gICAgZ2V0Q29uZmV0dGlFbGVtZW50KCkge1xuICAgICAgICBpZiAodGhpcy5jb25mZXR0aSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29uZmV0dGk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb25mZXR0aSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb25mZXR0aS0nICsgdGhpcy5pZCk7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZldHRpO1xuICAgIH1cbiAgICBnZW5lcmF0ZUhUTUwoKSB7XG4gICAgICAgIHJldHVybiBgPGRpdiBpZD1cImJhbGxvb24tJHt0aGlzLmlkfVwiIGNsYXNzPVwiYmFsbG9vbiBiYWxsb29uLSR7dGhpcy5jb2xvcn0gJHsodGhpcy5maW5hbGUpID8gJ2ZpbmFsZScgOiAnJ31cIiBzdHlsZT1cImxlZnQ6ICR7dGhpcy54fSU7IGFuaW1hdGlvbi1kZWxheTogJHt0aGlzLmRlbGF5fW1zOyBhbmltYXRpb24tZHVyYXRpb246ICR7dGhpcy5kdXJhdGlvbnNbMF19bXMsICR7dGhpcy5kdXJhdGlvbnNbMV19bXM7XCI+PHNwYW4+JHsodGhpcy5maW5hbGUpID8gJycgOiB0aGlzLnF1ZXN0aW9ufTwvc3Bhbj48L2Rpdj5gO1xuICAgIH1cbiAgICBnZW5lcmF0ZUNvbmZldHRpSFRNTCgpIHtcbiAgICAgICAgcmV0dXJuIGA8ZGl2IGlkPVwiY29uZmV0dGktJHt0aGlzLmlkfVwiPjwvZGl2PmA7XG4gICAgfVxuICAgIHJlbW92ZShyZW1vdmVGcm9tR2FtZSA9IHRydWUpIHtcbiAgICAgICAgdGhpcy5nZXRFbGVtZW50KCkucmVtb3ZlKCk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5nZXRDb25mZXR0aUVsZW1lbnQoKS5yZW1vdmUoKSwgNTAwMCk7XG4gICAgICAgIGlmIChyZW1vdmVGcm9tR2FtZSkge1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5nYW1lLmJhbGxvb25zLmluZGV4T2YodGhpcyk7XG4gICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLmJhbGxvb25zLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgdXBkYXRlVmlldygpIHtcbiAgICAgICAgbGV0IGVsID0gdGhpcy5nZXRFbGVtZW50KCk7XG4gICAgICAgIGpxLnJlbW92ZUNsYXNzKGVsLCAnY29ycmVjdCcpO1xuICAgICAgICBqcS5yZW1vdmVDbGFzcyhlbCwgJ2ZpbmFsZScpO1xuICAgICAgICBpZiAodGhpcy5pc0NvcnJlY3QoKSkge1xuICAgICAgICAgICAganEuYWRkQ2xhc3MoZWwsICdjb3JyZWN0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZmluYWxlKSB7XG4gICAgICAgICAgICBqcS5hZGRDbGFzcyhlbCwgJ2ZpbmFsZScpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzcGFuID0gZWwucXVlcnlTZWxlY3Rvcignc3BhbicpO1xuICAgICAgICBpZiAoc3Bhbi5pbm5lckhUTUwgIT09IHRoaXMucXVlc3Rpb24pIHtcbiAgICAgICAgICAgIGpxLmNoYW5nZVRleHQoc3BhbiwgdGhpcy5xdWVzdGlvbik7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJhbGxvb247IiwiaW1wb3J0IHsgcmFuZCB9IGZyb20gJy4vdXRpbHMuanMnO1xuXG5jbGFzcyBDb29yIHtcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgfVxuICAgIGRpc3RhbmNlVG8oY29vcikge1xuICAgICAgICBsZXQgeCA9IE1hdGguYWJzKHRoaXMueCAtIGNvb3IueCk7XG4gICAgICAgIGxldCB5ID0gTWF0aC5hYnModGhpcy55IC0gY29vci55KTtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyh4LCAyKSArIE1hdGgucG93KHksIDIpKTtcbiAgICB9XG4gICAgc3RhdGljIHJhbmRvbSh3LCBoKSB7XG4gICAgICAgIGxldCBjZW50cmUgPSBuZXcgQ29vcih3IC8gMiwgaCAvIDIpO1xuICAgICAgICBsZXQgcm5kID0gbnVsbDtcbiAgICAgICAgd2hpbGUocm5kID09PSBudWxsKSB7XG4gICAgICAgICAgICBybmQgPSBuZXcgQ29vcihyYW5kKHcpLCByYW5kKGgpKTtcbiAgICAgICAgICAgIGlmIChybmQuZGlzdGFuY2VUbyhjZW50cmUpID4gKE1hdGgubWluKHcsIGgpIC8gMikpIHtcbiAgICAgICAgICAgICAgICBybmQgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBybmQ7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDb29yOyIsImltcG9ydCB7IHJhbmQsIGlkR2VuIH0gZnJvbSAnLi91dGlscy5qcyc7XG5pbXBvcnQgZWxlbWVudHMgZnJvbSAnLi9lbGVtZW50cy5qcyc7XG5pbXBvcnQgQ29vciBmcm9tICcuL0Nvb3IuanMnO1xuXG5jb25zdCBjb25mZXR0aSA9IHtcbiAgICBhZGRCdXJzdDogZnVuY3Rpb24oYmFsbG9vbikge1xuICAgICAgICBsZXQgYm91bmQgPSBiYWxsb29uLmdldEVsZW1lbnQoKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgbGV0IGNlbnRyZSA9IG5ldyBDb29yKGJvdW5kLmxlZnQsIGJvdW5kLnRvcCk7XG4gICAgICAgIGJhbGxvb24uZ2V0Q29uZmV0dGlFbGVtZW50KCkuaW5uZXJIVE1MID0gbmV3IEFycmF5KDUwKS5maWxsKDEpLm1hcCgoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZUhUTUwoY2VudHJlKTtcbiAgICAgICAgfSkuam9pbignJyk7XG4gICAgfSxcbiAgICAvLyBETyBOT1QgVVNFLiBJdCdzIHJlYWxseSBsYWdneVxuICAgIGZpbmFsZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBtYXhXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICBsZXQgbWF4SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0IC8gMjtcbiAgICAgICAgbmV3IEFycmF5KDUwKS5maWxsKDEpLmZvckVhY2goKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGlkID0gaWRHZW4uY3JlYXRlKCk7XG4gICAgICAgICAgICBsZXQgY2VudHJlID0gbmV3IENvb3IocmFuZChtYXhXaWR0aCksIHJhbmQobWF4SGVpZ2h0KSk7XG4gICAgICAgICAgICBlbGVtZW50cy5jb25mZXR0aS5pbm5lckhUTUwgKz0gYDxkaXYgaWQ9XCJjb25mZXR0aS1maW5hbGUtJHtpZH1cIj48L2Rpdj5gO1xuICAgICAgICAgICAgbGV0IGh0bWwgPSBuZXcgQXJyYXkoNTApLmZpbGwoMSkubWFwKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZUhUTUwoY2VudHJlKTtcbiAgICAgICAgICAgIH0pLmpvaW4oJycpO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGNvbmZldHRpLWZpbmFsZS0ke2lkfWApLmlubmVySFRNTCA9IGh0bWw7XG4gICAgICAgICAgICB9LCByYW5kKDEwMDAwKSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgZ2VuZXJhdGVIVE1MOiBmdW5jdGlvbihjZW50cmUpIHtcbiAgICAgICAgbGV0IGRpciA9IHJhbmQoMSwgNCk7IC8vIGRpcmVjdGlvblxuICAgICAgICBsZXQgY29sb3IgPSBbJ3JlZCcsICdncmVlbicsICdibHVlJywgJ3B1cnBsZScsICdvcmFuZ2UnXVtyYW5kKDUpXTtcbiAgICAgICAgbGV0IGNvb3IgPSBDb29yLnJhbmRvbSgxMjYsIDE4MCk7XG4gICAgICAgIGxldCBkID0gcmFuZCgxNSkgLyAxMDA7IC8vIGFuaW1hdGlvbiBkZWxheVxuXG4gICAgICAgIGxldCBjbHNzID0gYHBhcnRpY2xlIHBhcnRpY2xlLWFuaS0ke2Rpcn0gcGFydGljbGUtJHtjb2xvcn1gO1xuICAgICAgICBsZXQgc3R5bCA9IGB0b3A6ICR7Y2VudHJlLnkgKyBjb29yLnl9cHg7IGxlZnQ6ICR7Y2VudHJlLnggKyBjb29yLnh9cHg7IGFuaW1hdGlvbi1kZWxheTogLSR7ZH1zO2A7XG4gICAgICAgIHJldHVybiBgPHNwYW4gY2xhc3M9XCIke2Nsc3N9XCIgc3R5bGU9XCIke3N0eWx9XCI+PC9zcGFuPmA7XG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29uZmV0dGk7IiwiZXhwb3J0IGRlZmF1bHQge1xuICAgIGdhbWU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lJyksXG4gICAgY29uZmV0dGk6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb25mZXR0aS1ib3gnKSxcbiAgICBjYXB0aW9uOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FwdGlvbicpLFxuICAgIGFuc3dlcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Fuc3dlcicpLFxuICAgIHdlbGNvbWU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3ZWxjb21lJyksXG4gICAgc3RhcnRCdG46IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydC1idG4nKSxcbiAgICB0aXRsZUNhcmQ6IHtcbiAgICAgICAgb3JpZzogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RpdGxlLWNhcmQtb3JpZycpLFxuICAgICAgICByZWFsOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGl0bGUtY2FyZC1yZWFsJyksXG4gICAgfSxcbiAgICBjZWxlSW1nczogW1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsZS1nb3JpbGxhJyksXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxlLWRpZGR5JyksXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxlLWVsbW8nKSxcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGUtZ2lyb3VkJyksXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxlLWJlYXInKVxuICAgIF1cbn07IiwiaW1wb3J0IGVsZW1lbnRzIGZyb20gJy4vZWxlbWVudHMuanMnO1xuaW1wb3J0IHF1ZXN0aW9ucyBmcm9tICcuL3F1ZXN0aW9ucy5qcyc7XG5pbXBvcnQgQmFsbG9vbiBmcm9tICcuL0JhbGxvb24uanMnO1xuaW1wb3J0IHsganEgfSBmcm9tICcuL3V0aWxzLmpzJztcblxuY29uc3QgZ2FtZSA9IHtcbiAgICBiYWxsb29uczogW10sXG4gICAgYWRkTmV3QmFsbG9vbnM6IGZ1bmN0aW9uKG51bWJlciA9IDEwLCBmaW5hbGUgPSBmYWxzZSkge1xuICAgICAgICBuZXcgQXJyYXkoMTApLmZpbGwoMSlcbiAgICAgICAgICAgIC5tYXAoKCkgPT4gbmV3IEJhbGxvb24oKSlcbiAgICAgICAgICAgIC5mb3JFYWNoKGJhbGxvb24gPT4gdGhpcy5hZGRCYWxsb29uKGJhbGxvb24sIGZpbmFsZSkpO1xuICAgIH0sXG4gICAgYWRkTmV3QmFsbG9vbjogZnVuY3Rpb24oZmluYWxlID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5hZGRCYWxsb29uKG5ldyBCYWxsb29uKCksIGZpbmFsZSk7XG4gICAgfSxcbiAgICBhZGRCYWxsb29uOiBmdW5jdGlvbihiYWxsb29uID0gbmV3IEJhbGxvb24oKSwgZmluYWxlID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHRoaXMuYmFsbG9vbnMuaW5kZXhPZihiYWxsb29uKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuYmFsbG9vbnMucHVzaChiYWxsb29uKTtcbiAgICAgICAgfVxuICAgICAgICBiYWxsb29uLnNldEdhbWVSZWZlcmVuY2UoZ2FtZSk7XG4gICAgICAgIGJhbGxvb24uc2V0RmluYWxlKGZpbmFsZSk7XG5cbiAgICAgICAgZWxlbWVudHMuZ2FtZS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGJhbGxvb24uZ2VuZXJhdGVIVE1MKCkpO1xuICAgICAgICBlbGVtZW50cy5jb25mZXR0aS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGJhbGxvb24uZ2VuZXJhdGVDb25mZXR0aUhUTUwoKSk7XG5cbiAgICAgICAgYmFsbG9vbi5nZXRFbGVtZW50KCkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBiYWxsb29uLnBvcCgpKTtcbiAgICB9LFxuICAgIG5leHRRdWVzdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChxdWVzdGlvbnMubmV4dFF1ZXN0aW9uKCkpIHtcbiAgICAgICAgICAgIHRoaXMuYmFsbG9vbnMuZmlsdGVyKGJhbGxvb24gPT4gIWJhbGxvb24ucG9wcGVkKS5yZXZlcnNlKCkuZm9yRWFjaCgoYmFsbG9vbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBiYWxsb29uLnF1ZXN0aW9uID0gcXVlc3Rpb25zLmN1cnJlbnQucXVlc3Rpb25zW2luZGV4XTtcbiAgICAgICAgICAgICAgICBiYWxsb29uLnVwZGF0ZVZpZXcoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZWxlbWVudHMuY2FwdGlvbi5zdHlsZS5vcGFjaXR5ID0gJzEnO1xuICAgICAgICAgICAganEuY2hhbmdlVGV4dChlbGVtZW50cy5hbnN3ZXIsIHF1ZXN0aW9ucy5jdXJyZW50LmFuc3dlcik7XG4gICAgICAgICAgICBpZiAocXVlc3Rpb25zLm1vcmUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQudGl0bGUgPSAnUG9wIHRoZSBRdWVzdGlvbic7XG4gICAgICAgICAgICAgICAganEucmVtb3ZlQ2xhc3MoZWxlbWVudHMudGl0bGVDYXJkLm9yaWcsICdzaG93Jyk7XG4gICAgICAgICAgICAgICAganEuYWRkQ2xhc3MoZWxlbWVudHMudGl0bGVDYXJkLnJlYWwsICdzaG93Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbGVtZW50cy5jYXB0aW9uLnN0eWxlLm9wYWNpdHkgPSAnMCc7XG4gICAgICAgICAgICBlbGVtZW50cy5hbnN3ZXIuc3R5bGUub3BhY2l0eSA9ICcwJztcbiAgICAgICAgICAgIHRoaXMuYWRkTmV3QmFsbG9vbnMoMTAsIHRydWUpO1xuICAgICAgICAgICAgZWxlbWVudHMuY2VsZUltZ3MuZm9yRWFjaChlbCA9PiBqcS5hZGRDbGFzcyhlbCwgJ3Nob3cnKSk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG53aW5kb3cuY2hlYXQgPSBmdW5jdGlvbigpIHtcbiAgICBbLi4uZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY29ycmVjdCcpXS5mb3JFYWNoKGVsID0+IGVsLmNsaWNrKCkpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZ2FtZTsiLCJpbXBvcnQgZ2FtZSBmcm9tICcuL2dhbWUuanMnO1xuaW1wb3J0IGVsZW1lbnRzIGZyb20gJy4vZWxlbWVudHMuanMnO1xuaW1wb3J0IHsganEgfSBmcm9tICcuL3V0aWxzLmpzJztcblxuZ2FtZS5hZGROZXdCYWxsb29ucygxMCk7XG5lbGVtZW50cy5zdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBnYW1lLm5leHRRdWVzdGlvbigpO1xuICAgIGVsZW1lbnRzLndlbGNvbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBqcS5hZGRDbGFzcyhlbGVtZW50cy50aXRsZUNhcmQub3JpZywgJ3Nob3cnKTtcbn0pOyIsImV4cG9ydCBkZWZhdWx0IHtcbiAgICBjdXJyZW50OiBudWxsLFxuICAgIG1vcmU6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgYW5zd2VyOiAnQW5keSBNdXJyYXknLFxuICAgICAgICAgICAgcXVlc3Rpb25zOiBbXG4gICAgICAgICAgICAgICAgJ1dobyB3b24gV2ltYmxlZG9uIGluIDIwMTY/JyxcbiAgICAgICAgICAgICAgICAnV2hvIHdvbiBhbiBPbHltcGljIEdvbGQgaW4gQ3ljbGluZz8nLFxuICAgICAgICAgICAgICAgICdXaG8gaXMgYXMgdGFsbCBhcyBhIGxlcHJlY2hhdW4/JyxcbiAgICAgICAgICAgICAgICAnV2hvIGlzIGEgd29ybGQtZmFtb3VzIGNhYmVyLXRvc3Nlcj8nLFxuICAgICAgICAgICAgICAgICdXaG8gaGFzIHRocmVlIG5pcHBsZXM/JyxcbiAgICAgICAgICAgICAgICAnV2hvIGlzIDE5IHllYXJzIG9sZD8nLFxuICAgICAgICAgICAgICAgICdXaG8gYnVpbHQgUm9tZSBpbiA3IGRheXM/JyxcbiAgICAgICAgICAgICAgICAnV2hvIGhhcyBhIGZlYXIgb2YgTW9yb2Njbz8nLFxuICAgICAgICAgICAgICAgICdXaG8gaXMgQmF0bWFuPycsXG4gICAgICAgICAgICAgICAgJ1dobyBoYXMgYW4gSVEgb2YgMjYzPydcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgYW5zd2VyOiAnS2F0bmlzcyBFdmVyZGVlbicsXG4gICAgICAgICAgICBxdWVzdGlvbnM6IFtcbiAgICAgICAgICAgICAgICAnV2hvIHdvbiB0aGUgSHVuZ2VyIEdhbWVzPycsXG4gICAgICAgICAgICAgICAgJ1dobyB3YXMgSGFycnkgUG90dGVy4oCZcyBiZXN0IGZyaWVuZD8nLFxuICAgICAgICAgICAgICAgICdXaG8gc2FuZyDigJhHYW5nbmFtIFN0eWxl4oCZPycsXG4gICAgICAgICAgICAgICAgJ1dobyBwYWludGVkIHRoZSDigJhNb25hIExpc2HigJk/JyxcbiAgICAgICAgICAgICAgICAnV2hvIGhhcyBhIHZlcnRpY2FsIGxlYXAgb2YgOSBmZWV0PycsXG4gICAgICAgICAgICAgICAgJ1doYXQgaXMgYSB2aWxsYWdlIGluIFNvdXRoZXJuIEl0YWx5PycsXG4gICAgICAgICAgICAgICAgJ1doYXQgaXMgYSBicmFuZCBvZiBTbHVnIFJlcGVsbGVudD8nLFxuICAgICAgICAgICAgICAgICdXaG8gaXMgdGhlIEd5bSBMZWFkZXIgaW4gUGFsbGV0IFRvd24/JyxcbiAgICAgICAgICAgICAgICAnV2hvIGlzIHN0dWNrIG9uIE1hcnMgaW4g4oCYVGhlIE1hcnRpYW7igJk/J1xuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBhbnN3ZXI6ICdBcnNlbmFsJyxcbiAgICAgICAgICAgIHF1ZXN0aW9uczogW1xuICAgICAgICAgICAgICAgICdXaG8gcGxheSBhdCB0aGUgRW1pcmF0ZXMgU3RhZGl1bT8nLFxuICAgICAgICAgICAgICAgICdXaG8gYXJlIHRoZSBkb21lc3RpYyBjaGFtcGlvbnMgb2YgRnJhbmNlPycsXG4gICAgICAgICAgICAgICAgJ1doaWNoIHRlYW1cXCdzIG1hc2NvdCBpcyBhbiBlYWdsZT8nLFxuICAgICAgICAgICAgICAgICdXaGVyZSB3b3VsZCBvbmUgc3RvcmUgdGhlaXIgYm9hdGluZyBvYXJzPycsXG4gICAgICAgICAgICAgICAgJ1doZXJlIGFyZTxici8+dGhlIDEzIG1vc3QgZXhwZW5zaXZlIHJhYmJpdHM/JyxcbiAgICAgICAgICAgICAgICAnV2hhdCBpcyB0aGUg4oCYSmV3ZWwgb2YgQ2FsaWZvcm5pYSBCYXnigJk/JyxcbiAgICAgICAgICAgICAgICAnV2hhdCBpcyB0aGUgMTN0aCBtb250aCBjYWxsZWQ/JyxcbiAgICAgICAgICAgICAgICAnV2hvIGZvdW5kZWQgRmFjZWJvb2s/J1xuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBhbnN3ZXI6ICdOaWNlLCBGcmFuY2UnLFxuICAgICAgICAgICAgcXVlc3Rpb25zOiBbXG4gICAgICAgICAgICAgICAgJ1doZXJlIGlzIHRoZSBQcm9tZW5hZGUgZGVzIEFuZ2xhaXM/JyxcbiAgICAgICAgICAgICAgICAnV2hhdCBpcyBhIHR5cGUgb2YgYmlzY3VpdD8nLFxuICAgICAgICAgICAgICAgICdXaGF0IGlzIGFuIGlubGFuZCBmcmVuY2ggdG93bj8nLFxuICAgICAgICAgICAgICAgICdIb3cgZG8geW91IHNwZWxsIOKAmG1pbGxlbm5pdW3igJk/JyxcbiAgICAgICAgICAgICAgICAnV2hhdCBsZXR0ZXIgY29tZXMgYWZ0ZXIg4oCYSuKAmT8nLFxuICAgICAgICAgICAgICAgICdXaGVyZSBkb2VzIHRoZSBRdWVlbiBnZXQgYnVyaWVkPycsXG4gICAgICAgICAgICAgICAgJ1doZXJlIGFyZSB3ZWV0YWJpeCBtYWRlPydcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgYW5zd2VyOiAnQ2FudGVyYnVyeSBDYXRoZWRyYWwnLFxuICAgICAgICAgICAgcXVlc3Rpb25zOiBbXG4gICAgICAgICAgICAgICAgJ1doZXJlIGRpZDxici8+d2UgYm90aCBncmFkdWF0ZSBmcm9tIHVuaXZlcnNpdHk/JyxcbiAgICAgICAgICAgICAgICAnV2hlcmUgZGlkIEFuZHkgTXVycmF5IHdpbiB0aGUgVVMgT3Blbj8nLFxuICAgICAgICAgICAgICAgICdXaGVyZSBpczxici8+dGhlIHdvcmxk4oCZcyBsYXJnZXN0IHN3aW1taW5nIHBvb2w/JyxcbiAgICAgICAgICAgICAgICAnV2hlcmUgYXJlIHRoZSBDcm93biBKZXdlbHMga2VwdD8nLFxuICAgICAgICAgICAgICAgICdXaGVyZSBkaWQgQ2hhcmxlcyBEYXJ3aW4gd3JpdGUgT3JpZ2luIG9mIFNwZWNpZXM/JyxcbiAgICAgICAgICAgICAgICAnV2hpY2ggVUsgQnVpbGRpbmcgaXMgdGFsbGVyIHRoYW4gRXZlcmVzdD8nXG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGFuc3dlcjogJ1ByaWRlIGFuZCBQcmVqdWRpY2UnLFxuICAgICAgICAgICAgcXVlc3Rpb25zOiBbXG4gICAgICAgICAgICAgICAgJ1doYXQgbW92aWUgd2lsbCBJIG5ldmVyIHdhdGNoIGFnYWluPycsXG4gICAgICAgICAgICAgICAgJ1doYXQgaXMgYSBncmVhdCBYYm94IGdhbWU/JyxcbiAgICAgICAgICAgICAgICAnV2hhdCBkb2VzIHRoZSBQb3Bl4oCZcyB0YXR0b28gc2F5PycsXG4gICAgICAgICAgICAgICAgJ1doYXQgaXMgSksgUm93bGluZ+KAmXMgYmVzdCBzZWxsaW5nIGJvb2s/JyxcbiAgICAgICAgICAgICAgICAnV2hhdCBpcyBVS0lQ4oCZcyBvZmZpY2lhbCBtb3R0bz8nXG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGFuc3dlcjogJ1Blbmd1aW4nLFxuICAgICAgICAgICAgcXVlc3Rpb25zOiBbXG4gICAgICAgICAgICAgICAgJ1doYXQgaXMgdGhlIGJlc3QsIGN1dGVzdCBhbmltYWw/JyxcbiAgICAgICAgICAgICAgICAnV2hhdCBpcyB0aGUgZmFzdGVzdCBhbmltYWwgb24gZWFydGg/JyxcbiAgICAgICAgICAgICAgICAnV2hhdCBpcyBicmlnaHQgcmVkPycsXG4gICAgICAgICAgICAgICAgJ1doYXQgZG9lcyBQaWthY2h1IGV2b2x2ZSBpbnRvPydcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgYW5zd2VyOiAnT3JpZ2lucyBCYXIsIERhcndpbiBDb2xsZWdlJyxcbiAgICAgICAgICAgIHF1ZXN0aW9uczogW1xuICAgICAgICAgICAgICAgICdXaGVyZSBkaWQgd2UgbWVldD8nLFxuICAgICAgICAgICAgICAgICdEdWRlLCB3aGVyZeKAmXMgbXkgY2FyPycsXG4gICAgICAgICAgICAgICAgJ1doZXJlIGhhdmUgYWxsIHRoZSBtdWZmaW5zIGdvbmU/J1xuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBhbnN3ZXI6ICdGaXZlJyxcbiAgICAgICAgICAgIHF1ZXN0aW9uczogW1xuICAgICAgICAgICAgICAgICdIb3cgbWFueSB5ZWFycyBoYXZlIHdlIGJlZW4gdG9nZXRoZXI/JyxcbiAgICAgICAgICAgICAgICAnSG93IG9sZCBpcyBFbHZpcyBQcmVzbGV5PydcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgYW5zd2VyOiAnWUVTIScsXG4gICAgICAgICAgICBxdWVzdGlvbnM6IFtcbiAgICAgICAgICAgICAgICAnTWFubnksPGJyLz53aWxsIHlvdTxici8+bWFycnkgbWU/J1xuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgXSxcbiAgICBuZXh0UXVlc3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmN1cnJlbnQgPSB0aGlzLm1vcmUuc2hpZnQoKTtcbiAgICAgICAgcmV0dXJuICEhKHRoaXMuY3VycmVudCk7XG4gICAgfVxufTtcbiIsImNvbnN0IGpxID0ge1xuICAgIGFkZENsYXNzOiBmdW5jdGlvbihlbCwgY2xhc3NOYW1lKSB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICB9LFxuICAgIHJlbW92ZUNsYXNzOiBmdW5jdGlvbihlbCwgY2xhc3NOYW1lKSB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICB9LFxuICAgIGhhc0NsYXNzOiBmdW5jdGlvbihlbCwgY2xhc3NOYW1lKSB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpO1xuICAgIH0sXG4gICAgY2hhbmdlVGV4dDogZnVuY3Rpb24oZWwsIG5ld1RleHQpIHtcbiAgICAgICAgbGV0IGFjdGlvbiA9ICgpID0+IHtcbiAgICAgICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBhY3Rpb24pO1xuICAgICAgICAgICAgZWwuaW5uZXJIVE1MID0gbmV3VGV4dDtcbiAgICAgICAgICAgIGVsLnN0eWxlLm9wYWNpdHkgPSAnMSc7XG4gICAgICAgIH07XG4gICAgICAgIGVsLnN0eWxlLm9wYWNpdHkgPSAnMCc7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBhY3Rpb24pO1xuICAgIH1cbn07XG5cbmNvbnN0IHJhbmQgPSAoZnJtID0gMCwgdG8gPSAwKSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBNYXRoLmFicyh0byAtIGZybSkpICsgTWF0aC5taW4oZnJtLCB0byk7XG5cbmNvbnN0IGlkR2VuID0ge1xuICAgIGNoYXJzOiAnYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5JyxcbiAgICBvbGQ6IFtdLFxuICAgIGNyZWF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBnZW4gPSB0aGlzLmdlbigpO1xuICAgICAgICBpZiAodGhpcy5vbGQuaW5kZXhPZihnZW4pICE9PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vbGQucHVzaChnZW4pO1xuICAgICAgICByZXR1cm4gZ2VuO1xuICAgIH0sXG4gICAgZ2VuOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBBcnJheSgxNikuZmlsbCgxKS5tYXAoKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2hhcnNbcmFuZCh0aGlzLmNoYXJzLmxlbmd0aCldO1xuICAgICAgICB9KS5qb2luKCcnKTtcbiAgICB9XG59O1xuXG5leHBvcnQge1xuICAgIGpxLFxuICAgIGlkR2VuLFxuICAgIHJhbmRcbn07Il19
