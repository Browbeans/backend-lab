window.addEventListener("load", addEventListeners);

const getAllButton = document.getElementById('getAll')
const getSpecific = document.getElementById('getSpecific')
const changeBeer = document.getElementById('changeBeer')

async function addEventListeners() {
  getAllButton.addEventListener('click', showProduct)
  getSpecific.addEventListener('click', () => makeRequest("/api/product/2", "GET"))
  changeBeer.addEventListener('click', requestChangeBeer)
}

async function requestChangeBeer() {
 const body = {
    name: "Dugges Amarillo", 
    price: 25,
    description: "Humlearomatisk smak med tydlig beska, med inslag av ananas, tallbarr, honung, passionsfrukt och apelsinskal."
}
  const change = await makeRequest("/api/product/1", "PUT", body)
  console.log(change)
}

async function showProduct() {
  const response = await fetch("/api/product");
  const product = await response.json();
  const container = document.getElementById('container')
  container.innerHTML = ''
  product.map((productItem) => {
    const div = document.createElement("div");
    const h3 = document.createElement('h3')
    const pricePara = document.createElement('p')
    const aboutPara = document.createElement('p')
    h3.innerHTML = productItem.name;
    aboutPara.innerHTML = productItem.description;
    pricePara.innerHTML = productItem.price;
    container.append(div)
    div.classList.add("box");
    div.appendChild(h3);
    div.appendChild(aboutPara);
    div.appendChild(pricePara);
    div.onclick = async function removeProduct() {
        fetch("/api/product/" + productItem.id, {
          method: "DELETE",
        })
          .then((res) => res.text()) // or res.json()
          .then((res) => console.log(res));
      }
  });
}

async function makeRequest(url, method, body) {
  const response = await fetch(url, {
    method: method, 
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const result = await response.json()
  return result
}