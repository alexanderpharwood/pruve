const pruve = require("../../dist");
const expect = require("chai").expect;

describe("validator: arrayOf", function () {
  it("should pass", async () => {
    let values = { arrayOfStrings: ["item", "item2", "item3"] };
    let rules = { arrayOfStrings: "arrayOf:string" };
    const validated = await pruve(values).passes(rules);
    expect(validated.arrayOfStrings).to.equal(values.arrayOfStrings);
  });

  it("should fail", async () => {
    let values = { arrayOfStrings: [3, "item2", "item3"] };
    let rules = { arrayOfStrings: "arrayOf:string" };

    try {
      const validated = await pruve(values).passes(rules);
    } catch (exception) {
      expect(exception.errors.arrayOfStrings).to.include(
        'All items in the list must be of type "string"'
      );
    }
  });
});
