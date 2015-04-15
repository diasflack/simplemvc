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

        for (var property in ModelMap) {
            this[property] = ModelMap[property];
            Object.defineProperty(this, property, {configurable:false})
        }

        var model = this;

        function modelConstructor(ModelValues) {

            for (var property in ModelValues) {
                if (model.hasOwnProperty(property)) {
                    model[property] = ModelValues[property];
                }
            }

            Object.preventExtensions(model);

            MVC.PubSub.publish("modelCreated", model);

            return model;
        }

        return modelConstructor;
    };

    MVC.ModelList = function(models) {
        var that = this;
        that.models = models || [];

        MVC.PubSub.subscribe("modelCreated", function(model) {
            that.addModel(model);
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