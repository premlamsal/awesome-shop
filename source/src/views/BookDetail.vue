<template>
  <b-container class="bg-white">
    <div class="book-detail-section-first mt-4" v-if="render_book_block">
      <b-row>
        <b-col md="4">
          <div class="book-image-panel">
            <div class="pic-box">
              <!--pic-box:width:500px;height:500px-->
              <ImageZoom :url="imageZoomed" :scale="3"></ImageZoom>
            </div>
            <div class="img-small-nav d-flex justify-content-center">
              <ul>
                <li v-for="thumb in book.thumb" :key="thumb.id">
                  <img :src="thumb" @click="clickToViewImage(thumb)" />
                </li>
              </ul>
            </div>
          </div>
        </b-col>
        <b-col md="8">
          <div class="book-details-aside-panel">
            <h3 style="color:#DC143C">{{book.name }}</h3>
            <div class="book-rating">
              <b-form-rating
                style="padding:0px;"
                id="rating-inline"
                inline
                :value="book.book_star"
                no-border
                color="orange"
                readonly
              ></b-form-rating>
            </div>
            <h6>
              <a href="#" style="color:#DC143C">Gangotri Suppliers</a>
            </h6>

            <div v-if="book.discount != 0" class="mt-2">
              <p class="book-price">
                <s>$ {{ book.price }}</s>
              </p>
              <h3 class="book-offer-price" style="color:#DC143C">
                $ {{ book.price - book.discount }}
              </h3>
            </div>
            <div v-else class="mt-2">
              <h3 style="color:#DC143C">Rs. {{ book.price }}</h3>
            </div>

            <div class="book-buttons mt-3">
              <b-button
                @click="
                  addToCart(
                    book.id,
                    book.name,
                    book.price,
                    book.discount,
                    book.image[0]
                  )
                "
                class="btn-cart"
              >
                <b-icon icon="cart"></b-icon>Add to Cart
              </b-button>

            </div>
            <div class="book-details-inside-container mt-4">
              <div class="book-highligts-info">
                <b-row>
                  <b-col md="1">Highligts</b-col>
                  <b-col md="5">
                    <ul>
                      {{
                        book.highligts
                      }}
                    </ul>
                  </b-col>
                </b-row>

                <b-row class="mt-3">
                  <b-col>
                    Location
                    {{ book.location }}
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
        <div class="book-details-section-second">
          <div class="tabs">
            <b-tabs content-class="mt-3" align="center">
              <b-tab title="Description" active>
                <h6>Book Information</h6>
                {{ book.description }}
              </b-tab>
              <b-tab title="Additional Information">
                {{ book.more_info }}
              </b-tab>
              <b-tab title="Shipping & returns">
                <h6>Delivery & returns</h6>
                {{ book.shipping_return_info }}
              </b-tab>
              <b-tab title="Book Reviews">

              <div class="insider-review-others" v-if="book.reviews!=null">
                <b-row v-for="review in book.reviews" v-bind:key="review.id">
                  <b-col md="2">
                    <h6>{{review.user.firstname}} {{review.user.lastname}}</h6>
                    <div class="book-rating">
                      <b-form-rating
                        style="padding:0px;"
                        id="rating-inline"
                        inline
                        :value="review.rating"
                        no-border
                        color="orange"
                        readonly
                      ></b-form-rating>
                    </div>
                  </b-col>
                  <b-col md="6">

                    <h6>{{review.title}} - {{review.created_at}}</h6>
                    <p>
                    {{review.body}}
                    </p>


                  </b-col>
                </b-row>
                </div>

                <div class="inider-review-other-not-available" else>
                 <h6>No reviews yet! Be the first to review this book.</h6>
                </div>
                <hr />
                <b-row class="mt-3">
                  <b-col md="2">
                    <div class="book-rating">
                      <b-form-rating
                        style="padding:0px;"
                        id="rating-inline"
                        inline
                        no-border
                        v-model="my_review.rating"
                        color="orange"
                      ></b-form-rating>
                    </div>
                  </b-col>
                  <b-col md="6">
                    <b-form-input
                      v-model="my_review.title"
                      placeholder="Title"
                    ></b-form-input>
                    <b-form-textarea
                      id="textarea"
                      v-model="my_review.body"
                      placeholder="Review in short..."
                      size="sm"
                      class="mt-2"
                    ></b-form-textarea>
                    <b-button variant="warning" class="mt-2 greenBtn"
                      @click="makeReview()">Submit</b-button
                    >
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
        <div class="related-book-panel">
          <h5>You May Also Like</h5>
          <div class="related-book-container">
            <book :books="books.data"></book>
          </div>
          <div class="related-book-panel-insider">
            <b-button> <b-icon icon="arrow-down"></b-icon>Load More </b-button>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import ImageZoom from "../components/ImageZoom";
