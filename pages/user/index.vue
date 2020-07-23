<template>
<div id=body>
    <AppLeft/>
	<div id="right-content">
		<!-- this is list -->
		<div class="List">
			<div class="container list-projects">
				<div class="row">
					<div class="col-12 col-lg-4 col-md-6 col-projects d-flex">
						<div class="add-project">
							<button class="plus" @click="goAdd">
								<i class="fas fa-plus" style="font-size: 40px;"></i>
							</button>
						</div>
					</div>
					<div class="col-12 col-lg-4 col-md-6 col-projects d-flex"
						data-aos="zoom-in-up"
						v-for="project in projects" :key="project.id">
						<nuxt-link class="block-project" :to="localePath({name: 'slug', params: {slug: project.id}})">
							<div class="thumbnail" :style="{backgroundImage: `url('${project.avatar}')`}">
								<!-- <b-button class="btn-close" @click="checkDeleteProject(project, $event)"><i class="far fa-times-circle"></i></b-button>				
								<b-modal v-if="checkId == project.id" size="sm" v-model="modalShow" title="Delete the project" @ok="deleteProject(project, $event)">Are you sure you want to delete the project ?</b-modal> -->
							</div>
							<div class="info">
								<div class="d-flex justify-content-between align-items-center">
									<div class="name">
										<div class="project text-overflow">{{project.name}}</div>
										<div class="client text-overflow">{{project.role}}</div>
									</div>
									<div class="showUp">
										<button v-if="project.pages_count" class="btn-demo btn-primary" @click="goToDemo(project.id, $event)">Demo</button>
									</div>
								</div>
								<div class="description">
									<div class="shortDes">{{project.info}}</div>
									<div class="showUp">
										<button class="btn-demo btn-primary" @click="goToUpdate(project.id, $event)">Update</button>
									</div>
								</div>
							</div>
						</nuxt-link>
					</div>
					<div v-if="!isLoading && projects && !projects.length" class="col-12">
						<div class="text-center">No result</div>
					</div>
					<div class="col-12">
						<div class="text-center" v-if="isLoading">
							<i class="fas fa-spinner loading-spin"></i>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import axios from 'axios'
import AppLeft from '~/components/AppLeft.vue'

export default {
	middleware: 'authenticated',
	components: {
		AppLeft,
	},
    data() {
      return {
		pending: false,
		currentTab: '',
        keyword: '',
        searchTimeOut: null,
		projects: [],
		isShowLogo: true,
		modalShow: false,
		window: {
          width: 0,
          height: 0,
		},
		checkId: Number,
		currentIndex: 1,
        pageSize: 10,
        isLoading: false,
      };
	},

	watch: {
      '$route'(to, from) {
        // react to route changes...
		this.reset();
      }
    },
	   
    created() {
      //listener window resize
      if (this.$route && this.$route.query) {
        if (this.$route.query['type']) {
          this.currentTab = this.$route.query['type'];
        }

        if (this.$route.query['keyword']) {
          this.keyword = this.$route.query['keyword'];
        }
      }
      this.findData();
      if (process.client) {
        window.addEventListener('resize', this.handleResize);
        window.addEventListener('scroll', this.handleScroll);
        this.handleResize();
      }
    },

	destroyed() {
      window.removeEventListener('resize', this.handleResize);
      window.removeEventListener('scroll', this.handleScroll);
    },
	
    methods: {
		goAdd() {
			this.$router.push('./user/add');
		},

		changeTab(tab) {
			this.currentTab = tab;
		},

		findData() {
			if (this.currentIndex < 0 || this.isLoading) {
				return;
			}
			this.isLoading = true;
			this.$store.dispatch('user/fetch').then(paging => {
					paging.data.data.map((project) => {
						this.projects.push(project);
						// console.log(project);
					})
			});
		},
		async checkDeleteProject(project, event){
			event.preventDefault();
			this.modalShow = true,
			this.checkId = project.id
		},

		async deleteProject(project){
			return await this.$axios.get('/api/admin/deleteproject/'+ project.id ).then(response => {
				this.$bvToast.toast(`Success `, {
                    title: 'Delete project success',
                    autoHideDelay: 5000,
                })
				location.reload();
			})
			.catch((response) => {
                this.$bvToast.toast(`${response}`, {
                    title: 'Delete project error',
                    autoHideDelay: 5000,
                })
            });
		},

		goToDemo(slug, event) {
			event.preventDefault();

			let type = 'w';
			if (this.window.width <= 768 && this.window.width > 576) {
				type = 't';
			} else if (this.window.width <= 576) {
				type = 'm'
			}

			this.$router.push(this.localePath({
				name: 'slug-demo',
				params: {slug},
				query: {type: type}
			}));
		},

		goToUpdate(slug, event) {
			event.preventDefault();
			this.$router.push('/edit/'+ slug);
		},

		init() {
			this.projects = [];
			this.currentIndex = 1;
			this.isLoading = false;
			this.currentTab = '';
			this.keyword = '';
			if (this.$route && this.$route.query) {
				if (this.$route.query['type']) {
					this.currentTab = this.$route.query['type'];
				}

				if (this.$route.query['keyword']) {
					this.keyword = this.$route.query['keyword'];
				}
			}
		},

		reset() {
			this.init();
			this.findData();
		},

		search(keyword = '') {
			if (keyword) {
				this.keyword = keyword;
			} else {
				this.keyword = '';
			}

			this.findData();
		},

		handleResize() {
			this.window.width = window.innerWidth;
			this.window.height = window.innerHeight;
		},

		handleScroll() {
			const scrollTop = window.scrollY || window.pageYOffset;

			if ((window.innerHeight + scrollTop) >= document.body.offsetHeight) {
				this.findData();
			}
		},
	}
}
</script>

