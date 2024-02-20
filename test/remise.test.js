const Remise = require("../src/remise").Remise;
const expect = require("chai").expect;

describe("Testing the Remise function", function () {
  it("1. add a remise in site", function (done) {
    let r = new Remise();
    r.addRemises({ id: 1, articleId: 1, amount: 20 })
      .addRemises({
        id: 2,
        articleId: 2,
        amount: 50,
      })
      .addRemises({ id: 1, articleId: 1, amount: 50 });

    expect(r.remises).to.deep.equal([
      { id: 1, articleId: 1, amount: 20 },
      {
        id: 2,
        articleId: 2,
        amount: 50,
      },
    ]);
    done();
  });

  it("2. remove a remise from existings", function (done) {
    let r = new Remise();
    r.addRemises({ id: 1, articleId: 1, amount: 20 }).addRemises({
      id: 2,
      articleId: 2,
      amount: 50,
    });
    r.deleteRemise(1);
    r.deleteRemise(3);
    expect(r.remises).to.deep.equal([
      {
        id: 2,
        articleId: 2,
        amount: 50,
      },
    ]);
    done();
  });

  it("3. Find article corresponding to remise ", function (done) {
    let r = new Remise();
    r.addRemises({ id: 1, articleId: 1, amount: 20 }).addRemises({
      id: 2,
      articleId: 2,
      amount: 50,
    });
    const remise = r.articleRemise(1);
    expect(remise).to.deep.equal({ id: 1, articleId: 1, amount: 20 });
    done();
  });
});
