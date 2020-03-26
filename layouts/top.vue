<template>
  <div>
    <TransparentHeader />

    <div class="hero">
      <nuxt-link to="/">
        <img class="pc" src="/pc-hero.png" alt="hero" loading="lazy" />
        <img class="sp" src="/sp-hero.png" alt="hero" loading="lazy" />
      </nuxt-link>
    </div>

    <nuxt />
    <MyFooter />
  </div>
</template>

<script>
import TransparentHeader from '~/components/TransparentHeader.vue'
import MyFooter from '~/components/Footer.vue'

export default {
  components: {
    TransparentHeader,
    MyFooter,
  },
}
</script>

<style lang="scss" scoped>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

@media only screen and (min-device-width: 769px) {
  .sp {
    display: none;
  }
  .hero {
    height: auto;
    width: 100%;
    padding: 0 10%;
    text-align: center;
    img {
      width: 100%;
    }
  }
}

@media only screen and (max-device-width: 768px) {
  .pc {
    display: none;
  }
  .hero {
    img {
      height: auto;
      width: 100%;
    }
  }
}
</style>
