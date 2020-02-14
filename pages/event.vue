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

    <section>have fun</section>

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
            <h2>飯島 純</h2>
            <h3>夜間救急のスペシャリスト</h3>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  layout: 'top',
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  text-align: center;
}

.brancket {
	position: relative;
	padding: .3em;
	text-align: center;
}
.brancket:before { 
	position: absolute;
	top: 0;
	content:'';
	width: 4rem;
	height: 4rem;
	display: inline-block;
	border-top: solid 2px #61b5a7;
	border-left: solid 2px #61b5a7;
}

.brancket:after { 
	position: absolute;
	bottom: 0;
	content:'';
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
}

@media only screen and (max-device-width: 768px) {
}
</style>
