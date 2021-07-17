<template>
	<div>
		<span class="sidemenu-slide">
			<div class="nav-container" tabindex="0" @click="checkSidebarVisibility">
				<div class="nav-toggle"></div>
				<v-navigation-drawer
					v-if="showSidebar"
					id="app-drawer"
					v-model="drawer"
					app
					dark
					:color="getColors.menu_background_color"
					floating
					persistent
					mobile-break-point="960"
					width="280"
					sm="3"
					xl="3"
					lg="3"
					xs="3"
					md="3"
					cols="12"
				>
					<div>
						<v-layout class="fill-height" tag="v-list" column>
							<v-list>
								<v-list-item v-on:click="showSidebar = false">
									<v-toolbar-title
										><v-icon class="mr-2">fas fa-bars</v-icon
										>댕댕마켓</v-toolbar-title
									>
								</v-list-item>
								<hr class="mt-2 mb-2" />
								<v-list-item-group active-class="white--text">
									<template v-for="menu in getMenus">
										<template v-if="menu.childrens">
											<v-list-group :prepend-icon="menu.icon" :key="menu.id">
												<template v-slot:activator>
													<v-list-item-title>{{ menu.name }}</v-list-item-title>
												</template>
												<template v-for="children in menu.childrens">
													<v-list-item
														@click="movePage(menu.url,children.url)"
														:key="children.id"
														class="ml-2"
														:active-class="
															`${getColors.menu_selected_color} accent-4 white--text`
														"
													>
														<v-list-item-icon
															:active-class="
																`${getColors.menu_selected_color} accent-4`
															"
														>
															<v-icon>{{ children.icon }}</v-icon>
														</v-list-item-icon>
														<v-list-item-title>
															{{ children.name }}
														</v-list-item-title>
													</v-list-item>
												</template>
											</v-list-group>
										</template>
										<template v-else>
											<v-list-item
												:key="menu.id"
											>
												<v-list-item-title>{{ menu.name }}</v-list-item-title>
											</v-list-item>
										</template>
									</template>
								</v-list-item-group>
							</v-list>
						</v-layout>
					</div>
				</v-navigation-drawer>
			</div>
		</span>
	</div>
</template>

<script>
export default {
	computed: {
		getMenus() {
			return this.$store.state.menus;
		},
		getColors() {
			return this.$store.state.colors;
		},
	},
	data: () => ({
		drawer: null,
		color: 'success',
		responsive: false,
		showSidebar: false,
	}),
	methods: {
		movePage(cate1,cate2) {
            let target=cate1+cate2;
			this.$router.push({ path:target});
			this.showSidebar=false;
		},
		onResponsiveInverted() {
			if (window.innerWidth < 1000) {
				this.responsive = true;
			} else {
				this.responsive = false;
			}
		},
		checkSidebarVisibility() {
			this.showSidebar = true;
		},
	},
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
};
</script>
