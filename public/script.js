window.addEventListener("load", showProduct);
const button = document.getElementById("counter");
const removeButton = document.getElementById("remove");


async function showProduct() {
  const response = await fetch("/api/product");
  const product = await response.json();
  product.map((productItem) => {
    const div = document.createElement("div");
    const h3 = document.createElement('h3')
    const pricePara = document.createElement('p')
    const aboutPara = document.createElement('p')
    h3.innerHTML = productItem.name;
    aboutPara.innerHTML = productItem.description;
    pricePara.innerHTML = productItem.price;
    document.body.append(div);
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