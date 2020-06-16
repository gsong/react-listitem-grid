//@flow strict
import faker from "faker";
import range from "lodash/range";
import { Model, Server } from "miragejs";

new Server({
  models: { card: Model },

  routes() {
    this.namespace = "api";

    this.get("/cards", ({ cards }, { queryParams: { count } }) => {
      const cardCount = cards.all().models.length;
      if (count > cardCount) {
        range(count - cardCount).forEach(() => cards.create(generateCard()));
      }

      return cards.all().slice(0, count);
    });

    this.passthrough();
  },
});

const generateCard = () => ({
  contentType: faker.lorem.word(),
  title: faker.lorem.words(8),
  subTitle: faker.lorem.words(),
  url: faker.internet.url(),
  image: {
    url: `https://picsum.photos/seed/${faker.lorem.word()}/500`,
  },
});
