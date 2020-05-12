<template>
<div id="right-content">
    <div class="wrapper"> 
        <b-row>
            <div>UPDATE PROJECT</div>
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
                        v-model="project.name"
                        :state="nameState"
                        required
                        placeholder="Enter name"
                        aria-describedby="input-name-feedback"
                    ></b-form-input>
                    <b-form-invalid-feedback id="input-name-feedback">
                        Please input name. Min 1 letters and max 100 letters
                    </b-form-invalid-feedback>
                </b-col>
            </b-row>

            <b-row class="my-1">
                <b-col sm="3">
                    <label label-for="input-2">Short Description:</label>
                </b-col>
                <b-col sm="9">
                    <b-form-input id="input-2" :state="shortDesState" required v-model="project.short_desc" placeholder="Enter shortDescription"></b-form-input>
                     <b-form-invalid-feedback id="input-shortDes-feedback"> 
                        Please input short description. Min 1 letters and max 120 letters
                    </b-form-invalid-feedback>
                </b-col>
            </b-row>

            <b-row class="my-1">
                <b-col sm="3">
                    <label label-for="input-2">Client:</label>
                </b-col>
                <b-col sm="9">
                    <b-form-input id="input-2" required v-model="project.client" :state="clientState" placeholder="Enter client"></b-form-input>
                    <b-form-invalid-feedback id="input-client-feedback">
                        Please input client. Min 1 letters and max 100 letters
                    </b-form-invalid-feedback>
                </b-col>
            </b-row>

            <b-row class="my-1">
                <b-col sm="3">
                    <label>Thumbnail small:</label>
                </b-col>
                <b-col sm="1">
                    <div class="thumbnail" :style="{backgroundImage: `url('https://magento2.officience.com/indemo_be/${project.thumb_small}')`}"></div>
                </b-col>
                <b-col sm="8">
                    <b-form-file 
                        id = "thumbSmall"
                        accept = ".jpg, .png, .gif"
                        v-model="project.thumb_small"
                        :state="Boolean(file)"  
                        placeholder="Choose a file..."
                        drop-placeholder="Drop file here..."
                    ></b-form-file>
                </b-col>
            </b-row>

            <b-row class="my-1">
                <b-col sm="3">
                    <label>Thumbnail large:</label>
                </b-col>
                <b-col sm="1">
                    <div class="thumbnail" :style="{backgroundImage: `url('https://magento2.officience.com/indemo_be/${project.thumb_large}')`}"></div>
                </b-col>
                <b-col sm="8">
                    <b-form-file 
                        id = "thumbLarge"
                        accept = ".jpg, .png, .gif"
                        v-model="project.thumb_large"
                        :state="Boolean(file)"
                        placeholder="Choose a file..."
                        drop-placeholder="Drop file here..."
                    ></b-form-file>
                </b-col>
            </b-row>
            
            <b-row class="my-1">
                <b-col sm="3">
                    <label>Description:</label>
                </b-col>
                <b-col sm="9">
                    
                    <TuiEditor
                        id="textarea"
                        :state="descState"
                        v-model="project.desc"
                        placeholder="Enter something..."
                    />
                    <b-form-invalid-feedback id="input-des-feedback">
                        Please input description. Enter at least 1 letters
                    </b-form-invalid-feedback>
                </b-col>
            </b-row>
            
            <b-row class="my-1">
                <b-col sm="3">
                    <b-form-group label="Using options style:"></b-form-group>
                </b-col>
                <b-col sm="8">
                    <b-form-checkbox-group
                        id="checkbox-group-1"
                        v-model="project.project_type"
                        :options="options"
                        name="flavour-1"
                    ></b-form-checkbox-group>
                </b-col>
                <b-col sm="1">
                    <button class="btn btn-primary " type="submit" @click="submit(project)">Submit</button>
                </b-col>
            </b-row>
        </b-container>
    </div>

    <div class="ContentPage">
        <b-tabs content-class="mt-3">
            <!-- Tab web -->
            <b-tab title="Web">
                <div class="pageList" v-for="page of project.pages" :key="page.id">
                    <div v-if="page.type === 'w'">
                        <b-container fluid>
                            <b-row class="my-1">
                                <b-col sm="3">
                                    <label>Page {{page.id}}:</label>
                                </b-col>
                                <b-col sm="9">
                                    <b-form-file
                                            maxWidth = "1920"
                                            accept = ".jpg, .png, .gif"
                                            @change="onImageChange(page, $event)"
                                            v-model="page.image"
                                            placeholder="Choose a file..."
                                            drop-placeholder="Drop file here..."
                                    ></b-form-file>
                                </b-col>
                            </b-row>
                            <b-row class="my-1">
                                <b-col sm="3">
                                    <label>Position:</label>
                                </b-col>
                                <b-col sm="7">
                                    <b-form-input
                                        id="input-1"
                                        type="number" 
                                        step="1"
                                        onkeydown="return event.keyCode !== 69"
                                        min="1" max="100"
                                        v-model="page.position"
                                        @change="checkPosition(page.position, page.type)"
                                        required
                                        placeholder="Enter 1 number"
                                    ></b-form-input>
                                </b-col>
                                <b-col sm="2" >
                                    <div v-if="!page.id">
                                        <button class="btn btn-primary" variant="outline-success" @click="savePosition(page)">Save page</button>
                                    </div>
                                    <div v-else>
                                        <button class="btn btn-primary" variant="outline-success" @click="saveEditPagePosition(page, project.id)">Edit page</button>
                                    </div>
                                </b-col>
                            </b-row>
                        </b-container>
                        <b-row class="info" v-if="page.id">
                            <b-col  sm="3" style="padding: 0px">
                                <div class="infoImg" :style="{backgroundImage: `url('https://magento2.officience.com/indemo_be/${page.image}')`}"></div>
                            </b-col>
                            <b-col  sm="6" class="infoPage" >
                                <div class="infoPage">
                                    <div>Page id: {{page.id}} </div>
                                    <div>Number of points: {{page.points.length}} </div>
                                    <div v-for="point in page.points" :key="point.id">
                                        <div v-if="page.points.length <= 3 ">Point id: {{point.id}} -> target: {{point.target}}</div>
                                    </div>
                                </div>
                            </b-col>
                            <b-col  sm="3">
                                <div class="btPage">
                                    <b-button class="bt" variant="outline-success" @click="openPage(page, project.id)">Open page</b-button>
                                    <b-button class="bt" variant="outline-success" @click="checkDeletePage(page, $event)">Remove Page</b-button>
                                    <b-modal v-if="checkId == page.id" size="sm" v-model="modalShow" title="Delete the page" @ok="removePage(page, project)">Are you sure you want to delete the page ?</b-modal>
                                </div>
                            </b-col>
                        </b-row>
                    </div>
                    <div v-if="!page.imageBase64 && page.type === 'w'"></div>
                    <div id="appContainer" v-else-if="page.imageBase64 && page.id && page.type === 'w'">
                            <div class="page" @mousedown="start" @mouseup="end(page)" @mousemove="move">
                                <img class="imgPage" draggable="false" :src="page.imageBase64">
                                <div class="current"></div>
                                <div class="lst-point">
                                    <div
                                    id="point" variant="primary"
                                    v-for="point in page.points" :key="point.id" :data-id="point.id"
                                    :style="{left: point.left+'%', top: point.top+'%', width: point.width+'%', height: point.height+'%'}"
                                    ><button class="btn1 btn" @click="checkDeletePoint(point, $event)" v-if="point.target && !show"><i class="far fa-times-circle"></i></button>
                                    <b-modal v-if="checkId == point.id" size="sm" v-model="modalShow1" title="Delete the point" @ok="deletePoint(page,point)">Are you sure you want to delete the point ?</b-modal>
                                    <button class="btn1 btn" @click="editPoint(page,point)" v-else-if="point.target && show"><i class="fas fa-pen-square"></i></button>
                                        <div class="pointTarget" v-if="point.show && show">
                                            <b-form-group class="btPoint1" label="Point target:" label-for="input-target">
                                            <b-form-input
                                                id="input-target"
                                                v-model="point.target"  
                                                required
                                                placeholder="Enter target"
                                                ></b-form-input>
                                            </b-form-group> 
                                        <b-button class="bt" size="sm" variant="outline-primary" @click="ok(page,point)">Ok</b-button>
                                        <b-button class="bt" size="sm" variant="outline-danger" @click="cancel(page,point)" >Cancel</b-button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div class="optionImg">
                                <b-button class="bt" variant="outline-success" @click="addPoint(page)"> Add point</b-button>
                                <b-button class="bt" variant="outline-success" @click="editTarger(page)">Edit target</b-button>
                                <div class="bt1">Number of points: {{page.points.length}} </div>
                            </div>
                            <div class="optionImg" v-if="page.id && page.show">
                                <b-button class="bt2" variant="outline-success" @click="closePageEdit(page)"> Close page</b-button>
                            </div>
                    </div>
                    <div id="appContainer" v-if="page.show && page.type === 'w'">
                            <div class="page" @mousedown="start" @mouseup="end(page)" @mousemove="move">
                                <img class="imgPage" draggable="false" :src="`https://magento2.officience.com/indemo_be/${page.image}`">
                                <div class="current"></div>
                                <div class="lst-point">
                                    <div
                                    id="point" variant="primary"
                                    v-for="point in page.points" :key="point.id" :data-id="point.id"
                                    :style="{left: point.left+'%', top: point.top+'%', width: point.width+'%', height: point.height+'%'}"
                                    ><button class="btn1 btn" @click="checkDeletePoint(point, $event)" v-if="point.target && !show"><i class="far fa-times-circle"></i></button>
                                    <b-modal v-if="checkId == point.id" size="sm" v-model="modalShow1" title="Delete the point" @ok="deletePoint(page,point)">Are you sure you want to delete the point ?</b-modal>
                                    <button class="btn1 btn" @click="editPoint(page,point)" v-else-if="point.target && show"><i class="fas fa-pen-square"></i></button>
                                        <div class="pointTarget" v-if="point.show && show">
                                                <b-form-group class="btPoint1" label="Point target:" label-for="input-target">
                                                <b-form-input
                                                    id="input-target"
                                                    v-model="point.target"  
                                                    required
                                                    placeholder="Enter target"
                                                    ></b-form-input>
                                                </b-form-group> 
                                            <b-button class="bt" size="sm" variant="outline-primary" @click="ok(page,point)">Ok</b-button>
                                            <b-button class="bt" size="sm" variant="outline-danger" @click="cancel(page,point)" >Cancel</b-button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="optionImg">
                                <b-button class="bt" variant="outline-success" @click="addPoint(page)"> Add point</b-button>
                                <b-button class="bt" variant="outline-success" @click="editTarger(page)">Edit target</b-button>
                                <div class="bt1">Number of points: {{page.points.length}} </div>
                            </div>
                            <div class="optionImg" v-if="page.id">
                                <b-button class="bt2" variant="outline-success" @click="closePageEdit(page)"> Close page</b-button>
                            </div>
                    </div>
                </div>
                <div class="info1"> 
                    <button class="btn2 btn-primary " type="submit" @click="addPage">+</button>
                </div>
            </b-tab>
            <!-- Tab mobile-->
            <b-tab title="Mobile">
                <div class="pageList" v-for="page of project.pages" :key="page.id">
                    <div v-if="page.type === 'm'">
                        <b-container fluid> 
                            <b-row class="my-1">
                                <b-col sm="3">
                                    <label>Page {{page.id}}:</label>
                                </b-col>
                                <b-col sm="9">
                                    <b-form-file
                                            maxWidth = "1920"
                                            accept = ".jpg, .png, .gif"
                                            @change="onImageChange(page, $event)"
                                            v-model="page.image"
                                            placeholder="Choose a file..."
                                            drop-placeholder="Drop file here..."
                                    ></b-form-file>
                                </b-col>
                            </b-row>
                            <b-row class="my-1">
                                <b-col sm="3">
                                    <label>Position:</label>
                                </b-col>
                                <b-col sm="7">
                                    <b-form-input
                                        id="input-1"
                                        type="number" 
                                        step="1"
                                        onkeydown="return event.keyCode !== 69"
                                        min="1" max="100"
                                        v-model="page.position"
                                        @change="checkPosition(page.position, page.type)"
                                        required
                                        placeholder="Enter 1 number"
                                    ></b-form-input>
                                </b-col>
                                <b-col sm="2" >
                                    <div v-if="!page.id">
                                        <button class="btn btn-primary" variant="outline-success" @click="savePosition(page)">Save page</button>
                                    </div>
                                    <div v-else>
                                        <button class="btn btn-primary" variant="outline-success" @click="saveEditPagePosition(page, project.id)">Edit page</button>
                                    </div>                                
                                </b-col>
                            </b-row>
                        </b-container>
                        <b-row class="info" v-if="page.id">
                            <b-col  sm="3" style="padding: 0px">
                                <div class="infoImg" :style="{backgroundImage: `url('https://magento2.officience.com/indemo_be/${page.image}')`}"></div>
                            </b-col>
                            <b-col  sm="6" class="infoPage" >
                                <div class="infoPage">
                                    <div>Page id: {{page.id}} </div>
                                    <div>Number of points: {{page.points.length}} </div>
                                    <div v-for="point in page.points" :key="point.id">
                                        <div v-if="page.points.length <= 3 ">Point id: {{point.id}} -> target: {{point.target}}</div>
                                    </div>
                                </div>
                            </b-col>
                            <b-col  sm="3">
                                <div class="btPage">
                                    <b-button class="bt" variant="outline-success" @click="openPage(page, project.id)">Open page</b-button>
                                    <b-button class="bt" variant="outline-success" @click="checkDeletePage(page, $event)">Remove Page</b-button>
                                    <b-modal v-if="checkId == page.id" size="sm" v-model="modalShow" title="Delete the page" @ok="removePage(page, project)">Are you sure you want to delete the page ?</b-modal>
                                </div>
                            </b-col>
                        </b-row>
                    </div>
                    <div v-if="!page.imageBase64 && page.type === 'm'"></div>
                    <div id="appContainer" v-else-if="page.imageBase64 && page.id && page.type === 'm'">
                            <div class="page" @mousedown="start" @mouseup="end(page)" @mousemove="move">
                                <img class="imgPage" draggable="false" :src="page.imageBase64">
                                <div class="current"></div>
                                <div class="lst-point">
                                    <div
                                    id="point" variant="primary"
                                    v-for="point in page.points" :key="point.id" :data-id="point.id"
                                    :style="{left: point.left+'%', top: point.top+'%', width: point.width+'%', height: point.height+'%'}"
                                    ><button class="btn1 btn" @click="checkDeletePoint(point, $event)" v-if="point.target && !show"><i class="far fa-times-circle"></i></button>
                                    <b-modal v-if="checkId == point.id" size="sm" v-model="modalShow1" title="Delete the point" @ok="deletePoint(page,point)">Are you sure you want to delete the point ?</b-modal>
                                    <button class="btn1 btn" @click="editPoint(page,point)" v-else-if="point.target && show"><i class="fas fa-pen-square"></i></button>
                                        <div class="pointTarget" v-if="point.show && show">
                                            <b-form-group class="btPoint1" label="Point target:" label-for="input-target">
                                            <b-form-input
                                                id="input-target"
                                                v-model="point.target"  
                                                required
                                                placeholder="Enter target"
                                                ></b-form-input>
                                            </b-form-group> 
                                        <b-button class="bt" size="sm" variant="outline-primary" @click="ok(page,point)">Ok</b-button>
                                        <b-button class="bt" size="sm" variant="outline-danger" @click="cancel(page,point)" >Cancel</b-button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div class="optionImg">
                                <b-button class="bt" variant="outline-success" @click="addPoint(page)"> Add point</b-button>
                                <b-button class="bt" variant="outline-success" @click="editTarger(page)">Edit target</b-button>
                                <div class="bt1">Number of points: {{page.points.length}} </div>
                            </div>
                            <div class="optionImg" v-if="page.id">
                                <b-button class="bt2" variant="outline-success" @click="closePageEdit(page)"> Close page</b-button>
                            </div>
                    </div>
                    <div id="appContainer" v-if="page.show && page.type === 'm'">
                            <div class="page" @mousedown="start" @mouseup="end(page)" @mousemove="move">
                                <img class="imgPage" draggable="false" :src="`https://magento2.officience.com/indemo_be/${page.image}`">
                                <div class="current"></div>
                                <div class="lst-point">
                                    <div
                                    id="point" variant="primary"
                                    v-for="point in page.points" :key="point.id" :data-id="point.id"
                                    :style="{left: point.left+'%', top: point.top+'%', width: point.width+'%', height: point.height+'%'}"
                                    ><button class="btn1 btn" @click="checkDeletePoint(point, $event)" v-if="point.target && !show"><i class="far fa-times-circle"></i></button>
                                    <b-modal v-if="checkId == point.id" size="sm" v-model="modalShow1" title="Delete the point" @ok="deletePoint(page,point)">Are you sure you want to delete the point ?</b-modal>
                                    <button class="btn1 btn" @click="editPoint(page,point)" v-else-if="point.target && show"><i class="fas fa-pen-square"></i></button>
                                        <div class="pointTarget" v-if="point.show && show">
                                            <b-form-group class="btPoint1" label="Point target:" label-for="input-target">
                                            <b-form-input
                                                id="input-target"
                                                v-model="point.target"  
                                                required
                                                placeholder="Enter target"
                                                ></b-form-input>
                                            </b-form-group> 
                                        <b-button class="bt" size="sm" variant="outline-primary" @click="ok(page,point)">Ok</b-button>
                                        <b-button class="bt" size="sm" variant="outline-danger" @click="cancel(page,point)" >Cancel</b-button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div class="optionImg">
                                <b-button class="bt" variant="outline-success" @click="addPoint(page)"> Add point</b-button>
                                <b-button class="bt" variant="outline-success" @click="editTarger(page)">Edit target</b-button>
                                <div class="bt1">Number of points: {{page.points.length}} </div>
                            </div>
                            <div class="optionImg" v-if="page.id">
                                <b-button class="bt2" variant="outline-success" @click="closePageEdit(page)"> Close page</b-button>
                            </div>
                    </div>
                </div>
                <div class="info1"> 
                    <button class="btn2 btn-primary " type="submit" @click="addPageMobile">+</button>
                </div>
            </b-tab>
         </b-tabs>
       </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
    props:{
        post_id:{
            type:Object,
            required:false,
        }
    },

    data() {
        return {
            checkId: Number,
            modalShow: false,
            modalShow1: false,
            file: null,  
            isSelected: false,
            currentElement: null,
            show: false,
            project: this.post_id ? {...this.post_id}:{},
            options: [
            { text: 'Web', value: 'w' },
            { text: 'Mobile', value: 'm' },
            // { text: 'Table', value: 't' },
            ],
            currentPoint: {
                left: 0,
                top: 0,
                width: 0,
                height: 0,
                target: '',
            },
            point: [],
        }
    },

    computed: {
      nameState() {
        var test = this.project.name.trim();
        return test.length > 0 && test.length < 100 ? true : false
      },

      Boolean(file) {
        return acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'] ? true : false
      },
      shortDesState() {
        var test = this.project.short_desc.trim();
        return test.length > 0 && test.length < 120 ? true : false
      },
      clientState() {
        var test = this.project.client.trim();
        return test.length > 0 && test.length < 100 ? true : false
      },
      descState() {
        var test = this.project.desc.trim();
        return test.length > 0 ? true : false
      },
    },

    methods: {
        addPage() {
            this.project.pages.push({
                id: null,
                project_id: this.post_id.id,
                type: 'w',
                image: null,
                imageBase64: null,
                position: '',
                points: [],
            });
        },

        addPageMobile() {
            this.project.pages.push({
                id: null,
                project_id: this.post_id.id,
                type: 'm',
                image: null,
                imageBase64: null,
                position: '',
                points: [],
            });
        },

        addPoint(page) {
            this.isSelected = true;
        },

        editTarger(page) {
            this.show = !this.show;
        },

        async submit(project) {
            var vidFileLengthSmall = $("#thumbSmall")[0].files.length;
            if(vidFileLengthSmall == 0){
                project.thumb_small= "";
            };

            var vidFileLengthLarge = $("#thumbLarge")[0].files.length;
            if(vidFileLengthLarge == 0){
                project.thumb_large= "";
            };

            await this.$store.dispatch('projects/edit', project)
                .then(response => {
                    this.$router.push(`/${this.project.id}`);
                })
                .catch((e) => {
                    this.$bvToast.toast(`${e.response.data.message}`, {   
                        title: 'Edit project error',
                        autoHideDelay: 5000,
                        variant: "primary",
                        toaster: "b-toaster-bottom-right",
                    })
                });
        },

        checkInput(thumb){
            thumb = null
        },

        async checkDeletePage(page, event){
			event.preventDefault();
			this.modalShow = true,
			this.checkId = page.id
        },
        
        async checkDeletePoint(point, event){
			event.preventDefault();
			this.modalShow1 = true,
			this.checkId = point.id
		},

        checkPosition(position, type){
            if (type === 'w') {
                for(var n=0; n < this.project.pages.length-1; n++){
                    if(position == this.project.pages[n].position && this.project.pages[n].type === 'w') {
                        return this.$bvToast.toast(`Position already exist`, {
                            title: 'ERROR',
                            autoHideDelay: 5000,
                            variant: "warning",
                            toaster: "b-toaster-bottom-right",
                        })
                    }
                }
            } 

            if (type === 'm') {
                for(var n=0; n < this.project.pages.length-1; n++) {
                    if(position == this.project.pages[n].position && this.project.pages[n].type === 'm') {
                        return this.$bvToast.toast(`Position already exist`, {
                            title: 'ERROR',
                            autoHideDelay: 5000,
                            variant: "warning",
                            toaster: "b-toaster-bottom-right",
                        })
                    }
                }
            } 
            
            this.$bvToast.toast(`You can used position`, {
                    title: 'Position success',
                    autoHideDelay: 5000,
                    variant: "primary",
                    toaster: "b-toaster-bottom-right",
            })
        },

        async savePosition(page) {
            this.$store.dispatch('pages/create', page)
            .then(response =>{
                page.id = response.data.page.id;
                this.$bvToast.toast(`Success `, {
                    title: 'Add page success',
                    autoHideDelay: 5000,
                    variant: "primary",
                    toaster: "b-toaster-bottom-right",
                })
            })
            .catch((e) => {
                this.$bvToast.toast(`${e.response.data.message}`, {
                title: 'Add page error',
                autoHideDelay: 5000,
                variant: "danger",
                toaster: "b-toaster-bottom-right",
                })
            });
        },

        async saveEditPagePosition(page, project_id) {
            if(page.imageBase64)
            {
                this.$store.dispatch('pages/edit', {page, project_id})
                .then(response =>{
                    page.id = response.data.page.id;
                    this.project.pages.push({
                        show: true,
                    });
                    this.project.pages.pop();
                    this.$bvToast.toast(`Success `, {
                        title: 'Add page success',
                        autoHideDelay: 5000,
                        variant: "primary",
                        toaster: "b-toaster-bottom-right",
                    })
                })
                .catch((e) => {
                    this.$bvToast.toast(`${e.response.data.message}`, {
                    title: 'Add page error',
                    autoHideDelay: 5000,
                    variant: "danger",
                    toaster: "b-toaster-bottom-right",
                    })
                });
            }
            else {
                this.$store.dispatch('pages/editNoImage', {page, project_id})
                .then(response =>{
                    page.id = response.data.page.id;
                    this.project.pages.push({
                        show: true,
                    });
                    this.project.pages.pop();
                    this.$bvToast.toast(`Success `, {
                        title: 'Add page success',
                        autoHideDelay: 5000,
                        variant: "primary",
                        toaster: "b-toaster-bottom-right",
                    })
                })

                .catch((e) => {
                    this.$bvToast.toast(`${e.response.data.message}`, {
                    title: 'Add page error',
                    autoHideDelay: 5000,
                    variant: "danger",
                    toaster: "b-toaster-bottom-right",
                    })
                });
            }
        },

        async ok(page,point) {
            if(point.id) {
                this.$store.dispatch('points/edit', point)
                .then(response => {
                    point.id = response.data.point.id;
                    point.show = false;
                    this.show = false;
                    this.$bvToast.toast(`Success `, {   
                        title: 'Edit point success',
                        autoHideDelay: 5000,
                        variant: "primary",
                        toaster: "b-toaster-bottom-right",
                    })
                })
                .catch((e) => {
                    this.$bvToast.toast(`${e.response.data.message}`, {
                        title: 'ERROR edit point',
                        autoHideDelay: 5000,
                        variant: "danger",
                        toaster: "b-toaster-bottom-right",
                    })
                });
            } 
            else {
                this.$store.dispatch('points/create', point)
                .then(response => {
                    point.id = response.data.point.id;
                    point.show = false;
                    this.show = false;
                    this.$bvToast.toast(`Success `, {   
                        title: 'Add point success',
                        autoHideDelay: 5000,
                        variant: "primary",
                        toaster: "b-toaster-bottom-right",
                    })
                })
                .catch((e) => {
                    this.$bvToast.toast(`${e.response.data.message}`, {
                        title: 'ERROR',
                        autoHideDelay: 5000,
                        variant: "danger",
                        toaster: "b-toaster-bottom-right",
                    })
                });
            }
        },

        async deletePoint(page,point){
            if(point.id){
                return await this.$axios.get('/api/admin/deletepoint/'+ point.id)
                .then(response => {
                            point.left= 0;
                            point.top= 0;
                            point.width= 0;
                            point.height= 0;
                            page.points = $.grep(page.points, function(value) {
                            return value != point;
                        });
                        this.$bvToast.toast(`Success `, {
                            title: 'Delete point success',
                            autoHideDelay: 5000,
                            variant: "primary",
                            toaster: "b-toaster-bottom-right",
                        })
                })
                .catch((e) => {
                        this.$bvToast.toast(`${e.response.data.message}`, {
                            title: 'ERROR',
                            autoHideDelay: 5000,
                            variant: "danger",
                            toaster: "b-toaster-bottom-right",
                        })
                });
            }else {
                console.log('Never die');
            }
        },

        editPoint(page, point){
            page.points.push({
                show: false,
            });
            page.points.pop();
            point.show = true;
        },

        async cancel(page, point) {
            if(point.id) {
                point.show = false;
                this.show = false;
            } else {
                point.left= 0;
                point.top= 0;
                point.width= 0;
                point.height= 0;
                point.show = false;
                this.show = false;
                page.points.pop();
            }
        },

        // pages image
        async onImageChange(page, e) {
            this.files = e.target.files || e.dataTransfer.files;
            if (!this.files.length)
                return;
            await this.createImage(page, this.files[0]);
        },

        async createImage(page, file) {
            var reader = new FileReader();
            reader.onload = (e) => {
                page.imageBase64 = e.target.result;
            };
            reader.readAsDataURL(file);
        },

        async openPage(page, project_id) {
            if(project_id){
                this.project.pages.push({
                    show: true,
                });
                this.project.pages.pop();
                page.show = true;
            }
        },

        closePageEdit(page) {
            this.project.pages.push({
                show: false,
            });
            this.project.pages.pop();
            page.show = false;
        },

        async removePage(page, project) {
                if(page.id){
                    return await this.$axios.get('/api/admin/deletepage/'+ page.id).then(response => {
                        project.pages = $.grep(project.pages, function(value) {
                            return value != page;
                        });
                        this.$bvToast.toast(`Delete page success`, {
                            title: 'Success',
                            autoHideDelay: 5000,
                            variant: "primary",
                            toaster: "b-toaster-bottom-right",
                        })
                    })
                    .catch((e) => {
                        this.$bvToast.toast(`${e.response.data.message}`, {
                            title: 'Delete page error',
                            autoHideDelay: 5000, 
                            variant: "danger",
                            toaster: "b-toaster-bottom-right",
                        })
                    });
                }
        },

        // point image
        start(event) { 
            if (this.isSelected) {
                this.currentElement = event.currentTarget.children[1];
                const position = this.getPercentOfCurrent(event, $(event.target).closest('.page'));
                if (this.currentElement) {
                    this.currentPoint.left = position.left;
                    this.currentPoint.top = position.top;
                    this.currentElement.style.left = this.currentPoint.left + '%';
                    this.currentElement.style.top = this.currentPoint.top + '%';
                }
            }
        },

        move(event) {
            if (this.currentElement && this.isSelected) {
                const position = this.getPercentOfCurrent(event, $(event.target).closest('.page'));
                if( position.left > this.currentPoint.left){
                    this.currentPoint.width = position.left - this.currentPoint.left;
                } else {
                    this.currentPoint.width = this.currentPoint.left -  position.left;
                    this.currentPoint.left = position.left;
                }

                if (position.top > this.currentPoint.top) {
                    this.currentPoint.height = position.top - this.currentPoint.top;
                } else {
                    this.currentPoint.height = this.currentPoint.top - position.top;
                    this.currentPoint.top = position.top;
                }

            this.currentElement.style.width = this.currentPoint.width + '%';
            this.currentElement.style.height = this.currentPoint.height + '%';
            }
        },
        
        end(page) {  
            if (this.currentElement && this.isSelected) {
            this.isSelected = false;
            this.show = true;
            this.currentElement.style.left = 0;
            this.currentElement.style.top = 0;
            this.currentElement.style.width = 0;
            this.currentElement.style.height = 0;
            this.currentElement = null;

            page.points.push({
                id: null,
                page_id: page.id,
                left: this.currentPoint.left,
                top: this.currentPoint.top,
                width: this.currentPoint.width,
                height: this.currentPoint.height,
                show: true,
            });

            this.currentPoint = {
                left: 0,
                top: 0,
                width: 0,
                height: 0,
                target: '',
            };
            }
        },

        
            
        getPercentOfCurrent(event, container) {
                const containerOffset = container.offset();
                const containerTop = containerOffset.top;
                const containerLeft = containerOffset.left;
            
                const containerHeight = container.height();
                const containerWidth = container.width();

                const pointLeft = event.pageX - containerLeft;
                const pointTop = event.pageY - containerTop;
                
                return {
                    left: pointLeft * 100 / containerWidth,
                    top: pointTop * 100 / containerHeight,
                };
            },

        },
    }
