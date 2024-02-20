const Cart = require("../src/cart").Cart;
const Remise = require("../src/remise").Remise;
const Stock = require("../src/stock").Stock;
const expect = require("chai").expect;

describe("Testing the Cart Functions", function () {
  it("1. add an article into cart and display correct price", function (done) {
    Stock.init([
      { id: 1, name: "chocolat", price: 16, quantity: 10 },
      { id: 2, name: "miel", price: 30, quantity: 10 },
    ]);
    let c1 = new Cart();
    c1.addArticle({ id: 1, name: "chocolat", price: 16, quantity: 5 });
    c1.addArticle({ id: 1, name: "chocolat", price: 16, quantity: 1 });
    c1.addArticle({ id: 2, name: "miel", price: 30, quantity: 4 });

    //create Remises
    let r = new Remise();
    r.addRemises({ id: 1, articleId: 1, amount: 20 })
      .addRemises({
        id: 2,
        articleId: 2,
        amount: 50,
      })
      .addRemises({ id: 1, articleId: 1, amount: 50 });

    expect(c1.articles).to.deep.equal([
      { id: 1, name: "chocolat", price: 16, quantity: 6 },
      { id: 2, name: "miel", price: 30, quantity: 4 },
    ]);
    //16 * 6 + 30 * 4
    expect(c1.totalAMount).to.equal(216);
    //get 20% on each 16 and 50% on each 30
    //12.8*6 + 15 *4
    expect(c1.applyDiscount(r)).to.equal(138.8);

    expect(Stock.stock).to.deep.equal([
      { id: 1, name: "chocolat", price: 16, quantity: 4 },
      { id: 2, name: "miel", price: 30, quantity: 6 },
    ]);
    done();
  });

  it("2. delete an article from cart and display correct price", function (done) {
    let c2 = new Cart();
    c2.addArticle({ id: 1, name: "chocolat", price: 16, quantity: 5 })
      .addArticle({ id: 1, name: "chocolat", price: 16, quantity: 1 })
      .addArticle({ id: 2, name: "miel", price: 30, quantity: 4 });

    c2.delArticle(1).delArticle(1).delArticle(2);
    expect(c2.articles).to.deep.equal([
      { id: 1, name: "chocolat", price: 16, quantity: 4 },
      { id: 2, name: "miel", price: 30, quantity: 3 },
    ]);
    // 16 * 4 + 30 * 3
    expect(c2.totalAMount).to.equal(154);
    done();
  });

  it("3. empty cart, so price will be equal 0", function (done) {
    let c3 = new Cart();
    c3.addArticle({ id: 1, name: "chocolat", price: 16, quantity: 5 })
      .addArticle({ id: 1, name: "chocolat", price: 16, quantity: 1 })
      .addArticle({ id: 2, name: "miel", price: 30, quantity: 4 });

    c3.delCart();
    expect(c3.articles).to.deep.equal([]);
    expect(c3.totalAMount).to.equal(0);

    done();
  });
});
