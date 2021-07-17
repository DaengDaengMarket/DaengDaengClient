<template>
	<div class="col-md-6">
		<form class="login-box" @submit.prevent="submitForm">
			<div class="row margin-bottom-1x">
				<div class="col-xl-4 col-md-6 col-sm-4">
					<a class="btn btn-sm btn-block twitter-btn" href="#"
						><i class="socicon-twitter"></i>&nbsp;카카오로 로그인</a
					>
				</div>
				<div class="col-xl-4 col-md-6 col-sm-4">
					<a class="btn btn-sm btn-block google-btn" href="#"
						><i class="socicon-googleplus"></i>&nbsp;Google로 로그인</a
					>
				</div>
			</div>
			<h4 class="margin-bottom-1x">
				혹은 댕댕마켓 계정으로 로그인
			</h4>
			<div class="form-wrapper form-wrapper-sm">
				<div class="form-group input-group">
					<div>
						<label for="username"></label>
						<input
							id="username"
							class="form-control"
							type="email"
							placeholder="Email"
							required
							v-model="email"
						/>
					</div>
					<!-- <span class="input-group-addon"><i class="icon-mail"></i></span> -->
				</div>
				<div class="form-group input-group">
					<div>
						<label for="password"></label>
						<input
							id="password"
							class="form-control"
							type="password"
							placeholder="Password"
							required
							v-model="password"
						/>
					</div>
					<!-- <span class="input-group-addon"><i class="icon-lock"></i></span> -->
				</div>
			</div>
			<div class="d-flex flex-wrap justify-content-between padding-bottom-1x">
				<div class="custom-control custom-checkbox">
					<input
						class="custom-control-input"
						type="checkbox"
						id="remember_me"
						checked
					/>
					<label class="custom-control-label" for="remember_me"
						>Remember me</label
					>
				</div>
				<a class="navi-link" href="account-password-recovery.html"
					>비밀번호 찾기</a
				>
			</div>
			<div class="text-center text-sm-right">
				<button
					class="btn btn-primary margin-bottom-none"
					type="submit"
					:disabled="!isEmailValid || !password"
				>
					로그인
				</button>
			</div>
		</form>
	</div>
</template>

<script>
import { validateEmail } from '../utils/validation';
import { loginUser } from '../api/index';
import { saveAuthToCookie, saveUserToCookie } from '../utils/cookies';
export default {
	data() {
		return {
			// form values
			email: '',
			password: '',
			// log
			logMessage: '',
		};
	},
	computed: {
		isEmailValid() {
			return validateEmail(this.email);
		},
	},
	methods: {
		async submitForm() {
			try {
				const userData = {
					email: this.email,
					password: this.password,
				};
				/**
				 *  쿠키로 값을 받아 스토어에 전달하는 방식
				 */
				await this.$store.dispatch('LOGIN', userData);
				this.$router.push('/');

				/**
				 * regacy
				 */
				// const { data } = await loginUser(userData);
				// console.log(data);
				// this.$store.commit('setToken', data.token);
				// this.$store.commit('setEmail', this.email);
				// this.$router.push('/');
				// 쿠키에 저장
				// saveAuthToCookie(data.token);
				// saveUserToCookie(this.email);
			} catch (error) {
				console.log(error.response.data);
				this.logMessage = error.response.data;
			} finally {
				//
			}
		},
	},
};
</script>

<style></style>
