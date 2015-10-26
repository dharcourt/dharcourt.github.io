/**
 * @module ui/tree-list-item.reel
 * @requires montage/ui/component
 */
var Component = require("montage/ui/component").Component;

/**
 * @class TreeListItem
 * @extends Component
 */
exports.TreeListItem = Component.specialize(/** @lends TreeListItem# */ {

    _iteration: {
        value: null
    },

    iteration: {
        get: function () {
            return this._iteration;
        },
        set: function (value) {
            if (this._iteration !== value) {
                this._iteration = value;
                if (value) {
                    this.isExpanded = value.isExpanded;
                }
            }
        }
    },

    _isExpanded: {
        value: false
    },

    isExpanded: {
        get: function () {
            return this._isExpanded;
        },
        set: function (value) {
            if (this._iteration && (this._iteration.isExpanded !== value)) {
                this._iteration.isExpanded = value;
            }
            if (this._isExpanded !== value) {
                this._isExpanded = value;
                if (value) {
                    this.classList.add("TreeListItem-isExpanded");
                } else {
                    this.classList.remove("TreeListItem-isExpanded");
                }
            }
        }
    },

    handleIsExpandedButtonAction: {
        value: function () {
            this.isExpanded = !this.isExpanded;
        }
    }

});
