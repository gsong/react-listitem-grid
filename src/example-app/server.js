//@flow strict
import faker from "faker";
import range from "lodash/range";
import { Model, Server } from "miragejs";

import { itemCount } from "./constants";

new Server({
  models: { card: Model },

  seeds(server) {
    range(itemCount).forEach(() => server.create("card", generateCard()));
  },

  routes() {
    this.namespace = "api";

    this.get("/cards/init", ({ cards }, { queryParams: { count } }) => {
      const cardCount = cards.all().models.length;

      if (count > cardCount) {
        range(count - cardCount).forEach(() => cards.create(generateCard()));
      }

      if (count < cardCount) {
        cards
          .all()
          .slice(count)
          .models.map((card) => card.destroy());
      }

      return cards.all();
    });

    this.get("/cards", ({ cards }, { queryParams: { count } }) =>
      cards.all().slice(0, count),
    );

    this.passthrough();
  },
});

function generateCard() {
  return {
    contentType: faker.lorem.word(),
    title: faker.lorem.words(8),
    subTitle: faker.lorem.words(),
    url: faker.internet.url(),
    image: {
      url: `https://picsum.photos/seed/${faker.lorem.word()}/500`,
    },
  };
}
