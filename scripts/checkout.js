let cartSummaryHtml = '';
cart.forEach((cartItem) => {

    const productId = cartItem.productId;

    let matchingProduct;

    products.forEach((product) => {
        if (product.id === productId) {
            matchingProduct = product;
        }

    })
    // console.log(matchingProduct);

    cartSummaryHtml +=
    `<div class="cart-item-container 
    js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  ${(matchingProduct.priceCents /100).toFixed(2)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                    Update
                  </span>
                   <input type="number" class="quantity-input js-quantity-input-${matchingProduct.id}">
             <span class="save-quantity-link link-primary js-save-link"
              data-product-id="${matchingProduct.id}">
              Save
            </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
});

document.querySelector('.js-order-summary').innerHTML=cartSummaryHtml;

document.querySelectorAll('.js-delete-link').forEach((link)=>{
    link.addEventListener('click',()=>{
        
       const productId= link.dataset.productId;
    //    console.log(productId);
    removeCart(productId);
    // console.log(cart);

    const container = document.querySelector(`.js-cart-item-container-${productId}`);
        // console.log(container);
        container.remove();
        cartquantityItems();
    });
});



function cartquantityItems(){

let cartQuantity = 0;

cart.forEach((cartItem) => {
  cartQuantity += cartItem.quantity;
  
});


document.querySelector('.js-return-to-home-link')
  .innerHTML = `${cartQuantity} items`;
}
 cartquantityItems();


// let cartQuantity = 0;


//   cartQuantity += cart.length;


// document.querySelector('.js-return-to-home-link')
//   .innerHTML = `${cartQuantity} items`;

document.querySelectorAll('.js-update-link').forEach((updateLink)=>{
    updateLink.addEventListener('click',()=>{
        
       const productId= updateLink.dataset.productId;

    //    console.log(productId);

    const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.add('is-editing-quantity');
    })
});

// document.querySelectorAll('.js-save-link')
//   .forEach((link) => {
//     link.addEventListener('click', () => {
        
//       const productId = link.dataset.productId;

//       const container = document.querySelector(
//         `.js-cart-item-container-${productId}`
//       );
//       container.classList.remove('is-editing-quantity');

//       const quantityInput = document.querySelector(
//         `.js-quantity-input-${productId}`
//       );
//       const newQuantity = Number(quantityInput.value);
//       if (newQuantity < 0 || newQuantity >= 1000){
//         alert('input valid quantity')
//         return;
//     }else{
        
//       updateQuantity(productId,newQuantity);
//     }

   

//       const quantityLabel = document.querySelector(
//         `.js-quantity-label-${productId}`
//       );
//       quantityLabel.innerHTML = newQuantity;

      
//       cartquantityItems();

      
//     });

//   });
  

document.querySelectorAll('.js-save-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      saveQuantity(link);
    });
  });

// Add event listener for the Enter key on quantity input fields
document.querySelectorAll('input[type="number"]').forEach((input) => {
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const productId = input.closest('.cart-item-container').querySelector('.js-save-link').dataset.productId;
      const saveLink = document.querySelector(`.js-save-link[data-product-id="${productId}"]`);
      saveQuantity(saveLink);  // Trigger save functionality when Enter is pressed
    }
  });
});

// Reusable save quantity function
function saveQuantity(link) {
  const productId = link.dataset.productId;

  const container = document.querySelector(
    `.js-cart-item-container-${productId}`
  );
  container.classList.remove('is-editing-quantity');

  const quantityInput = document.querySelector(
    `.js-quantity-input-${productId}`
  );
  const newQuantity = Number(quantityInput.value);
  
  if (newQuantity < 0 || newQuantity >= 1000) {
    alert('input valid quantity');
    return;
  } else {
    updateQuantity(productId, newQuantity);  // Update the quantity in the cart
  }

  const quantityLabel = document.querySelector(
    `.js-quantity-label-${productId}`
  );
  quantityLabel.innerHTML = newQuantity;

  cartquantityItems();
}
