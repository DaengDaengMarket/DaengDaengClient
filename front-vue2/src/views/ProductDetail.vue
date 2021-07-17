// 제품 상세 페이지 입니다.

<template>
  <!-- Page Content-->
  <div class="container padding-bottom-3x mb-1">
    <div class="row">
      <!-- 상품 정보 관련 -->
      <div
        class="col-md-6"
        :image1="firstImage"
        :image2="secondImage"
        :image3="thirdImage"
      >
        <div
          id="carouselExampleIndicators"
          class="carousel slide"
          data-bs-ride="carousel"
        >
          <div class="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              class="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
              v-if="secondImage !== '1'"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
              v-if="thirdImage !== '1'"
            ></button>
          </div>

          <div class="carousel-inner">
            <div class="carousel-item active">
              <img :src="firstImage" class="d-block w-100" alt="item" />
            </div>
            <div
              class="carousel-item"
              v-bind:image1="secondImage"
              v-if="secondImage !== '1'"
            >
              <img :src="secondImage" class="d-block w-100" alt="item" />
            </div>
            <div
              class="carousel-item"
              v-bind:image1="thirdImage"
              v-if="thirdImage !== '1'"
            >
              <img :src="thirdImage" class="d-block w-100" alt="item" />
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <!-- Product Info-->
      <div class="col-md-6">
        <div class="padding-top-2x mt-2 hidden-md-up"></div>
        <div class="rating-stars"></div>
        <span class="text-muted align-middle" style="float: right"
          >&nbsp;&nbsp;카테고리 | {{ this.goodsData.bigCategory }} |
          {{ this.goodsData.midCategory }} &nbsp;&nbsp;&nbsp;&nbsp;{{
            this.goodsData.createdAt
          }}
          전<br />
        </span>

        <v-row text-center>
          <v-col cols="6" style="margin-left: 10px">
            <img
              src="/img/account/user-ava-md.jpg"
              style="width: 50px; height: 50px"
              alt="Daniel Adams"
            />
            <span>&nbsp;{{ this.goodsData.seller.nickname }}</span>
            <b-dropdown id="dropdown-1" class="m-md-1">
              <b-dropdown-item @click="goMypage">프로필 보기</b-dropdown-item>
              <b-dropdown-item @click="toggleModal">신고하기</b-dropdown-item>
              <!-- 신고 모달  -->
              <b-modal
                id="modal-1"
                ref="modal"
                title="신고 정보"
                v-model="modalShown"
                @ok="handleOk"
                @show="resetModal"
                @hidden="resetModal"
              >
                <form ref="form" @submit.stop.prevent="handleSubmit">
                  <textarea
                    class="form-control"
                    id="textarea-input"
                    rows="5"
                    v-model="modalText"
                    placeholder="상세 내용을 작성해주세요."
                  ></textarea>
                </form>
              </b-modal>
            </b-dropdown>
          </v-col>
        </v-row>

        <p style="margin-top: 50px">
          <span style="font-size: 30px">{{ this.goodsData.name }}</span
          ><span>
            <img
              src="/img/km/view.png"
              style="width: 20px; height: 20px; margin-left: 100px"
              alt="sellerImage"
          /></span>
          <span>{{ this.goodsData.hit }}</span
          ><span>
            <img
              src="/img/km/heart.png"
              style="width: 20px; height: 20px"
              alt="Daniel Adams"
          /></span>
          <span>{{ this.goodsData.hart }}</span>
        </p>
        <hr style="border: solid 0.5px grey; margin-bottom: 5px" />
        <div class="row">
          <div class="col-12" style="font-size: 15px">
            <ul class="list-group">
              <li class="list-group-item">
                가격: {{ this.goodsData.price }}원
              </li>
              <li class="list-group-item">
                네고여부: {{ this.goodsData.nego }}
              </li>
              <li class="list-group-item">
                거래희망지역:{{
                  this.goodsData.si + '시' + ' ' + this.goodsData.gu + '구'
                }}
              </li>
            </ul>
          </div>
        </div>

        <h4 class="text-muted text-normal">
          <br />
        </h4>
        <h6>
          {{ this.goodsData.description }}
        </h6>
        <br /><br />

        <hr class="mb-3" />
        <div class="d-flex flex-wrap justify-content-between">
          <div class="entry-share mt-2 mb-2">
            <span class="text-muted">Share:</span>
            <div class="share-links">
              <a
                class="social-button shape-circle sb-facebook"
                @click="shareFacebook"
                data-toggle="tooltip"
                data-placement="top"
                title="Facebook"
                ><i class="fab fa-facebook"></i></a
              ><a
                class="social-button shape-circle sb-twitter"
                @click="shareTwitter"
                data-toggle="tooltip"
                data-placement="top"
                title="Twitter"
                ><i class="fab fa-twitter"></i
              ></a>
            </div>
          </div>
          <div class="sp-buttons mt-2 mb-2">
            <button
              type="button"
              class="btn btn-outline-primary btn-sm"
              @click="wishAdd"
            >
              Wishlist
            </button>

            <button class="btn btn-primary" @click="goChat">
              <i class="icon-bag"></i> 댕댕톡
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getGoodsDetail } from '../api/Goods';
import { insertWish } from '../api/Wish';
import { getWish } from '../api/Wish';
import { insertBlame } from '../api/Blame';
export default {
  data: () => ({
    modalShown: false,
    content: '',
    contentState: null,
    goodsData: [],
    firstImage: '1',
    secondImage: '1',
    thirdImage: '1',
    modalText: '',
  }),
  methods: {
    toggleModal() {
      this.modalShown = !this.modalShown;
    },
    resetModal() {
      this.modalText = '';
    },
    async wishAdd() {
      this.wishList = [];
      let id = parseInt(Math.random() * 1000);
      let item_id = this.goodsData.id;
      let user_id = this.goodsData.buyer.id;
      let jsonWish = { id: id, item_id: item_id, user_id: user_id };
      // item_id가 들어가 있는지에 대한 중복 유효성 체크
      const responseWish = await getWish(item_id);
      console.log(responseWish.data);
      if (responseWish.data.length > 0) {
        alert('이미 추가하셨습니다');
      } else {
        console.log(jsonWish);
        try {
          await insertWish(jsonWish);
          alert('wishlist 추가');
        } catch (error) {
          alert(error);
        }
      }
    },
    handleOk() {
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (this.modalText === '') {
        alert('신고 내용이 비었습니다');
        return;
      }
      // Push the rescue to submitted content
      let id = parseInt(Math.random() * 1000);
      let content = this.modalText;
      let today = new Date();
      let jsonBlame = {
        id: id,
        blameStatus: 'no',
        content: content,
        createdAt: today,
      };
      try {
        insertBlame(jsonBlame);
        alert('신고 접수 완료되었습니다');
      } catch (error) {
        alert(error);
      }
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closing');
      });
    },
    goChat() {
      const host = 'http://' + window.location.host + '/chat';
      window.open(host, 'a', 'width=800, height=880, left=100, top=50');
    },
    goMypage() {
      const mypage = '/mypage/' + this.$store.state.auth.id;
      // seller의 mypage에 접근해야 한다
      this.$router.push({ path: mypage });
    },
    shareTwitter() {
      let sendText = this.goodsData.name; // 전달할 텍스트
      let sendUrl = window.location.pathname; // 전달할 URL
      window.open(
        'https://twitter.com/intent/tweet?text=' + sendText + '&url=' + sendUrl,
      );
    },
    shareFacebook() {
      let sendUrl = window.location.href; // 전달할 URL
      window.open(
        'http://www.facebook.com/sharer/sharer.php?u=' + 'www.naver.com',
      );
    },
  },
  async created() {
    // const itemId = this.$route.params.id;
    // 데이터 예시가 몇 개 없으므로 인위적으로 0으로 명시
    const itemId = 0;
    try {
      const response = await getGoodsDetail(itemId);
      console.log(response.data);
      this.goodsData = response.data[0];

      let j = 0;
      console.log(this.goodsData);

      for (j = 0; j < this.goodsData.itemImageList.length; j++) {
        console.log(this.goodsData.itemImageList[j].path);
        if (j == 0) {
          this.firstImage = this.goodsData.itemImageList[j].path;
        } else if (j == 1) {
          this.secondImage = this.goodsData.itemImageList[j].path;
        } else {
          this.thirdImage = this.goodsData.itemImageList[j].path;
        }
      }
      // console.log(this.thirdImage)
    } catch (error) {
      alert(error);
    }
  },
};
</script>

<style scoped>
.offcanvas-wrapper {
  z-index: 1;
}
.col-sm-6 {
  margin-left: 10px;
}
.carousel-indicators button {
  background-color: black;
}
#dropdown-1 {
  border-radius: 20px 20px 20px 20px;
}
.social-button {
  cursor: pointer;
}
</style>
