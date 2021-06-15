const pruve = require("../../dist");
const expect = require("chai").expect;

describe("validator: contains", function () {
  it("should pass with array", async () => {
    let values = { contains: ["apple", "orange", "grape"] };
    let rules = { contains: "contains:grape" };
    const validated = await pruve(values).passes(rules);
    expect(validated.contains).to.equal(values.contains);
  });

  it("should pass with string", async () => {
    let values = { contains: "apple juice" };
    let rules = { contains: "contains:apple" };
    const validated = await pruve(values).passes(rules);
    expect(validated.contains).to.equal(values.contains);
  });

  it("should fail with array", async () => {
    let values = { contains: ["apple", "orange", "grape"] };
    let rules = { contains: "contains:melon" };

    try {
      const validated = await pruve(values).passes(rules);
    } catch (exception) {
      expect(exception.errors.contains).to.include(
        'Value must contain "melon"'
      );
    }
  });

  it("should fail with string", async () => {
    let values = { contains: "apple juice" };
    let rules = { contains: "contains:melon" };

    try {
      const validated = await pruve(values).passes(rules);
    } catch (exception) {
      expect(exception.errors.contains).to.include(
        'Value must contain "melon"'
      );
    }
  });
});
