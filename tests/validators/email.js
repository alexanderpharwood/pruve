const pruve = require("../../dist");
const expect = require("chai").expect;

describe("validator: email", function () {
  it("should pass", async () => {
    let values = { email: "example@example.com" };
    let rules = { email: "email" };
    const validated = await pruve(values).passes(rules);
    expect(validated.email).to.equal(values.email);
  });

  it("should fail", async () => {
    let values = { email: "Not an email address" };
    let rules = { email: "email" };

    try {
      const validated = await pruve(values).passes(rules);
    } catch (exception) {
      expect(exception.errors.email).to.include(
        "Value must be a valid email address"
      );
    }
  });
});
