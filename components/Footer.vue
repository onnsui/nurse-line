<template>
  <footer>
    <div class="separater"></div>

    <div class="scroll-top-button">
      <a v-scroll-to="'#top'" href="#"><img src="/icon/arrow_up.png" /></a>
      <br />
    </div>
    <img src="http://placehold.jp/100x80.png" style="height:80px; width: 100px" />
    <div class="copyright">© 2020 ROXX All Rights Reserved.</div>
  </footer>
</template>

<script></script>

<style lang="scss" scoped>
footer {
  width: 100%;
  margin: 10px auto 25px 0;
  text-align: center;
}

.scroll-top-button {
  margin: 10px;
  img {
    height: 14px;
  }
}

.separater {
  border: solid #333;
  border-width: 1px 0 1px 0;
  height: 5px;
  width: 80%;
  margin: 50px auto 0 auto;
}

.copyright {
  color: white;
  font-size: 13px;
  height: 23px;
  background-color: #212b37;
  line-height: 23px;
  width: 100%;
  margin: 0 auto;
}
</style>
