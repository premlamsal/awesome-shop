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
      <b-carousel-slide>
          <template v-slot:img>
          <img
            class="d-block w-100"
            width="1024"
            height="400"
            src="https://image.freepik.com/free-photo/package-boxes-cart-with-laptop-computer-online-shopping-concept_38716-130.jpg"> 
        </template>
           <div class="slider-overlap-caption" alt="image slot">
          <h1>This is slider</h1>
          <p>This is paragraph for this slider and can be given within the better thing for the pattern.</p>
          <b-button variant="default" class="greenBtn">
            <b-icon icon="cursor"></b-icon>Click me
          </b-button>
        </div>
      </b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide>
        <template v-slot:img>
          <img
            class="d-block w-100"
            width="1024"
            height="400"
            src="https://i.ytimg.com/vi/tDvjQp1BaWA/maxresdefault.jpg"
            alt="image slot"
          />
        </template>
        <div class="slider-overlap-caption">
          <h1>This is slider second</h1>
          <p>This is paragraph for this slider and can be given within the better thing for the pattern.</p>
          <b-button variant="default" class="greenBtn">
            <b-icon icon="cursor"></b-icon>Click me
          </b-button>
        </div>
      </b-carousel-slide>

      <!-- Slides with image only -->
      <b-carousel-slide>
        <template v-slot:img>
          <img
            class="d-block w-100"
            width="1024"
            height="400"
            src="https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/publications/food-beverage-nutrition/foodnavigator-asia.com/article/2018/07/02/five-key-features-that-will-shape-the-online-retail-store-of-the-future/8266733-1-eng-GB/Five-key-features-that-will-shape-the-online-retail-store-of-the-future.jpg"
            alt="image slot"
          />
        </template>
        <div class="slider-overlap-caption">
          <h1>This is slider third</h1>
          <p>This is paragraph for this slider and can be given within the better thing for the pattern.</p>
          <b-button variant="default" class="greenBtn">
            <b-icon icon="cursor"></b-icon>Click me
          </b-button>
        </div>
      </b-carousel-slide>

      <!-- Slides with img slot -->
      <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
      <b-carousel-slide>
        <template v-slot:img>
          <img
            class="d-block w-100"
            width="1024"
            height="400"
            src="https://assets.weforum.org/article/image/large_zwF2Vx9yuS2oq_csLEPiFUsSRLQ9c2LRNTdIhGDEBJU.jpg"
            alt="image slot"
          />
        </template>
        <div class="slider-overlap-caption">
          <h1>This is slider fourth</h1>
          <p>This is paragraph for this slider and can be given within the better thing for the pattern.</p>
          <b-button variant="default" class="greenBtn">
            <b-icon icon="cursor"></b-icon>Click me
          </b-button>
        </div>
      </b-carousel-slide>

      <!-- Slide with blank fluid image to maintain slide aspect ratio -->
      <b-carousel-slide>
         <template v-slot:img>
          <img
            class="d-block w-100"
            width="1024"
            height="400"
            src="https://li0.rightinthebox.com/images/dfp/202011/c1180_39361_s11301320pcus1_en.gif?89"
            alt="image slot"
          />
        </template>
        <div class="slider-overlap-caption">
          <h1>This is slider fifth</h1>
          <p>This is paragraph for this slider and can be given within the better thing for the pattern.</p>
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
  background: #7cb342 !important;
  color: white !important;
  border: 1px solid #7cb342 !important;
}
.greenBtn:hover {
  background: none !important;
  border: 1px solid #7cb342 !important;
  color: #fff !important;
}
.carousel-indicators > li {
  border-radius: 50%!important;
  width: 15px!important;
  height: 15px!important;
}
</style>