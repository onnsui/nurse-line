<template>
  <div id="top" class="container">
    <img src="http://placehold.jp/1200x450.png" class="top-image" />

    <section style="background-color: #fafafa; padding:5rem 0;">
      <h1 style="font-size: 2rem; ">横のつながりを広がることで</h1>
      <h1 style="font-size: 3rem;">もっと看護を好きになる</h1>
      <div style="font-size: 1.rem;">
        看護師にとっての
        <strong>職場と自宅以外の第三の場所=サードプレイス</strong>として
        <br />毎月オフラインイベントを開催しています。
      </div>
    </section>

    <section class="have-fun">
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
        <swiper-slide></swiper-slide>
        <swiper-slide></swiper-slide>

        <div slot="pagination" class="swiper-pagination"></div>
      </swiper>
    </section>

    <section>
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

    <section style="background-color: #ccc;">
      <swiper :options="swiperOption">
        <swiper-slide>
          <h2>看護師のサードプレイスに</h2>
          <br />看護師は精神的に大変な仕事。心休まる時間が必要。
          <br />家でも職場でもない、心休められる第三の場所を提供したい。趣味を共有したり、悩みを共有したり、友達を作ったり。
          <br />看護師の居場所になるような場を。
        </swiper-slide>
        <swiper-slide>
          <h2>看護師に多様な価値観を</h2>
          <br />世の中には色んな看護師がいることを伝えたい。
          <br />自分は看護師に向いていない。
          <br />そう悩む人達に、同じように苦しんでいる人がいることを、看護師として色んな考え方で乗り越えた人たちがいることを伝えたい。
        </swiper-slide>
        <swiper-slide>
          <h2>看護師という人生に誇りを持てるように</h2>
          <br />看護師人生に誇りを持てるようになって欲しい。
          <br />辛いこともたくさんある。
          <br />ただ、ここで出会えた仲間を一緒に充実した看護師人生を歩んで欲しい。そのきっかけを提供したい。
          <br />看護師は尊く、素敵な仕事だ。
        </swiper-slide>

        <div slot="button-prev" class="swiper-button-prev"></div>
        <div slot="button-next" class="swiper-button-next"></div>
        <div slot="pagination" class="swiper-pagination"></div>
      </swiper>
    </section>
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
        slidesPerView: 3,
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
    }
  },
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  text-align: center;
}

.brancket {
  position: relative;
  padding: 0.3em;
  text-align: center;
}
.brancket:before {
  position: absolute;
  top: 0;
  content: '';
  width: 4rem;
  height: 4rem;
  display: inline-block;
  border-top: solid 2px #61b5a7;
  border-left: solid 2px #61b5a7;
}

.brancket:after {
  position: absolute;
  bottom: 0;
  content: '';
  width: 4rem;
  height: 4rem;
  display: inline-block;
  border-right: solid 2px #61b5a7;
  border-bottom: solid 2px #61b5a7;
}

.brancket:before {
  border-left: solid 2px #61b5a7;
  left: 0;
}
.brancket:after {
  border-right: solid 2px #61b5a7;
  right: 0;
}

@media only screen and (min-device-width: 769px) {
  .top-image {
    height: auto;
    width: 100%;
    margin: 0 auto;
    object-fit: cover;
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
  }

  .swiper-container {
    width: 100%;
    height: 400px;
  }

  .have-fun {
    .swiper-pagination {
      left: 25%;
      text-align: left !important;
    }
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background-color: #f3f3f3;

    // /* Center slide text vertically */
    // margin: 0 50px;
    // padding: 0 30px;
    // width: 30% !important;
  }

  .swiper-slide-next {
    background-color: #fff;
  }

  .swiper-button-prev {
    background-image: url('http://placehold.jp/60x60.png');
    background-size: 60px 60px;
    height: 60px;
    width: 60px;
    left: 25%;
  }

  .swiper-button-next {
    background-image: url('http://placehold.jp/60x60.png');
    background-size: 60px 60px;
    height: 60px;
    width: 60px;
    right: 25%;
  }

  // ディープセレクターを用いてページネーション部分のスタイルを変更できるようにする
  /deep/ .swiper-pagination-bullet {
    height: 13px !important;
    width: 13px !important;
  }

  /deep/ .swiper-pagination-bullet-active {
    background-color: gray;
  }
}

@media only screen and (max-device-width: 768px) {
}
</style>
