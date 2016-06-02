/**
 * Created by Christophe on 02/06/2016.
 */
(function(factory) {
    var root = (typeof self == 'object' && self.self === self && self) ||
        (typeof global == 'object' && global.global === global && global);

    if (typeof define === 'function' && define.amd) {
        define(["underscore"], function(_) {
            return factory(_);
        });
    } else {
        root.DynamicPoint = factory(root._);
    }
})(function(_) {
    /**
     * Dynamic point object
     * @param attributes
     * @constructor
     */
    return function(attributes) {

        var t = this;
        var changeCallback;

        // ajout des valeurs par défaut aux attributs de base si la clé n'existe pas
        /*_.each(config.props, function(value, key) {
            if (attributes[key] === undefined) attributes[key] = value;
        });*/

        this.set = function(key, value, sendCallback) {
            attributes[key] = value;

            if (changeCallback && sendCallback !== false) changeCallback({
                key: key,
                value: value
            });
        };

        this.get = function(key) {
            return attributes[key];
        };

        this.on = function(eventName, callback) {
            if (eventName === "change") changeCallback = callback;
        };


        this.foreach = function(callback) {
            for (var key in attributes) {
                if (attributes.hasOwnProperty(key)) {
                    callback({
                        key: key,
                        value: attributes[key]
                    });
                }
            }
        };

        this.triggerChanges = function() {
            t.foreach(function(e) {
                changeCallback(e);
            });
        }
    };
});