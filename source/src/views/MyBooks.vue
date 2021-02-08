<template>

    <div class="content mt-2">
      <b-container>
      <h5>My Books</h5>
        <b-row>
          <b-col>
           <button class="btn btn-success mt-3" @click="showModal()">
                  Upload Book
                </button>
          <div v-if="products.length>0">
           
           <div class="card mt-4">
           
           <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Category</th>
                    <th scope="col">Image</th>
                    <th scope="col">Name</th>
                    <th scope="col">Slug</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Unit</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="product in products"
                    v-bind:key="product.id">
                    <td>
                       <div v-for="category in categories" v-bind:key="category.id">
                        <span v-if="product.category_id===category.id">
                        {{category.name}}
                        </span>
                      </div>
                    
                    </td>
                    <td>
                     <img :src="image" class="img-thumbnail product-image-inside-table" :alt="product.name"  v-for="image in product.image" v-bind:key="image">
                    </td>
                    <td>{{ product.name }}</td>
                    <td>{{ product.slug }}</td>
                    <td>Rs. {{product.price}}</td>
                    <td>{{product.quantity}}</td>
                    <td>

                    <div v-for="unit in units" v-bind:key="unit.id">
                        <span v-if="product.unit_id===unit.id">
                        {{unit.short_name}}
                        </span>
                      </div>
                    
                    
                    </td>
                    <td>
                      <button class="btn btn-warning m-2" @click="loadBookDetails(product.slug)"> <b-icon icon="gear" font-scale="1.2"></b-icon></button> 
                      <button class="btn btn-danger m-2"> <b-icon icon="x" font-scale="1.2"></b-icon></button>   
                    </td>

                  </tr>
                </tbody>
              </table>

        </div>


          </div>
            <div v-else>
             <p class="mt-3">You have no Books. Please add one to start earning.</p>
            </div>
               
                <b-modal id="bv-modal-addbook" hide-footer style="width:20em;">
                  <template v-slot:modal-title>
                  <span class="text-primary">{{book_title}}</span>
                </template>
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
                          <label>Quantity</label>
                        </div>
                        <div class="col-md-7">
                          <input type="text" class="form-control" v-model="book.quantity"/>
                      <span v-if="errors.quantity" :class="['errorText']">{{ errors.quantity[0] }}</span>

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
                <b-button class="mt-3" block @click="editBook" v-if="book_action==='edit'">Edit Book</b-button>

                <b-button class="mt-3" block @click="uploadBook" v-if="book_action==='add'">Add Book</b-button>
              
              </b-modal>

             
          </b-col>
        </b-row>
      </b-container>

    </div>
</template>

