<template>
<div id="right-content">
    <div class="wrapper"> 
        <b-row>
            <div offset-md="4">ADD USER</div>
        </b-row>
    </div>
	<!-- this is list -->
    <div class="addList">
        <b-container fluid>
            <b-row class="my-1">
                <b-col sm="3">
                    <label label-for="input-1">Name:</label>
                </b-col>
                <b-col sm="9">
                    <b-form-input
                        id="input-1"
                        v-model="user.name"
                        required
                        placeholder="Enter name"
                        aria-describedby="input-name-feedback"
                    ></b-form-input>
                </b-col>
            </b-row>

            <b-row class="my-1">
                <b-col sm="3">
                    <label label-for="input-2">Username:</label>
                </b-col>
                <b-col sm="9">
                    <b-form-input id="input-2" 
                        required v-model="user.username" 
                        placeholder="Enter Username"
                        aria-describedby="input-shortDes-feedback"
                    ></b-form-input>
                </b-col>
            </b-row>

            <b-row class="my-1">
                <b-col sm="3">
                    <label label-for="input-2">Password:</label>
                </b-col>
                <b-col sm="9">
                    <b-form-input id="input-2" required v-model="user.password" placeholder="Enter Password" aria-describedby="input-client-feedback"></b-form-input>
                </b-col>
            </b-row>

            <b-row class="my-1">
                <b-col sm="3">
                    <label label-for="input-2">Age:</label>
                </b-col>
                <b-col sm="9">
                    <b-form-input id="input-2" required v-model="user.age" placeholder="Enter Age" aria-describedby="input-client-feedback"></b-form-input>
                </b-col>
            </b-row>

            <b-row class="my-1">
                <b-col sm="3">
                    <b-form-group label="Using options gender:"></b-form-group>
                </b-col>
                <b-col sm="9">
                    <b-form-checkbox-group
                        id="checkbox-group-1"
                        v-model="user.gender"
                        :options="options"
                        name="flavour-1"
                    ></b-form-checkbox-group>
                </b-col>
            </b-row>

             <b-row class="my-1">
                <b-col sm="3">
                    <label label-for="input-2">Email:</label>
                </b-col>
                <b-col sm="9">
                    <b-form-input id="input-2" required v-model="user.email" placeholder="Enter Email" aria-describedby="input-client-feedback"></b-form-input>
                </b-col>
            </b-row>

             <b-row class="my-1">
                <b-col sm="3">
                    <label label-for="input-2">Position:</label>
                </b-col>
                <b-col sm="9">
                    <b-form-input id="input-2" required v-model="user.position" placeholder="Enter Position" aria-describedby="input-client-feedback"></b-form-input>
                </b-col>
            </b-row>

             <b-row class="my-1">
                <b-col sm="3">
                    <label label-for="input-2">Role:</label>
                </b-col>
                <b-col sm="9">
                    <b-form-input id="input-2" required v-model="user.role" placeholder="Enter Role" aria-describedby="input-client-feedback"></b-form-input>
                </b-col>
            </b-row>

            <b-row class="my-1">
                <b-col sm="3">
                    <label>Avatar:</label>
                </b-col>
                <b-col sm="9">
                    <b-form-file 
                        accept = ".jpg, .png, .gif"
                        v-model="user.avatar"
                        :state="Boolean(file)"  
                        placeholder="Choose a file..."
                        drop-placeholder="Drop file here..."
                    ></b-form-file>
                    <div class="feedback" v-if="!user.avatar">
                        Please input file (.jpg, .png, .gif)
                    </div>
                </b-col>
            </b-row>

            <b-row class="my-1">
                <b-col sm="3">
                    <label label-for="input-2">Phone:</label>
                </b-col>
                <b-col sm="9">
                    <b-form-input id="input-2" required v-model="user.phone" placeholder="Enter Phone" aria-describedby="input-client-feedback"></b-form-input>
                </b-col>
            </b-row>

            <b-row class="my-1">
                <b-col sm="3">
                    <label label-for="input-2">Address:</label>
                </b-col>
                <b-col sm="9">
                    <b-form-input id="input-2" required v-model="user.address" placeholder="Enter Address" aria-describedby="input-client-feedback"></b-form-input>
                </b-col>
            </b-row>
        </b-container>
    </div>
    <div class="btSave">
        <b-button variant="outline-success" @click="saveProject()" style=" width: 85px">Save</b-button>
        <b-button variant="outline-success" @click="cancel()" style=" width: 85px">Cancel</b-button>
    </div>
</div>
   
</template>

<script>
export default {
    data() {
        return {
            file: null,
            feedback: true,
            options: [
            { text: 'Male', value: 'Male' },
            { text: 'Female', value: 'Female' },
            //   { text: 'Table', value: 't' },
            ],
            user: {
                name: '',
                username: '',
                password: '',
                email: '',
                gender: 'Male',
                age: '',
                position: '',
                role: '',
                phone: '',
                address: '',
            },
        }
    },

    computed: {
      Boolean(file) {
        return acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'] ? true : false
      },
    },
    
    methods: {
        cancel() {
            this.$router.push('/');
        },

        saveProject() {
            this.$store.dispatch('user/create', this.user)
            .then(response => {
                this.$bvToast.toast(`Success `, {
                    title: 'Add project success',
                    autoHideDelay: 5000,
                    variant: "primary",
                    toaster: "b-toaster-bottom-right",
                }, 5000)
                this.$router.push('/user');
            })
            .catch((e) => {
                this.feedback = true
                this.$bvToast.toast(`${e.response.data.message}`, {
                    title: 'Add project error',
                    autoHideDelay: 5000,
                    variant: "danger",
                    toaster: "b-toaster-bottom-right",
                })
            });
        }
    }
}
</script>

<style scoped lang="scss">
  @import "~assets/styles/mixins";
  @import "~assets/styles/variables";

#right-content {
    float: left;
    width: 85%;
    padding: 0% 5%;
    .wrapper {
        margin: 2%;
        color: #dc3545;
    }
    .addList{
        padding-top: 10px;
        border-radius: 14px;
        border: 1px solid black;
        background-color: #F5DEB3;
        .feedback {
            width: 100%;
            margin-top: 0.25rem;
            font-size: 80%;
            color: #dc3545;
        }
    }
    .Desc {
        border-radius: 14px;
        border: 1px solid black;
    }
    .btSave {
        margin-top: 15px;
        width: 90%;
        height: 100%;
        text-align: center;
    }
}

</style>