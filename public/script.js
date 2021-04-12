window.addEventListener("load", addEventListeners);

const getAllButton = document.getElementById('getAll')
const getSpecific = document.getElementById('getSpecific')
const addBeer = document.getElementById('addBeer')

async function addEventListeners() {
  getAllButton.addEventListener('click', showProduct)
  getSpecific.addEventListener('click', requestSpecificBeer)
  addBeer.addEventListener('click', () => createInputsForChange( '', 'Lägg till'))
}


function createInputsForChange(beerItem, btnText) {
  const container = document.getElementById('container')
  container.innerHTML = ''
  const div = document.createElement("div");
  container.append(div)
  div.classList.add("box");

  const titleLabel = document.createElement('label')
  const descriptionLabel = document.createElement('label')
  const priceLabel = document.createElement('label')
  const titleInput = document.createElement('input')
  const descriptionInput = document.createElement('input')
  const priceInput = document.createElement('input')
  const submitButton = document.createElement('button')
  titleLabel.innerHTML = 'Ölnamn...'
  descriptionLabel.innerHTML = 'Beskrivning...'
  priceLabel.innerHTML = 'Pris...'


  titleInput.required = true
  descriptionInput.required = true
  priceInput.required = true

  priceInput.type = 'number'
  div.append(titleLabel)
  div.append(titleInput)
  div.append(descriptionLabel)
  div.append(descriptionInput)
  div.append(priceLabel)
  div.append(priceInput)
  div.append(submitButton)
  submitButton.innerHTML = btnText
  submitButton.value = 'submit'
  let bodyTitle = beerItem.name
  let description = beerItem.description
  let price = beerItem.price
  if(btnText === 'Bekräfta') {
    titleInput.value = beerItem.name
    descriptionInput.value = beerItem.description
    priceInput.value = beerItem.price
  } else {
    titleInput.value = ''
    descriptionInput.value = ''
    priceInput.value = ''
  }
  
  titleInput.onchange = () => {
    bodyTitle = titleInput.value
  }

  descriptionInput.onchange = () => {
    description = descriptionInput.value
  }

  priceInput.onchange = () => {
    price = priceInput.value
  }

  if(btnText === 'Bekräfta') {
    submitButton.addEventListener(
      'click', 
      () => requestChangeBeer(bodyTitle, description, price, beerItem.id)
    ) 
  } else {
    submitButton.addEventListener('click', 
    () => requestAddBeer(bodyTitle, description, price)
    )
  }
    
}

async function requestChangeBeer(title, description, price, id) {
  
 const body = {
    name: title, 
    price: price,
    description: description
}
  const change = await makeRequest("/api/product/" + id, "PUT", body)
  console.log(change)
}

async function requestAddBeer(title, description, price) {
  
 const body = {
    name: title, 
    price: price,
    description: description
}
  const change = await makeRequest("/api/product/", "POST", body)
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
    editButton.addEventListener('click', () => createInputsForChange(productItem, 'Bekräfta')) 
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