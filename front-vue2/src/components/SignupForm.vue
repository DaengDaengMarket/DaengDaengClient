<template>
   <!-- 회원가입 폼-->
   <div class="col-md-6">
      <div class="padding-top-3x hidden-md-up"></div>
      <h3 class="margin-bottom-1x">
         계정이 없나요?
      </h3>
      <p>1분이면 가입하고 댕댕마켓을 즐길 수 있어요!</p>
      <form class="row" @submit.prevent="submitForm">
         <div class="col-sm-6">
            <div class="form-group">
               <label for="reg-email">이메일</label>
               <input
                  class="form-control"
                  type="email"
                  id="reg-email"
                  required
                  v-model="email"
               />
            </div>
         </div>
         <div class="col-sm-6">
            <div class="form-group">
               <label for="reg-phone">휴대폰 번호</label>
               <input
                  class="form-control"
                  type="text"
                  id="reg-phone"
                  required
                  v-model="phone"
               />
            </div>
         </div>
         <div class="col-sm-6">
            <div class="form-group">
               <label for="reg-pass">비밀번호</label>
               <input
                  class="form-control"
                  type="password"
                  id="reg-pass"
                  required
                  v-model="password"
               />
            </div>
         </div>
         <div class="col-sm-6">
            <div class="form-group">
               <label for="reg-pass-confirm">비밀번호 확인</label>
               <input
                  class="form-control"
                  type="password"
                  id="reg-pass-confirm"
                  required
                  v-model="passwordConfirm"
               />
            </div>
         </div>
         <div class="col-sm-6">
            <div class="form-group">
               <label for="reg-fn">닉네임</label>
               <input
                  class="form-control"
                  type="text"
                  id="reg-fn"
                  required
                  v-model="nickname"
               />
            </div>
         </div>
         <div class="col-sm-6">
            <div class="form-group">
               <label for="select-input">관심사</label>
               <!-- <select class="form-control select-interest" id="select-input">
                  <option>관심사를 골라주세요</option>
                  <option>대형견</option>
                  <option>중형견</option>
                  <option>소형견</option>
               </select> -->

               <!-- <div>
               <input type="checkbox" id="coding" name="interest" value="coding">
               <label for="coding">Coding</label>
            </div>
            <div>
               <input type="checkbox" id="music" name="interest" value="music">
               <label for="music">Music</label>
  </div> -->
               <form class="form-control">
                  <div class="interestbox">
                     <label>
                        <input
                           type="checkbox"
                           name="big_category"
                           value="대형견"
                           v-model="big_category"
                        />대형견</label
                     >

                     <label>
                        <input
                           type="checkbox"
                           name="big_category"
                           value="중형견"
                           v-model="big_category"
                        />중형견</label
                     >

                     <label>
                        <input
                           type="checkbox"
                           name="big_category"
                           value="소형견"
                           v-model="big_category"
                        />소형견</label
                     >
                  </div>
               </form>
            </div>
         </div>
         <div class="col-12 text-center text-sm-right">
            <button class="btn btn-primary margin-bottom-none" type="submit">
               가입하기
            </button>
         </div>
      </form>
      <p class="log">{{ logMessage }}</p>
   </div>
</template>

<script>
import { registerUser } from '../api/index';

export default {
   data() {
      return {
         email: '',
         password: '',
         big_category: [],
         nickname: '',
         phone: '',

         // log message
         logMessage: '',
      };
   },
   methods: {
      async submitForm() {
         console.log('submitform!');
         const userData = {
            email: this.email,
            password: this.password,
            nickname: this.nickname,
            phone: this.phone,
            big_category: this.big_category,
         };
         const { data } = await registerUser(userData);
         console.log(data);
         this.logMessage = `${this.nickname}님이 가입되었습니다`;
         this.initForm();
      },
      initForm() {
         this.email = '';
         this.password = '';
         this.nickname = '';
         this.phone = ' ';
         this.big_category = '';
         this.passwordConfirm = '';
      },
   },
};
</script>

<style scoped>
.interestbox {
   display: flex;
   align-items: center;
   margin-top: 5%;
}
</style>