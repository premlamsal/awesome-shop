<template>

    <div class="content mt-2">
      <b-container>
      <h5>My Books</h5>
        <b-row>
          <b-col>
           <button class="btn btn-success mt-3" @click="$bvModal.show('bv-modal-addbook')">
                  Upload Book
                </button>
          <div v-if="products.length>0">
            <product :products="products" ></product>
            </div>
            <div v-else>
             <p class="mt-3">You have no Books. Please add one to start earning.</p>
            </div>
               
                <b-modal id="bv-modal-addbook" hide-footer title="Add Book" style="width:20em;">
                <div class="d-block text-center">
                    <div class="row">
                        <div class="col-md-4">
                          <label>Category</label>
                        </div>
                        <div class="col-md-7"> 
                          <select v-model="book.category" class="form-control">
                              <option v-for="category in categories" v-bind:key="category.id" :value="category.id">
                              {{category.name}}
                              </option>
                          </select> 
                      <span v-if="errors.category" :class="['errorText']">{{ errors.category[0] }}</span>
                        </div>
                      </div>

                      <div class="row mt-1">
                        <div class="col-md-4">
                          <label>Name</label>
                        </div>
                        <div class="col-md-7">
                          <input type="text" class="form-control" v-model="book.name"/>
                      <span v-if="errors.name" :class="['errorText']">{{ errors.name[0] }}</span>

                        </div>
                      </div>

                
                    <div class="row mt-1">
                        <div class="col-md-4">
                          <label>Price</label>
                        </div>
                        <div class="col-md-7">
                          <input type="text" class="form-control" v-model="book.price"/>
                      <span v-if="errors.price" :class="['errorText']">{{ errors.price[0] }}</span>

                        </div>
                    </div>


                      <div class="row mt-1">

                      <div class="col-md-4">
                            <label>Unit</label>
                      </div>
                          <div class="col-md-7"> 
                            <select v-model="book.unit" class="form-control">
                                <option v-for="unit in units" v-bind:key="unit.id" :value="unit.id">
                                {{unit.short_name}}
                                </option>
                            </select> 
                      <span v-if="errors.unit" :class="['errorText']">{{ errors.unit[0] }}</span>

                          </div>

                      </div>

                      <div class="row mt-1">
                          <div class="col-md-4">
                            <label>Discount</label>
                          </div>
                          <div class="col-md-7">
                            <input type="text" class="form-control" v-model="book.discount"/>
                      <span v-if="errors.discount" :class="['errorText']">{{ errors.discount[0] }}</span>

                          </div>
                      </div>


                        <div class="row mt-1">
                          <div class="col-md-4">
                            <label>Description</label>
                          </div>
                          <div class="col-md-7">
                              <textarea class="form-control" v-model="book.description"></textarea>
                      <span v-if="errors.description" :class="['errorText']">{{ errors.description[0] }}</span>

                          </div>
                        </div>


                    <div class="row mt-1">
                      <div class="col-md-4">
                        <label>More Info</label>
                      </div>
                      <div class="col-md-7">
                          <textarea class="form-control" v-model="book.more_info"></textarea>
                      <span v-if="errors.more_info" :class="['errorText']">{{ errors.more_info[0] }}</span>
                          
                      </div>
                    </div>

                    <div class="row mt-2">
                    <div class="col-md-4">
                       <label>Images</label>
                      </div>
                      <div class="col-md-8">
                          <input type="file" id="files" ref="files" multiple v-on:change="handleFileUploads()"/>
                      <span v-if="errors.file" :class="['errorText']">{{ errors.file[0] }}</span>
                      </div>
                    </div>

                  </div>
                <b-button class="mt-3" block @click="uploadBook">Add Book</b-button>
              </b-modal>

             
          </b-col>
        </b-row>
      </b-container>

    </div>
</template>

<script>
import Product from "../components/Product";
export default {
  name: "MyBooks",
  components: {
    Product,
  },
  data() {
    return {
      products: [],
      book:{
        category:'',
        name:'',
        price:'',
        discount:'',
        more_info:'',
        description:'',
        unit:'',
      },
      errors:[],
      categories:{},
      units:{},
      uploadedFiles:[],
    };
  },
  created() {
    this.loadMyBooks();
    this.loadCategories();
    this.loadUnits();
  },
  computed: {},
  methods: {
    loadMyBooks() {
      this.$http
        .get("https://eshop.test/api/loadMyBooks")
        .then((response) => {
          this.products = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    }, //end of loadMyBooks
    handleFileUploads(){
      this.uploadedFiles=this.$refs.files.files;
      console.log(this.uploadedFiles);

    },
    loadCategories(){
      this.$http
      .get("https://eshop.test/api/categories")
      .then((response)=>{
        // console.log(response.data);
        this.categories=response.data.data;
        // console.log(this.categories);
      })
      .catch((error)=>{
        console.log(error);
      })
    },


    loadUnits(){
      this.$http
      .get("https://eshop.test/api/units")
      .then((response)=>{
        // console.log(response.data);
        this.units=response.data.data;
        // console.log(this.categories);
      })
      .catch((error)=>{
        console.log(error);
      })
    },
    clearBook(){
      this.category='';
      this.name='';
      this.price='';
      this.discount='';
      this.more_info='';
      this.description='';
      this.unit='';
    },

    uploadBook(){
      let formData = new FormData();

        
        formData.append("uploadedFiles",this.uploadedFiles);

        for( var i = 0; i < this.uploadedFiles.length; i++ ){
            let file = this.uploadedFiles[i];

            formData.append('files[' + i + ']', file);
        }
        formData.append("category",this.book.category);
        formData.append("unit",this.book.unit);
        formData.append("name",this.book.name);
        formData.append("price",this.book.discount);
        formData.append("discount",this.book.discount);
        formData.append("description",this.book.description);
        formData.append("more_info",this.book.more_info);

        this.$http.post("https://eshop.test/api/uploadBook",formData,{
          headers: {
              'Content-Type': 'multipart/form-data'
          }
        })
        .then((response)=>{
          console.log(response);
          this.$bvModal.hide('bv-modal-addbook')
          this.clearBook();
          this.loadMyBooks();
        })
        .catch((error)=>{
          console.log(error);
          this.erros=error.response.data;
          this.clearBook();
        });

    },
  },
};
</script>
<style scoped>
.content {
  background: white;
  padding: 5em;
}
</style>
