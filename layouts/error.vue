 <template>
  <div class="error">
    <h1 class="error-title">{{error.statusCode}}</h1>
    <p class="error-txt" v-if="error.statusCode === 404">ページが見つかりません</p>
    <p class="error-txt" v-else>エラーが発生しました</p>
    <nuxt-link class="error-link" to="/">ホームに戻る</nuxt-link>
  </div>
</template>
<script>
export default {
  props: ['error'],
}
</script>
<style lang="scss" scoped>
.error {
  text-align: center;
  padding: 20px;
  &-title {
    color: #888;
    font-size: 70px;
    font-weight: bold;
  }
}
</style>