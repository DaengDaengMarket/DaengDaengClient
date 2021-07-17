<template>
	<div>
		<!-- 네비바 -->
		<!-- Remove "navbar-sticky" class to make navigation bar scrollable with the page.-->
		<header class="navbar navbar-sticky">
			<!-- <Sidemenu></Sidemenu> -->
			<!-- 검색창 -->
			<!-- sidemenu -->
			<form class="site-search" method="get">
				<input
					type="text"
					name="site_search"
					placeholder="찾으시는 물품을 입력해주세요"
				/>
				<div class="search-tools">
					<span class="clear-search">Clear</span
					><span class="close-search"><i class="icon-cross"></i></span>
				</div>
			</form>
			<div class="site-branding">
				<div class="inner">
					<div class="site-logo" @click="goHome" @focus="true">
						<img
							src="@/assets/img/header_logo.png"
							alt="댕댕마켓"
							style="width: 55px"
						/>
						<div class="title">댕댕마켓</div>
					</div>
				</div>
			</div>
			<!-- 메인 네비바 -->
			<nav class="site-menu">
				<ul class="menubar">
					<li>
						<router-link to="/trade">
							<span>댕댕거래</span>
						</router-link>
					</li>
					<li>
						<router-link to="/feed">
							<span>댕댕피드</span>
						</router-link>
					</li>
					<li>
						<router-link to="/notice">
							<span>댕댕알림</span>
						</router-link>
					</li>
					<li class="searchmenu">
						<div class="form-outline">
							<input id="search-input" type="search" class="form-control" />
							<label class="form-label" for="form1">Search</label>
						</div>
					</li>
					<li>
						<button id="search-button" type="button" class="btn btn-primary">
							<i class="fas fa-search"></i>
						</button>
					</li>
				</ul>
			</nav>

			<!-- 비로그인 시, 로그인 버튼  -->
			<template v-if="!isUserLogin">
				<div class="toolbar">
					<div class="inner">
						<div class="tools">
							<div class="account">
								<router-link to="/loginjoin">
									<div class="user__icon">
										<i class="fas fa-unlock-alt"></i>
									</div>
								</router-link>
							</div>
						</div>
					</div>
				</div>
			</template>

			<!-- 로그인 시, 내 정보 -->
			<template v-else>
				<div class="toolbar">
					<div class="inner">
						<div class="tools">
							<div class="account">
								<div class="user__icon">
									<i class="far fa-user"></i>
								</div>

								<ul class="toolbar-dropdown">
									<li class="sub-menu-user">
										<div class="user-ava">
											<img
												src="@/assets/img/header_logo.png"
												alt="Daniel Adams"
											/>
										</div>
										<div class="user-info">
											<router-link to="/adminnotice">
												<p class="user-name">
													{{ $store.state.auth.email }}
												</p>
			
											</router-link>
											<span class="text-xs text-muted">환영합니다!</span>
										</div>
									</li>
									<li>
										<a href="#" @click="goMypage"
											><i class="fas fa-bone"></i> 마이댕댕</a
										>
									</li>
									<li>
										<a href="#" @click="goChat"				
											><i class="far fa-comment-dots"></i> 댕댕톡</a
										>
									</li>
									<li>
										<router-link to="/mypage">
											<i class="fas fa-shopping-basket"></i>
											wishlist
										</router-link>
									</li>
									<li class="sub-menu-separator"></li>
									<li>
										<a href="javascript:;" @click="logoutUser">
											<i class="fas fa-sign-out-alt"></i>로그아웃</a
										>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</template>
			<!-- <p>{{ $store.state.auth.email }}</p> -->
		</header>
		<SideMenu></SideMenu>
	</div>
</template>

<script>
import SideMenu from './sidemenu.vue';
import { mapState } from 'vuex';
import {} from 'lodash';
export default {
// import Menus from './menus.vue';
	computed: {
		...mapState(['auth']),

		// 로그인 체크
		isUserLogin() {
			return this.$store.getters.isLogin;
		},
		logoLink(){
			return this.$store.getters.isLogin ? '/main': '/login';
		}
	},

	data: () => ({
		drawer: null,
		color: 'success',
		responsive: false,
		showSidebar: false,
	}),
	mounted() {
		this.onResponsiveInverted();
		window.addEventListener('resize', this.onResponsiveInverted);

		document.addEventListener(
			'click',
			function(event) {
				// If the click inside the element, do nothing
				if (event.target.closest('.nav-container')) return;
				// If the clicks outside the element, hide it!
				this.showSidebar = false;
			}.bind(this),
		);
	},
	methods: {
		goChat() {
			const host = 'http://' + window.location.host + '/chat';
			window.open(host, 'a', 'width=800, height=880, left=100, top=50');
		},
		goHome(){
			console.log(this.$route.path)
			if(this.$route.path=='/'){
				this.$router.go();
			}
			else{
				this.$router.push('/');
			}
		},
		goMypage(){
			const mypage='/mypage/'+this.$store.state.auth.id
			this.$router.push({ path:mypage})
		},
		// 로그아웃 메소드
		logoutUser() {
			this.$store.commit('clearUsername');
			this.$router.push('loginjoin');
		},
	},
	components: {
		SideMenu,
	},
};
</script>
<style scoped>
.mr-2 {
	padding-right: 10px;
}

.sidemenu-slide {
	/* padding: 20px 20px 20px 20px; */
	padding-left: 20px;
	padding-right: 20px;
	/* padding-top: 100px; */
}
header {
	z-index: 2;
}
.v-list-group {
	z-index: 1;
}
.menubar {
	padding-left: 300px;
	padding-right:100px;
}
.searchmenu {
	padding-left: 200px;


	
	width: 400px;
}
.title {
	font-size: 18px;
}
.toolbar {
	z-index: 7;
	position: absolute;
}

.user__icon {
	font-size: 30px;
}
</style>

