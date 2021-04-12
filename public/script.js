window.addEventListener("load", addEventListeners);

const getAllButton = document.getElementById('getAll')
const getSpecific = document.getElementById('getSpecific')

async function addEventListeners() {
  getAllButton.addEventListener('click', showProduct)
  getSpecific.addEventListener('click', requestSpecificBeer)
}


function createInputsForChange(id) {
  const container = document.getElementById('container')
  container.innerHTML = ''
  const div = document.createElement("div");
  container.append(div)
  div.classList.add("box");

  const titleInput = document.createElement('input')
  const descriptionInput = document.createElement('input')
  div.append(titleInput)
  div.append(descriptionInput)
  let bodyTitle = ''
  let description = ''
  titleInput.onchange = () => {
    bodyTitle = titleInput.value
    description = descriptionInput.value
  }

  requestChangeBeer(bodyTitle, description, id)
}

async function requestChangeBeer(title, description, id) {
  
 const body = {
    name: title, 
    price: 25,
    description: description
}
  const change = await makeRequest("/api/product/" + id, "PUT", body)
  console.log(change)
}

async function requestSpecificBeer() {
  const change = await makeRequest("/api/product/1", "GET", body)
  console.log(change)
}

async function showProduct() {
  const response = await fetch("/api/product");
  const product = await response.json();
  const container = document.getElementById('container')
  container.innerHTML = ''
  product.map((productItem) => {
    const div = document.createElement("div");
    const buttonDiv = document.createElement('div')
    const h3 = document.createElement('h3')
    const pricePara = document.createElement('p')
    const aboutPara = document.createElement('p')
    const deleteButton = document.createElement('button')
    const editButton = document.createElement('button')
    h3.innerHTML = productItem.name;
    aboutPara.innerHTML = productItem.description;
    pricePara.innerHTML = productItem.price;
    deleteButton.innerHTML = 'Ta bort bärsen'
    editButton.innerHTML = 'Ändra bärsen'
    container.append(div)
    div.classList.add("box");
    div.appendChild(h3);
    div.appendChild(aboutPara);
    div.appendChild(pricePara);
    div.appendChild(buttonDiv)
    buttonDiv.appendChild(editButton);
    buttonDiv.appendChild(deleteButton);
    editButton.addEventListener('click', () => createInputsForChange(productItem.id)) 
    deleteButton.onclick = async function removeProduct() {
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