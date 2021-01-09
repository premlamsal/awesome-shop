<template>
  <div>
  </div>
</template>
<script>
export default {
    data(){
        return{
            slug:'',  
        }
    },
  created(){
      this.getSlugFromUrl();
      this.redirectTo();
  },
  methods: {
      getSlugFromUrl(){
          this.slug = this.$route.params.slug
        //   console.log(this.slug);
      },
    redirectTo() {
        this.$router.push({ path: `/product/${this.slug}` });

    },
  },
};
</script>