<template>
<div>

    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="400"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
      class="home-slider"
      >
      <!-- Text slides with image -->
      <b-carousel-slide v-for="slider in sliders" :key="slider.id">
          <template v-slot:img>
          <img
            class="d-block w-100"
            width="1024"
            height="400"
            :src="slider.image"> 
        </template>
           <div class="slider-overlap-caption" alt="image slot">
          <h1>{{slider.heading}}</h1>
          <p>{{slider.paragraph}}</p>
          <b-button variant="default" class="greenBtn">
            <b-icon icon="cursor"></b-icon>Click me
          </b-button>
        </div>
      </b-carousel-slide>

    
    </b-carousel>

    <!-- <p class="mt-4">
      Slide #: {{ slide }}<br>
      Sliding: {{ sliding }}
    </p>-->

  

  </div>


</template>

<script>
export default {
  data() {
    return {
      slide: 0,
      sliding: null
    };
  },
  props: {
    sliders: Array
  },
  created(){},

  methods: {

    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    }
  }
};
</script>
<style>
.home-slider {
  position: relative;
}

.carousel-caption {
  top: 30%;
  bottom: unset !important;

  background: #00000098;
  box-shadow: 1px 0px 6px -1px #eee6;
}
.greenBtn {
  background: #DC143C !important;
  color: white !important;
  border: 1px solid #DC143C !important;
}
.greenBtn:hover {
  background: none !important;
  border: 1px solid #DC143C !important;
  color: #fff !important;
}
.carousel-indicators > li {
  border-radius: 50%!important;
  width: 15px!important;
  height: 15px!important;
}
</style>