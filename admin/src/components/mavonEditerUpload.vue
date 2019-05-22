<template>
  <div>
    <mavon-editor v-model="value" :ishljs="true" ref=md @change="editorChange"
                  @imgAdd="imgAdd"></mavon-editor>
    <Upload
      style="display: none"
      class="avatar-uploader"
      action="http://up-z2.qiniu.com"
      :show-upload-list="false"
      :data="{token: uploadTokenData.token}"
      ref="file"
      :thumbnail-mode="true"
      :on-success="handleAvatarSuccess"
      :on-error="handleAvatarError">
    </Upload>
  </div>
</template>
<style>
  .v-note-panel {
    max-height: 400px;
    height: 400px;
    overflow: hidden;
    overflow-y: scroll;
  }
</style>
<script>

  import {mapState, mapActions} from 'vuex'

  export default {
    props: ['data'],
    data() {
      return {
        value: '',
        url: null,
        pos: null,
        file: null,
        loadingStatus: false
      }
    },
    computed: {
      ...mapState({
        uploadTokenData: state => state.uploadToken.uploadTokenData
      })
    },

    created() {
      if (this.data != null) {
        this.value = this.data;
      }
      ;
    },

    watch: {
      data() {
        if (this.data != null) {
          this.value = this.data;
        }
        ;
      }
    },

    methods: {

      // 返回数据
      editorChange(value) {
        this.$emit('handleEditor', this.value);
      },

      // 上传图片
      imgAdd(pos, file) {
        this.pos = pos;
        this.$refs.file.post(file);
      },

      handleAvatarSuccess(res, file) {
        const QINIU_IMAGE_DOMAIN = "http://cdn.boblog.com/"
        var url = QINIU_IMAGE_DOMAIN + res.key;
        this.$refs.md.$img2Url(this.pos, url);
      },

      // 上传失败
      handleAvatarError() {
        delete this.img_file[this.pos];
      }

    }
  }
</script>
