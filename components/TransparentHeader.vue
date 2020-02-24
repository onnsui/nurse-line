<template>
  <header>
    <div class="menu-collapsed" :class="{'menu-expanded': isActive}" v-on:click="toggleMenu">
      <div class="bar"></div>
      <nav>
        <ul>
          <li>
            <nuxt-link to="/" class="logo">トップページ</nuxt-link>
            <div class="horizon-wrapper">
              <hr />
            </div>
          </li>
          <li>
            <a href="#">運営スタッフ募集</a>
            <div class="horizon-wrapper">
              <hr />
            </div>
          </li>
          <li>
            <a href="#">運営会社</a>
            <div class="horizon-wrapper">
              <hr />
            </div>
          </li>
        </ul>
      </nav>
      <div class="social-icons-wrapper">
        <div class="social-icons">
          <img src="/line.svg" class="social-icon" />
          <img src="/twitter.svg" class="social-icon" />
          <img src="/instagram.svg" class="social-icon" />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data: () => {
    return { isActive: false }
  },
  methods: {
    toggleMenu() {
      this.isActive = !this.isActive
    },
  },
}
</script>

<style lang="scss" scoped>
/*---------------------------------

  PC対応のスタイル

---------------------------------*/
@media only screen and (min-device-width: 769px) {
  header {
    color: #ffffff;
    background-color: rgba(255, 255, 255, 0.8);
    height: 3rem;
    width: 100%;
    margin: 0 auto;
    text-align: center;
  }

  ul {
    display: none;
  }

  li {
    list-style: none;
  }

  .social-icons-wrapper {
    display: none;
  }
}

/*---------------------------------

  スマホ・タブレット対応のスタイル

---------------------------------*/
@media only screen and (max-device-width: 768px) {
  header {
    color: #000;
    background-color: rgba(255, 255, 255, 0);
    height: 3rem;
    width: 100%;
    margin: 0 auto;
    text-align: center;
    position: absolute;
  }

  nav {
    display: flex;
    flex-direction: column;
  }

  @import url(https://fonts.googleapis.com/css?family=Quicksand);

  .b-a {
    transition: all 0.25s;
    content: '';
    position: absolute;
    left: 0;
    height: 2px;
    width: 30px;
    background-color: rgba(0, 0, 0, 0.95);
  }
  .menu-collapsed {
    transition: all 0.25s;
    position: fixed;
    top: 10px;
    left: 9px;
    height: 36px;
    width: 36px;
    z-index: 1;
    cursor: pointer;
    ul {
      transition: all 0s;
      position: fixed;
      left: -9000px;
    }
  }
  .bar {
    @extend .b-a;
    position: fixed;
    left: 12px;
    top: 24px;
    &:before {
      @extend .b-a;
      top: -8px;
    }
    &:after {
      @extend .b-a;
      top: 8px;
    }
  }
  .b-a-expanded {
    transition: all 0.25s;
    top: -0px;
  }
  .social-icons-wrapper {
    display: none;
  }

  .menu-expanded {
    transition: all 0.25s;
    text-align: center;
    line-height: 100px;
    height: 100%;
    width: 100%;
    border-radius: 0px;
    top: 0;
    left: 0;
    background-color: rgba(38, 47, 64, 0.85);

    ul {
      transition: all 0s;
      width: 100%;
      left: 0;
      z-index: 2;
      padding: 0;
    }

    li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
      list-style: none;
      font-size: 0.88rem;
      .horizon-wrapper {
        margin: 0 auto;
        width: auto;
        hr {
          height: 1px;
          border: none;
          border-top: 1px #fff solid;
          width: 9rem;
          position: relative;
          top: -1px;
        }
      }
    }

    a {
      transition: all 0.15s;
      text-decoration: none;
      font-size: 2em;
      padding: 5px;
      color: #fff;
      display: block;
      &:hover {
        background-color: rgba(white, 0.8);
        transition: all 0.15s;
        letter-spacing: 2px;
        color: #333;
        border: 1px solid rgba(255, 255, 255, 0.15);
      }
    }
    .bar {
      background-color: transparent;
      transition: all 0.25s;
      &:before {
        @extend .b-a-expanded;
        transform: rotate(45deg);

        // ハンバーガーメニュー展開時の×の色
        background-color: #fff;
      }
      &:after {
        @extend .b-a-expanded;
        transform: rotate(-45deg);

        // ハンバーガーメニュー展開時の×の色
        background-color: #fff;
      }
    }

    .social-icons-wrapper {
      display: flex !important;
      width: 100%;
      position: absolute;
      bottom: 28%;

      .social-icons {
        display: flex;
        margin: 0 auto;
        padding: 0;
        width: 100%;
        justify-content: center;

        .social-icon {
          position: relative;
          top: 25px;
          border-radius: 50%;
          width: 46px;
          height: 46px;
          img {
            background-color: rgba(38, 47, 64, 0.85);
            width: 100%;
            padding: 1.1rem 0.7rem 1rem 0.7rem;
          }
        }

        :first-child {
          margin-right: 10px;
        }
        :last-child {
          margin-left: 10px;
        }
      }
    }
  }
  .row {
    padding-top: 150px;
  }
  h1 {
    font-size: 3em;
  }
  h3 {
    color: #999;
  }
  p {
    line-height: 160%;
    letter-spacing: 1px;
  }
}
</style>
