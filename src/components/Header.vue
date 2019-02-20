<template>
    <section>
        <header>
            <a style="flex:1;padding-left:5px;text-align:left;" @click="goback">
                <i class="iconfont icon-fanhui" style="font-size:1rem;"></i>
            </a>
            <a class="shop_car" style="flex:1;">{{this.$store.state.title}}</a>
            <slot name='logo'><a style="flex:1;font-size:0.5rem;"></a></slot>
        </header>
    </section>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        mounted() {

        },
        methods: {
            goback: function () {
                this.$router.go(-1)
            }
        }

    }
</script>
<style scoped>
    header {
        height: 2.5rem;
        box-sizing: border-box;
        line-height: 2.5rem;
        display: flex;
        background: #fff;
        border-bottom: 1 solid #dcdcdc;
        font-size: 0.8rem;
    }

    .searchInput {
        position: relative;
        height: 1.5rem;
        border-radius: 1.5rem;
        overflow: hidden;
        line-height: 1.5rem;
        flex: 1;
        padding: 0 0.5rem;
        display: flex;
        align-items: center;
    }
</style>