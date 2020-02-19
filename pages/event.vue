<template>
  <div id="top" class="container">
    <section class="section-1">
      <img src="http://placehold.jp/1200x450.png" class="top-image" />
    </section>

    <section class="section-2">
      <h1 class="section2-h1-1">横の繋がりを広げることで</h1>
      <h1 class="section2-h1-2">もっと看護を好きになる</h1>
      <div>
        看護師にとっての
        <strong>職場と自宅以外の第三の場所=サードプレイス</strong>として
        <br />毎月オフラインイベントを開催しています。
      </div>
    </section>

    <section class="section-3 have-fun">
      <swiper :options="swiperHaveFunOption">
        <swiper-slide>
          <div style="display:flex;margin:0;">
            <div style="height:100%; width: 50%;">
              <img
                src="http://placehold.jp/630x400.png"
                style="height:auto; width:100%;object-fit:cover;"
              />
            </div>
            <div
              style="display:flex; align-items:center;width: 50%;text-align: left;padding: 0 5rem;margin: 0 auto;line-height: 2.3rem;"
            >
              看護師同士、横のつながりをつくるも良し、いろんな働き方を知るのも良し、看護師のための看護師によるイベントです
              <br />主な参加者の年齢層は20代から40代まで。男性看護師も看護学生も多数参加しています。
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div style="display:flex;margin:0;">
            <div style="height:100%; width: 50%;">
              <img
                src="http://placehold.jp/630x400.png"
                style="height:auto; width:100%;object-fit:cover;"
              />
            </div>
            <div
              style="display:flex; align-items:center;width: 50%;text-align: left;padding: 0 5rem;margin: 0 auto;line-height: 2.3rem;"
            >
              看護師同士、横のつながりをつくるも良し、いろんな働き方を知るのも良し、看護師のための看護師によるイベントです
              <br />主な参加者の年齢層は20代から40代まで。男性看護師も看護学生も多数参加しています。
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div style="display:flex;margin:0;">
            <div style="height:100%; width: 50%;">
              <img
                src="http://placehold.jp/630x400.png"
                style="height:auto; width:100%;object-fit:cover;"
              />
            </div>
            <div
              style="display:flex; align-items:center;width: 50%;text-align: left;padding: 0 5rem;margin: 0 auto;line-height: 2.3rem;"
            >
              看護師同士、横のつながりをつくるも良し、いろんな働き方を知るのも良し、看護師のための看護師によるイベントです
              <br />主な参加者の年齢層は20代から40代まで。男性看護師も看護学生も多数参加しています。
            </div>
          </div>
        </swiper-slide>

        <div slot="pagination" class="swiper-pagination"></div>
      </swiper>
    </section>

    <section class="section-4">
      <div>
        STAFF
        <h1>運営スタッフ</h1>

        <div class="staff-wrapper">
          <div class="staff-item brancket">
            <img src="http://placehold.jp/200x200.png" />
            <h2>飯島 純</h2>
            <h3>夜間救急のスペシャリスト</h3>
            <p>
              すべての人に笑いを届けるスーパースター,無限の体力を持つ男
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

    <section class="section-5">
      <div
        style="display:flex;flex-direction: column;height:600px; justify-content: center;align-items: center;width:100%;margin: 0 9rem;"
      >
        <h2 style="font-size:1.3rem;font-weight:normal;letter-spacing: 0.2rem;">Our throughts</h2>
        <h1 style="font-size:2rem;">想い</h1>
        <p style="font-size: 1.3rem;line-height:3rem;text-align:left;">
          病院や同級生以外のつながりを創るサポートを通じて、
          <br />リアルな場でも看護師さんのプライベートが輝くように応援しています。
          <br />「看護師になったことは間違いではなかった」
          <br />そう想える人を増やしたい。看護師の作る、看護師が主役のサービスを。
        </p>
        <h1 style="font-size:2rem;text-align:right;width:100%;">看護師の日常に彩りを</h1>
      </div>
    </section>

    <section class="section-6">
      <swiper :options="swiperOption">
        <swiper-slide>
          <div class="carousel-centered brancket">
            <div class="catchphrase-en">Palace</div>
            <h2>看護師のサードプレイスに</h2>
            <br />看護師は精神的に大変な仕事。心休まる時間が必要。
            <br />家でも職場でもない、心休められる第三の場所を提供したい。趣味を共有したり、悩みを共有したり、友達を作ったり。
            <br />看護師の居場所になるような場を。
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="carousel-centered brancket">
            <div class="catchphrase-en">Values</div>
            <h2>看護師に多様な価値観を</h2>
            <br />世の中には色んな看護師がいることを伝えたい。
            <br />自分は看護師に向いていない。
            <br />そう悩む人達に、同じように苦しんでいる人がいることを、看護師として色んな考え方で乗り越えた人たちがいることを伝えたい。
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="carousel-centered brancket">
            <div class="catchphrase-en">Palace</div>
            <h2>看護師という人生に誇りを持てるように</h2>
            <br />看護師人生に誇りを持てるようになって欲しい。
            <br />辛いこともたくさんある。
            <br />ただ、ここで出会えた仲間を一緒に充実した看護師人生を歩んで欲しい。そのきっかけを提供したい。
            <br />看護師は尊く、素敵な仕事だ。
          </div>
        </swiper-slide>

        <div slot="button-prev" class="swiper-button-prev"></div>
        <div slot="button-next" class="swiper-button-next"></div>
        <div slot="pagination" class="swiper-pagination"></div>
      </swiper>
      <div
        style="background-color: #f3f3f3;display: flex;margin: 0 auto; padding: 2rem 0;width:100%;"
      >
        <img src="http://placehold.jp/350x70.png" style="display: flex;margin: 0 0.5rem 0 auto;" />
        <img src="http://placehold.jp/350x70.png" style="display: flex;margin: 0 auto 0 0.5rem;" />
      </div>
      <div style="width:100%;">
        <div
          style="background-color: #f3f3f3;display: flex;margin: 0 auto; padding:0;width:100%;justify-content:center;"
        >
          <img
            src="http://placehold.jp/50x50.png"
            style="position:relative; top:25px;margin-right:25px;"
          />
          <img src="http://placehold.jp/50x50.png" style="position:relative; top:25px;" />
          <img
            src="http://placehold.jp/50x50.png"
            style="position:relative; top:25px;margin-left:25px;"
          />
        </div>
      </div>
    </section>
    <p style="color:#212a37;font-size: 0.9rem;letter-spacing:0.1rem;">最新情報をチェック</p>
  </div>