import Book from "../components/Book";
import { mapGetters } from "vuex";
export default {
  components: {
    ImageZoom,
    Book,
  },

  data() {
    return {
      imageZoomed: "",
      isZoomed: false,
      my_review: {
        title: "",
        body: "",
        rating:"5",
      },
      avg_rating:'1',
      book: {}, //load the book with the slug query and store in single object for this page details
      book_slug: "", //to store book slug form the url
      books: [], //for loding more books content on book details page

      render_book_block: true,
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
  mounted() {
    // this.scrollToTop();
  },
  watch: {
    $route: function() {
      this.getIdFromUrl();
    },
  },

  computed: {
    ...mapGetters({
      // books: "cart/getBooks"
    }),
  },
  methods: {
    getIdFromUrl() {
      this.scrollToTop(); //take page to top
      this.book_slug = this.$route.params.slug; //get book slug from the url.
      this.loadBook(this.book_slug); //load the book as per the slug
      this.relatedBooks(); //load other related project for the page.
    },
    makeReview(){
      this.$Progress.start();
      let formData = new FormData();
      formData.append('title',this.my_review.title);
      formData.append('rating',this.my_review.rating);
      formData.append('body',this.my_review.body);
      formData.append('book_id',this.book.id);
      formData.append('_METHOD',"POST");

      this.$http.post('https://eshop.test/api/frontend/review',formData)
      .then((response)=>{

           this.$toast.success(response.data.msg, {
            timeout: 8000,
          });
        this.my_review.title=""
        this.my_review.rating=""
        this.my_review.body=""
        this.$Progress.finish();
      })
      .catch((error)=>{

        this.$toast.error(error.response.data.message, {
            timeout: 4000,
          });
          this
        this.$Progress.fail();
      });


    },
    addToCart(bookId, name, price, discount,img) {
      let payload = {
        bookId: bookId,
        quantity: 1,
        name: name,
        price: price,
        discount:discount,
        img: img,
      };
      // this.$store.commit('pushCart', payload);

      // // or direct send payload and its key like below
      //   this.$store.commit({
      //     type: 'pushCart',
      //     bookId:bookId,
      //     quantity: 1,
      //     });

      // instead using dispatch for actions
      this.$store.dispatch("cart/addBookToCart", payload)
      .then((response)=>{
          this.$toast.success(response, {
            timeout: 4000,
          });
      })
      .catch((error)=>{

          this.$toast.error(error, {
            timeout: 4000,
          });
      })
    },
    bookDetailParent(value) {
      this.loadBook(value);
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    loadBook(book_slug) {
      this.$Progress.start();
      this.$http
        .get("https://eshop.test/api/frontend/bookDFS/" + book_slug)
        .then((response) => {
          this.book = response.data.data[0];
          // this.reviews=response.data.data[0].reviews;
          // console.log(response.data.data[0]);

          this.imageZoomed = this.book.image[0];

          this.$Progress.finish();
        })
        .catch((error) => {
          console.log(error);
          this.$Progress.fail();
        });
    },
    relatedBooks(url) {
      //load other project except the current book
      //so pass the current project slug to ovoid it in backend
      let url_link =
        url || "https://eshop.test/api/frontend/relatedBooks/" + this.book_slug;
      this.$http
        .get(url_link)
        .then((response) => {
          this.books = response.data;
        })
        .catch((error) => {
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
    },
  },
};
</script>

<style scoped>
.book-details-inside-container {
  border: 1px solid #eeeeeea8;
  padding: 1em;
}
.nested-nav {
  margin-top: 5px;
  margin-bottom: 5px;
}
.book-highligts-info {
  color: #607d8b;
}
.book-detail-section-first {
  padding: 14px;
  /* box-shadow: 1px 3px 8px 9px #eee; */
}
.book-details-section-second {
  padding: 14px;
  /* box-shadow: 1px 3px 8px 9px #eee; */
  margin-top: 1.5em;
}

.related-book-panel {
  margin-top: 1.5em;
  /* padding: 14px; */
  /* box-shadow: 1px 3px 8px 9px #eee; */
}
.related-book-panel h5 {
  padding-bottom: 5px;
  /* margin: 0.5em; */
  color: #dc143c;
}
.book-details-section-second h5 {
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
  /* margin: 0.5em; */
}

.related-book-panel-insider {
  display: flex;
  justify-content: center;
}
.related-book-panel-insider button {
  background: #dc143c;
  color: white;
  border: 1px solid #dc143c;
}
.related-book-panel button:hover {
  background: none;
  border: 1px solid #dc143c;
  color: #dc143c;
}
.greenBtn {
  background: #dc143c;
  color: white;
  border: 1px solid #dc143c;
}
.greenBtn:hover {
  background: none;
  border: 1px solid #dc143c;
  color: #dc143c;
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
.book-image-panel .card-body {
  padding: 0px;
}
.book-detail-section-first {
  position: relative;
}
.book-detail-section-first .zoom-panel {
  position: absolute;
  left: 100%;
  top: 10%;
  z-index: 1;
  background: #eee;
}
.book-image-panel {
  /* width:fit-content; */
  height: auto;
}
.pic-box {
  /* width: 200px; */
  height: 425px;
}
.btn-cart {
  border: 1px solid #dc143c61;
  outline: 0;
  padding: 10px;
  color: #dc143c;
  background-color: #dc143c00;
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
  border: 1px solid #dc143c61;
  background-color: #dc143c;
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
.related-book-container {
  display: flex;
  justify-content: center;
}
</style>