</script>

<style scoped lang="scss">
  @import "~assets/styles/mixins";
  @import "~assets/styles/variables";

#right-content {
    float: left;
    width: 85%;
    .wrapper {
        margin: 2% 0% 0% 7%;
        color: #dc3545;
    }
    .addList{
        padding-top: 10px;
        margin: 2% 5%;
        width: 90%;
        border-radius: 14px;
        border: 1px solid black;
        float: left;
        background-color: #F5DEB3;
        .thumbnail {
            width: 100%;
            height: 100%;
            background-size: cover;
            background-repeat: no-repeat;
            margin: 2%;
        }
            .btn {
			
				margin-bottom: 0;
				font-size: 14px;
			    font-weight: 400;
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
				border-radius: 4px;
			}
			.btn-primary {
				color: 	#B8860B;
				background-color: #fff;
				font-weight: bold;
			}

			.btn-primary:hover{
			    background: none;
			    border-color: #2e6da4;
			    color: #000000;
		    }
    }
    
        .ContentPage {
        float: left;
        width: 100%;
        height: 650px;
        
            .tabs {
                display: block;
                .pageList {
                    margin-bottom: 5%;
                }
                .info {
                    width: 50%;
                    height: 150px;
                    margin: 2% auto;
                    border-radius: 14px;
                    border: 2px solid #FFA07A;      
                    .infoImg {
                        border-radius: 14px 0px 0px 14px;
                        height: 100%;
                        width: 100%;
                        background-size: cover;
                        background-repeat: no-repeat; 
                    }
                    .infoPage{
                        padding: 2% 4%;
                        height: 100%;
                    }                
                    .btPage{
                        height: 100%;
                        width: 100%;
                        .bt {
                            float: left;
                            width: 100%;
                            margin-top: 20px;
                        }
                    }     
                }
                .btn {
						padding: 6px 12px;
						margin-bottom: 0;
						font-size: 14px;
						font-weight: 400;
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
						border-radius: 4px;
					}

                    .btn1 {
                        width: 100%;
                        height: 100%;
                        font-size: 15px;
                        border: solid 1px black;
					}

                    .btn2 {
                        margin: 0 0 5% 25%;
                        width: 50%;
                        border-radius: 14px;
                        border: 2px solid #FFA07A;
					}

					.btn-primary {
						color: 	#B8860B;
						background-color: #fff;
						font-weight: bold;
					}

					.btn-primary:hover{
						background: none;
						border-color: #2e6da4;
						color: #000000;
					}
                #appContainer {
                    height: auto;
                    display: inline-block;
                    margin-bottom: 30px; 
                    .optionImg {
                        text-align: center;
                        float: left;
                        width: 15%;
                        height: 100%;
                        margin: 2%;
                        border: 1px solid cadetblue;
                        border-radius: 20px;
                        padding: 1% 2%;
                        .bt {
                            margin-top:20px;
                            height: 40px;
                            width: 100%;
                            float: left;
                        }
                        .bt1 {
                            margin-top:20px;
                            height: 40px;
                            width: 100%;
                            float: left;
                        }
                        .bt2 {
                            height: 40px;
                            width: 100%;
                            float: left;
                        }
                    }
                    
                    .page {
                        margin: auto;
                        position: relative;
                        max-width: 75%;
                        height: auto;
                        float: left; 
                        -webkit-touch-callout: none;
                        -webkit-user-select: none;
                        -moz-user-select: none;
                        -ms-user-select: none;
                        user-select: none;
                        img {
                            border-radius: 14px;
                            border: 1px solid rgba(255, 0, 0, .5);
                        }
                        .current {
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 0;
                            height: 0;
                            background: rgba(255, 0, 0, .5);
                        }
                        .lst-point #point {
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 0;
                            height: 0;
                            background: rgba(255, 0, 0, .5);
                            .pointTarget {
                              position: absolute;
                              background: #fff;
                              width: 180px;
                              height: 130px;
                              border-radius: 6px;
                              border: 1px solid rgba(255, 0, 0, .5);
                            }
                            .bt{
                              margin: 0px;
                            }
                        }
                    }
                }
            }
            .sm {
                margin: 50px auto;
            }
        }
}

</style>
