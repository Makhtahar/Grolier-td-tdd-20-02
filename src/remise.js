class Remise {
  constructor() {
    this.remises = [];
  }

  articleRemise(id) {
    return this.remises.find((r) => r.articleId === id);
  }

  addRemises(remise) {
    if (this.remises.find((r) => r.articleId === remise.articleId)) {
      console.error("a remise already exist for this article");
    } else {
      this.remises.push(remise);
    }
    return this;
  }

  deleteRemise(id) {
    this.remises = this.remises.filter((r) => r.id !== id);
    return this;
  }
}

module.exports = {
  Remise: Remise,
};
