<template>
  <div>
    <Header />
    <nuxt />
    <Footer />
    <div class="social-icon-area"></div>
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'

export default {
  head: function() {
    return {
      title: 'NURSE LINE',
    }
  },
  components: {
    Header,
    Footer,
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

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
@media only screen and (min-device-width: 769px) {
  .social-icon-area {
    display: none;
  }
}

@media only screen and (max-device-width: 768px) {
  .social-icon-area {
    display: none;
    position: sticky;
    bottom: 2rem;
    left: 0;
    width: 100%;
    img {
      margin: 0 0.5rem;
    }
  }
}
</style>
