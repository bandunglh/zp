<template>
    <div class="index_wrap">

        <router-view></router-view>

        <div class='footer-nav'>
            <router-link to='/home/recruitIndex' class="footer-nav_item">
                <div class="tab-content">
                    <p class="tab-tittle">招聘信息</p>
                </div>
            </router-link>
            <router-link to='/home/employ' class="footer-nav_item">
                <div class="tab-content">
                    <p class="tab-tittle">应聘信息</p>
                </div>
            </router-link>
            <router-link to='/home/ucenter' class="footer-nav_item" v-show="lastrouter == '/home/ucenter'">
                <div class="tab-content">
                    <p class="tab-tittle">个人信息</p>
                </div>
            </router-link>
            <router-link to='/home/enterprise' class="footer-nav_item" v-show="lastrouter == '/home/enterprise'">
                <div class="tab-content">
                    <p class="tab-tittle">企业信息</p>
                </div>
            </router-link>
         </div>
    </div>
</template>
<script>
    import {myinfo} from '@/api/company.js'

    export default {
        name: 'recruitIndex',
        components:{

        },
        created(){
            myinfo().then( res => {
    	     	if( res.data.result == 0 ) {
                     
                    this.currentUserType = res.data.datas.currentUserType
                    if (this.currentUserType == 2) {
                        this.lastrouter = '/home/enterprise'
                    } else if (this.currentUserType == 1 | this.currentUserType == 0) {
                        this.lastrouter = '/home/ucenter'
                    }
    	     	} 
    	     	
            })
        },
        watch: {
            "$route":"getPath"
        },
        data(){
            return{
                nowrouter: '',
                currentUserType: '',
                lastrouter: '/home/ucenter'
            }
        },
        methods: {
            getPath() {
                this.nowrouter = this.$route.path
                if (this.nowrouter == '/home/ucenter' | this.nowrouter == '/home/enterprise') {  
                    this.lastrouter =  this.nowrouter
                }
                
            }
        },
    }
</script>
<style lang="less">
.index_wrap {
    // position: absolute;
    // top: 0;
    // left: 0;
    // right: 0;
    // bottom: 0;
    background:#E2E2E2;
    min-height:667px;
    overflow: auto;
}

.footer-nav {
    position: fixed;
    z-index: 300;
    bottom: 0;
    height: 56px;
    align-items: center;
    width: 100%;
    display: flex;
    background: #fff;
    overflow: hidden;
    box-shadow: -2px -2px 4px #e4dcdc;
}
.footer-nav_item{
    display: block;
    flex: 1 1 auto;
}
.footer-nav_item.active {
    color: #6febdb;
}
.footer-nav_item.active .zpClass {
    background:url(img/Group1_seah@2x.png);
    background-repeat:no-repeat;
}
.footer-nav_item.active .ypClass {
    background:url(img/Group2_seach@2x.png);
    background-repeat:no-repeat;
}
.footer-nav_item.active .grClass {
    background:url(img/Group3_seach@2x.png);
    background-repeat:no-repeat;
}
.footer-nav_item.active .bnClass {
    background:url(img/Group_seach@2x.png);
    /* background-size: 44px 40px; */
    background-repeat:no-repeat;
}
.tab-content{
    text-align: center;
}
.nav-icon{
    width: 25px;
    height: 20px;
    display: block;
    margin: auto;
}
.zpClass{
    background:url(img/Group1@2x.png);
    /* background-size: 44px 40px; */
    background-repeat:no-repeat;
}
.ypClass{
    background:url(img/Group2@2x.png);
    /* background-size: 44px 40px; */
    background-repeat:no-repeat;
}
.grClass{
    background:url(img/Group3@2x.png);
    /* background-size: 44px 40px; */
    background-repeat:no-repeat;
}
.bnClass{
    background:url(img/Group@2x.png);
    /* background-size: 44px 40px; */
    background-repeat:no-repeat;
}
.tab-tittle{
    font-size: 20px;
    padding: 20px;
}
/* 岗位选择 */
.post-select{
      background:#fff ;
      position: relative;
      z-index: 300;
}
.select-item-choose{
    width:100%;
    min-height: 60px;
    background:#fff ;
    display: flex;
    flex-wrap: wrap;
}
.item-choose_item{
    flex: 0 11 30%;
    margin: 6px 0% 6px 6%;
    font-size: 14px;
    padding: 10px;
    text-align: center;
    background: #f5f5f5;
}
.item-choose_item-changeColor{
    flex: 0 11 30%;
    margin: 6px 0% 6px 6%;
    font-size: 14px;
    padding: 10px;
    text-align: center;
    color: #fff;
    background: #6eebdd;
}
 /* 全兼职选择 */
