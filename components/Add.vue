<template>
<div id="right-content">
    <div class="wrapper"> 
        <b-row>
            <div offset-md="4">ADD PROJECT</div>
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
                        v-model="indemoPost.name"
                        :state="nameState"
                        required
                        placeholder="Enter name"
                        aria-describedby="input-name-feedback"
                    ></b-form-input>
                    <b-form-invalid-feedback id="input-name-feedback" v-if="this.feedback">
                        Please input name. Min 1 letters and max 100 letters
                    </b-form-invalid-feedback>
                </b-col>
            </b-row>

            <b-row class="my-1">
                <b-col sm="3">
                    <label label-for="input-2">Short Description:</label>
                </b-col>
                <b-col sm="9">
                    <b-form-input id="input-2" 
                        required v-model="indemoPost.short_desc" 
                        placeholder="Enter shortDescription"
                        :state="shortDesState"
                        aria-describedby="input-shortDes-feedback"
                    ></b-form-input>
                    <b-form-invalid-feedback id="input-shortDes-feedback" v-if="this.feedback"> 
                        Please input short description. Min 1 letters and max 120 letters
                    </b-form-invalid-feedback>
                </b-col>
            </b-row>

            <b-row class="my-1">
                <b-col sm="3">
                    <label label-for="input-2">Client:</label>
                </b-col>
                <b-col sm="9">
                    <b-form-input id="input-2" required v-model="indemoPost.client" placeholder="Enter client" :state="clientState" aria-describedby="input-client-feedback"></b-form-input>
                    <b-form-invalid-feedback id="input-client-feedback" v-if="this.feedback">
                        Please input client. Min 1 letters and max 100 letters
                    </b-form-invalid-feedback>
                </b-col>
            </b-row>

            <b-row class="my-1">
                <b-col sm="3">
                    <label>Thumbnail small:</label>
                </b-col>
                <b-col sm="9">
                    <b-form-file 
                        accept = ".jpg, .png, .gif"
                        v-model="indemoPost.thumb_small"
                        :state="Boolean(file)"  
                        placeholder="Choose a file..."
                        drop-placeholder="Drop file here..."
                    ></b-form-file>
                    <div class="feedback" v-if="!indemoPost.thumb_small">
                        Please input file (.jpg, .png, .gif)
                    </div>
                </b-col>
            </b-row>

            <b-row class="my-1">
                <b-col sm="3">
                    <label>Thumbnail large:</label>
                </b-col>
                <b-col sm="9">
                    <b-form-file 
                        accept = ".jpg, .png, .gif"
                        v-model="indemoPost.thumb_large"
                        :state="Boolean(file)"
                        placeholder="Choose a file image..."
                        drop-placeholder="Drop file image here..."
                    ></b-form-file>
                    <div class="feedback" v-if="!indemoPost.thumb_large">
                        Please input file (.jpg, .png, .gif)
                    </div>
                </b-col>
            </b-row>
            
            <b-row class="my-1">
                <b-col sm="3">
                    <label>Description:</label>
                </b-col>
                <b-col sm="9">
                    <TuiEditor class="Desc" v-model="indemoPost.desc"/>
                </b-col>
            </b-row>
            
            <b-row class="my-1">
                <b-col sm="3">
                    <b-form-group label="Using options style:"></b-form-group>
                </b-col>
                <b-col sm="9">
                    <b-form-checkbox-group
                        id="checkbox-group-1"
                        v-model="indemoPost.project_type"
                        :options="options"
                        name="flavour-1"
                    ></b-form-checkbox-group>
                    <b-form-invalid-feedback :state="state">Please select one</b-form-invalid-feedback>
                    <b-form-valid-feedback :state="state">Thank you</b-form-valid-feedback>
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
            { text: 'Web', value: 'w' },
            { text: 'Mobile', value: 'm' },
            //   { text: 'Table', value: 't' },
            ],
            indemoPost: {
                name: '',
                short_desc: '',
                client: '',
                desc: '',
                thumb_small:null,
                thumb_large:null,
                project_type: [], 
            },
        }
    },

    computed: {
      state() {
        return this.indemoPost.project_type.length === 1
      },
      nameState() {
        var test = this.indemoPost.name.trim();
        return test.length > 0 && test.length < 100 ? true : false
      },
      Boolean(file) {
        return acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'] ? true : false
      },
      shortDesState() {
        var test = this.indemoPost.short_desc.trim();
        return test.length > 0 && test.length < 120 ? true : false
      },
      clientState() {
        var test = this.indemoPost.client.trim();
        return test.length > 0 && test.length < 100 ? true : false
      },
      descState() {
        var test = this.indemoPost.desc.trim();
        return test.length > 0 ? true : false
      },
    },
    
    methods: {
        cancel() {
            this.$router.push('/');
        },

        saveProject() {
            this.$store.dispatch('projects/create', this.indemoPost)
            .then(response => {
                this.$bvToast.toast(`Success `, {
                    title: 'Add project success',
                    autoHideDelay: 5000,
                    variant: "primary",
                    toaster: "b-toaster-bottom-right",
                }, 5000)
                this.$router.push('/edit/'+ response.data.project.id);
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
