const state = {
  cart: [],
};
const getters = {
  getProducts(state) {
    return state.products;
  },
  getTotalProduct(state) {
    return state.products.length;
  },
  getCartItems(state) {
    return state.cart;
  },
  getTotalItemsInCart(state) {
    return state.cart.reduce(function (carry, cartItem) {
      return carry + parseFloat(cartItem.productQuantity);
    }, 0);
  },

  getGrandTotalCart(state) {
    return state.cart.reduce(function (carry, cartItem) {
      return (
        carry +
        parseFloat(cartItem.productQuantity) * parseFloat(cartItem.productPrice)
      );
    }, 0);
  },
};

const mutations = {
  pushCart(state, payload) {
    // const product = state.products.find((product) => {
    //   return product.id == payload.productId;
    // });

    const newCartItem = {
      productId: payload.productId,
      productName: payload.name,
      productPrice: payload.price,
      productImage: payload.img,
      productQuantity: payload.quantity,
      productLineTotal: payload.price * payload.quantity,
    };

    state.cart.push(newCartItem);
  },
  increaseQuantityInCart(state, cart) {
    cart.productQuantity++;
    cart.productLineTotal = cart.productQuantity * cart.productPrice;
  },
  decreaseQuantityInCart(state, cart) {
    cart.productQuantity--;
    cart.productLineTotal = cart.productQuantity * cart.productPrice;
  },
  popCart(state, productId) {
    const cart = state.cart.find((cart) => {
      return cart.productId == productId;
    });
    state.cart.splice(state.cart.indexOf(cart), 1);
  },
};

const actions = {

  addProductToCart(context, payload) {
    const cart = context.state.cart.find((cart) => {
      return cart.productId == payload.productId;
    });
    if (!cart) {
      context.commit("pushCart", payload);
    } else {
      context.commit("increaseQuantityInCart", cart);
    }
  },
  decrementTheCart(context, productId) {
    const cart = context.state.cart.find((cart) => {
      return cart.productId == productId;
    });

    if (cart.productQuantity > 1) {
      context.commit("decreaseQuantityInCart", cart);
    } 
  },
  removeProductFromCart(context, productId) {
    const cart = context.state.cart.find((cart) => {
      return cart.productId == productId;
    });

    if (cart.productQuantity > 0) {
      context.commit("popCart", productId);
    } 
  },
  incrementTheCart(context, productId){
    const cart =context.state.cart.find((cart)=>{
      return cart.productId == productId;
    });
    if(cart.productQuantity>0){
      context.commit("increaseQuantityInCart",cart);
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
