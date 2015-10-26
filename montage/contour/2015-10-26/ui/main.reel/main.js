var Component = require("montage/ui/component").Component,
    IntervalController = require("contour-framework/logic/controller/interval-controller").IntervalController,
    MockService = require("contour-framework/logic/mock-service/main-service").MockService;

/**
 * @class Main
 * @extends Component
 */
exports.Main = Component.specialize(/** @lends Main.prototype */{
    constructor: {
        value: function Main() {
            // TO DO [Charles]: Move these properties to ContourController and
            // make ContourController a delegate of Application so any object
            // in the application can access it and those properties.
            this.application.mockService = new MockService();
            this.application.intervalController = new IntervalController();

            // Cordova preparation.
            this.application.isInCordova = window.cordova ? true : false;
            if (this.application.isInCordova) {
                document.addEventListener("deviceready", this._handleDeviceReady, false);
            }
        }
    },

    floatingButton: {
        value: null // Value set in main.html's montage-serialization.
    },

    mainMenu: {
        value: null // Value set in main.html's montage-serialization.
    },

    panel: {value: null},

    initialPanelName: {
        value: null // Value to be set when testing a particular panel.
    },

    /**
     * Cordova initialization.
     */
    //_handleDeviceReady: {
    //    value: function () {
    //        alert("device ready");
    //        window.open = cordova.InAppBrowser.open;
    //        cordova.plugins.Keyboard.disableScroll(true);
    //    }
    //},

    enterDocument: {
        value: function (firstTime) {
            var portraitMediaQuery;

            if (firstTime) {
                portraitMediaQuery = window.matchMedia("(max-width: 1199px) and (max-aspect-ratio: 999999/1000000), (max-width: 299px)");
                portraitMediaQuery.addListener(this._updateOrientation.bind(this));
                this._updateOrientation(portraitMediaQuery);
            }
        }
    },

    _updateOrientation: {
        value: function (portraitMediaQuery) {
            this.application.isPortrait = portraitMediaQuery.matches;
        }
    },

    prepareForActivationEvents: {
        value: function () {
            this.addEventListener("mainMenuHideAction", this, false);
            this.addEventListener("mainMenuShowAction", this, false);
        }
    },

    handleMainMenuHideAction: {
        value: function (event) {
            event.stopPropagation();
            this.floatingButton.context = this.floatingButton.HOME;
            this.mainMenu.isVisible = false;
        }
    },

    handleMainMenuShowAction: {
        value: function (event) {
            event.stopPropagation();
            this.floatingButton.context = this.floatingButton.MENU;
            this.mainMenu.isVisible = true;
        }
    }

});
