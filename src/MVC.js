(function(global) {

    "use strict";

    var global = global;
    var MVC = global.MVC || {};


    MVC.PubSub = (function() {

        var events = {};
        var hOp = events.hasOwnProperty;

        return {
            subscribe: function(event, listener) {

                if (!hOp.call(events, event)) {
                    events[event] = [];
                }

                var index = events[event].push(listener) - 1;

                return {
                    remove: function() {
                        delete events[event][index];
                    }
                }

            },

            publish: function(event, info) {
                if(!hOp.call(events, event)) {
                    return;
                }

                events[event].forEach(function(item) {
                    item(info != undefined ? info : {});
                });
            }

        }

    })();

    MVC.Model = function(ModelMap) {

        return function() {

            var that = this;

            for (var property in ModelMap) {

                var privateProperty = "_"+property;
                that[privateProperty] = ModelMap[property];

                Object.defineProperty(that, property, {
                    get: function(privateProperty) {
                        return function() {
                            return that[privateProperty];
                        };
                    }(privateProperty),

                    set: function (privateProperty) {
                        return function(val) {
                            if (typeof that[privateProperty] === typeof val) {
                                that[privateProperty] = val;
                            } else {
                                console.error("Wrong type of %s! Must be %s - but got %s", property, typeof that[privateProperty], typeof val);
                            }
                        };
                    }(privateProperty),

                    configurable: false});
            }

            Object.preventExtensions(that);
            MVC.PubSub.publish("modelCreated", that);

        };
    };

    MVC.ModelList = function(ModelConstructor) {
        var that = this;
        that.modelConstructor = ModelConstructor || [];
        that.models = [];

        MVC.PubSub.subscribe("modelCreated", function(model) {
            if(model instanceof that.modelConstructor) {
                that.addModel(model);
            }
        });

    };

    MVC.ModelList.prototype.addModel = function(model) {
        this.models.push(model);
    };

    MVC.ModelList.prototype.getModels = function() {
        return this.models;
    };

    global.MVC = MVC;

})(window);