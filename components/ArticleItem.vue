<template>
  <div class="wrapper">
    <div class="article-thumbnail">
      <img src="http://placehold.jp/200x150.png" alt="article-thumbnail" />
    </div>
    <div class="article-category">インタビュー</div>
    <div class="article-content">
      看護師3年目で職を転々としていた私が自分の軸を決め、未経験で訪問看護に転職した話
    </div>
    <div class="article-read-button">
      <a href="">
        <img src="~/static/read-button.png" alt="article-read-button" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      require: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  margin-right: 1.1rem;
  width: 16rem;
  padding: 1rem;
  position: relative;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.article-thumbnail {
  width: 14rem;
  height: 10.7rem;
  img {
    width: 100%;
  }
}
.article-category {
  position: absolute;
  top: 9.4rem;
  left: 1rem;
  padding: 0.5rem 1.25rem;
  background-color: #61b5a7;
  font-size: 0.7rem;
  color: #fff;
}
.article-content {
  height: 2.85rem;
  margin: 1.5rem 0 1rem 0;
  text-overflow: ellipsis;
  overflow: hidden;
}
.article-read-button {
  align-self: flex-end;
}
</style>
