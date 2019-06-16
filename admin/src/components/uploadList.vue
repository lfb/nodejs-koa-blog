<template>
    <div class="">
        <draggable v-model="uploadList" :options="{group:'people'}" @start="drag=true" @end="drag=false" @change="moveImage">
            <div class="demo-upload-list" v-for="(item, index) in uploadList" :key="index">
                <img :src="url + item">
                <div class="demo-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(url + item)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                </div>
            </div>
        </draggable>

        <Upload
                ref="upload"
                :show-upload-list="false"
                :on-success="handleSuccess"
                :format="['jpg','jpeg','png', 'gif']"
                :max-size="20480"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="handleBeforeUpload"
                multiple
                type="drag"
                action="http://up-z2.qiniu.com/"
                :data="uploadToken"
                style="display: inline-block;width:80px;">
            <div style="width: 80px;height:80px;line-height: 80px;">
                <Icon type="ios-add" size="50"></Icon>
            </div>
        </Upload>
        <Modal title="Image" v-model="visible">
            <img :src="imgUrl" v-if="visible" style="width: 100%">
        </Modal>
        <div v-if="tips">{{ tips }}</div>
    </div>
</template>
<script>
    import draggable from 'vuedraggable'
    import {mapActions} from "vuex"

    export default {
        components: {
            draggable
        },
        props: [ 'value', 'tips'],
        data () {
            return {
                uploadToken: {
                    token: null
                },
                url: null,
                imgUrl: '',
                visible: false,
                uploadList: this.value
            }
        },
        watch: {
            value() {
                if ( this.value.length > 0 && this.value != null ) {
                    this.uploadList = this.value;
                };
            },
            uploadList() {
                this.$emit('input', this.uploadList);
            }
        },
        mounted() {
            // 保存下空表单状态
            this.getUploadToken().then(ret => {
                this.uploadToken.token = ret.token;
                this.url = ret.url;
            })

        },
        methods: {

            ...mapActions(['getUploadToken']),

            handleView (name) {
                this.imgUrl = name;
                this.visible = true;
            },
            handleRemove (file) {
                const fileList = this.uploadList;
                this.uploadList.splice(fileList.indexOf(file), 1);
            },
            // 上传成功
            handleSuccess (res, file) {
                this.uploadList.push(res.key);
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: file.name + ' 的文件格式不正确，请选择JPG、JPEG、GIF或PNG格式。'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: '超出文件大小限制',
                    desc: file.name + ' 太大，不超过 20 M.'
                });
            },
            handleBeforeUpload () {
                return true;
            },

            moveImage() {
                this.$emit('input', this.uploadList);
            }
        }
    }
</script>
<style>
    .demo-upload-list{
        display: inline-block;
        width: 150px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>
