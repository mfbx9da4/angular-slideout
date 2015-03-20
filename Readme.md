# Angularjs Slideout

Lightweight angular slideout directive for mobile which does not require angular-animate.js

<!-- ### [Demo]() -->

### Dependencies

- Tested with AngularJS v1.2.18
- Optional dependency of angular touch for swiping menu away

### Usage

Look in index.html for full demo.


Import angular and slideoutjs.

	<script src="http://code.angularjs.org/1.2.19/angular.min.js"></script>
	<!-- Not required -->
	<script src="http://code.angularjs.org/1.2.19/angular-touch.min.js"></script>
	<script src="myController.js"></script>
	<script src="slideout.js"></script>

**Configure slideout attribute:** Use a boolean variable to determine whether to show slideout.
**Configure slideout direction:** Options are 'from-left' or 'from-right'

	<nav slideout="show_menu" slideout-direction="from-left">
	  <div class="back-button" ng-click="show_menu = false;">Back</div>
	  <h2>Menu content</h2>
	</nav>

Configure toggles

	<div class="show-sidebar" ng-click="show_menu = true;">
	  Show sidebar
	</div>

Configure swipe toggles (requires angular-touch)

	<div class="container"
		 ng-swipe-left="show_menu = true"
		 ng-swipe-right="show_menu = false; show_sub_menu = false;">
		 ...
	</div>