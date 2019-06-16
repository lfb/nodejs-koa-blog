<template>
    <Form ref="searchForm" inline :model="form" @keydown.native.enter.prevent="handleSearch">
        <slot></slot>
        <Form-item>
            <Button type="primary" icon="ios-search" @click.stop="handleSearch">搜索</Button>
        </Form-item>
        <Form-item>
            <Button type="primary" @click.stop="handleReset">重置</Button>
        </Form-item>
    </Form>
</template>

<script>
    export default {
        props: {
            form: Object
        },
        components: {},
        data() {
            return {}
        },

        mounted() {
            this.init()
        },

        methods: {
            //页面初始化
            init() {
                let query = Object.assign({}, this.$route.query)
                let form = Object.assign({}, this.form)
                for (let i in query) {
                    if (form.hasOwnProperty(i)) {
                        form[i] = query[i]
                        this.$set(this.form, i, query[i]);
                    }
                }
                this.$emit('init', form)
            },
            //获取数据
            fetchData() {
                this.$emit('fetchData')
            },

            //处理搜索事件
            handleSearch() {
                let query = {}
                for (let i in this.form) {
                    //排除空数组、空对象、空字段
                    if (Object.prototype.toString.call(this.form[i]) == '[object Array]') {
                        if (i != 'date' && this.form[i].length > 0) {
                            query[i] = this.form[i]
                        }
                        //兼容时间范围选择格式参数
                        if (i == 'date' && this.form[i].length == 2 && (this.form[i][0] || this.form[i][1])) {
                            query[i] = [this.form[i][0].toString(), this.form[i][1].toString()]
                        }
                    } else if (Object.prototype.toString.call(this.form[i]) == '[object Object]') {
                        if (Object.keys(this.form[i]).length > 0) {
                            query[i] = this.form[i]
                        }
                    } else if (Object.prototype.toString.call(this.form[i]) == '[object Date]') {

                        query[i] = this.form[i].toString()

                    } else if (this.form[i] || this.form[i] == '0') {
                        query[i] = this.form[i]
                    }
                }
                if (query['end'] && !query['start']) {
                  delete query.end;
                }
                if (this.$route.query.page) {
                    query.page = this.$route.query.page
                }
                this.$router.replace({
                    name: this.$route.name,
                    query: query
                })
                this.fetchData()
            },

            //处理重置事件
            handleReset() {
                this.$refs["searchForm"].resetFields()

                this.$router.replace({
                    name: this.$route.name
                })
                this.handleSearch()
            }
        },

        watch: {
            $route() {
                //this.fetchData()
            }
        }
    }
</script>
