/**
 * @ngdoc service
 * @name <%= scriptAppName %>.mainMenu.service:mainMenu
 * @description
 * Service to manage the main menu
 */

(function () {
	'use strict';

	// register the service as MenuService
	angular.module('<%= scriptAppName %>.mainMenu')
		.provider('mainMenu', mainMenuProvider);

	/**
	 * @ngdoc function
	 * @name mainMenu.provider:mainMenu
	 * @description
	 * MenuProvider definition
	 * AngularJS will instantiate a singleton which is
	 * the object resulting from the $get method call
	 * However, providers can be configured in the config
	 * phase of your angular application
	 * @returns {Object} Singleton
	 */
	function mainMenuProvider() {
		/* jshint validthis:true */
		// factory members
		var menu = [];
		var path;

		// public configuration API
		this.setMenu = setMenu;
		this.addMenuItem = addMenuItem;
		this.addSubMenuItem = addSubMenuItem;

		// Method for instantiating
		this.$get = mainMenuFactory;

		/**
		 * @ngdoc function
		 * @name setMenu
		 * @methodOf mainMenu.service:mainMenu
		 * @description
		 * Sets a new menu
		 * @param {*} newMenu The new menu
		 */
		function setMenu(newMenu) {
			menu = newMenu;
		}

		/**
		 * @ngdoc function
		 * @name addMenuItem
		 * @methodOf mainMenu.service:mainMenu
		 * @description
		 * Adds a new menu item to the current menu
		 * @param {*} menuData The menu data to add
		 */
		function addMenuItem(menuData) {
			menu.push(menuData);
		}

		/**
		 * @ngdoc function
		 * @name addSubMenuItem
		 * @methodOf mainMenu.service:mainMenu
		 * @description
		 * Adds a new submenu item to a parent menu
		 * @param {String} parent The path of the parent element
		 * @param {Object} menuData The sub item data to add
		 */
		function addSubMenuItem(parent, menuData) {
			var menuItem = _.find(menu, {path: parent});
			if (menuItem) {
				menuItem.subItems = menuItem.subItems || [];
				menuItem.subItems.push(menuData);
			}
		}

		function addController(controller) {
			var config = controller.constructor.$routeConfig;
			config.forEach(function (item) {
				if (item.menu) {
					item.menu.path = item.path;
					addMenuItem(item.menu);
				}
			});
		}

		// a private constructor
		function MainMenu() {
			this.getMenu = getMenu;

			this.addController = addController;

			function getMenu() {
				return menu;
			}
		}

		// factory function for MainMenu
		function mainMenuFactory() {
			return new MainMenu();
		}
	}
})();