</template>

<script>
export default {
  layout: 'top',
  data() {
    return {
      swiperHaveFunOption: {
        slidesPerView: 1,
        // spaceBetween: 30,
        // slidesPerGroup: 3,
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
        // spaceBetween: 30,
        // slidesPerGroup: 3,
        loop: true,
        // loopFillGroupWithBlank: true,
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
    }
  },
}
</script>

<style lang="scss" scoped>
@media only screen and (min-device-width: 769px) {
  .container {
    margin: 0 auto;
    text-align: center;

    .section-1 {
      .top-image {
        height: auto;
        width: 100%;
        margin: 0 auto;
        object-fit: cover;
      }
    }

    .section-2 {
      background-color: #fafafa;
      padding: 2rem 0;

      .section2-h1-1 {
        font-size: 1.7rem;
      }

      .section-h1-2 {
        font-size: 3rem;
      }

      div {
        font-size: 1.1rem;
        line-height: 2rem;
        margin: 1.8rem 0 1rem 0;
      }
    }

    .section-3 {
      .have-fun {
        .swiper-pagination {
          left: 25%;
          text-align: left !important;
        }
      }
    }

    .section-4 {
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

    .section-5 {
      display: flex;
      height: 600px;
      background: url('http://placehold.jp/1200x600.png');
      justify-content: center;
      align-items: center;
    }

    .section-6 {
      background-color: #d8d8d8;
      margin-bottom: 50px;

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

        h2 {
          font-size: 1.6rem;
          text-align: center;
          margin: 1rem 0;
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

  /deep/ .swiper-pagination-bullet-active {
    background-color: gray;
  }

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
  .container {
    margin: 0 auto;
    text-align: center;
    width: 100%;

    .section-1 {
      .top-image {
        height: auto;
        width: 100%;
        margin: 0 auto;
        object-fit: cover;
      }
    }

    .section-2 {
      background-color: #fafafa;
      padding: 2rem 0;

      .section2-h1-1 {
        font-size: 1.1rem;
      }

      .section2-h1-2 {
        font-size: 1.3rem;
      }

      div {
        font-size: 1.1rem;
        line-height: 2rem;
        margin: 1.8rem 0 1rem 0;
      }
    }

    .section-3 {
      .have-fun {
        .swiper-pagination {
          left: 25%;
          text-align: left !important;
        }
      }
    }

    .section-4 {
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

    .section-5 {
      display: flex;
      height: 600px;
      background: url('http://placehold.jp/1200x600.png');
      justify-content: center;
      align-items: center;
    }

    .section-6 {
      background-color: #d8d8d8;
      margin-bottom: 50px;

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

        h2 {
          font-size: 1.6rem;
          text-align: center;
          margin: 1rem 0;
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

  /deep/ .swiper-pagination-bullet-active {
    background-color: gray;
  }

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
