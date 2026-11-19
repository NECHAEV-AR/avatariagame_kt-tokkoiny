const products = [
  ["Тапочки «BWA»",585],["Кресло «Каблук Любы»",483],["Светлая накидка «Аксель»",449],
  ["Тёмная накидка «Аксель»",449],["Фотодоска «Клипток»",250],["Сумка доставщика «Onion»",435],
  ["Лонгслив «Крысиная любовь»",450],["Клипбокс",599],["Шапка «Аксель»",333],
  ["Наушники «Аксель»",444],["Шапка бини «Star shine»",250],["Очки «Star shine»",200],
  ["Серьга «Star shine»",150],["Лонгслив «Star shine»",550],["Штаны «Star shine»",300],
  ["Кеды «Star shine»",250]
];
const grid = document.getElementById("productGrid");
const search = document.getElementById("productSearch");
const sort = document.getElementById("productSort");
const empty = document.getElementById("emptyProducts");

function renderProducts(){
  const term = search.value.trim().toLocaleLowerCase("ru");
  let list = products.map((p,i)=>({name:p[0],price:p[1],order:i}))
    .filter(p=>p.name.toLocaleLowerCase("ru").includes(term));
  if(sort.value==="asc") list.sort((a,b)=>a.price-b.price || a.order-b.order);
  if(sort.value==="desc") list.sort((a,b)=>b.price-a.price || a.order-b.order);
  if(sort.value==="name") list.sort((a,b)=>a.name.localeCompare(b.name,"ru"));
  grid.innerHTML = list.map(p=>`
    <article class="product-card">
      <div class="product-image" aria-label="Изображение товара будет добавлено позже"></div>
      <h3>${p.name}</h3>
      <div class="product-price"><img src="images/tokcoin.png" alt="">${p.price} ТокКоинов</div>
    </article>`).join("");
  empty.hidden = list.length !== 0;
}
search.addEventListener("input",renderProducts);
sort.addEventListener("change",renderProducts);
renderProducts();