<script>
export default {
  name: "MyBooks",
  components: {
 
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
        quantity:'',
      },
      book_title:'Upload Book',
      book_action:'add',//add or edit
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
     clearBook(){
      this.book.category='';
      this.book.name='';
      this.book.price='';
      this.book.discount='';
      this.book.more_info='';
      this.book.description='';
      this.book.unit='';
      this.book.quantity='';
      this.book.book_id='';
    },
    showModal(){
      this.clearBook();
      this.book_action="add";
      this.book_title="Upload a Book";
      this.$bvModal.show('bv-modal-addbook')
    },
    loadMyBooks() {
      this.$Progress.start();

      this.$http
        .get("https://eshop.test/api/loadMyBooks")
        .then((response) => {
          this.products = response.data.data;
      this.$Progress.finish();

        })
        .catch((error) => {
          this.$toast.error(error.response.data.message, {
                timeout: 4000
            });
      this.$Progress.fail();

        });
    },
    
    loadBookDetails(slug){
      this.$Progress.start();

      this.book_action="edit";
      this.book_title="Change Book Information";
      if(this.book_action==="edit"){
        this.clearBook();
            this.$http
            .get("https://eshop.test/api/productDFS/"+slug)
            .then((response)=>{
              const product=response.data.data[0];
                  this.book.category=product.category_id;
                  this.book.name=product.name;
                  this.book.price=product.price;
                  this.book.discount=product.discount;
                  this.book.more_info=product.more_info;
                  this.book.description=product.description;
                  this.book.unit=product.unit_id;
                  this.book.quantity=product.quantity;
                  this.book.id=product.id;
                  this.$bvModal.show('bv-modal-addbook');
      this.$Progress.finish();

            })
            .catch((error)=>{
              this.clearBook();
              this.$toast.error(error.response.data.message, {
                timeout: 4000
            });
      this.$Progress.fail();

            })
      }
    },
    
     //end of loadMyBooks
    handleFileUploads(){
      this.uploadedFiles=this.$refs.files.files;
      console.log(this.uploadedFiles);

    },
    loadCategories(){
      this.$Progress.start();

      this.$http
      .get("https://eshop.test/api/categories")
      .then((response)=>{
        // console.log(response.data);
        this.categories=response.data.data;
      this.$Progress.finish();
        // console.log(this.categories);
      })
      .catch((error)=>{
        this.$toast.error(error.response.data.message, {
                timeout: 4000
            });
      this.$Progress.fail();

      })
    },


    loadUnits(){
      this.$Progress.start();

      this.$http
      .get("https://eshop.test/api/units")
      .then((response)=>{
        // console.log(response.data);
        this.units=response.data.data;
        // console.log(this.categories);
      this.$Progress.finish();

      })
      .catch((error)=>{
        this.$toast.error(error.response.data.message, {
                timeout: 4000
            });
      this.$Progress.fail();

      })
    },
   
    editBook(){
      this.$Progress.start();

         this.book_action="Edit Book";
         this.book_action="edit";
         let formData = new FormData();
        
        formData.append("uploadedFiles",this.uploadedFiles);

        for( var i = 0; i < this.uploadedFiles.length; i++ ){
            let file = this.uploadedFiles[i];

            formData.append('files[' + i + ']', file);
        }
        formData.append("category",this.book.category);
        formData.append("unit",this.book.unit);
        formData.append("name",this.book.name);
        formData.append("quantity",this.book.quantity);
        formData.append("price",this.book.price);
        formData.append("discount",this.book.discount);
        formData.append("description",this.book.description);
        formData.append("more_info",this.book.more_info);
        formData.append("book_id",this.book.id);


        this.$http.post("https://eshop.test/api/editBook",formData,{
          headers: {
              'Content-Type': 'multipart/form-data'
          }
        })
        .then((response)=>{
          this.$toast.success(response.data.msg, {
                timeout: 8000
            });
          this.clearBook();
          this.loadMyBooks();
          this.$bvModal.hide('bv-modal-addbook')
      this.$Progress.finish();

        })
        .catch((error)=>{
           this.$toast.error(error.response.data.message, {
                timeout: 4000
            });
          this.errors=error.response.data.errors;
````
          this.clearBook();
      this.$Progress.fail();

        });
      
    },
    uploadBook(){
      this.$Progress.start();
      this.book_action="add";
      this.book_title="Upload Book"
      let formData = new FormData();
       
        formData.append("uploadedFiles",this.uploadedFiles);

        for( var i = 0; i < this.uploadedFiles.length; i++ ){
            let file = this.uploadedFiles[i];

            formData.append('files[' + i + ']', file);
        }
        formData.append("category",this.book.category);
        formData.append("unit",this.book.unit);
        formData.append("name",this.book.name);
        formData.append("quantity",this.book.quantity);
        formData.append("price",this.book.price);
        formData.append("discount",this.book.discount);
        formData.append("description",this.book.description);
        formData.append("more_info",this.book.more_info);
        

        this.$http.post("https://eshop.test/api/uploadBook",formData,{
          headers: {
              'Content-Type': 'multipart/form-data'
          }
        })
        .then((response)=>{
          this.$toast.success(response.data.msg, {
                timeout: 8000
            });
          console.log(response);
          this.$bvModal.hide('bv-modal-addbook')
          this.clearBook();
          this.loadMyBooks();
      this.$Progress.finish();

        })
        .catch((error)=>{
           this.$toast.error(error.response.data.message, {
                timeout: 4000
            });
          this.errors=error.response.data.errors;
          this.clearBook();
      this.$Progress.fail();

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
.product-image-inside-table{
    width: 100px;
    height: 100px;
    border-radius: 64px;
    margin:2px;
}
.errorText{
  color:red;
}
</style>
