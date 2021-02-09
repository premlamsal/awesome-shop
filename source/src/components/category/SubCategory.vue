<template>
  <div class="container">
      <div class="row-custom">
          <div class="column-custom" v-for="child in childs" :key="child.id">
          <h3>{{child.name}}</h3>
          <div class="more-child" v-if="child.childs.length>0">
            <div class="more-child-items" v-for="grandchild in child.childs" :key="grandchild.id">
            <a href="javascript:" @click="fromCatMenu(grandchild.slug)">{{grandchild.name}}</a>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
// import SubCategory from "../Category/SubCategory.vue"; //incase of infinite menu loop
export default {
  name: "SubCategory",
  props: {
    childs: Array,
  },
  components: {
    // SubMenu
  },
  methods:{

     fromCatMenu(slug){
        //will push
         this.$router.push({ name: "Category", params: { slug: slug } });

      }

  }
  
};
</script>
<style scoped>
.more-child a{
color:#636b6f;
}
.more-child a:hover{
  color:#DC143C
}
.more-child-items a{
color:yellow;
}
.more-child-items a:hover{
  color:red;
}
</style>