.time-select,.time-select_one{
    width: 100%;
    background: #fff;
    position: relative;
    // padding-top: 10px;
}
// .time-select {
//     padding: 20px 5%;
// }
.time-select_one {
   padding: 20px 5%;
}
.time-select_item{
    display: inline-block;
    font-size: 14px;
    margin-right: 20px;
    padding: 4px 20px;
    background: #6eebdd;
    color: #fefefe;
}
.time-select_item-changeColor{
    display: inline-block;
    font-size: 14px;
    margin-right: 20px;
    padding: 4px 20px;
    background: #f5f5f5;
}

.nav-hd{
    display: flex;
    align-items: center;
    height: 54px;
    // line-height: 54px;
    background: #fff;
    box-shadow: 2px 2px 4px #e4dcdc;
}
.flex-demo {
    text-align: center;
    color: #333;
    background-clip: padding-box;
}
.flex-mid{
    // height: 45px;
    // line-height: 45px;
    text-align: left;
}

.vux-tab-item{
    background: #fff;
}
.vux-tab .vux-tab-item {
    font-size: 18px !important;
}
.flex-odd-item1{
    float: left;
    margin-left: 20%;
    margin-right: 1%;
    height: 54px;
    line-height: 54px;
}
.flex-odd-item2{
    float: left;
    display: block;
    font-size: 18px;
    color: #6eebdd;
    position: absolute;
    left: 27%;
    /* top: -3px; */
    width: 80px;
    /* height: 60px; */
    /* line-height: 1; */
    /* padding-top: 8px; */
    overflow: hidden;
    text-overflow: ellipsis;
}
.content{
    width: 100%;
    padding: 10px 2%;
    margin-bottom: 70px;
}
.list-item{
    min-height: 100px;
    background: #fff;
    padding: 10px 2%;
    margin-bottom: 10px;
}
.item-top{
    padding: 10px 2%;
    // border: 1px solid red;
    position: relative;
}
.item-logo{
    display: inline-block;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    margin-left: 10px;
    vertical-align: top;
}
.item-name{
    display: inline-block;
    margin-left: 2%;
    height: 45px;
    vertical-align: top;
    font-size: 18px;
    padding: 3px 0 0 20px;
    width: 80%;
    li{
        display: inline-block;
        font-size: 16px;
        padding: 2px 3% 2px 0;
        margin-right: 6px;
        border-right: 1px solid #eee;
    }
    li:last-child{
        border-right: none;
    }
}
.item-name_sm{
    margin-top: 5px;
    color: #a3a3a3;
    font-size: 12px;
}
.item-content{
    padding: 10px 10px 17px 10px;
    margin-top: 1px;
}
.item-title{
    position: relative;
    font-weight: 700;
    font-size: 18px;
    padding: 4px 70px 17px 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    span.it_left {
        float: left;
        width: 90%;
        font-weight: 700;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 2px 0;
    }
    span.money_range {
        font-weight: 700;
        color: #6eebdd;
        position: absolute;
        right: 4px;
    }
}
.item-content{
    font-size: 16px;
    color: #666;
}
.item-content-des {
    // line-height: 28px;
    // font-size: 18px;
    padding-left: 10px;
}
.item-bottom{
    padding-left: 20px;
    padding-bottom: 18px;
    padding-top: 4px;
    li{
        // width: 93%;
        display: inline-block;
        margin-right: 10px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: 2px 0;
    }
}

