<template>
  <b-container class="bg-white">
    <div class="product-detail-section-first mt-4" v-if="render_product_block">
      <b-row>
        <b-col md="4">
          <div class="product-image-panel">
            <div class="pic-box">
              <!--pic-box:width:500px;height:500px-->
              <ImageZoom :url="imageZoomed" :scale="3"></ImageZoom>
            </div>
            <div class="img-small-nav d-flex justify-content-center">
              <ul>
                <li v-for="thumb in product.thumb" :key="thumb.id">
                  <img :src="thumb" @click="clickToViewImage(thumb)" />
                </li>
              </ul>
            </div>
          </div>
        </b-col>
        <b-col md="8">
          <div class="product-details-aside-panel">
            <h3 style="color:#7cb342">{{product.name}}</h3>
            <div class="product-rating">
              <b-form-rating
                style="padding:0px;"
                id="rating-inline"
                inline
                value="4"
                no-border
                color="orange"
                readonly
              ></b-form-rating>
            </div>
            <h6>
              <a href="#" style="color:#7cb342">Gangotri Suppliers</a>
            </h6>
            <h3 style="color:#7cb342" class="mt-2">Rs. {{product.price}}</h3>
            <div class="product-buttons mt-3">
              <b-button @click="addToCart(product.id,product.name,product.price,product.img)" class="btn-cart">
                <b-icon icon="cart"></b-icon>Add to Cart
              </b-button>
              <b-button class="btn-wishlist">
                <b-icon icon="heart"></b-icon>Add to wishlist
              </b-button>
            </div>
            <div class="product-details-inside-container mt-4">
              <div class="product-highligts-info">
                <b-row>
                  <b-col md="1">Highligts</b-col>
                  <b-col md="5">
                    <ul>
                      <li>more then more</li>
                      <li>more then one</li>
                      <li>more then two</li>
                    </ul>
                  </b-col>
                </b-row>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
    <b-row>
      <b-col>
        <div class="product-details-section-second">
          <div class="tabs">
            <b-tabs content-class="mt-3" align="center">
              <b-tab title="Description" active>
                <h6>Product Information</h6>
               {{product.description}}
              </b-tab>
              <b-tab title="Additional Information">
                {{product.more_info}}
              </b-tab>
              <b-tab title="Shipping & returns">
                <h6>Delivery & returns</h6>
                {{product.shipping_return_info}}
              </b-tab>
              <b-tab title="Product Reviews">
                <b-row>
                  <b-col md="2">
                    <h6>Prem Lamsal</h6>
                    <div class="product-rating">
                      <b-form-rating
                        style="padding:0px;"
                        id="rating-inline"
                        inline
                        value="4"
                        no-border
                        color="orange"
                        readonly
                      ></b-form-rating>
                    </div>
                  </b-col>
                  <b-col md="6">
                    <h6>Very good Product (1 month ago)</h6>
                    <p>
                      We hope you’ll love every purchase, but if you ever need to return an item you can do so within a month of receipt.
                      For full details
                    </p>
                  </b-col>
                </b-row>
                <hr />
                <b-row class="mt-3">
                  <b-col md="2">
                    <div class="product-rating">
                      <b-form-rating
                        style="padding:0px;"
                        id="rating-inline"
                        inline
                        value="1"
                        no-border
                        color="orange"
                      ></b-form-rating>
                    </div>
                  </b-col>
                  <b-col md="6">
                    <b-form-input v-model="review.title" placeholder="Title"></b-form-input>
                    <b-form-textarea
                      id="textarea"
                      v-model="review.body"
                      placeholder="Review in short..."
                      size="sm"
                      class="mt-2"
                    ></b-form-textarea>
                    <b-button variant="warning" class="mt-2 greenBtn">Submit</b-button>
                  </b-col>
                </b-row>
              </b-tab>
            </b-tabs>
          </div>
        </div>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <div class="related-product-panel">
          <h5>You May Also Like</h5>
          <div class="related-product-container">

            <product :products="products.data"></product>
          
          </div>
          <div class="related-product-panel-insider">
            <b-button>
              <b-icon icon="arrow-down"></b-icon>Load More
            </b-button>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import ImageZoom from "../components/ImageZoom";
