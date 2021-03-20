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
      <vueper-slide v-for="book in books" :key="book.id">
        <template v-slot:content>
          <div class="book-card">
            <div class="book-image-outer-wrapper">
              <div class="book-image-frame">
                <img :src="book.image[0]" :alt="book.name" />
              </div>
            </div>
            <h6>{{book.name}}</h6>
            <div v-if="book.discount!=0">
              <p class="book-price"><s>$ {{book.price}}</s></p>
              <p class="book-offer-price" style="color:red">$ {{book.price - book.discount}}</p>
              </div>
              <div v-else>
              <p class="book-price" style="color:red">$ {{book.price}}</p>
            </div>
            <!-- <p>Some text about the jeans. Super slim and comfy lorem ipsum lorem jeansum.</p> -->
            <p style="text-align:center">
              <b-button @click="addToCart(book.id,book.name,book.price,book.discount,book.image[0])">
                <b-icon icon="cart" font-scale="1.5"></b-icon>
              </b-button>
              <b-button @click="bookDetail(book.slug)">
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
    books: Array,
  },
  components: {
    VueperSlides,
    VueperSlide,
  },

  methods: {
    bookDetail(slug) {
      this.$router.replace({ path: `/book/${slug}` });
    },
    addToCart(bookId,name,price,discount,img) {
      let payload = {
        bookId: bookId,
        quantity: 1,
        discount:discount,
        name: name,
        price: price,
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
          // console.log(response);
      })
      .catch((error)=>{

          this.$toast.error(error, {
            timeout: 4000,
          });
          // console.log(error);

      })
    },
    removeFromCart(bookId) {
      this.$store.dispatch("cart/removeBookFromCart", bookId);
    },
  },
};
</script>
<style scoped>
.book-card {
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
.book-card:hover {
  box-shadow: 1px 5px 15px 0 rgb(220,20,60,0.28);
}
.book-card img {
  /* height: 14em; */
  /* width: 100%; */
  max-width: 100%;
  max-height: 100%;
  display: block;
  margin: 0 auto;
}
.book-card h6 {
  margin: 0.5em;
  height: 40px;
  overflow: hidden;
}
.book-card p {
  margin: 0.5em;
}
.book-img-holder {
  height: 240px;
}
.book-price {
  color: grey;
  font-size: 22px;
}
.inner-btn {
  display: flex;
  justify-content: center;
}

.book-card button {
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

.book-card button:hover {
  opacity: 0.9;
  color: white;
  border: 1px solid #DC143C61;
  background-color: #DC143C;
}
.book-image-outer-wrapper {
  display: inline-block;
  margin: 20px;
}
.book-image-frame {
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
.book-price {
  font-size: 16px;
}
.book-slide-btn {
  display: flex;
  align-items: center;
}
</style>