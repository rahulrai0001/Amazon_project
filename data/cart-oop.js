
function Cart(localstoragekey){
  const cart={
    cartItems : undefined,
  
    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localstoragekey));
    
      if (!this.cartItems) {
        this.cartItems = [{
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId: '1'
        }, {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOptionId: '2'
        }];
      }
    },
  
     saveToStorage() {
      localStorage.setItem(localstoragekey, JSON.stringify(this.cartItems));
    },
  
     addtocart(productId) {
      let matchingItem;
    
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });
    
      const quantitySelector = document.querySelector(
        `.js-quantity-selector-${productId}`
      );
      const quantity = quantitySelector;
    
      // console.log(quantity);
    
    
      if (matchingItem) {
        matchingItem.quantity += Number(quantity);
      } else {
        this.cartItems.push({
          productId: productId,
          quantity: Number(quantity),
          deliveryOptionId: '1'
        });
      }
    
      this.saveToStorage();
    
    },
  
    removeCart(productId) {
      const newCart = [];
    
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId)
          newCart.push(cartItem);
    
      })
      this.cartItems = newCart;
      this.saveToStorage();
    
    },
  
   updateQuantity(productId, newQuantity) {
  
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        cartItem.quantity = newQuantity;
      }
  
    })
  
    this.saveToStorage();
  
  },
  
  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
  
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
  
  
    matchingItem.deliveryOptionId = deliveryOptionId;
  
    this.saveToStorage();
  
  }
  };


  return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');
cart.loadFromStorage();


businessCart.loadFromStorage();

console.log(cart);


console.log(businessCart);