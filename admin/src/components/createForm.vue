<template>
    <Form ref="createForm" :model="form" :rules="rules" :label-width="120">
        <slot></slot>

        <Form-item>
          <Button type="primary" @click="handleSubmit('createForm')" :loading="process">{{ tips ? tips : '提交' }}</Button>
        </Form-item>
    </Form>
</template>

<script>
	import {mapActions, mapState} from 'vuex'

	export default {
		props: {

			/**
			 * @description 方法
			 */
			doFetchData: {
				type : Function
			},
			/**
			 * @description 是否开启loading动态效果
			 */
			process: {
				type : Boolean
			},
			/**
			 * @description 模型数据
			 */
			model: {
				type : Object
			},
			/**
			 * @description 验证规则
			 */
			rules: {
				type : Object
			},
			/**
			 * @description 按钮文字提示信息
			 */
			tips: {
				type : String
			},
		},
		data() {
			return {
				form: this.model,
				isRefashCache: false,
			}
		},

		mounted() {
		  if (this.isEdit) {
		    this.initEditForm();
      } else {
		    this.initCreateForm();
      }

		},

		watch: {

		  $route() {
        if (this.isEdit) {
          this.initEditForm();
        } else {
          this.initCreateForm();
        }
      },

			model() {
				this.form = this.model
			},

			form: {
				deep: true,
				handler (val) {
          let key = this.$route.name;
          let value = Object.assign({}, val);
          //this.$store.commit('setFormCache', {name: key, form: value})
				}
			}
		},

		computed: {
      ...mapState({
        cache: state => state.app.cache,
      }),

			isEdit() {
				return this.$route.meta.edit === true
			},

      isFromButton() {
			  return this.$route.query.from != 'tab';
      }
		},

		methods: {
			...mapActions(['setMainLoading']),

      // 编辑表单的初始化
      initEditForm() {
        if (this.isFromButton) {
          this.fetchDataFromServer();
        } else {
          this.fetchDataFromCache();
        }
      },

      // 创建表单的初始化
      initCreateForm() {
        if (this.isFromButton) {
          this.$nextTick(() => {
            this.$refs["createForm"].resetFields()
          })
        } else {
          this.fetchCreateFormDataFromCache();
        }
      },

			// 提交表单
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if (!valid) {
						this.$Message.error('表单验证失败!')
						return false
					}

					if (this.isEdit) {
						this.$emit("on-edit", this.form)

					} else {
						this.$emit("on-create", this.form)

					}

				})
			},

      // 通过缓存获取创建表单的数据
      fetchCreateFormDataFromCache() {
        let cache = this.cache[this.$route.name];
        if (cache) {
          for (let i in this.form) {
            if ((typeof(cache[i]) !== "undefined")) {
              this.form[i] = cache[i]
            }
          }
        } else {
          this.$nextTick(() => {
            this.$refs["createForm"].resetFields()
          })
        }
      },

      // 读取缓存的表单数据
      fetchDataFromCache() {
        let cache = this.cache[this.$route.name];
        if (cache) {
          for (let i in this.form) {
            if (cache[i]) {
              this.form[i] = cache[i]
            }
          }
        } else {
          this.fetchDataFromServer();
        }
      },

			// 获取表单数据，主要是编辑数据时候
			fetchDataFromServer() {
				this.setMainLoading(true)
				let id = this.$route.params.id
				this.doFetchData(id).then(ret => {
					this.setMainLoading(false)
					this.$nextTick(() => {
						for (let i in this.form) {
							if (ret.data.data[i]) {
								this.form[i] = ret.data.data[i]
							}
						}
					})

				})
			}

		}
	}
</script>
