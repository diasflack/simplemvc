describe("MVC", function() {

  var MVC = window.MVC;

  it("contains MVC model in global var", function(){
    expect(MVC).toBeDefined();
  });



  describe("Model", function() {

    var properties, ItemModel;

    beforeAll(function() {
      properties = {name:"exampleName", category:"exampleCategory", gramms:0}
      ItemModel = new MVC.Model(properties);
    });

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


  });

});
