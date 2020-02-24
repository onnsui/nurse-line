<template>
  <div id="top" class="container">
    <section class="section1">
      <div class="section1-wrapper">
        <nuxt-link to="/" class="logo">
          <img src="/event-logo.svg" alt="logo" loading="lazy" />
        </nuxt-link>

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
              <img src="/line.svg" class="social-icon" loading="lazy" />
            </a>
            <a href="#">
              <img src="/twitter.svg" class="social-icon" loading="lazy" />
            </a>
            <a href="#">
              <img src="/instagram.svg" class="social-icon" loading="lazy" />
            </a>
          </div>
        </div>

        <div class="apply-buttons-wrapper">
          <div>
            <a href="#">
              <img src="/detail-button.svg" loading="lazy" />
            </a>
          </div>
          <div class="join-button">
            <a href="https://nurseline.studio.design/tokyo">
              <span>or <span class="underline">飲み会へ参加する</span></span>
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
              <img src="/havefun-slide.png" loading="lazy" />
            </div>
            <div class="swiper-slide">
              <img src="/havefun-slide.png" loading="lazy" />
            </div>
            <div class="swiper-slide">
              <img src="/havefun-slide.png" loading="lazy" />
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
        <img src="/havefun.svg" alt="have fun" loading="lazy" />
      </div>
    </section>

    <section class="section4">
      <div class="section4-container">
        <h2>STAFF</h2>
        <h1>運営スタッフ</h1>

        <div class="staff-wrapper">
          <div class="staff-item brancket">
            <img src="/staff1.png" alt="飯島 純のプロフィール写真" loading="lazy" />
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
            <img src="/staff2.png" alt="小林 央幸のプロフィール写真" loading="lazy" />
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
      <div class="section5-wrapper">
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
              <h2>看護師のサードプレイスに</h2>
              <span class="carousel-text">
              看護師は精神的に大変な仕事。心休まる時間が必要。
              <br />家でも職場でもない、心休められる第三の場所を提供したい。趣味を共有したり、悩みを共有したり、友達を作ったり。
              <br />看護師の居場所になるような場を。
              </span>
            </div>
          </div>

          <div class="swiper-slide">
            <div class="carousel-centered brancket">
              <div class="catchphrase-en">Values</div>
              <h2>看護師に多様な価値観を</h2>
              <span class="carousel-text">
              世の中には色んな看護師がいることを伝えたい。
              <br />自分は看護師に向いていない。
              <br />そう悩む人達に、同じように苦しんでいる人がいることを、看護師として色んな考え方で乗り越えた人たちがいることを伝えたい。
              </span>
            </div>
          </div>

          <div class="swiper-slide">
            <div class="carousel-centered brancket">
              <div class="catchphrase-en">Place</div>
              <h2>看護師という人生に誇りを持てるように</h2>
              <span class="carousel-text">
              看護師人生に誇りを持てるようになって欲しい。
              <br/>辛いこともたくさんある。
              <br/>ただ、ここで出会えた仲間を一緒に充実した看護師人生を歩んで欲しい。そのきっかけを提供したい。
              <br/>看護師は尊く、素敵な仕事だ。
                </span>
            </div>
          </div>
        </div>

        <div slot="button-prev" class="swiper-button-prev"></div>
        <div slot="button-next" class="swiper-button-next"></div>
        <div slot="pagination" class="swiper-pagination"></div>
      </div>

      <div class="apply-buttons-wrapper">
        <a href="#">
          <img src="/detail-button.svg" alt="話を聞いてみる" loading="lazy" />
        </a>
        <div class="join-button">
          <a href="https://nurseline.studio.design/tokyo">
            <span>or <span class="underline">飲み会へ参加する</span></span>
          </a>
        </div>
      </div>

      <div class="social-icons-wrapper">
        <div class="social-icons">
          <div class="sns-line">
            <a href="#">
              <img src="/line.png" alt="SNS1" loading="lazy" />
            </a>
          </div>
          <div class="sns-twitter">
            <a href="#">
              <img src="/twitter.png" alt="SNS1" loading="lazy" />
            </a>
          </div>
          <div class="sns-instagram">
            <a href="#">
              <img src="/instagram.png" alt="SNS1" loading="lazy" />
            </a>
          </div>
        </div>
      </div>
    </section>

    <p class="check-info">最新情報をチェック</p>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'

