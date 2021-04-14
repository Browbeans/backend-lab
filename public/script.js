window.addEventListener("load", addEventListeners);

const getAllButton = document.getElementById('getAll')
const addBeer = document.getElementById('addBeer')
const searchButton = document.getElementById('searchBtn')

async function addEventListeners() {
  getAllButton.addEventListener('click', showProduct)
  addBeer.addEventListener('click', () => createInputsForChange( '', 'Lägg till'))
  searchButton.addEventListener('click', createSearchBar)
}

async function createSearchBar(error, message) {
  const container = document.getElementById('container')
  container.innerHTML = ''
  const div = document.createElement('div')
  container.append(div)
  div.classList.add('box')
  
  const infoH2 = document.createElement('h2')
  const searchInput = document.createElement('input')
  const searchSubmit = document.createElement('button')
  infoH2.innerHTML = 'Sök vänligen efter id som är en siffra 1 eller 2 osv...'
  searchSubmit.innerHTML = 'Sök'
  searchInput.type = 'number'
  div.append(infoH2)
  if(error === true) {
    const para = document.createElement('p')
    para.innerHTML = message
    div.append(para)
  }
  div.append(searchInput)
  div.append(searchSubmit)

  let searchValue = ''

  searchInput.addEventListener('change', () => {
    searchValue = searchInput.value
  })
  searchSubmit.addEventListener('click', () => {
    handleSearch(searchValue)
  })
}

async function handleSearch(id) {
  const change = await makeRequest(`/api/product/${id}`, "GET")
  if(change.name !== undefined) {
    showSpecificOrChanged(change, id)
  } else {
    createSearchBar(true, change)
  }
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
      () => {
        if(price !== undefined || bodyTitle !== undefined || description !== undefined) {
          requestAddBeer(bodyTitle, description, price) 
        }else {
          alert('please type in all fields')
        } 
        }
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
  showSpecificOrChanged(body, id)
}

async function showSpecificOrChanged(body, id) {
  const container = document.getElementById('container')
  container.innerHTML = ''
  const div = document.createElement('div')
  container.append(div)
  div.classList.add("box");
  const buttonDiv = document.createElement('div')
  const h3 = document.createElement('h3')
  const pricePara = document.createElement('p')
  const aboutPara = document.createElement('p')
  const deleteButton = document.createElement('button')
  const editButton = document.createElement('button')

  h3.innerHTML = body.name;
  aboutPara.innerHTML = body.description;
  pricePara.innerHTML = body.price + ' kr';
  deleteButton.innerHTML = 'Ta bort bärsen'
  editButton.innerHTML = 'Ändra bärsen'

  div.appendChild(h3);
  div.appendChild(aboutPara);
  div.appendChild(pricePara);
  div.appendChild(buttonDiv)
  buttonDiv.appendChild(editButton);
  buttonDiv.appendChild(deleteButton);
  editButton.addEventListener('click', () => createInputsForChange(body, 'Bekräfta')) 
  deleteButton.onclick = async function removeProduct() {
      fetch("/api/product/" + id, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((res) => console.log(res))
    }
}

async function requestAddBeer(title, description, price) {
  
 const body = {
    name: title, 
    price: price,
    description: description
}
  const change = await makeRequest("/api/product/", "POST", body)
  showProduct()
}

async function requestSpecificBeer(id) {
  const specificBeer = await makeRequest("/api/product/" + id, "GET")
  console.log(specificBeer)
  showSpecificOrChanged(specificBeer, id)
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
    const specificButton = document.createElement('button')
    h3.innerHTML = productItem.name;
    aboutPara.innerHTML = productItem.description;
    pricePara.innerHTML = productItem.price + ' kr';
    deleteButton.innerHTML = 'Ta bort bärsen'
    editButton.innerHTML = 'Ändra bärsen'
    specificButton.innerHTML = 'Hämta denna Öl'
    container.append(div)
    div.classList.add("box");
    div.appendChild(h3);
    div.appendChild(aboutPara);
    div.appendChild(pricePara);
    div.appendChild(buttonDiv)
    buttonDiv.appendChild(editButton);
    buttonDiv.appendChild(deleteButton);
    buttonDiv.appendChild(specificButton);
    specificButton.addEventListener('click', ()  => requestSpecificBeer(productItem.id))
    editButton.addEventListener('click', () => createInputsForChange(productItem, 'Bekräfta')) 
    deleteButton.onclick = async function removeProduct() {
        fetch("/api/product/" + productItem.id, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(showProduct);
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