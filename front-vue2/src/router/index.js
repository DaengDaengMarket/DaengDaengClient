import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    // redirect: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/trade',
    name: 'Trade',
    component: () => import('@/views/Trade.vue'),
    meta: { auth: true },
  },
  {
    path: '/feed',
    name: 'Feed',
    component: () => import('@/views/Feed.vue'),

    meta: { auth: true },
  },
  {
    path: '/notice',
    name: 'Notice',
    component: () => import('@/views/Notice.vue'),
  },
  {
    path: '/chat',
    name: 'Chat',
    component: () => import('@/views/Chat.vue'),
    meta: { auth: true },
  },
  {
    path: '/loginjoin',
    name: 'LoginJoin',
    component: () => import('@/views/LoginJoin.vue'),
  },
  {
    path: '/mypage/:id',
    name: 'MyPage',
    component: () => import('@/views/MyPage.vue'),
    meta: { auth: true },
  },
  {
    path: '/noticeadd',
    name: 'NoticeAdd',
    component: () => import('@/views/NoticeAdd.vue'),
    meta: { auth: true },
  },
  {
    path: '/goods/:id',
    name: 'ProductDetail',
    component: () => import('@/views/ProductDetail.vue'),
    meta: { auth: true },
  },
  {
    path: '/report',
    name: 'Report',
    component: () => import('@/views/Report.vue'),
  },
  {
    path: '/adminnotice',
    name: 'AdminNotice',
    component: () => import('@/views/AdminNotice.vue'),
    meta: { admin: true, auth: true },
  },

  {
    path: '/adminreport',
    name: 'AdminReport',
    component: () => import('@/views/AdminReport.vue'),
    meta: { auth: true, admin: true },
  },
  {
    path: '/adlist',
    name: 'AdList',
    component: () => import('@/views/AdList.vue'),
  },
  {
    path: '/category/:big?/:mid?',
    name: 'Category',
    component: () => import('@/components/FeaturedItem.vue'),
  },
  {
    path: '*',
    component: () => import('@/views/NotFoundPage.vue'),
  },
];

export const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// ????????? ????????? , ?????? ?????????, ?????? ???????????? ??????????????? ??????
// router.beforeEach((to, from, next) => {
//   if (to.meta.auth && !store.getters.isLogin) {
//     console.log('????????? ???????????????.');
//     next('/loginjoin');
//     return; // ?????? next ????????? ????????????
//   }

// ????????? ????????? ??????
//   if (to.meta.admin && !store.getters.isAdmin) {
//     console.log('???????????? ????????? ???????????????.!');
//     alert('???????????? ????????? ???????????????.!');
//     next('/');
//     return;
//   }

//   next();
// });

export default router;
