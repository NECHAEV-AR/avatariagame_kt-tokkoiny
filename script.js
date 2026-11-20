
 // Каталог товаров.
// Для добавления фотографии укажи путь в поле image.
// Для отметки «Новинка» установи isNew: true.

const products = [
  { name: "Тапочки «BWA»", price: 585, image: "", category: "clothes", isNew: true },
  { name: "Кресло «Каблук Любы»", price: 483, image: "", category: "furniture", isNew: true },
  { name: "Светлая накидка «Аксель»", price: 449, image: "", category: "axel", isNew: false },
  { name: "Тёмная накидка «Аксель»", price: 449, image: "", category: "axel", isNew: false },
  { name: "Фотодоска «Клипток»", price: 250, image: "", category: "furniture", isNew: false },
  { name: "Сумка доставщика «Onion»", price: 435, image: "", category: "clothes", isNew: false },
  { name: "Лонгслив «Крысиная любовь»", price: 450, image: "", category: "clothes", isNew: false },
  { name: "Клипбокс", price: 599, image: "", category: "unique", isNew: false },
  { name: "Шапка «Аксель»", price: 333, image: "", category: "axel", isNew: false },
  { name: "Наушники «Аксель»", price: 444, image: "", category: "axel", isNew: false },
  { name: "Шапка бини «Star shine»", price: 250, image: "", category: "star-shine", isNew: false },
  { name: "Очки «Star shine»", price: 200, image: "", category: "star-shine", isNew: false },
  { name: "Серьга «Star shine»", price: 150, image: "", category: "star-shine", isNew: false },
  { name: "Лонгслив «Star shine»", price: 550, image: "", category: "star-shine", isNew: false },
  { name: "Штаны «Star shine»", price: 300, image: "", category: "star-shine", isNew: false },
  { name: "Кеды «Star shine»", price: 250, image: "", category: "star-shine", isNew: false }
];

const grid = document.getElementById("productGrid");

// Остальным страницам каталог не нужен.
if (grid) {
  const search = document.getElementById("productSearch");
  const sort = document.getElementById("productSort");
  const empty = document.getElementById("emptyProducts");
  const categoryFilters = document.getElementById("categoryFilters");

  if (search && sort && empty && categoryFilters) {
    let activeCategory = "all";

    // Стили категорий и метки «Новинка».
    if (!document.getElementById("catalogExtraStyles")) {
      const style = document.createElement("style");
      style.id = "catalogExtraStyles";

      style.textContent = `
        .category-filters {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          margin: 22px 0 28px;
        }

        .category-filter {
          border: 1px solid rgba(255,255,255,0.13);
          border-radius: 30px;
          padding: 10px 17px;
          background: rgba(255,255,255,0.05);
          color: inherit;
          font: inherit;
          font-size: 14px;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .category-filter:hover {
          background: rgba(185,100,255,0.16);
          border-color: rgba(200,130,255,0.55);
        }

        .category-filter.active {
          background: linear-gradient(135deg, #a34fe5, #e34fa9);
          border-color: transparent;
          color: #fff;
        }

        .product-image {
          position: relative;
        }

        .product-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          z-index: 2;
          padding: 6px 11px;
          border-radius: 20px;
          background: linear-gradient(135deg, #ff4fa3, #a34fe5);
          color: #fff;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          box-shadow: 0 3px 12px rgba(0,0,0,0.2);
        }

        @media (max-width: 600px) {
          .category-filters {
            gap: 8px;
            margin: 18px 0 22px;
          }

          .category-filter {
            padding: 9px 13px;
            font-size: 12px;
          }
        }
      `;

      document.head.append(style);
    }

    // Переключение категорий.
    categoryFilters.querySelectorAll(".category-filter").forEach(button => {
      button.addEventListener("click", () => {
        activeCategory = button.dataset.category;

        categoryFilters.querySelectorAll(".category-filter").forEach(item => {
          const isActive = item.dataset.category === activeCategory;
          item.classList.toggle("active", isActive);
          item.setAttribute("aria-pressed", String(isActive));
        });

        renderProducts();
      });
    });

    // Отображение товаров.
    function renderProducts() {
      const term = search.value.trim().toLocaleLowerCase("ru");

      let list = products
        .map((product, order) => ({ ...product, order }))
        .filter(product => {
          const matchesSearch = product.name
            .toLocaleLowerCase("ru")
            .includes(term);

          const matchesCategory =
            activeCategory === "all" ||
            product.category === activeCategory;

          return matchesSearch && matchesCategory;
        });

      // Сортировка товаров.
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

        // Изображение товара.
        const photo = document.createElement("div");
        photo.className = "product-image";
        photo.setAttribute("aria-label", `Изображение товара: ${product.name}`);

        if (product.image) {
          const image = document.createElement("img");
          image.src = product.image;
          image.alt = product.name;
          photo.append(image);
        }

        // Метка «Новинка».
        if (product.isNew) {
          const badge = document.createElement("span");
          badge.className = "product-badge";
          badge.textContent = "Новинка";
          photo.append(badge);
        }

        // Название.
        const title = document.createElement("h3");
        title.textContent = product.name;

        // Цена.
        const price = document.createElement("div");
        price.className = "product-price";

        const coin = document.createElement("img");
        coin.src = "images/tokcoin.png";
        coin.alt = "";
        coin.setAttribute("aria-hidden", "true");

        price.append(
          coin,
          document.createTextNode(`${product.price} ТокКоинов`)
        );

        card.append(photo, title, price);
        grid.append(card);
      });

      empty.hidden = list.length !== 0;
    }

    // Поиск и сортировка.
    search.addEventListener("input", renderProducts);
    sort.addEventListener("change", renderProducts);

    renderProducts();
  }
}
