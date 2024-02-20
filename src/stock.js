class Stock {
  static articles = [];
  constructor(stock) {
    this.articles = stock ? stock : [];
  }

  static init(stock) {
    this.articles = stock ? stock : [];
  }

  static get stock() {
    return this.articles;
  }

  static addArticle(item) {
    if (validItem(item)) {
      const alreadyHaveArticle = this.articles.find(
        (art) => art.id === item.id
      );
      if (alreadyHaveArticle) {
        alreadyHaveArticle.quantity += item.quantity;
      } else {
        this.articles.push(item);
      }
    } else {
      console.error("article invalide. Il n'a pas été ajouté au stock.");
    }
    return this;
  }

  static delArticle(id, quantity) {
    const deletedArticle = this.articles.find((item) => item.id === id);
    if (deletedArticle) {
      if (quantity > deletedArticle.quantity) {
        console.error("quantité invalide, supérieur à celle actuelle");
      } else {
        deletedArticle.quantity -= quantity;
      }
    } else {
      console.error("Aucun article correcpondant à l'id fournis");
    }
    return this;
  }
}

function validItem(item) {
  return (
    typeof item.price === "number" &&
    typeof item.quantity === "number" &&
    item.id
  );
}

module.exports = {
  Stock: Stock,
};
