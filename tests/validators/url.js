const pruve = require("../../dist");
const expect = require("chai").expect;

describe("validator: url", function () {
  it("should pass", async () => {
    let values = { url: "https://example.com" };
    let rules = { url: "url" };
    const validated = await pruve(values).passes(rules);
    expect(validated.url).to.equal(values.url);
  });

  it("should fail", async () => {
    let values = { url: "not a url" };
    let rules = { url: "url" };

    try {
      const validated = await pruve(values).passes(rules);
    } catch (exception) {
      expect(exception.errors.url).to.include("Value must be a valid url");
    }
  });
});