import Product from "../components/Product";
import { mapGetters } from "vuex";
export default {
  components: {
    ImageZoom,
    Product
  },

  data() {
    return {
      imageZoomed: "",
      isZoomed: false,
      review: {
        title: "",
        body: ""
      },
      product:{},//load the product with the slug query and store in single object for this page details
      product_slug:"",//to store product slug form the url
      products: [], //for loding more products content on product details page
  
      render_product_block:true,
      
    };
  },
  created() {
    this.getIdFromUrl();
    // this.imageZoomed = this.thumb[0].url;

    /* this.$watch(
    //   () => this.$route.params,
    //   (toParams, previousParams) => {
    //     this.getIdFromUrl();
    //     console.log(toParams);
    //     console.log(previousParams);
    //   }
    // )

    or use 
        watch:{

        $route:function(){
          
      },

  */

  },
mounted () {
  // this.scrollToTop();
},
watch:{
    $route:function(){
      this.getIdFromUrl();
  },
},

  computed: {
    ...mapGetters({
      // products: "cart/getProducts"
    })
  },
  methods: {
    getIdFromUrl() {
      this.scrollToTop();//take page to top
      this.product_slug = this.$route.params.productName;//get product slug from the url.
      this.loadProduct(this.product_slug);  //load the product as per the slug
      this.relatedProducts();  //load other related project for the page. 
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
    productDetailParent(value){
        this.loadProduct(value);
    },
    scrollToTop(){
      window.scrollTo(0,0);
    },
    loadProduct(product_slug){
        this.$Progress.start()
        this.$http.get("https://eshop.test/api/productDFS/"+product_slug)
        .then(response=>{
            this.product = response.data.data[0]
            // console.log(response.data.data[0]);
            
            this.imageZoomed = this.product.image[0];

            this.$Progress.finish();
              
        }).catch(error=>{
          console.log(error);
          this.$Progress.fail()
        });

    },
    relatedProducts(url) {
      //load other project except the current product 
      //so pass the current project slug to ovoid it in backend 
      let url_link = url || "https://eshop.test/api/relatedProducts/"+ this.product_slug;
      this.$http.get(url_link)
        .then(response => {
          this.products = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    zoomImage(image) {
      // console.log("zoomed");
      this.imageZoomed = image;
      this.isZoomed = true;
    },
    zoomOutImage() {
      // console.log("exit");
      this.isZoomed = false;
    },
    clickToViewImage(image) {
      this.imageZoomed = image;
    }
  }
};
</script>

<style scoped>
.product-details-inside-container {
  border: 1px solid #eeeeeea8;
  padding: 1em;
}
.nested-nav {
  margin-top: 5px;
  margin-bottom: 5px;
}
.product-highligts-info {
  color: #607d8b;
}
.product-detail-section-first {
  padding: 14px;
  /* box-shadow: 1px 3px 8px 9px #eee; */
}
.product-details-section-second {
  padding: 14px;
  /* box-shadow: 1px 3px 8px 9px #eee; */
  margin-top: 1.5em;
}

.related-product-panel {
  margin-top: 1.5em;
  /* padding: 14px; */
  /* box-shadow: 1px 3px 8px 9px #eee; */
}
.related-product-panel h5 {
  padding-bottom: 5px;
  /* margin: 0.5em; */
  color: #7cb342;
}
.product-details-section-second h5 {
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
  /* margin: 0.5em; */
}

.related-product-panel-insider {
  display: flex;
  justify-content: center;
}
.related-product-panel-insider button {
  background: #7cb342;
  color: white;
  border: 1px solid #7cb342;
}
.related-product-panel button:hover {
  background: none;
  border: 1px solid #7cb342;
  color: #7cb342;
}
.greenBtn {
  background: #7cb342;
  color: white;
  border: 1px solid #7cb342;
}
.greenBtn:hover {
  background: none;
  border: 1px solid #7cb342;
  color: #7cb342;
}
.img-small-nav {
  padding: 2px;
  margin: 0 auto;
  display: inline-block;
}
.img-small-nav ul {
  list-style: none;
  margin: 0;
  padding: 0px;
}
.img-small-nav ul li {
  float: left;
  margin: 4px;
}
.img-small-nav ul li img {
  cursor: pointer;
  height: 3.6em;
}
.product-image-panel .card-body {
  padding: 0px;
}
.product-detail-section-first {
  position: relative;
}
.product-detail-section-first .zoom-panel {
  position: absolute;
  left: 100%;
  top: 10%;
  z-index: 1;
  background: #eee;
}
.product-image-panel {
  /* width:fit-content; */
  height: auto;
}
.pic-box {
  /* width: 200px; */
  height: 425px;
}
.btn-cart {
  border: 1px solid #7cb34261;
  outline: 0;
  padding: 10px;
  color: #7cb342;
  background-color: #7cb34200;
  text-align: center;
  cursor: pointer;
  width: 15em;
  margin: 1em;
  margin-left: 0;
  font-size: 16px;
  display: block;
}
.btn-cart:hover {
  opacity: 0.9;
  color: white;
  border: 1px solid #7cb34261;
  background-color: #7cb342;
}

.btn-wishlist {
  outline: 0;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  width: 15em;
  margin: 1em;
  margin-left: 0;
  font-size: 16px;
  display: block;
  color: #e53935;
  border: 1px solid #e53935;
  background-color: #fff;
}
.btn-wishlist:hover {
  opacity: 0.9;
  color: #ffffff;
  border: 1px solid #e5737361;
  background-color: #e53935;
}
.related-product-container {
  display: flex;
  justify-content: center;
}
</style>