.item-bottom_msg{
    max-width: 130px;
    display: inline-block;    
    font-size: 16px;
    position: relative;
    overflow: hidden;
    vertical-align: middle;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.item-bottom-s{
    padding-left: 18px;
    padding-bottom: 18px;
    font-size: 0px;
    display: flex;
    align-items: center;
    margin-left: -10px;
    span{
        max-width: 160px;
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 16px;
        padding: 2px 10px;
        border-right: 1px solid #8d8b8b
    }
}
.item-bottom-s span:last-child {
    border: none;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.distpicker-address-wrapper select{
    font-size: 10px !important;
    height: 50px !important;
}
.ps_btn {
    display: flex;
    height:46px;
    line-height:46px;
    margin-top: 10px;
    border-top: 1px solid #efefef;
    border-bottom: 1px solid #efefef;
}
.cancel {
    flex: 1;
    text-align: center;
    font-size: 18px;
}
.makesure{
    flex: 1;
    text-align: center;
    color: #fff;
    background: #6eebdd;
    font-size: 20px;
}
.recruit_rh .vux-flexbox , .recruit_rh .vux-flexbox-item {
    height: 54px !important;
    line-height: 54px !important;
}
.recruit_rh .vux-tab,.recruit_rh .vux-tab-item,.recruit_rh .flex-mid ,.recruit_rh .flex-demo ,.recruit_rh .flex-mid{
    height: 54px !important;
    line-height: 54px !important;  
}
.recruit_rh .vux-tab-container {
    height: 54px !important;
    line-height: 54px !important;
}
.recruit_rh .vux-tab-wrap {
    height: 54px !important;
    line-height: 54px !important;
}
.recruit_rh .vux-tab ,.recruit_rh .vux-tab-item {
    line-height: 54px !important;
}
.recruit_rh .vux-tab {
    height: 54px !important;
    line-height: 54px !important;
}
.re_hd {
    position: relative;
    z-index: 305;    
}
.re_hd_em {
    position: fixed;
    z-index: 305;
    left: 0;
    right: 0;
}
.re_hd_re {
    position: fixed;
    z-index: 305;
    left: 0;
    right: 0;
    top: 0;
    z-index: 305;
}
.rt_dialog {
    position: absolute;
    top: 54px;
    left: 0;
    right: 0;
    z-index: 305;
}

.rm_mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 1;
    z-index: 302;
    background: rgba(7, 17, 27, 0.6);
}
.rm_mask .fade-enter-active,.rm_mask  .fade-leave-active {
    transition: all 0.5s;
}
.rm_mask .fade-enter,.rm_mask .fade-leave-active {
    opacity: 0;
    background: rgba(7, 17, 27, 0) ;
}

.re_hd .flex_odd_one {
    height: 54px;
    line-height: 54px;
}
.re_hd .flex-odd, .re_hd_re .flex-odd,.re_hd_em .flex-odd {
    height: 54px;
    line-height: 54px;
}
.item_username {
    padding: 2px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
@media only screen  
and (max-device-width : 375px){  
 
    .rw_content .vux-tab-item, .ew_content .vux-tab-item {
        position: relative;
        top: -2px;
    }
     
    .location {
        position: relative;
        top: -1px;
    }
}
.pd_post 
{
    font-weight: 700;
    font-size: 17px;
    padding-left: 18px;
    padding-bottom: 15px;

}
.pd_post span {
    vertical-align: middle;
}
.pd_post span:first-child {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 17px;
    max-width: calc( 100% - 90px);
    vertical-align: middle;
 }
@media only screen and (min-device-width: 375px)and (-webkit-min-device-pixel-ratio: 2) {
    .ew_content .weui-label {
        top: 50%;
    }

}
</style>


