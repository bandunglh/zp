<template>
    <div class="liscence_wrap" v-show="byShow">
        <header class="header_top">
            <img @click='byShow = false' class="back" src='@/assets/back.png' width="25" height="22">
            <span class="title">返回</span>
        </header>

        <certicate ref='certicate' @postchange='postchange'></certicate>

    </div>
</template>

<script>
import certicate from '@/views/ucenter/resume/certificate'
 
export default {
    components: {
        certicate
    },
    watch: {
        byShow (val) {
            if (val == true) {
               this.$refs.certicate.certicateshow = true
            }
        }
    },
    data () {
        return {
            byShow: false,
            lisencedata: {}
        }
    },
    methods: {
        postchange (val) {
            this.byShow = false
            this.lisencedata = val
            this.chooselisence()
        },
        chooselisence () {
            this.$emit("chooselisence", this.lisencedata)
        }      
    }

}
</script>

<style>
.liscence_wrap{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f5f5f5;
    z-index: 1000;
    overflow: auto;
    margin-top: 46px;
    background-color: #fff;  
}
</style>
