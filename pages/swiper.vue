<template>
  <div class="page-index">
    <section>
      <swiper :options="swiperOption">
        <swiper-slide>slide1</swiper-slide>
        <swiper-slide>slide2</swiper-slide>
        <swiper-slide>slide3</swiper-slide>
        <swiper-slide>slide3</swiper-slide>

        <swiper-slide>slide3</swiper-slide>

        <div slot="button-prev" class="swiper-button-prev"></div>
        <div slot="button-next" class="swiper-button-next"></div>
        <div slot="pagination" class="swiper-pagination"></div>
      </swiper>
    </section>
  </div>
</template>
<script>
export default {
  layout: 'top',
  data() {
    return {
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 30,
        slidesPerGroup: 3,
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 3,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
    }
  },
}
</script>
<style>
html,
body {
  position: relative;
  height: 100%;
}
body {
  background: #eee;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
}
.swiper-container {
  width: 100%;
  height: 400px;
}
.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
</style>