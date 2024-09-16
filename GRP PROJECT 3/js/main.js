

//remove button
var removeCartItemBtns = document.getElementsByClassName("remove-btn")
console.log(".remove-buttons")
for(var i=0; i < removeCartItemBtns.length; i++){
  var button = removeCartItemBtns[i]
  button.addEventListener('click', removeCartItem)
}


//update total with increase in quantity
var quantityInputs = document.getElementsByClassName('quantity')
for(var i=0; i < quantityInputs.length; i++){
  var input = quantityInputs[i]
  input.addEventListener('change', quantityChanged)
}

//add to cart
var addToCartBtns = document.getElementsByClassName('add-item')
for(var i=0; i < addToCartBtns.length; i++){
  var addItem = addToCartBtns[i]
  addItem.addEventListener('click', addToCart)

}

function removeCartItem(e){
  var buttonClicked = e.target
    //select the button up to its last parent element
    buttonClicked.parentElement.parentElement.parentElement.parentElement.parentElement.remove()
    updateCartTotal()
} 

function quantityChanged(e){
  var input = e.target
  if(isNaN(input.value) || input.value <= 0){
    input.value= 1
  }
  updateCartTotal()
}

function addToCart(e) {
  var addItem = e.target
  var storeProduct = addItem.parentElement.parentElement 
  var title = storeProduct.getElementsByClassName('product-title')[0].innerText
  var price = storeProduct.getElementsByClassName("product-price")[0].innerText
  var imageSrc = storeProduct.getElementsByClassName("product-image")[0].src
  console.log(title, price, imageSrc)

  addItemToCart(title, price, imageSrc)
}

function addItemToCart(title, price, imageSrc){
  var cartItem = document.createElement('div')
  var cartList = document.getElementsByClassName('cart-list')[0]
  var cartItemNames = cartList.getElementsByClassName('product-title')
  
  //if item already in cart, don't duplicate
  for(var i = 0; i < cartItemNames.length; i++){
    if (cartItemNames[i].innerText == title){
      alert('Item has already been added to cart')
      return
    }
  }


  //skeleton for each cart content
  var cartItemContents = `
    <div class = 'row mb-4'>
      <div class="col-md-5 col-lg-3 col-xl-3">
        <div class="view zoom overlay z-depth-1 mb-3 mb-md-0">
          <img class="img-fluid w-100 product-image" src="${imageSrc}" alt="Sample">
          <a href="#!">
            <div class="mask">
              <img class="img-fluid w-100 product-image" src="${imageSrc}" alt="Sample">
              <div class="mask rgba-black-slight"></div>
            </div>
          </a>
        </div>
    </div>
    <div class="col-md-7 col-lg-9 col-xl-9">
      <div>
        <h5 class="product-title">${title}</h5>
        <div class="d-flex justify-content-between">
          <div>
            
            <form action="">
              <div class="form-group">
                <label for="">Size</label>
                <select class="custom-select" name="size">
                  <option selected>Select one</option>
                  <option value="38">38</option>
                  <option value="30">39</option>
                  <option value="40">40</option>
                </select>
              </div>
            </form>
          </div>
          <div>
            <div class="def-number-input number-input safari_only mb-0">
              <p class="mb-2">Quantity</p>
              <input class="quantity" min="0" name="quantity" value="1" type="number">
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <a href="#!" type="button" class="card-link-secondary small text-uppercase remove-btn mr-3 text-danger"><i
                class="fas fa-trash-alt mr-1"></i> Remove item </a>
            <!-- <a href="#!" type="button" class="card-link-secondary small text-uppercase"><i
                class="fas fa-heart mr-1"></i> Move to wish list </a> -->
          </div>
          <span class="product-price"><strong>${price}</strong> </span>
        </div>
      </div>
    </div>
    <hr class="mb-4">
  </div>`
  cartItem.innerHTML = console.log('added item')
  cartItem.innerHTML = cartItemContents
  cartList.append(cartItem)

  //remove button for new item
  cartItem.getElementsByClassName('remove-btn')[0].addEventListener('click', removeCartItem)
  //re-add total for new item added
  cartItem.getElementsByClassName('quantity')[0].addEventListener('change', quantityChanged)
}

//update total in cart
function updateCartTotal(){
  var cartItemContainer = document.getElementsByClassName('cart-list')[0]
  var cartItems = cartItemContainer.getElementsByClassName('cart-item')
  var total = 0
  taxTotal = 0

  for(var i = 0; i < cartItems.length; i++){
    var cartItem = cartItems[i]
    
    var priceHolder = cartItem.getElementsByClassName('product-price')[0]
    var quantityHolder = cartItem.getElementsByClassName('quantity')[0]
    
    //get the value of price and quantity and convert to numbers
    var price = parseFloat(priceHolder.innerText.replace('$', ''))
    var quantity = quantityHolder.value

    total = total + (price * quantity) 
    
    taxTotal = total + (total * 0.07)
  }
  total = Math.round(total * 100) / 100
  taxTotal = Math.round(taxTotal * 100) / 100
  document.getElementsByClassName('cart-total')[0].innerText = '$' + total
  document.getElementsByClassName('tax-total')[0].innerText = '$' + taxTotal
    //console.log(price, quantity)

} 