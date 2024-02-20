const { Stock } = require("./stock");

class Cart {
  constructor() {
    this.articles = [];
  }

  get totalAMount() {
    //console.log(this.articles);
    return this.articles.reduce(
      (acc, current) => acc + current.price * current.quantity,
      0
    );
  }

  validItem(item) {
    return (
      typeof item.price === "number" &&
      typeof item.quantity === "number" &&
      item.id
    );
  }

  addArticle(item) {
    if (this.validItem(item)) {
      const alreadyHaveArticle = this.articles.find(
        (art) => art.id === item.id
      );
      if (alreadyHaveArticle) {
        alreadyHaveArticle.quantity += item.quantity;
      } else {
        this.articles.push(item);
      }
      //remove article from stock
      Stock.delArticle(item.id, item.quantity);
    } else {
      console.error("article invalide");
    }
    return this;
  }

  delArticle(id) {
    const deletedArticle = this.articles.find((item) => item.id === id);
    if (deletedArticle) {
      deletedArticle.quantity -= 1;
      if (deletedArticle.quantity === 0) {
        this.articles = this.articles.filter((item) => item.id !== id);
      }
      Stock.delArticle(id, -1);
    }
    return this;
  }

  delCart() {
    this.articles = [];
  }

  applyDiscount(remises) {
    const priceAfterDiscount = this.articles.map((article) => {
      const remise = remises.articleRemise(article.id);

      if (remise) {
        return {
          ...article,
          price: Number((article.price * (1 - remise.amount / 100)).toFixed(2)),
        };
      } else {
        return article;
      }
    });
    return priceAfterDiscount.reduce(
      (acc, current) => acc + current.price * current.quantity,
      0
    );
  }
  
  applyRemiseV2(remises) {
    let tempRemises = [...remises];
    const tempArticles = [];
    this.articles.forEach((article) => {
      const isRemise = tempRemises.find((r) => r.articleId === article.id);
      if (isRemise) {
        tempRemises = tempRemises.filter((r) => r.articleId !== article.id);
        if (isRemise.amount >= article.price) {
          return tempArticles.push(article);
        }
        const qte = article.quantity;
        tempArticles.push({
          ...article,
          price: article.price - isRemise.amount,
          quantity: 1,
        });
        tempArticles.push({ ...article, quantity: qte - 1 });
      } else {
        tempArticles.push(article);
      }
    });

    return tempArticles.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
  }
}

module.exports = {
  Cart: Cart,
};
