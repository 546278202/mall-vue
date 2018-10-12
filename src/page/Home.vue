<template>
    <div>
        <SearchBar></SearchBar>
        <!-- 轮播 -->
        <SwiperBar></SwiperBar>
    </div>   
</template>

<script>
import axios from 'axios'
import SearchBar from '../components/SearchBar'
import SwiperBar from '../components/SwiperBar'
export default {
    data () {
        return {
        }
    },
    mounted(){
        axios.post('http://47.93.4.157:8086/mall_api/shop/get_ware_list', {
            firstName: 'Fred',
            lastName: 'Flintstone'
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    components:{
        SearchBar,
        SwiperBar
    },
}
</script>
<style scoped>


</style>
