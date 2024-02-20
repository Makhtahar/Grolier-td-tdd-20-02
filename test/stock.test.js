const Stock = require("../src/stock").Stock;
const expect = require("chai").expect;

describe("Testing the Stock function", function () {
  it("1. add stock", function (done) {
    Stock.init([]);
    Stock.addArticle({ id: 1, name: "chocolat", price: 16, quantity: 1 })
      .addArticle({ id: 2, name: "miel", price: 30, quantity: 4 })
      .addArticle({ id: 1, name: "chocolat", price: 16, quantity: 2 });

    expect(Stock.stock).to.deep.equal([
      { id: 1, name: "chocolat", price: 16, quantity: 3 },
      { id: 2, name: "miel", price: 30, quantity: 4 },
    ]);
    done();
  });

  it("2. remove stock", function (done) {
    Stock.init([
      { id: 1, name: "chocolat", price: 16, quantity: 3 },
      { id: 2, name: "miel", price: 30, quantity: 4 },
    ]);

    Stock.delArticle(1, 2).delArticle(2, 10).delArticle(2, 1);
    expect(Stock.stock).to.deep.equal([
      { id: 1, name: "chocolat", price: 16, quantity: 1 },
      { id: 2, name: "miel", price: 30, quantity: 3 },
    ]);

    done();
  });
});
