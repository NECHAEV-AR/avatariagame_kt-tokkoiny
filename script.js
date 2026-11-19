// Каталог товаров. Для добавления фотографии укажи путь в поле image.
const products = [
  { name: "Тапочки «BWA»", price: 585, image: "" },
  { name: "Кресло «Каблук Любы»", price: 483, image: "" },
  { name: "Светлая накидка «Аксель»", price: 449, image: "" },
  { name: "Тёмная накидка «Аксель»", price: 449, image: "" },
  { name: "Фотодоска «Клипток»", price: 250, image: "" },
  { name: "Сумка доставщика «Onion»", price: 435, image: "" },
  { name: "Лонгслив «Крысиная любовь»", price: 450, image: "" },
  { name: "Клипбокс", price: 599, image: "" },
  { name: "Шапка «Аксель»", price: 333, image: "" },
  { name: "Наушники «Аксель»", price: 444, image: "" },
  { name: "Шапка бини «Star shine»", price: 250, image: "" },
  { name: "Очки «Star shine»", price: 200, image: "" },
  { name: "Серьга «Star shine»", price: 150, image: "" },
  { name: "Лонгслив «Star shine»", price: 550, image: "" },
  { name: "Штаны «Star shine»", price: 300, image: "" },
  { name: "Кеды «Star shine»", price: 250, image: "" }
];

const grid = document.getElementById("productGrid");

// Остальным страницам каталог не нужен.
if (grid) {
  const search = document.getElementById("productSearch");
  const sort = document.getElementById("productSort");
  const empty = document.getElementById("emptyProducts");

  // Защита от случайно неполной разметки магазина.
  if (search && sort && empty) {
    function renderProducts() {
      const term = search.value.trim().toLocaleLowerCase("ru");

      let list = products
        .map((product, order) => ({ ...product, order }))
        .filter(product => product.name.toLocaleLowerCase("ru").includes(term));

      if (sort.value === "asc") {
        list.sort((a, b) => a.price - b.price || a.order - b.order);
      } else if (sort.value === "desc") {
        list.sort((a, b) => b.price - a.price || a.order - b.order);
      } else if (sort.value === "name") {
        list.sort((a, b) => a.name.localeCompare(b.name, "ru"));
      }

      grid.replaceChildren();

      list.forEach(product => {
        const card = document.createElement("article");
        card.className = "product-card";

        const photo = document.createElement("div");
        photo.className = "product-image";
        photo.setAttribute("aria-label", `Изображение товара: ${product.name}`);

        if (product.image) {
          const image = document.createElement("img");
          image.src = product.image;
          image.alt = product.name;
          photo.append(image);
        }

        const title = document.createElement("h3");
        title.textContent = product.name;

        const price = document.createElement("div");
        price.className = "product-price";

        const coin = document.createElement("img");
        coin.src = "images/tokcoin.png";
        coin.alt = "";
        coin.setAttribute("aria-hidden", "true");

        price.append(coin, document.createTextNode(`${product.price} ТокКоинов`));
        card.append(photo, title, price);
        grid.append(card);
      });

      empty.hidden = list.length !== 0;
    }

    search.addEventListener("input", renderProducts);
    sort.addEventListener("change", renderProducts);
    renderProducts();
  }
}
