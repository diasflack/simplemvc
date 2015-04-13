(function(global) {

    "use strict";

    var global = global;
    var MVC = global.MVC || {};

    MVC.Model = function(object) {

        for (var property in object) {
            this[property] = object[property];
            Object.defineProperty(this, property, {configurable:false})
        }

        var model = this;

        function modelConstructor() {
            return model;
        }

        return modelConstructor;
    };

    MVC.ModelList = function(models) {
        this.models = models;

    };

    MVC.ModelList.prototype.addModel = function(model) {
        this.models.push(model);
    };

    MVC.ModelList.prototype.getModels = function() {
        return this.models;
    };

    global.MVC = MVC;

})(window);