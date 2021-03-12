<template>
  <div>
   
    <b-container>
 <!-- <div class="loader-panel" v-if="books.data!=null && sliders!=null && categories!=null">
    <div class="d-flex justify-content-center mb-3" >
        <b-spinner style="width: 3rem; height: 3rem;" label="Loading" variant="danger"></b-spinner>
      </div>
    </div> -->
      <div class="cat-slider-box">
        <b-row>
          <b-col cols="12">
            <slider :sliders="sliders"></slider>
          </b-col>
        </b-row>
      </div>

      <b-row>
        <b-col >
          <div v-if="books.data!=null">
          <h5 style="text-align:center" class="mt-2 pt-2 theme-color" >
            Popular
          </h5>
          <div class="col">
            <div class="book-container">
              <bookSlider :books="books.data"></bookSlider>
            </div>
          </div>
        </div>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <div class="category-card-container">
            <h5 v-if="categories!=null">Start with Categories</h5>
            <div class="category-card">
              <ul v-for="category in categories" v-bind:key="category.id">
                <li>
                  <a href="javascript:" @click="showByCat(category.slug)">{{
                    category.name
                  }}</a>
                </li>
              </ul>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <h5 style="text-align:center" class="mt-2 pt-2 theme-color" v-if="books.data!=null">
            More Books
          </h5>
          <div class="book-panel">
            <div class="book-panel-insider">
              <book :books="books.data"></book>
            </div>
            <div class="inner-btn mb-4">
              <b-button
                variant="default"
                class="loadmore-btn"
                @click="loadBooks(pagination.next_link)"
                v-if="pagination.next_link!=null"
              >
                <b-icon icon="arrow-down"></b-icon>Load More
              </b-button>
            </div>
          </div>

          <div></div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import BookSlider from "../components/BookSlider";
import Book from "../components/Book";
import { mapGetters } from "vuex";
import Slider from "../components/Slider";

// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "Home",
  components: {
    Slider,
    BookSlider,
    Book,
  },
  data() {
    return {
      //will holds all the books meta, link and data as well
      books: {
        data: [], //will hold all the book
      },
      sliders:[],
      categories: [],
      next_page: "",
      more_data: "",
      pagination: {},
    };
  },
  computed: {
    // books(){
    //   return this.$store.getters.getBooks;
    // }
    ...mapGetters({
      //for testing purpose fetching book from dummy cart books
      // books: "cart/getBooks"
    }),
  },
  created() {
    // this.checkvar=process.env.APP_NAME
    this.loadCategories();
    this.loadBooks();
    this.loadSliders();
  },
  mounted() {},
  methods: {
    loadSliders(){

      this.$http.get('https://eshop.test/api/frontend/sliders')
      .then((response)=>{
        console.log(response.data);
        this.sliders=response.data.data;
      })
      .catch((error)=>{
        console.log(error.response);
      });
    },
    showByCat(slug) {
      this.$router.push({ name: "Category", params: { slug: slug } });
    },
    loadCategories() {
      //load random 5 Categories

      this.$http
        .get("https://eshop.test/api/frontend/categories/random")
        .then((response) => {
          this.categories = response.data.data;
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message, {
            timeout: 4000,
          });
        });
    },

    makePagination(meta, links) {
      let pagination = {
        current_page: meta.current_page,
        last_page: meta.last_page,
        from_page: meta.from,
        to_page: meta.to,
        total_pages: meta.total,
        path_page: meta.path + "?page=",
        first_link: links.first,
        last_link: links.last,
        prev_link: links.prev,
        next_link: links.next,
      };
      this.pagination = pagination;
    },

    pushBook(book_object) {
      this.books.data.push(book_object);
    },
    loadBooks(page_url) {
        this.$Progress.start();

        page_url = page_url || "https://eshop.test/api/frontend/books";

        this.$http
          .get(page_url)
          .then((response) => {
            //pushing books to data of book object
            // console.log(response.data.data);

            response.data.data.forEach((data) => {
              this.books.data.push(data);
            });

            this.books.meta = response.data.meta;
            this.books.links = response.data.links;

            this.makePagination(response.data.meta, response.data.links);
            this.$Progress.finish();
          })
          .catch((error) => {
            console.log(error);
            this.$Progress.fail();
          });
    },
  },
};
</script>
<style>
.loader-panel{

}
.book-panel-insider {
  display: flex;
  justify-content: center;
}
.book-container ul {
  list-style: none;
}
.inner-btn {
  display: flex;
  justify-content: center;
}
.category-aside-panel {
}
.category-aside {
  background: #fff;
  padding: 8px;
}
.cat-slider-box {
  background: #fff;
}
.category-aside ul {
  list-style: none;
  padding-left: 5px;
  padding-bottom: 0px;
  margin: 0px;
}
.category-aside ul li {
  padding: 4px;
  display: inline-block;
}
.category-aside ul li :hover {
  padding-left: 2px;
}
.category-aside ul li a {
  color: gray;
  display: block;
  text-decoration: none;
}
.category-aside ul li a:hover {
  color: green;
}
.category-aside ul li ul.dropdown {
  min-width: 100%; /* Set width of the dropdown */
  background: #f2f2f2;
  display: none;
  position: absolute;
  z-index: 999;
  left: 0;
}
.category-aside ul li:hover ul.dropdown {
  display: block; /* Display the dropdown */
}
.category-aside ul li ul.dropdown li {
  display: block;
}
.category-card {
  display: flex;
  justify-content: center;
}
.category-card ul {
  list-style: none;
  margin: 0px;
  padding: 0px;
}
.category-card ul li {
  float: left;
}
.category-card ul li a {
  margin: 1em;
  padding: 2.5em;

  background: #fff;
  color: #DC143C;

  box-shadow: 1px 1px 0px 1px #d1dcc8;

  border-radius: 56%;
  font-size: large;
  display: block;
  text-decoration: none;
  transition: opacity 0.5s ease-out;
  -moz-transition: opacity 0.5s ease-out;
  -webkit-transition: opacity 0.5s ease-out;
  -o-transition: opacity 0.5s ease-out;
}
.category-card ul li a:hover {
  background: #DC143C;
  color: #fff;
  box-shadow: 1px 3px 10px 4px #d1dcc4;
}
.category-card-container {
  margin: 4em 0em 2em 0em;
}
.category-card-container h5 {
  color: #DC143C;
  text-align: center;
}
</style>
