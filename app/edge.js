"use strict";
/**
 * edgeJS v0.0.1 experimental
 * author: rafael herscovici, taurusrh@gmail.com
**/
window.edgeJS = (function () {

    function setDefaultMethods(obj, t) {
        return {
            add: function (args) {
                if (args) {
                    if (typeof args === "object") {
                        var item = t(args);
                        obj[item.name] = item;
                        return item;
                    }
                    throw "expected an args object";
                }
                throw "args must be supplied";
            },
            get: function (name) {
                return obj[name];
            }
        };
    }

    function view(viewArgs) {

        var controllers = {},
            viewObj = {
                name: viewArgs.name,
                element: document.querySelector("#" + viewArgs.name),
                controllers: setDefaultMethods(controllers, controller)
            };

        function controller(ctrlArgs) {
            ctrlArgs.view = (function () { return viewObj; }());
            if (ctrlArgs) {
                if (ctrlArgs.name && typeof ctrlArgs.name === "string") {
                    if (ctrlArgs.init && typeof ctrlArgs.init === "function") {
                        ctrlArgs.init(viewObj);
                        return ctrlArgs;
                    }
                    throw "No method was supplied to the controller";
                }
                throw "Controller name must be specified";
            }

            throw "Arguments were not provided";
        }


        return viewObj;
    }
    function module(args) {
        var
            views = {},
            modules = {},
            // An object containing callback functions.
            //  * Keys are property names
            //  * Values are arrays of callback functions
            callbacks = {},
            // An object containing property values.
            //  * Keys are property names
            //  * Values are values set on the model
            values = {},
            self = this;

        if (typeof args.callback === "function") {
            args.callback(self);
        }

        // Return the public Model API, using the revealing module pattern.
        return {
            name: args.name,
            views: setDefaultMethods(views, view),
            modules: setDefaultMethods(modules, module),

            // Gets a value from the model
            get: function (key) {
                return values[key];
            },

            // Sets a value on the model and invokes callbacks added for the property, passing the new value into the callback.
            set: function (key, value) {
                values[key] = value;
                if (callbacks[key]) {
                    callbacks[key].forEach(function (callback) {
                        callback(value);
                    });
                }
            },

            // Adds a callback that will listen for changes to the specified property.
            on: function (key, callbackToAdd) {
                if (!callbacks[key]) {
                    callbacks[key] = [];
                }
                callbacks[key].push(callbackToAdd);
            },

            // Removes a callback that listening for changes to the specified property.
            off: function (key, callbackToRemove) {
                if (callbacks[key]) {
                    callbacks[key] = callbacks[key].filter(function (callback) {
                        return callback !== callbackToRemove;
                    });
                }
            }

        };


    };

    var edgeApp = module({ name: "edgeApp" });


    return edgeApp;

}(window.edgeJS || {}));