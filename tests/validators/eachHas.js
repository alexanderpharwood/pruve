const pruve = require("../../dist");
const expect = require("chai").expect;

describe("validator: eachHas", function () {
  it("should pass", async () => {
    let values = { list: [{ name: "Jeff" }, { name: "Tom" }] };
    let rules = { list: "eachHas:name" };
    const validated = pruve(values).passes(rules);
    expect(validated.list).to.equal(values.list);
  });

  it("should fail", async () => {
    let values = { list: [{ foo: "Jeff" }, { name: "Tom" }] };
    let rules = { list: "eachHas:name" };
    try {
      const validated = pruve(values).passes(rules);
    } catch (exception) {
      expect(exception.errors.list).to.include(
        'All children must contain property "name"'
      );
    }
  });
});
