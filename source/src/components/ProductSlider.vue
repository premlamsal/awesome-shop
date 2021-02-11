<template>
  <div>
    <vueper-slides
      autoplay
      class="no-shadow"
      :visible-slides="4"
      :slide-ratio="1 / 2.5"
      :dragging-distance="200"
      :breakpoints="{ 800: { visibleSlides: 2, slideMultiple: 2 } }"
    >
      <vueper-slide v-for="product in products" :key="product.id">
        <template v-slot:content>
          <div class="product-card">
            <div class="product-image-outer-wrapper">
              <div class="product-image-frame">
                <img :src="product.image[0]" :alt="product.name" />
              </div>
            </div>
            <h6>{{product.name}}</h6>
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
        </template>
      </vueper-slide>
    </vueper-slides>
  </div>
</template>
<script>
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
export default {
  props: {
    products: Array,
  },
  components: {
    VueperSlides,
    VueperSlide,
  },

  methods: {
    productDetail(slug) {
      this.$router.replace({ path: `/product/${slug}` });
    },
    addToCart(productId,name,price,img) {
      let payload = {
        productId: productId,
        quantity: 1,
        name: name,
        price: price,
        img: img,
      };

      // this.$store.commit('pushCart', payload);
      // // or direct send payload and its key like below
      //   this.$store.commit({
      //     type: 'pushCart',
      //     productId:productId,
      //     quantity: 1,
      //     });

      // instead using dispatch for actions
      this.$store.dispatch("cart/addProductToCart", payload)
      .then((response)=>{
          this.$toast.success(response, {
            timeout: 4000,
          });
          // console.log(response);
      })
      .catch((error)=>{

          this.$toast.error(error, {
            timeout: 4000,
          });
          // console.log(error);

      })
    },
    removeFromCart(productId) {
      this.$store.dispatch("cart/removeProductFromCart", productId);
    },
  },
};
</script>
<style scoped>
.product-card {
  box-shadow: 1px 2px 5px 0 rgb(220,20,60,0.28);
  /* max-width: 16em; */
  text-align: center;
  display: inline-block;
    margin-right: 1px;
  margin-bottom: 1em;
  /* padding: 0.5em; */
  background: #fff;
  /* height: 25em; */
}
.product-card:hover {
  box-shadow: 1px 5px 15px 0 rgb(220,20,60,0.28);
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
  border: 1px solid #DC143C61;
  outline: 0;
  padding: 10px;
  color: #DC143C;
  background-color: #DC143C00;
  text-align: center;
  cursor: pointer;
  width: 40%;
  margin: 3px;
  font-size: 18px;
}

.product-card button:hover {
  opacity: 0.9;
  color: white;
  border: 1px solid #DC143C61;
  background-color: #DC143C;
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