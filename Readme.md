# Angularjs Slideout

Lightweight angular slideout directive for mobile which does not require angular-animate.js

### [Demo](http://mfbx9da4.github.io/projects/angular-slideout)

### Dependencies

- angular
- Optional dependency of angular touch for swiping menu away

### Install

If you are using npm or webpack 

    npm install --save angular-slideout

```js
var angular_slideout = require('angular-slideout');
var app = angular.module('app', ['angular-slideout', 'ngTouch']);
app.controller('main', function($scope) {});
```

Look in index.html for full demo.

Otherwise import angular and slideoutjs.

```html
<!-- Angular -->
<script src="http://code.angularjs.org/1.2.19/angular.min.js"></script>
<!-- Angular touch (not required) -->
<script src="http://code.angularjs.org/1.2.19/angular-touch.min.js"></script>
<!-- Slideout module -->
<script src="slideout.min.js"></script>
<!-- Your App Code -->
<script>
    // import angular-slideout
    var app = angular.module('app', ['angular-slideout', 'ngTouch']);
    app.controller('main', function($scope) {});
</script>
```

### Usage

#### Configure your sidebar content

* **Configure slideout attribute:** Use a boolean variable to determine whether to show slideout.
* **Configure slideout direction:** Options are 'from-left' or 'from-right'

```html
<nav slideout="show_menu" slideout-direction="from-left">
  <div class="back-button" ng-click="show_menu = false;">Back</div>
  <h2>Menu content</h2>
</nav>
```

####Configure sidebar toggles

```html
<div class="show-sidebar" ng-click="show_menu = true;">
  Show sidebar
</div>
```

####Configure swipe toggles (requires angular-touch)

```html
<div class="container"
	 ng-swipe-left="show_menu = true"
	 ng-swipe-right="show_menu = false; show_sub_menu = false;">
	 ...
</div>
```
