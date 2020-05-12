<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <h2 class="title has-text-centered">Welcome back!</h2>
          <form method="post" @submit.prevent="login">
            <div class="field">
              <label class="label">Name</label>
              <div class="control">
                <input
                  class="input"
                  v-model="userForm.username"
                >
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input
                  type="password"
                  class="input"
                  v-model="userForm.password"
                >
              </div>
            </div>
            <div class="control">
              <button type="submit" class="button is-dark is-fullwidth">Log In</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Notification from '~/components/Notification';

export default {
  middleware: 'notAuthenicated',
  data() {
    return {
      userForm: {
        username: '',
        password: '',
      }
    }
  },
  components: {
    Notification,
  },

  methods: {
      async login() {
          try {
            await this.$auth.loginWith('local',{
              data: {
                "username": this.userForm.username,
                "password": this.userForm.password
              }
            })
            .catch(e => {
              this.$bvToast.toast(`ERROR `, {   
                  title: 'Failed Logging In',
                  autoHideDelay: 5000,
                  variant: "danger",
                  toaster: "b-toaster-bottom-right",
              })
            })
            if (this.$auth.loggedIn) {
              this.$bvToast.toast(`Success `, {   
                  title: 'Successfully Logged In',
                  autoHideDelay: 5000,
                  variant: "primary",
                  toaster: "b-toaster-bottom-right",
              })
            }
          } catch (e) {    
              console.log(e.response.data)    
              this.$bvToast.toast(`${e.response.data.message}`, {   
                  title: 'Username or Password wrong',
                  autoHideDelay: 5000,
                  variant: "danger",
                  toaster: "b-toaster-bottom-right",
              })
          } 
      }
  }
}
</script>