<template>
    <Upload
            ref="upload"
            :value="value"
            :show-upload-list="false"
            :on-success="handleSuccess"
            :format="['jpg','jpeg','png']"
            :max-size="10240"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            type="select"
            :data="data"
            :before-upload="handleBeforeUpload"
            :on-error="handleError"
            :action="action">
        <div class="upload-box">
            <div v-if="img" class="img">
                <img class="img" :src="data.url + img" title="点击更换">
            </div>
            <div v-else class="icon-box">
                <Icon type="ios-add" size="26"></Icon>
            </div>
        </div>
    </Upload>
</template>

<script>
    import {mapActions} from "vuex"


    export default {
        props:{
            value:String,
            url:String
        },

        data() {
            return {
                action:'http://up-z2.qiniu.com',
                data: {
                    token:'',
                    url: ''
                },
                img:''
            }
        },

        created() {
        },


        mounted() {
            if(this.value) {
                this.img = this.value
            }
            // 保存下空表单状态
            this.getUploadToken().then(ret => {
                this.data.token = ret.token;
                this.data.url = ret.url;
            })
        },
        methods: {

            ...mapActions(['getUploadToken']),

            handleBeforeUpload() {
            },

            handleSuccess(res) {
                this.img = res.key
                this.$emit('input',res.key)
            },

            handleError() {
                this.$Message.error('上传失败，请重试');
            },

            handleFormatError (file) {
                this.$Message.warning('只能上传jpg,jpeg,png格式的图片');
            },

            handleMaxSize() {
                this.$Message.warning('上传图片大小不能超过10M');
            }
        },

        watch:{
            url() {
                // this.img = this.url
            },
            value() {
                this.img = this.value;
            }
        }
    }
</script>
<style  scoped>
    .upload-box {
        position: relative;
        width: 150px;
        height: 150px;
        cursor: pointer;

    }
    .upload-box .img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }

    .upload-box img {
        width: 100%;
        height: 100%;
        display: block;
        border-radius: 4px;
    }
    .upload-box .upload-box .mask {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.5);
        color: #fff;
        text-align: center;
        line-height: 150px;
        opacity: 0;
        border-radius: 4px;
    }
    .upload-box .upload-box .mask:hover {
        opacity: 1;
    }
    .upload-box .icon-box {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border: 1px dashed #5c6b77;
        border-radius: 4px;
        display: flex;
        justify-content:center;
        align-items:center;
    }
</style>