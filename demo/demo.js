if (!window.getComputedStyle) {
    window.getComputedStyle = function(el, pseudo) {
        this.el = el;
        this.getPropertyValue = function(prop) {
            var re = /(\-([a-z]){1})/g;
            if (prop == 'float') prop = 'styleFloat';
            if (re.test(prop)) {
                prop = prop.replace(re, function() {
                    return arguments[2].toUpperCase();
                });
            }
            return el.currentStyle[prop] ? el.currentStyle[prop] : null;
        }
        return this;
    }
}

var app = angular.module('app', ['angular-slideout', 'ngTouch']);
app.controller('main', function($scope) {
    $scope.log = function () {
        console.log('hi');
    }
    $scope.randomBool = function () {
        return Math.random() > 0.5;
    }
    window.sc = $scope;
});
document.querySelector('.loader').remove();

module.exports = "main.js";