export default {
  layout: 'event',
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
  a {
    text-decoration: none;
  }
  .detail-button {
    width: 21.8rem;
    font-weight: bold;
    font-size: 1.5rem;
    background: rgb(97,181,167);
    background: linear-gradient(149deg, rgba(97,181,167,1) 0%, rgba(228,226,239,1) 100%);
    span {
      color: white;
    }
  }
/*---------------------------------

  PC対応のスタイル

---------------------------------*/
@media only screen and (min-device-width: 769px) {
  .container {
    margin: 0 auto;
    text-align: center;

    .section1 {
      background: url('/event-hero.png');
      background-size: cover;
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
          .join-button {
            padding: 1.2rem 4rem;
            color: white;
            font-size: 1.5rem;
            font-weight: bold;
            a:visited {
              color: white;
            }
            .underline {
              padding-bottom: 2px;
              border-bottom: 2px solid white;
            }
          }
          img {
            margin: 0 0.5rem;
          }
        }
      }
    }

    .section2 {
      background-color: #fafafa;
      padding: 4rem 0;

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
      background-color: #fafafa;
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
          right: 0;
        }
      }
    }

    .section4 {
      & .section4-container {
        margin-top: 6rem;

        h1 {
          font-size: 2.2rem;
        }
        h2 {
          font-weight: normal;
        }
        .staff-wrapper {
          display: flex;
          margin: 2rem auto;
          width: 80%;
        }

        .staff-item {
          width: 45%;
          margin: 0 1rem;
          padding: 2rem 3rem;
          h2 {
            font-weight: bold;
            font-size: 1.25rem;
          }
          h3 {
            margin-bottom: 1rem;
            font-size: 0.875rem;
          }
          p {
            text-align: left;
            line-height: 2rem;
          }
        }
      }
    }

    .section5 {
      display: flex;
      height: 600px;
      background: url('/throughts.png');
      background-size: cover;
      justify-content: center;
      align-items: center;
      background-color: #F5F5F5;

      .section5-wrapper {
        color: white;
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
          margin-bottom: 2rem;
        }

        .section5-h1-2 {
          text-align: right;
          width: 100%;
        }
      }
    }

    .section6 {
      background-color: #F5F5F5;
      margin-bottom: 2rem;
      padding-top: 4rem;

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
        .carousel-text {
          line-height: 2rem;
        }
      }

      .apply-buttons-wrapper {
        background-color: #f3f3f3;
        display: flex;
        justify-content: center;
        margin: 0 auto;
        padding: 2rem 0 4rem 0;
        width: 100%;

        .join-button {
          padding: 1.2rem 4rem;
          color: #AAAAAA;
          font-size: 1.5rem;
          font-weight: bold;
          a:visited {
            color: #AAAAAA;
          }
          .underline {
            padding-bottom: 2px;
            border-bottom: 2px solid #AAAAAA;
          }
        }

        img {
          display: flex;
          margin: 0 0.5rem 0 auto;
        }
      }

      .social-icons-wrapper {
        width: 100%;
        position: relative;

        .social-icons {
          position: absolute;
          top: -1.5rem;
          left: calc(50% - (10.5rem / 2));
          width: 10.5rem;
          display: flex;
          margin: 0 auto;
          padding: 0;
          justify-content: space-between;
          .sns-line {
            background-color: #262F40;
            border-radius: 50%;
            width: 46px;
            height: 46px;
            img {
              width: 100%;
              padding: 1.1rem 0.7rem 1rem 0.7rem;
            }
          }
          .sns-twitter {
            background-color: #262F40;
            border-radius: 50%;
            width: 46px;
            height: 46px;
            img {
              width: 100%;
              padding: 0.8rem 0.7rem 1rem 0.7rem;
            }
          }
          .sns-instagram {
            background-color: #262F40;
            border-radius: 50%;
            width: 46px;
            height: 46px;
            img {
              width: 100%;
              padding: 0.7rem 0.7rem 1rem 0.7rem;
            }
          }
        }
      }

      .swiper-button-prev {
        background-image: url('/carousel-arrow-left.svg');
        background-size: 60px 60px;
        height: 60px;
        width: 60px;
        left: 16%;
      }

      .swiper-button-next {
        background-image: url('/carousel-arrow-right.svg');
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

    .check-info {
      color: #212a37;
      font-size: 0.9rem;
      letter-spacing: 0.1rem;
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
    img {
      width: 100%;
    }
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
      background: url('/event-hero-sp.png');
      background-position: center;
      background-size: cover;
      color: #fff;
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
          line-height: 1.5rem;
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
          .join-button {
            margin-top: 2rem;
            text-align: center;
            color: white;
            font-size: 1rem;
            font-weight: bold;
            a:visited {
              color: white;
            }
            .underline {
              padding-bottom: 2px;
              border-bottom: 2px solid white;
            }
          }

          div {
            margin: 0 auto;
          }

          img {
            width: 100%;
            max-width: 15rem;
            margin: 0 0.5rem;
            text-align: center;
          }
        }
      }
    }

    .section2 {
      background-color: #fafafa;
      padding: 2rem 1rem;

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
        background-color: #f5f5f5;
        display: flex;
        flex-direction: column;
        width: 100%;
        text-align: left;

        img {
          width: 100%;
          object-fit: cover;
        }

        .swiper-container {
          width: 100vw;

          .swiper-slide {
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
        bottom: 0;
        img {
          position: absolute;
          bottom: 0;
          right: 10%;
          height: auto;
          width: 13.25rem;
        }
      }
    }

    .section4 {
      & .section4-container {
        margin-top: 2rem;

        h2 {
          font-size: 1rem;
          font-weight: normal;
        }
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
              line-height: 2rem;
              font-size: 0.9rem;
              text-align: left;
              margin-top: 1rem;
            }
          }
        }
      }
    }

    .section5 {
      display: flex;
      background: url('/throughts-sp.png');
      justify-content: center;
      align-items: center;
      background-size: cover;

      .section5-wrapper {
        color: #fff;
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin: 0 2rem;
        padding: 3rem 0;

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
          line-height: 2rem;
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
      margin-bottom: 2rem;

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
        width: 100%;

        .join-button {
          color: #AAAAAA;
          font-size: 1rem;
          font-weight: bold;
          padding-bottom: 4rem;
          a:visited {
            color: #AAAAAA;
          }
          .underline {
            padding-bottom: 2px;
            border-bottom: 1px solid #AAAAAA;
          }
        }

        img {
          display: flex;
          margin: 1rem auto 2rem auto;
          max-width: 15rem;
          width: 60%;
        }
      }

      .social-icons-wrapper {
        width: 100%;
        position: relative;

        .social-icons {
          display: flex;
          margin: 0 auto;
          padding: 0;
          width: 100%;
          justify-content: center;
          position: absolute;
          top: -1.5rem;
          .sns-line {
            background-color: #262F40;
            border-radius: 50%;
            width: 46px;
            height: 46px;
            margin-right: 1rem;
            img {
              width: 100%;
              padding: 1.1rem 0.7rem 1rem 0.7rem;
            }
          }
          .sns-twitter {
            background-color: #262F40;
            border-radius: 50%;
            width: 46px;
            height: 46px;
            margin-right: 1rem;
            img {
              width: 100%;
              padding: 0.8rem 0.7rem 1rem 0.7rem;
            }
          }
          .sns-instagram {
            background-color: #262F40;
            border-radius: 50%;
            width: 46px;
            height: 46px;
            img {
              width: 100%;
              padding: 0.7rem 0.7rem 1rem 0.7rem;
            }
          }

          .social-icon {
            position: relative;
            top: 25px;
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
    /*height: 400px;*/
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
    background-color: #cccccc;
    height: 10px !important;
    width: 10px !important;
  }

  /deep/ .swiper-pagination-bullet-active {
    background-color: #262F40;
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

  .check-info {
    color: #212a37;
    font-size: 0.9rem;
    letter-spacing: 0.1rem;
  }
}
</style>
