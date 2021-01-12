<template>
  <div>
    <div class="product-card" v-for="product in products" :key="product.id">
      <div class="product-image-outer-wrapper">
        <div class="product-image-frame">
          <img :src="product.image[0]" :alt="product.name" />
        </div>
      </div>
      
     
      <h6 class="product-title">{{product.name}}</h6>
      <div v-if="product.discount!=0">
       <p class="product-price"><s>$ {{product.price}}</s></p>
       <p class="product-offer-price" style="color:red">$ {{product.price - product.discount}}</p>
      </div>
      <div v-else>
      <p class="product-price" style="color:red">$ {{product.price}}</p>
     </div>
      <!-- <p>Some text about the jeans. Super slim and comfy lorem ipsum lorem jeansum.</p> -->
      <p style="text-align:center">
        <b-button @click="addToCart(product.id,product.name,product.price,product.image[0])">
          <b-icon icon="cart" font-scale="1.5"></b-icon>
        </b-button>
        <b-button @click="productDetail(product.slug)">
          <b-icon icon="list" font-scale="1.5"></b-icon>
        </b-button>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "Product",
  props: {
    products: Array
  },
  components: {},
  
  methods: {
  
    productDetail(productName){
      // //add this for redundant error navigation ----  catch(() => {})
      this.$router.push({ name: 'Product', params: { productName: productName}})
      //  this.$router.push({ 

      //   path: 'product',
      //   params: {id:productName}

      // }).catch(() => {});
       // this.$router.push({ name:'Product',params: {productName:productName
       // }});


        // this.$router.push({ path: `/product/${productName}` });
       
        // this.$emit('product-detail-parent', productName);

    },
    addToCart(productId,name,price,img) {
      let payload = { productId: productId, quantity: 1,name:name,price:price,img:img};
      // this.$store.commit('pushCart', payload);

      // // or direct send payload and its key like below
      //   this.$store.commit({
      //     type: 'pushCart',
      //     productId:productId,
      //     quantity: 1,
      //     });

      // instead using dispatch for actions
      this.$store.dispatch("cart/addProductToCart", payload);
    },
    removeFromCart(productId) {
      this.$store.dispatch("cart/removeProductFromCart", productId);
    }
  }
};
</script>
<style scoped>
.product-card {
  box-shadow: 1px 2px 5px 0 rgba(124, 179, 66, 0.28);
  max-width: 13em;
  text-align: center;
  display: inline-block;
  margin: 6px;
  margin-bottom: 1em;
  /* padding: 0.5em; */
  background: #fff;
  /* height: 25em; */
}
.product-card:hover {
  box-shadow: 1px 5px 15px 0 rgba(124, 179, 66, 0.28);
}
.product-card img {
  /* height: 14em; */
  /* width: 100%; */
  max-width: 100%;
  max-height: 100%;
  display: block;
  margin: 0 auto;
}
.product-card h6 {
  margin: 0.5em;
  height: 40px;
  overflow: hidden;
}
.product-card p {
  margin: 0.5em;
}
.product-img-holder {
  height: 240px;
}
.product-price {
  color: grey;
  font-size: 22px;
}
.inner-btn {
  display: flex;
  justify-content: center;
}

.product-card button {
  border: 1px solid #7cb34261;
  outline: 0;
  padding: 10px;
  color: #7cb342;
  background-color: #7cb34200;
  text-align: center;
  cursor: pointer;
  width: 40%;
  margin: 3px;
  font-size: 18px;
}

.product-card button:hover {
  opacity: 0.9;
  color: white;
  border: 1px solid #7cb34261;
  background-color: #7cb342;
}
.product-image-outer-wrapper {
  display: inline-block;
  margin: 20px;
}
.product-image-frame {
  width: 250px;
  height: 200px;
  /* border: 1px solid #eee; */
  vertical-align: middle;
  text-align: center;
  display: table-cell;
}
.cart-container ul {
  list-style: none;
}
.product-price {
  font-size: 16px;
}
.product-slide-btn {
  display: flex;
  align-items: center;
}
</style>