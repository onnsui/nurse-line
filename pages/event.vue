<template>
  <div id="top" class="container">
    <section class="section1">
      <div class="section1-wrapper">
        <a href="#" class="logo">
          <img src="http://placehold.jp/90x40.png" alt="noizeロゴ" />
        </a>

        <h1 class="section1-h1-1">
          NURSE LINE
          <br class="mobile-style" />ゆる飲み
        </h1>
        <h2 class="section1-h2-1">運営スタッフ募集</h2>

        <p>
          私達のイベントに参加していただくだけでなく、看護師の将来のために、
          <br />考え行動していく仲間を募集しています。
        </p>
        <hr />
        <div class="social-icons-wrapper">
          <div class="social-icons">
            <a href="#">
              <img src="http://placehold.jp/50x50.png" class="social-icon" />
            </a>
            <a href="#">
              <img src="http://placehold.jp/50x50.png" class="social-icon" />
            </a>
            <a href="#">
              <img src="http://placehold.jp/50x50.png" class="social-icon" />
            </a>
          </div>
        </div>

        <div class="apply-buttons-wrapper">
          <div>
            <a href="#">
              <img src="http://placehold.jp/350x70.png" alt="話を聞いてみる" />
            </a>
          </div>
          <div>
            <a href="#">
              <img src="http://placehold.jp/350x70.png" />
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="section2">
      <h1 class="section2-h1-1">横の繋がりを広げることで</h1>
      <h1 class="section2-h1-2">もっと看護を好きになる</h1>
      <div>
        看護師にとっての
        <strong>職場と自宅以外の第三の場所=サードプレイス</strong>として
        <br />毎月オフラインイベントを開催しています。
      </div>
    </section>

    <section class="section3 have-fun">
      <div class="section3-container">
        <div v-swiper:section3_Swiper="swiperHaveFunOption">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <img src="http://placehold.jp/630x400.png" />
            </div>
            <div class="swiper-slide">
              <img src="http://placehold.jp/630x400.png" />
            </div>
            <div class="swiper-slide">
              <img src="http://placehold.jp/630x400.png" />
            </div>
          </div>

          <div slot="pagination" class="swiper-pagination"></div>
        </div>

        <div class="slide-caption">
          <p>
            看護師同士、横のつながりをつくるも良し、いろんな働き方を知るのも良し、看護師のための看護師によるイベントです
            <br />主な参加者の年齢層は20代から40代まで。男性看護師も看護学生も多数参加しています。
          </p>
        </div>
      </div>
      <div class="have-fun-wrapper">
        <img src="http://placehold.jp/250x130.png" alt="have fun" />
      </div>
    </section>

    <section class="section4">
      <div>
        STAFF
        <h1>運営スタッフ</h1>

        <div class="staff-wrapper">
          <div class="staff-item brancket">
            <img src="http://placehold.jp/200x200.png" />
            <h2>飯島 純</h2>
            <h3>夜間救急のスペシャリスト</h3>
            <p>
              全ての人に笑いを届けるスーパースター,無限の体力を持つ男
              <br />夜勤専従歴11年,夜間救急のスペシャリスト。
              <br />患者らしさと自分らしさを追求した看護を提供する。
              <br />＼3度の飯より猫が好き／
            </p>
          </div>

          <div class="staff-item brancket">
            <img src="http://placehold.jp/200x200.png" />
            <h2>小林 央幸</h2>
            <h3>3児のパパナース</h3>
            <p>
              患者の笑顔と仲間の存在がエネルギー源
              <br />看護をみんなで語ることが大好き
              <br />臨床経験は11年(病棟3年
              OPE室8年)現在は訪問看護師&企業で看護師の転職相談に乗る
              <br />＼3度の飯より家族が好き／
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="section5">
      <div>
        <h2>Our throughts</h2>
        <h1 class="section5-h1-1">想い</h1>
        <p style>
          病院や同級生以外のつながりを創るサポートを通じて、
          <br />リアルな場でも看護師さんのプライベートが輝くように応援しています。
          <br />「看護師になったことは間違いではなかった」
          <br />そう想える人を増やしたい。看護師の作る、看護師が主役のサービスを。
        </p>
        <h1 style class="section5-h1-2">看護師の日常に彩りを</h1>
      </div>
    </section>

    <section class="section6">
      <div v-swiper:section6_Swiper="swiperOption">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="carousel-centered brancket">
              <div class="catchphrase-en">Place</div>
              <h2>看護師のサードプレイスに</h2>看護師は精神的に大変な仕事。心休まる時間が必要。
              <br />家でも職場でもない、心休められる第三の場所を提供したい。趣味を共有したり、悩みを共有したり、友達を作ったり。
              <br />看護師の居場所になるような場を。
            </div>
          </div>

          <div class="swiper-slide">
            <div class="carousel-centered brancket">
              <div class="catchphrase-en">Values</div>
              <h2>看護師に多様な価値観を</h2>世の中には色んな看護師がいることを伝えたい。
              <br />自分は看護師に向いていない。
              <br />そう悩む人達に、同じように苦しんでいる人がいることを、看護師として色んな考え方で乗り越えた人たちがいることを伝えたい。
            </div>
          </div>

          <div class="swiper-slide">
            <div class="carousel-centered brancket">
              <div class="catchphrase-en">Place</div>
              <h2>看護師という人生に誇りを持てるように</h2>看護師人生に誇りを持てるようになって欲しい。
              <br />辛いこともたくさんある。
              <br />ただ、ここで出会えた仲間を一緒に充実した看護師人生を歩んで欲しい。そのきっかけを提供したい。
              <br />看護師は尊く、素敵な仕事だ。
            </div>
          </div>
        </div>

        <div slot="button-prev" class="swiper-button-prev"></div>
        <div slot="button-next" class="swiper-button-next"></div>
        <div slot="pagination" class="swiper-pagination"></div>
      </div>

      <div class="apply-buttons-wrapper">
        <a href="#">
          <img src="http://placehold.jp/350x70.png" alt="話を聞いてみる" />
        </a>
        <a href="#">
          <img src="http://placehold.jp/350x70.png" alt="OR 飲み会へ参加する" />
        </a>
      </div>

      <div class="social-icons-wrapper">
        <div class="social-icons">
          <img src="http://placehold.jp/50x50.png" class="social-icon" />
          <img src="http://placehold.jp/50x50.png" class="social-icon" />
          <img src="http://placehold.jp/50x50.png" class="social-icon" />
        </div>
      </div>
    </section>
    <p style="color:#212a37;font-size: 0.9rem;letter-spacing:0.1rem;">最新情報をチェック</p>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'

