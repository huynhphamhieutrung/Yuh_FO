<template>
  <header>
    <div class="container">
      <div class="row justify-content-between">
        <ul class="nav nav-pills nav-fill">
          <li class="nav-item" v-if="isShowType('w')">
            <button
                type="button"
                class="nav-link"
                :class="{active: 'w' === currentTab}"
                @click="changeTab('w')">
              <i class="fas fa-desktop"></i>
              <span>Desktop</span>
            </button>
          </li>
          <li class="nav-item" v-if="isShowType('t')">
            <button
                type="button"
                class="nav-link"
                :class="{active: 't' === currentTab}"
                @click="changeTab('t')">
              <i class="fas fa-tablet-alt"></i>
              <span>Tablet</span>
            </button>
          </li>
          <li class="nav-item" v-if="isShowType('m')">
            <button
                type="button"
                class="nav-link"
                :class="{active: 'm' === currentTab}"
                @click="changeTab('m')">
              <i class="fas fa-mobile-alt"></i>
              <span>Mobile</span>
            </button>
          </li>
        </ul>

        <div class="d-flex align-content-center">
          <button class="btn-close" @click="handleBack('')"><i class="fas fa-times"></i></button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'IndemoHeaderDemo',
    props: {
      typeArr: {
        type: Array,
        default: function () {
          return ['w', 't', 'm'];
        }
      }
    },
    data() {
      return {
        canBack: true,
        currentTab: 'w',
        window: {
          width: 0,
          height: 0
        },
        type: {
          w: 0,
          t: 0,
          m: 0,
        }
      };
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
    computed: {},
    methods: {
      handleResize() {
        this.window.width = window.innerWidth;
        this.window.height = window.innerHeight;
      },
      handleBack() {
        const previousPath = window.sessionStorage.getItem('previous-path') || '/';
        window.sessionStorage.removeItem('previous-path');
        this.$router.push(previousPath);
      },
      changeTab(tab) {
        this.$router.push(
          {
            path: this.$route.path,
            query: {type: tab}
          });
      },
      updateCurrentTab() {
        if (this.$route && this.$route.query && this.$route.query['type']) {
          this.currentTab = this.$route.query['type'];
        }
      },
      isShowType(type) {
        return this.typeArr.includes(type);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/styles/variables";
  @import "../assets/styles/mixins";

  header {
    background: black;
    @include box-shadow(2px 3px 7px 0px rgba(7, 7, 7, 0.2));
    color: white;
    font-size: 20px;

    .btn-close {
      background: transparent;
      border: 0;
      color: white;
      font-size: 18px;

      &:focus {
        outline: none;
      }
    }

    .nav {

      .nav-item {
        margin-right: 30px;
      }

      .nav-link {
        position: relative;
        color: white;
        padding: 16px 5px;
        text-transform: uppercase;
        width: 100%;
        height: 100%;
        background: transparent;
        border: none;
        outline: none;
        font-size: 17px;
        font-weight: 400;

        i {
          display: none;
          font-size: 21px;
          color: $gray-color-demo;
        }

        &:after {
          display: block;
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 0;
          background: $red-color-1;
          @include transition(height .3s);
        }

        &.active {
          background: transparent;

          &:after {
            height: 5px;
          }
        }
      }
    }

    @media (max-width: $col-xl-min-width) {
      .search {
        width: 300px;
      }
    }

    @media (max-width: $col-md-min-width) {

      .btn-close {
        padding-right: 20px;
      }

      .nav {

        .nav-item {
          margin-right: 0;
        }

        .nav-link {
          font-size: 11px;
          padding: 7px 13px 5px;
          line-height: 1;
          border-radius: 0;

          i {
            display: block;
            margin-bottom: 7px;
          }

          &:after {
            content: none;
          }

          &.active {
            background: $gray-color-demo;
            color: black;

            i {
              color: black;
            }
          }
        }
      }

    }
  }
</style>
