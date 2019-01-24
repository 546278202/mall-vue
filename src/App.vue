<template>
    <div id="app">
        <transition name="router-fade" mode="out-in">
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
        </transition>
        <transition name="router-fade" mode="out-in">
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </transition>
        <svg-icon></svg-icon>
    </div>
</template>
<script>
    export default {
        name: 'App'
    }
</script>

<style>
    #app {
        font-family: "Helvetica Neue", Helvetica, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        height: 100%;
    }

    .router-fade-enter-active,
    .router-fade-leave-active {
        transition: opacity .3s;
    }

    .router-fade-enter,
    .router-fade-leave-active {
        opacity: 0;
    }
</style>