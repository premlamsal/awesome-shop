<template>
    <div class="banner"> 
        <div class="banner-img-container">
            <img :src="img"/>
            <div class="banner-caption">
               <h3>{{title}}</h3>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'Banner',
    props:{
        title:String,
        img:String,
    }
}
</script>
<style scoped>
.banner-img-container{
    width: 100%;
    height: 300px;
    position: relative;
}
.banner-img-container img{
    width: 100%;
    height: 100%;
}
.banner-caption{
    position: absolute;
    left: 40%;
    bottom: 10%;
}
.banner-caption h3{
    color: white;
}
</style>