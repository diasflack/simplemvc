describe("MVC", function() {

    var MVC = window.MVC;

    it("contains MVC model in global var", function(){
        expect(MVC).toBeDefined();
    });

    describe("PubSub module", function(){

        it("can subscribe and publish", function() {
            var info, result;

            var subscription = MVC.PubSub.subscribe('test', function(obj) {
                result = obj;
            });

            MVC.PubSub.publish('test', {
                message: "test succesful"
            });

            expect(result.message).toBe("test succesful");

        });

    });

    describe("Model", function() {

        var properties, ItemModel;

        beforeAll(function() {
          properties = {name:"exampleName", category:"exampleCategory", gramms:0}
          ItemModel = new MVC.Model(properties);
        });

        describe("Basic model function", function() {

            it("can create Models with various properties", function() {
                expect(new ItemModel().name).toEqual("exampleName");
                expect(new ItemModel().category).toEqual("exampleCategory");
                expect(new ItemModel().gramms).toEqual(0);
            });

            it("can create instances and can`t delete properties", function (){
                var item1 = new ItemModel();

                item1.name = "item1";

                expect(item1.name).toEqual("item1");
                expect(item1.category).toEqual("exampleCategory");
                expect(item1.gramms).toEqual(0);

                expect(delete item1.name).toBe(false);

            });

            it("can't extense, add new properties", function() {
                var nonExtenseItem = new ItemModel();

                nonExtenseItem.newProperty = "newValue";

                expect(nonExtenseItem.newProperty).not.toBeDefined();

            });

            it("various model constructors creates various instances", function() {
                var NewItemModel = new MVC.Model({name:"notItemModel"});

                var item1 = new ItemModel();
                var item2 = new NewItemModel();

                expect(item1 instanceof ItemModel).toBeTruthy();
                expect(item1 instanceof NewItemModel).toBeFalsy();
                expect(item2 instanceof NewItemModel).toBeTruthy();
                expect(item2 instanceof ItemModel).toBeFalsy();

            });

        });

        describe("Model Lists", function() {

            it("Model list update through model creation", function(){
                var itemModelsList = new MVC.ModelList(ItemModel);

                var item2 = new ItemModel({
                    name:"item2",
                    gramms: 50
                });

                expect(itemModelsList.models[0]).toEqual(item2);

            });

        });

    });

    describe("View", function(){
        var settings, model, template, parent;

        beforeAll(function() {
            var properties = {name:"exampleName", category:"exampleCategory", gramms:0};
            var ItemModel = new MVC.Model(properties);
            model = new ItemModel();

            template = "<h1></h1>";
            parent = document.getElementsByTagName("body")[0];

            settings = {
                model: model,
                template: template,
                parent: parent
            }
        });

        it("Must create view with basic settings", function(){
            var itemView = new MVC.View(settings);

            expect(itemView).toBeDefined();
            expect(itemView.model).toEqual(model);
            expect(itemView.template).toEqual(template);
            expect(itemView.parent).toEqual(parent);
        });

        describe("View initializing errors", function(){

            it("Must throw model error", function() {

                expect(function() {new MVC.View({template: template, parent: parent})}).toThrow();

            });

            it("Must throw template error", function() {

                expect(function() {new MVC.View({model:model, parent: parent})}).toThrow();

            });

            it("Must throw parent error", function() {

                expect(function() {new MVC.View({model:model, template: template})}).toThrow();

            });

        });

        describe("View render functions", function() {
            it("must have render function", function() {
                var itemView = new MVC.View(settings);

                console.log(itemView);

                expect(itemView.render).toBeDefined();
            });
        });

    });





});
