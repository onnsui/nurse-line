<template>
  <div>
    <nuxt />
    <MyFooter />
  </div>
</template>

<script>
import MyFooter from '~/components/Footer.vue'

export default {
  components: {
    MyFooter,
  },
}
</script>

<style lang="scss" scoped></style>
