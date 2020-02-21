<template>
  <header>
    <div class="menu-collapsed" :class="{'menu-expanded': isActive}" v-on:click="toggleMenu">
      <div class="bar"></div>
      <nav>
        <ul>
          <li>
            <a href="#">トップページ</a>
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
@media only screen and (min-device-width: 769px) {
  header {
    color: #ffffff;
    background-color: #212a37;
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
}

@media only screen and (max-device-width: 768px) {
  header {
    color: #ffffff;
    background-color: #212a37;
    height: 3rem;
    width: 100%;
    margin: 0 auto;
    text-align: center;
  }

  @import url(https://fonts.googleapis.com/css?family=Quicksand);

  .b-a {
    transition: all 0.25s;
    content: '';
    position: absolute;
    left: 0;
    height: 2px;
    width: 30px;
    background-color: rgba(255, 255, 255, 0.95);
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
  .menu-expanded {
    transition: all 0.25s;
    text-align: center;
    line-height: 200px;
    height: 100%;
    width: 100%;
    border-radius: 0px;
    top: 0;
    left: 0;
    background-color: rgba(38, 47, 64, 0.85);
    ul {
      transition: all 0s;
      position: relative;
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
      }
      &:after {
        @extend .b-a-expanded;
        transform: rotate(-45deg);
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
