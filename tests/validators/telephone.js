const pruve = require("../../dist");
const expect = require("chai").expect;

describe("validator: telephone", function () {
  it("should pass", async () => {
    let values = { telephone: "01234 556778" };
    let rules = { telephone: "telephone" };
    const validated = await pruve(values).passes(rules);
    expect(validated.telephone).to.equal(values.telephone);
  });

  it("should fail", async () => {
    let values = { telephone: "Not a telephone number" };
    let rules = { telephone: "telephone" };

    try {
      const validated = await pruve(values).passes(rules);
    } catch (exception) {
      expect(exception.errors.telephone).to.include(
        "Value must be a valid telephone number"
      );
    }
  });
});
