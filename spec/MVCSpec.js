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
            expect(ItemModel().name).toEqual("exampleName");
            expect(ItemModel().category).toEqual("exampleCategory");
            expect(ItemModel().gramms).toEqual(0);
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

        });

        describe("Model Lists", function() {

            it("Model list update through model creation", function(){
                var itemModelsList = new MVC.ModelList();

                var item2 = new ItemModel({
                    name:"item2",
                    gramms: 50
                });

                expect(itemModelsList.models[0]).toEqual(item2);

            });

        });

    });





});
