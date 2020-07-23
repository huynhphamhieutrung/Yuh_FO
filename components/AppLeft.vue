<template>
    <div>
        <div id="left-content">
            <div class="sideProfile">
                <div class="logo" @click="goUser( $event)">
                </div>
            </div>
    
            <ul class="sideMenu">
                <button class="item" @click="goUser($event)">
                    <a>
                        <i class="fas fa-igloo"></i>
                        <span v-if="this.open">User</span>
                    </a>
                </button>
    
                <button class="item" @click="goProject($event)">
                    <a>
                        <i class="fas fa-chart-bar"></i>
                        <span v-if="this.open">Project</span>
                    </a>
                </button>

                <button class="item" @click="goMission($event)">
                    <a>
                        <i class="fas fa-chart-bar"></i>
                        <span v-if="this.open">Mission</span>
                    </a>
                </button>

                <button class="item" @click="goShop($event)">
                    <a>
                        <i class="fas fa-chart-bar"></i>
                        <span v-if="this.open">Shop</span>
                    </a>
                </button>
                
                <button class="item" @click="goBooks($event)">
                    <a>
                        <i class="fas fa-chart-bar"></i>
                        <span v-if="this.open">Books</span>
                    </a>
                </button>
    
            </ul>
        </div>
    
        <div id="nav">
                <div>
                    <b-navbar toggleable="lg" variant="success" style="back">
                        <b-navbar-toggle target="nav-collapse" @click="openNav()"></b-navbar-toggle>
                        <b-collapse id="nav-collapse" is-nav>
                        <span style="font-size:30px;cursor:pointer; margin-right:10px;" @click="openNav()">&#9776;</span>       
                        <!-- <b-navbar-nav class="ml-left">
                            <b-nav-item 
                                :class="{active: 'w' !== currentTab && 'm' !== currentTab}"
                                @click="changeTab('')">All</b-nav-item>
                            <b-nav-item 
                                :class="{active: 'w' === currentTab}"
                                @click="changeTab('w')">Desktop</b-nav-item>
                            <b-nav-item  
                                :class="{active: 'm' === currentTab}"
                                @click="changeTab('m')" >Mobile</b-nav-item>  
                        </b-navbar-nav>	  -->
    
                        <!-- <b-nav-form class="center">
                                <b-form-input 
                                    id="inputSearch1" 
                                    type="text" 
                                    size="sm" 
                                    class="mr-sm-2" 
                                    placeholder="Search"
                                    v-model="keyword"
                                    @keydown="pendingSearch()"
                                    name="keyword"/>
                                    <b-button 
                                        v-if="keyword && keyword.length && !isShowLogo"
                                        @click="removeKeyword()"
                                    ></b-button>
                        </b-nav-form>
     -->
                        <b-navbar-nav class="ml-auto signOut">
                            <!-- <b-nav-item href="/">Home</b-nav-item> -->
                            <b-nav-item @click="checkLogout"  to="/login" >Sign Out</b-nav-item>
                            <b-modal size="sm" v-model="modalShow" title="Logout" @ok="logout">Are you sure you want to log out?</b-modal>  
                        </b-navbar-nav>
                        </b-collapse>
                    </b-navbar>
            </div>
        </div>
        
    </div>
    
    </template>
    
    <script>
    import { mapGetters } from 'vuex';
    export default {
        name: 'AppLeft',
        data(){
            return {
                modalShow: false,
                open: true,
                currentTab: '',
                keyword: '',
                searchTimeOut: null,
                window: {
                    width: 0,
                    height: 0
                },
                isShowLogo: true,
                processSearch: null,
            }
        },
    
        computed: {
            checkShowInput() {
                return !(this.window && this.window.width < 992 && this.isShowLogo);
            },
            ...mapGetters(['isAuthenticated', 'loggedInUser']),
        },
    
        watch: {
          '$route'() {
            // react to route changes...
            this.updateCurrentTab();
          }
        },
    
        created() {
          //listener window resize
          if (process.client) {
            window.addEventListener('resize', this.handleResize);
            this.handleResize();
          }
    
          this.updateCurrentTab();
        },
    
        destroyed() {
          window.removeEventListener('resize', this.handleResize)
        },
    
        methods: {
            goProject(event) {
                event.preventDefault();
                this.$router.push('/project');
            },

            goMission(event) {
                event.preventDefault();
                this.$router.push('/mission');
            },

            goShop(event) {
                event.preventDefault();
                this.$router.push('/shop');
            },

            goBooks(event) {
                event.preventDefault();
                this.$router.push('/tkc');
            },
    
            handleResize() {
                this.window.width = window.innerWidth;
                this.window.height = window.innerHeight;
            },
    
            updateCurrentTab() {
                if (this.$route && this.$route.query) { 
                    if (this.$route.query['type']) {
                        this.currentTab = this.$route.query['type'];
                    } else {
                        this.currentTab = ''
                    }
    
                    if (this.$route.query['keyword']) {
                        this.keyword = this.$route.query['keyword'];
                    } else {
                        this.keyword = ''
                    }
                } 
            },
    
            changeUrl() {
                let queryData = {};
                if (this.keyword && this.keyword.length) {
                    queryData['keyword'] = this.keyword
                }
                if (this.currentTab === 'w' || this.currentTab === 'm') {
                    queryData['type'] = this.currentTab;
                }
    
                if (this.pending) {
                    const path = this.$route.path !== '/' ? '/' : this.$route.path;
                    this.$router.push(
                    {
                        path: path,
                        query: queryData
                    });
                } else {
                    const path = this.$route.path !== '/archive' ? '/' : this.$route.path;
                    this.$router.push(
                    {
                        path: path,
                        query: queryData
                    });
                }
            },
    
            pendingSearch() {
                this.keyword = this.keyword.trim();
                if (this.keyword && this.keyword.length) {
                    if (this.processSearch) {
                        clearTimeout(this.processSearch);
                    }
                    this.processSearch = setTimeout(() => {
                        this.search();
                    }, 500);
                } else {
                    this.keyword = '';
                }
            },
    
            search() {
                if (this.processSearch) {
                    clearTimeout(this.processSearch);
                }
                    this.changeUrl();
            },
    
            blurInputSearch() {
                if (!(this.keyword && this.keyword.length)) {
                    this.isShowLogo = true;
                }
            },
    
            onFocusSearch() {
                this.isShowLogo = false;
            },
    
            removeKeyword() {
                this.keyword = '';
                this.search();
    
                if (this.window && this.window.width < 992) {
                    this.isShowLogo = true;
                }
            },
    
    
            changeTab(tab) {
                this.currentTab = tab;
    
                this.changeUrl();
            },
    
            async logout() {
                await this.$auth.logout();
                this.$router.push('/login');
            },
    
            async checkLogout() {
                this.modalShow = true;
            },
    
            openNav() {
                var left = document.getElementById("left-content");
                var right = document.getElementById("right-content");
                var nav = document.getElementById("nav");
                if(this.open) {
                    left.style.width = "5%";
                    nav.style.width = "95%";
                    right.style.width = "95%";
                    this.open = false;
                }
                else
                {
                    left.style.width = "12.5%";
                    nav.style.width = "87.5%";
                    right.style.width = "87.5%";
                    this.open = true;
                }
            },
    
            goUser(event) {
                event.preventDefault();
                this.$router.push('/user');
            }
        }
    }
    </script>
    <style scoped lang="scss">
      @import "~assets/styles/mixins";
      @import "~assets/styles/variables";
    
    #left-content {
        float: left;
        width: 12.5%; 
        .sideProfile {
            width: 100%;
            height: 55px;
            text-decoration: none;
         
            .logo {
                margin: auto;
                width: 80%;
                height: 100%;
                background-image: url("../static/images/logo.png");
                background-repeat: no-repeat;
                background-position: left center;
                background-size: contain;
                // opacity: 0.4;
            }
        }
    
        .sideMenu {
            padding: 20% 10%;
            width: 100%;
            float: left;
            border-right: 1px solid rgba(0,0,0,.0625);
            list-style-type: none;
            position: relative;
            .item {
                margin-top: 10px;
                width: 100%;
                height: 50px;
                background:$button-background-color;
                text-align: center;
                border-radius: 15px;
                font-weight: bold;
                font-size: 15px;
            }
            .item:hover{
                border-color: #2e6da4;
                color:#F5DEB3;
                background: none;
            }
        }
    }
    
    #nav {
        width: 87.5%; 
        border: 1px solid rgba(0,0,0,.0625);
        float: left;
        font-size: 15px;
        font-weight: bold;
        .center {
            margin: auto;
            width: 20%;
            #inputSearch1 {
                text-align: center;
                border-radius: 15px;
                width: 100%;
                font-weight: bold;
                font-size: 15px;
                border: 0;
            }
        }
    }
    
    </style>
    