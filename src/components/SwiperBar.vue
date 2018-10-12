<template>
    <div class="hello">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide">Slide 1</div>
                <div class="swiper-slide">Slide 2</div>
                <div class="swiper-slide">Slide 3</div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>
        </div>
    </div>
</template>
<script>
import Swiper from 'swiper';
export default {
    data () {
        return {
            msg: ''
        }
    },
    mounted(){
        var mySwiper = new Swiper ('.swiper-container', {
            loop: true,
            // 如果需要分页器
            pagination: '.swiper-pagination',
        })        
    }
}
</script>
<style scoped>
    @import'../style/swiper.min.css';
    body {
        margin: 0;
        padding: 0;
    }
    .swiper-container {
        width: 100%;
        height: 200px;
    }
</style>
