<template>
  <div class="category-full-panel bg-white mt-2">
  <b-container>
  
    <b-row>
   
      <b-col cols="9">
        <div class="category-header mt-4">
          <h4>Books for this Category</h4>
          <div class="book-panel mt-5">
            <div class="book-panel-insider">
              <book :books="books.data"></book>
            </div>
            <div class="inner-btn mb-4">
              <b-button variant="default" class="loadmore-btn" @click="loadBooksByCategory(pagination.next_link)"
                v-if="pagination.next_link!=null">
                <b-icon icon="arrow-down"></b-icon>Load More
              </b-button>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>

  </b-container>
      </div>
</template>
<script>
import Book from "../components/Book";
import { mapGetters } from "vuex";
export default {
  components: {
    Book,
  },

  data() {
    return {
      category_slug: "", //to store book slug form the url
      books: {
        data: [], //will hold all the book
      }, //for loding more books content on book details page
      render_book_block: true,
      categories:{},
       pagination: {},
    };
  },
  created() {
    this.getIdFromUrl();
    this.getCategories();
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
      this.category_slug = this.$route.params.slug; //get category slug from the url.
      this.loadBooksByCategory(); //load the book as per the slug
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

      getCategories() {

      // will get categories instead of menu

      this.$http
        .get("https://eshop.test/api/frontend/getCategoriesMenu")
        .then((response) => {
          this.categories = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    loadBooksByCategory(page_url) {
      this.$Progress.start();

        page_url = page_url || "https://eshop.test/api/frontend/category/" + this.category_slug;
      this.$http
        .get(page_url)
        .then((response) => {
          
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

    scrollToTop() {
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style scoped>
.category-header {
text-align:center;
}
.category-full-panel{
    padding:10px;
}
.sidebar{
}
.sidebar h5{
  color:#DC143C;
}
.sidebar ul{
list-style:none;


}
.sidebar ul li{

}
.sidebar ul li a{
text-decoration:none;
color:gray;

}
.sidebar ul li a:hover{
  color:#DC143C;
}
</style>
