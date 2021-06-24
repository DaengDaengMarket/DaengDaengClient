<template>
	<div id="nodiceadd">
		<div class="container">
			<h1>댕댕알림 등록</h1>

			<div class="mb-6">
				<label for="exampleFormControlInput1" class="form-label">제목</label>
				<input
					class="form-control"
					id="exampleFormControlInput1"
					placeholder="제목"
					type="text"
					v-model="title"
					ref="title"
				/>
			</div>
			<div class="mb-3">
				<label for="exampleFormControlTextarea1" class="form-label">내용</label>
				<textarea
					class="form-control"
					id="exampleFormControlTextarea1"
					rows="10"
					placeholder="내용"
					v-model="content"
					ref="content"
				></textarea>
			</div>

			<div
				class="d-grid gap-2 d-md-flex justify-content-md-center"
				role="group"
			>
				<button type="button" class="btn btn-success" @click="fnList">
					목록
				</button>
				<button type="button" class="btn btn-primary" @click="fnAddProc">
					등록
				</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		//변수 생성
		return {
			board_code: 'news',
			title: '',
			content: '',
			notice_id: 'admin',
			form: '', //form 전송 데이터
		};
	},
	computed: {
		getBoard() {
			return this.$store.state.test;
		},
	},
	methods: {
		fnList() {
			//댕댕알림 화면으로 이동 함수
			this.$router.push({ path: './adminnotice', query: this.body });
		},
		fnAddProc() {
			//댕댕알림 게시물 등록 프로세스
			if (!this.title) {
				alert('제목을 입력해 주세요'); //제목이 없다면 값을 입력하라고 알려준다.
				this.$refs.title.focus(); //방식으로 선택자를 찾는다.
				return;
			}

			this.form = {
				//backend로 전송될 POST 데이터
				board_code: this.board_code,
				title: this.title,
				content: this.content,
				notice_id: this.notice_id,
			};

			this.$axios
				.post('http://localhost:3000/api/board', this.form)
				.then(res => {
					if (res.data.success) {
						alert('등록되었습니다.');
						this.fnList();
					} else {
						alert('실행중 실패했습니다.\n다시 이용해 주세요');
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
	},
};
</script>

<style scoped>
.offcanvas-wrapper {
	z-index: 1;
}
h1 {
	text-align: center;
}
.tbAdd {
	border-top: 1px solid #888;
}
.tbAdd th,
.tbAdd td {
	border-bottom: 1px solid #eee;
	padding: 5px 0;
}
.tbAdd td {
	padding: 10px 10px;
	box-sizing: border-box;
}
.tbAdd td input {
	width: 100%;
	min-height: 30px;
	box-sizing: border-box;
	padding: 0 10px;
}
.tbAdd td textarea {
	width: 100%;
	min-height: 300px;
	padding: 10px;
	box-sizing: border-box;
}
.btnWrap {
	text-align: center;
	margin: 20px 0 0 0;
}
.btnWrap a {
	margin: 0 10px;
}
.btnAdd {
	background: #43b984;
}
.btnDelete {
	background: #f00;
}
</style>
