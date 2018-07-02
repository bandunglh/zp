<template>
    <div class="newjob_wrap">
        <header class="header_top">
            <img @click='$router.go(-1)' class="back" src='@/assets/back.png' width="25" height="22">
            <span class="title">评价</span>
        </header>
        <ul>
            <li class="nw_lists">
                <div class="nwl_header">
                    <img class='avatar' :src='company.headimgurl' width="36px" height="36px">
                    <div class="name">
                        <p>{{company.name}}</p>
                        <p>{{company.provinceName + company.cityName}}</p>
                    </div>
                </div>
                <div class="nwl_content">
                     <p class="intro" style='padding-top: 10px'>{{company.qualification}}</p>
                </div>
                 
                 
                <div class="nwl_star">
                    <span style="font-size:16px;">评价：</span>
                    <rater v-model="score" @click.native="getStar" :max="5"></rater>
                </div>
                <div class="nwl_text">
                    <span style="font-size:16px;">点评：</span>
                    <textarea  cols='50' rows='6' v-model="description" placeholder="请输入评语"></textarea>
                    <span class="num">({{remnant}}/200字)</span>
                </div>

                
            </li>

        </ul>
        <toast v-model="showtoast" type="text" width="20em">{{toastmes}}</toast>

        <div class="setup_save" @click="update">提交</div>

    </div>
</template>

<script>
    import { Rater,XTextarea,Toast } from 'vux'
    import {ratecom} from '@/api/ucenter'
    export default {
        name: 'raters',
        components: {
            Rater,
            XTextarea,
            Toast
        },
        data(){
            return{
                showtoast: false,
                toastmes: '',
                score: 0,
                textValue: '',
                remnant: 0,
                rdata: {},
                company: {},
                description: ''
            }
        },
        created() {
            this.rdata = this.$route.params.data
            this.company = this.$route.params.data.company
            console.log(this.rdata)
        },
        methods:{
            getStar(ev){
                // console.log(this.star)
                // console.log(ev);
            },
            update () {
                let data = {
                    id: this.rdata.id,
                    score: this.score,
                    description: this.description
                }
                if (!this.score) {
                    this.showtoast = true
                    this.toastmes = '请对其评分'
                    return false
                }
                
                ratecom(data).then(res => {
                    if( res.data.result == 0 ) {
                        this.$router.go(-1)
                    }
                    
                })
            }
        }
}
</script>

<style scoped>
.newjob_wrap {
    background-color: #fff;
    padding: 60px 4px 18px 4px;
    overflow: auto;
    padding-bottom: 80px;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    overflow: auto;
    background-color: #fff;
}
.nw_lists {
    padding: 10px 16px;
    box-shadow: 2px 2px 30px #f0eded;
}
.nwl_header {
    display: flex;
}
.nwl_header .name {
    flex: 1;
    margin-left: 20px;
}

.nwl_mark {
    margin-top: 26px;
    margin-bottom: 23px;
}
.nwl_mark .fulltime {
    margin-left: 0;
    background: url(../img/briefcase@2x.png) 0 center no-repeat
}
.nwl_mark .require {
    background: url(../img/award@2x.png) 0 center no-repeat
}
.nwl_mark .place {
    background: url(../img/flag@2x.png) 0 center no-repeat
}
.nwl_star{
  padding: 10px 0;
}
.nwl_text {
    position: relative;
}
.nwl_text textarea {
    display: block;
    width: 100%;
    margin-top: 10px;
    background-color: #dddbdb;
    border: none;
    resize: none;
    font-size:20px;
    box-sizing: border-box;
    padding: 5px;
}
.nwl_text .num {
    position: absolute;
    bottom: 4px;
    right: 4px;
}
</style>


