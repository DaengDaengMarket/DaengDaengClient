<template>
	<div id="adnotice">
		<!-- Off-Canvas Wrapper-->
		<div class="offcanvas-wrapper">
			<!-- main Content-->
			<div class="card text-center">
				<div class="card-header">
					<ul class="nav nav-tabs nav-justified">
						<li class="nav-item">
							<div class="nav-link active">
								<router-link to="/adminnotice">
									공지사항
								</router-link>
							</div>
						</li>
						<li class="nav-item">
							<div class="nav-link active">
								<router-link to="/adminreport">
									신고글처리
								</router-link>
							</div>
						</li>
						<li class="nav-item">
							<div class="nav-link active">
								<router-link to="/adlist">
									광고관리
								</router-link>
							</div>
						</li>
					</ul>
				</div>

				<div class="card-body">
					<div class="accordion" id="accordionPanelsStayOpenExample">
						<!-- 버튼 -->
						<!-- 버튼 -->
						<div
							class="d-grid gap-2 d-md-flex justify-content-md-end"
							role="group"
						>
							<router-link to="/noticeadd">
								<button type="button" class="btn btn-outline-primary">
									공지 등록
								</button>
							</router-link>
							<button type="button" class="btn btn-outline-primary">
								공지 수정
							</button>
							<button type="button" class="btn btn-outline-primary">
								공지 삭제
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	computed: {
		getBoard() {
			return this.$store.state.test;
		},
	},
};
</script>

<style>
.offcanvas-wrapper {
	z-index: 1;
}
.addBtn {
	position: fixed;
	bottom: 0;
	right: 0;
	font-size: 30px;
	padding: 10px;
	color: #f5b914;
}

i {
	cursor: pointer;
}

.listTitle {
	margin-bottom: 10px;
	background-color: #f5b914;
	font-weight: bold;
	padding: 5px 0;
}

.listInner {
	margin-bottom: 10px;
	background-color: #dedede;
	padding: 5px 0;
}
</style>
