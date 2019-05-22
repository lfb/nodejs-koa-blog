<template>
  <section class="update-images-box" v-if="uploadTokenData">
    <vue-core-image-upload
      :crop="false"
      :data="{token: uploadTokenData.token}"
      inputOfFile="file"
      text="Resize Image"
      :credentials="false"
      :max-file-size="5242880"
      url="http://up-z2.qiniu.com"
      @imageuploaded="uploadedImages"
      @imageuploading="uploadingImages"
      @errorhandle="uploadError"
      inputAccept='image/*'>
      <Button type="primary">
        {{isUpload ? '上传中..' : '上传图片'}}
      </Button>
    </vue-core-image-upload>
  </section>
</template>

<script>
  import {mapState, mapActions} from 'vuex';
  import VueCoreImageUpload from 'vue-core-image-upload';

  export default {
    components: {
      VueCoreImageUpload
    },
    data() {
      return {
        isUpload: false
      }
    },
    computed: {
      ...mapState({
        uploadTokenData: state => state.uploadToken.uploadTokenData
      }),
    },
    created() {
      this.fetchData();
    },
    methods: {
      ...mapActions({
        getUploadToken: 'uploadToken/getUploadToken',

      }),
      // 获取数据
      async fetchData() {
        try {
          console.log("Asasa");
          // 获取上传图片token
          await this.getUploadToken();

        } catch (e) {
        console.log(e);
        }
      },

      uploadError(res) {
        this.$Message.error(res);
        this.isUpload = false;
      },

      // 图片上传触发
      uploadingImages() {
        this.isUpload = true;
      },

      // 获取上传图片到服务返回的数据
      uploadedImages(res) {

        if (res.key) {
          this.setCompleteUpload({
            url: 'http://cdn.boblog.com/' + res.key
          });

        } else {
          this.$Message.error('上传失败');
          this.isUpload = false;
          return false;
        }

      },

      /**
       * 完成上传触发
       * @param data
       */
      setCompleteUpload(data) {
        this.isUpload = false;
        this.$Message.success('上传成功');
        this.$emit('completeUpload', data)
      },

    }
  }
</script>
<style scoped lang="scss">
  .files-img-list {
    position: relative;
    width: 200px;
    height: 200px;
    margin: 16px 0;

    & img {
      position: relative;
      z-index: 999;
      width: 100%;
      height: 100%;
    }

    .remove-img-icon {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 1000;
      width: 36px;
      height: 36px;
      text-align: center;
      line-height: 36px;
      font-size: 24px;
      color: #fff;
      font-weight: 800;
      border-radius: 100%;
      background-color: #989898;
    }
  }

  .img {
    width: 100%;

    & img {
      width: 100%;
    }
  }
</style>