export default {
  layout: 'top',
  data() {
    return {
      swiperHaveFunOption: {
        slidesPerView: 1,
        loop: true,
        loopFillGroupWithBlank: true,
        // autoplay: {
        //   delay: 5000,
        // },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
      swiperOption: {
        slidesPerView: 1.6,
        centeredSlides: true,
        loop: true,
        // autoplay: {
        //   delay: 5000,
        // },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        // レスポンシブ対応
        breakpoints: {
          768: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
        },
      },
    }
  },
}
</script>

<style lang="scss" scoped>
/*---------------------------------

  PC対応のスタイル

---------------------------------*/
@media only screen and (min-device-width: 769px) {
  .container {
    margin: 0 auto;
    text-align: center;

    .section1 {
      background: url('http://placehold.jp/1200x600.png');
      color: #fff;
      height: 600px;
      text-align: left;

      &-wrapper {
        padding: 4rem 10rem;

        .logo {
          position: relative;
          top: -2rem;
        }

        h1,
        h2 {
          font-size: 3rem;
        }
        p {
          font-size: 1rem;
          margin: 2rem 0;
        }
        hr {
          height: 1px;
          border: none;
          border-top: 1px #fff solid;
          margin: 0 0 2rem 0;
          width: 4rem;
        }

        .social-icons-wrapper {
          width: 100%;

          .social-icons {
            display: flex;
            margin: 0 auto;
            padding: 0;
            width: 100%;
            justify-content: left;

            .social-icon {
              position: relative;
              top: 25px;
            }

            :first-child {
              margin-right: 10px;
            }
            :last-child {
              margin-left: 10px;
            }
          }
        }

        // 「話を聞いてみる」 「OR 飲み会へ参加する」ボタン
        .apply-buttons-wrapper {
          display: flex;
          justify-content: flex-end;

          padding: 2rem 0;
          width: 100%;

          img {
            margin: 0 0.5rem;
          }
        }
      }
    }

    .section2 {
      background-color: #fafafa;
      padding: 2rem 0;

      &-h1-1 {
        font-size: 1.7rem;
      }

      &-h1-2 {
        font-size: 3rem;
      }

      div {
        font-size: 1.1rem;
        line-height: 2rem;
        margin: 1.8rem 0 1rem 0;
      }
    }

    .section3 {
      .section3-container {
        display: flex;
        width: 100%;
        text-align: left;

        .swiper-container {
          width: 50%;
          .swiper-pagination {
            left: 40%;
            text-align: left !important;
          }
        }
        .slide-caption {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #fff;
          width: 50%;
          font-size: 1.1rem;
          line-height: 2.5rem;
          padding: 0 4rem;
          margin: 0 auto;
        }
      }
      .have-fun-wrapper {
        background-color: #d8d8d8;
        width: 100%;

        display: flex;
        align-items: right;
        justify-content: right;
        position: relative;
        bottom: 0rem;
        right: 0;
        img {
          position: absolute;
          bottom: -65px;
          right: 10%;
        }
      }
    }

    .section4 {
      .staff-wrapper {
        display: flex;
        margin: 2rem auto;
        width: 80%;
      }

      .staff-item {
        width: 45%;
        margin: 0 1rem;
        padding: 2rem 3rem;
      }
    }

    .section5 {
      display: flex;
      height: 600px;
      background: url('http://placehold.jp/1200x600.png');
      justify-content: center;
      align-items: center;

      div {
        display: flex;
        flex-direction: column;
        height: 600px;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin: 0 9rem;

        h1 {
          font-size: 2rem;
        }
        h2 {
          font-size: 1.3rem;
          font-weight: normal;
          letter-spacing: 0.2rem;
        }
        p {
          font-size: 1.3rem;
          line-height: 3rem;
          text-align: left;
        }

        .section5-h1-2 {
          text-align: right;
          width: 100%;
        }
      }
    }

    .section6 {
      background-color: #d8d8d8;
      margin-bottom: 50px;

      h2 {
        font-size: 1.6rem;
        text-align: center;
        margin: 1rem 0;
      }

      .carousel-centered {
        height: 85%;
        text-align: left;
        margin: 2rem 4rem;
        padding: 0 10%;

        .catchphrase-en {
          color: #d8d8d8;
          font-size: 1.4rem;
          font-weight: bold;
          text-align: right;
          width: 100%;
          position: relative;
          left: 4rem;
        }
      }

      .apply-buttons-wrapper {
        background-color: #f3f3f3;
        display: flex;
        justify-content: center;
        margin: 0 auto;
        padding: 2rem 0;
        width: 100%;

        img {
          display: flex;
          margin: 0 0.5rem 0 auto;
        }
      }

      .social-icons-wrapper {
        width: 100%;

        .social-icons {
          background-color: #f3f3f3;
          display: flex;
          margin: 0 auto;
          padding: 0;
          width: 100%;
          justify-content: center;

          .social-icon {
            position: relative;
            top: 25px;
          }

          :first-child {
            margin-right: 25px;
          }
          :last-child {
            margin-left: 25px;
          }
        }
      }

      .swiper-button-prev {
        background-image: url('http://placehold.jp/60x60.png');
        background-size: 60px 60px;
        height: 60px;
        width: 60px;
        left: 16%;
      }

      .swiper-button-next {
        background-image: url('http://placehold.jp/60x60.png');
        background-size: 60px 60px;
        height: 60px;
        width: 60px;
        right: 16%;
      }
    }

    // モバイル端末以外では非表示
    .mobile-style {
      display: none;
    }
  }

  .swiper-container {
    width: 100%;
    height: 400px;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background-color: #f3f3f3;

    // アクティブなスライドの背景色を白にする
    &.swiper-slide-active {
      background-color: #fff;
    }
  }

  // ディープセレクターを用いてページネーション部分のスタイルを変更できるようにする
  /deep/ .swiper-pagination-bullet {
    height: 13px !important;
    width: 13px !important;
  }

  // ページネーションの色を変更
  /deep/ .swiper-pagination-bullet-active {
    background-color: gray;
  }

  // 要素を「」の記号で囲むプロパティ
  .brancket {
    position: relative;
    padding: 0.3em;
    text-align: center;

    &:before {
      position: absolute;
      top: 0;
      left: 0;
      content: '';
      width: 4rem;
      height: 4rem;
      display: inline-block;
      border-top: solid 2px #61b5a7;
      border-left: solid 2px #61b5a7;
    }

    &:after {
      position: absolute;
      right: 0;

      bottom: 0;
      content: '';
      width: 4rem;
      height: 4rem;
      display: inline-block;
      border-right: solid 2px #61b5a7;
      border-bottom: solid 2px #61b5a7;
    }
  }
}

@media only screen and (max-device-width: 768px) {
  /*---------------------------------

  スマホ・タブレット対応のスタイル

---------------------------------*/
  .container {
    margin: 0 auto;
    text-align: center;
    width: 100%;

    .section1 {
      background: url('http://placehold.jp/1200x600.png');
      color: #fff;
      height: 100vh;
      text-align: left;

      .section1-wrapper {
        height: 100%;
        padding: 3rem 4rem;

        .logo {
          position: relative;
          top: -2rem;
        }

        h1,
        h2 {
          font-size: 1.8rem;
          text-align: center;
        }
        p {
          font-size: 1rem;
          margin: 2rem 0;
        }
        hr {
          height: 1px;
          border: none;
          border-top: 1px #fff solid;
          margin: 0 0 2rem 0;
          width: 4rem;
        }

        .social-icons-wrapper {
          display: none;
        }

        // 「話を聞いてみる」 「OR 飲み会へ参加する」ボタン
        .apply-buttons-wrapper {
          display: flex;
          flex-direction: column;
          justify-content: center;

          padding: 2rem 0;
          width: 100%;

          div {
            margin: 0 auto;
            width: 100%;
          }

          img {
            width: 100%;
            margin: 0 0.5rem;
          }
        }
      }
    }

    .section2 {
      background-color: #fafafa;
      padding: 2rem 0;

      .section2-h1-1 {
        font-size: 1.1rem;
      }

      .section2-h1-2 {
        font-size: 1.6rem;
      }

      div {
        font-size: 1.1rem;
        line-height: 2rem;
        margin: 1.8rem 0 1rem 0;
      }
    }

    .section3 {
      .section3-container {
        background-color: #d8d8d8;
        display: flex;
        flex-direction: column;
        width: 100%;
        text-align: left;

        img {
          height: 100%;
          width: 100%;
          object-fit: cover;
        }

        .swiper-container {
          height: 100vh;
          width: 100vw;

          .swiper-slide {
            height: 100vh;
            width: 100vw;
          }

          .swiper-pagination {
            left: 40%;
            text-align: left !important;
          }
        }

        .slide-caption {
          background-color: #fff;
          width: 90%;
          font-size: 1.1rem;
          line-height: 2.3rem;
          margin: 1rem auto 2rem auto;
          padding: 1rem 1rem;
        }
      }
      .have-fun-wrapper {
        background-color: #d8d8d8;
        width: 100%;

        display: flex;
        align-items: right;
        justify-content: right;
        position: relative;
        bottom: 0rem;
        right: 0;
        img {
          position: absolute;
          bottom: 0;
          right: 10%;
          height: auto;
          width: 30%;
        }
      }
    }

    .section4 {
      .staff-wrapper {
        display: flex;
        flex-direction: column;
        margin: 2rem auto;
        width: 80%;

        .staff-item {
          width: 100%;
          margin: 1rem 1rem;
          padding: 2rem 1rem;

          h3 {
            font-size: 0.9rem;
          }

          p {
            font-size: 0.9rem;
            text-align: left;
            margin-top: 1rem;
          }
        }
      }
    }

    .section5 {
      display: flex;
      height: 400px;
      background: url('http://placehold.jp/1200x600.png');
      justify-content: center;
      align-items: center;

      div {
        color: #fff;
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin: 0 2rem;

        .section5-h1-1 {
          font-size: 1.4rem;
        }

        .section5-h1-2 {
          font-size: 1.6rem;
        }

        h2 {
          font-size: 0.9rem;
          font-weight: normal;
          letter-spacing: 0.2rem;
        }
        p {
          font-size: 1rem;
          text-align: left;
          margin: 2rem 0;
        }
        h1 {
          font-size: 2rem;
        }
      }
    }

    .section6 {
      background-color: #f3f3f3;
      margin-bottom: 50px;

      .swiper-container {
        background-color: #f3f3f3;
      }

      .carousel-centered {
        font-size: 1rem;
        text-align: left;
        margin: 1rem 0.8rem;
        padding: 5% 5%;
        height: 85%;

        .catchphrase-en {
          color: #d8d8d8;
          font-size: 1rem;
          font-weight: bold;
          text-align: right;
          width: 100%;
        }

        h2 {
          font-size: 1.2rem;
          text-align: center;
          margin: 0;
        }
      }

      .apply-buttons-wrapper {
        background-color: #f3f3f3;
        // display: flex;
        // justify-content: center;
        // margin: 0 auto;
        // padding: 2rem 0;
        width: 100%;

        img {
          display: flex;
          margin: 1rem auto 1rem auto;
          width: 60%;
        }
      }

      .social-icons-wrapper {
        width: 100%;

        .social-icons {
          background-color: #f3f3f3;
          display: flex;
          margin: 0 auto;
          padding: 0;
          width: 100%;
          justify-content: center;

          .social-icon {
            position: relative;
            top: 25px;
          }

          :first-child {
            margin-right: 25px;
          }
          :last-child {
            margin-left: 25px;
          }
        }
      }

      .swiper-button-prev {
        display: none;
      }

      .swiper-button-next {
        display: none;
      }
    }
  }

  .swiper-container {
    width: 100%;
    height: 400px;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background-color: #f3f3f3;

    // アクティブなスライドの背景色を白にする
    &.swiper-slide-active {
      background-color: #fff;
    }
  }

  // ディープセレクターを用いてページネーション部分のスタイルを変更できるようにする
  /deep/ .swiper-pagination-bullet {
    height: 10px !important;
    width: 10px !important;
  }

  /deep/ .swiper-pagination-bullet-active {
    background-color: gray;
  }

  // 要素を「」の記号で囲むプロパティ
  .brancket {
    position: relative;
    padding: 0.3em;
    text-align: center;

    &:before {
      position: absolute;
      top: 0;
      left: 0;
      content: '';
      width: 4rem;
      height: 4rem;
      display: inline-block;
      border-top: solid 2px #61b5a7;
      border-left: solid 2px #61b5a7;
    }

    &:after {
      position: absolute;
      right: 0;

      bottom: 0;
      content: '';
      width: 4rem;
      height: 4rem;
      display: inline-block;
      border-right: solid 2px #61b5a7;
      border-bottom: solid 2px #61b5a7;
    }
  }
}
</style>
