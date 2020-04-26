<template>
  <div>
    <footer>
      <div class="scroll-top-button">
        <a v-scroll-to="'#top'" href="#">
          <img src="/icon/arrow_up.png" />
        </a>
        <br />
      </div>
      <img src="/logo.svg" style="height:80px; width: 100px" />
      <div class="copyright">&copy; {{ new Date().getFullYear() }} NURSE LINE All Rights Reserved.</div>
    </footer>
  </div>
</template>

<script></script>

<style lang="scss" scoped>
footer {
  width: 100%;
  margin: 4rem auto 0 0;
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
@media only screen and (max-device-width: 768px) {
  footer {
    margin: 2rem auto 0 0;
  }
  .separater {
    width: 60%;
  }
}
</style>