<style scoped lang="scss">
	@import "~assets/styles/mixins";
	@import "~assets/styles/variables";

	#right-content {
		height: auto;
		background: $main-background-color;
		margin-bottom: 20px;
		float: left;
		width: 87.5%;
		.List{
			width: 100%;
			height: 100%;
			float: left;
	
			.list-projects {
			padding-top: 25px;
			padding-bottom: 25px;
			height: 50%;

			.col-projects {
				min-height: 300px;
				margin-bottom: 30px;

				.add-project {
					opacity: 0.7;
					overflow: hidden;
					margin: auto;
					width: 100%;
					color: $main-text-color;
					background-color: white;
					position: relative;
					padding-bottom: 100%;
					@include border-radius(8px);
					@include box-shadow(2px 3px 5px 0px rgba(7, 7, 7, 0.11));
					.plus {
						position: absolute;
						width: 100%;
						height: 100%;
						opacity: 0.7;
						background-color: #fff;
						@include border-radius(8px);
						@include box-shadow(2px 3px 5px 0px rgba(7, 7, 7, 0.11));
					}
				}

				.block-project {
				overflow: hidden;
				width: 100%;
				color: $main-text-color;
				background-color: white;
				position: relative;
				padding-bottom: 100%;
				@include border-radius(8px);
				@include box-shadow(2px 3px 5px 0px rgba(7, 7, 7, 0.11));

				.thumbnail {
					padding-bottom: 61.58%;
					background: transparent no-repeat center center;
					background-size: cover;
					position: absolute;
					width: 100%;
					top:0;
					left: 0;
					.btn-close {
							position: absolute;
							top: 10px;
							right: 10px;
							background: transparent;
							border: none;
							outline: none !important;
							color:#2e6da4;
							font-size: 25px;
							margin: 0;
							padding: 0;
							line-height: 40px;
							width: 40px;
							z-index: 2;
					}
				}

				.info {
						padding: 20px;
						line-height: 1.2;
						background: white;
						overflow: hidden;
						position: absolute;
						top: 61.58%;
						height: 38.42%;
						left: 0;
						width: 100%;

					.author {
						font-style: italic;
					}

					.col-left {
						padding-right: 0;
						max-width: calc(100% - 85px);
						color: #B8860B;
					}

					.name {
						max-width: 65%;
						line-height: 1;
						white-space: nowrap;
						overflow: hidden;
					
						.project {
							text-transform: uppercase;
							margin-top: 2%;
							font-size: 18px;
							font-weight: bold;
						}
						
						.client {
							text-overflow: ellipsis;
							margin-top: 2%;
							font-size: 10px;
						}
					}
					.btn-demo {
						width: 90px;
						display: inline-block;
						outline: none !important;
						@include transition(all .5s);
						text-transform: uppercase;
						font-weight: bold;
						font-size: 16px;
						padding: 6px 12px;
						margin-bottom: 0;
						line-height: 1.42857143;
						text-align: center;
						white-space: nowrap;
						vertical-align: middle;
						-ms-touch-action: manipulation;
						touch-action: manipulation;
						cursor: pointer;
						-webkit-user-select: none;
						-moz-user-select: none;
						-ms-user-select: none;
						user-select: none;
						background-image: none;
						border: 1px solid;
						border-radius: 4px;
					}

					.btn-primary {
						color: 	#B8860B;
						background-color: #fff;
						font-weight: bold;
					}

					.btn-primary:hover{
						border-color: #2e6da4;
						color: #000000;
						background: none;
					}

					.description {
						overflow: hidden;
						margin-top: 15px;
						width: 100%;
						.shortDes {
							text-overflow: ellipsis;
							height: 38px;
							overflow: hidden;
							width: 65.5%;
							float: left;
							margin-right: 5%;
						}
						.showUp {
							width: 29.5%;
							float: left;
							.btn-demo {
								display: inline-block;
								outline: none !important;
								@include transition(all .5s);
								text-transform: uppercase;
								font-weight: bold;
								font-size: 16px;
								padding: 6px 12px;
								margin-bottom: 0;
								line-height: 1.42857143;
								text-align: center;
								white-space: nowrap;
								vertical-align: middle;
								-ms-touch-action: manipulation;
								touch-action: manipulation;
								cursor: pointer;
								-webkit-user-select: none;
								-moz-user-select: none;
								-ms-user-select: none;
								user-select: none;
								background-image: none;
								border: 1px solid;
								border-radius: 4px;
							}

							.btn-primary {
								color: 	#B8860B;
								background-color: #fff;
								font-weight: bold;
							}

							.btn-primary:hover{
								border-color: #2e6da4;
								color: #000000;
								background: none;
							}
						}
					}
				}
				}
			}
			}
	}
}

</style>
