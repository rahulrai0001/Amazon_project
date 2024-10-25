class Cart {
    cartItems;
    #localstoragekey;

    constructor(localstoragekey){
        this.#localstoragekey = localstoragekey;        
        // Load cart items from storage
        this.#loadFromStorage();
       
    }

    #loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.#localstoragekey));

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
    }

    saveToStorage() {
        localStorage.setItem(this.#localstoragekey, JSON.stringify(this.cartItems));
    }

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
        const quantity = quantitySelector ;

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

    }

    removeCart(productId) {
        const newCart = [];

        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId !== productId)
                newCart.push(cartItem);

        })
        this.cartItems = newCart;
        this.saveToStorage();

    }

    updateQuantity(productId, newQuantity) {

        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                cartItem.quantity = newQuantity;
            }

        })

        this.saveToStorage();

    }


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

}


const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

// Set local storage keys


// Now, you can add a product to the businessCart
businessCart.addtocart("dd82ca78-a18b-4e2a-9250-31e67412f98d");

console.log(cart);
console.log(businessCart);
