<template>
    <div class="container-wrap">
        <header class="company-info">
            <div class="info-title">
                <div class="title-logo">
                    <img :src="headimgurl" alt="" class="img_radious" >
                </div>
                <div class="title-about">
                    <h3>{{ us_name }}</h3>
                    <ul>
                        <li>{{workingYear}}年</li>
                        <li>{{userCity}}</li>
                        <li>{{age}}岁</li>
                    </ul>
                </div>
            </div>
            
        </header>

        <main class="post-info">
            <section class="post-desc" style="position:relative">
                <h1 class="item-desc"><span class="title-line"></span>基本信息</h1>
                <ul>
                    <li>姓名：<span style="margin-left:66px;">{{ us_name }}</span></li>
                    <li>性别：<span style="margin-left:66px;">{{ us_sex }}</span></li>
                    <li>出生日期：<span style="margin-left:30px;">{{birthday | formatDate }}</span></li>
                    <li v-show="isOpen">联系方式：<span style="margin-left:30px;">{{ tel? tel : '无' }}</span></li>
                </ul>
                <p class="resumeImg"><img :src="picUrl" width="90px" height="100px"></p>
            </section>
            <section class="post-desc" style="position:relative;min-height: 130px;">
                <h1 class="item-desc"><span class="title-line"></span>个人简介</h1>
                <div class="description">
                    <pre class='question-content'>{{ description }}</pre>
                </div>
            </section>
            <section class="post-desc" style="border: none">
                <h1 class="item-desc"><span class="title-line"></span>上岗证书</h1>
                <ul>
                    <li v-for="(item,index) in licenseData" :key="index"  v-show="licenseData.length">
                        {{ item.majorL1}}
                        <span style="position: relative;top: -4px;padding: 0 5px"> . </span>
                        {{item.majorL1}}
                        <span style="position: relative;top: -4px;padding: 0 5px"> . </span>
                        {{item.typeName }}
                    </li>
                    <li v-show="!licenseData.length">无</li>
                </ul>

                <h1 class="item-desc"><span class="title-line"></span>毕业证书</h1>
                <ul>
                    <li v-for="(item,index) in diplomasData" :key="index" v-show="diplomasData.length">
                        {{ item.majorName }}<span style="position: relative;top: -4px;padding: 0 5px"> . </span> {{item.typeName}}
                    </li>
                    <li v-show="!diplomasData.length">无</li>
                </ul>

 

                <h1 class="item-desc"><span class="title-line"></span>职称</h1>
                <ul >
                    <li v-for="(item,index) in titleData" :key="index" v-show="titleData.length">
                        {{ item.levelName}} <span style="position: relative;top: -4px;padding: 0 5px"> . </span>{{item.majorName }}
                    </li>
                    <li v-show="!titleData.length">无</li>
                </ul>

                <!-- 求职意向 -->
                <h1 class="item-desc"><span class="title-line"></span>求职意向</h1>

                <div class="pd_post" style="padding-left:16px" v-for='item in applicationList'>
                    <span>{{ item.post}} </span>
                    <span style="position: relative;top: -4px;padding: 0 5px">.</span>  
                    <span>{{item.provinceName }}{{item.cityName }}</span>
                    <span style="font-weight:700;float:right;color:#6eebdd"  v-show="item.expectedSalaryEnd">{{ item.expectedSalaryStart + 'k~' + item.expectedSalaryEnd + 'k'}}</span>
                    <span style="font-weight:700;float:right;color:#6eebdd" v-show="!item.expectedSalaryStart">面议</span>
                </div>
                    

                    
 
            </section>
        </main>
        <footer class="post-detail-ft">
            <ul class="ft-ul">
                <li class='collection' @click="clickCollection">
                    <span :class="icon"></span>
                    <span :class="collec">人才库</span>
                </li>
                <li class="line">
                    <span></span>
                </li>
                <li><x-button class='button' @click.native="appointment">预约面试</x-button></li>
                <li style="padding-left: 10px;"><x-button class='button' @click.native="deleteres">忽略</x-button></li>
            </ul>
        </footer>
        <div v-transfer-dom>
             <alert v-model="messageShow"
                title="提示">
                  {{  resMessage }}
                </alert>
        </div>


    </div>
</template>

<script>
    import { XButton,Alert,TransferDomDirective as TransferDom } from 'vux'
    import { readSomOne,addTalent,clectTalent,appoint,delresume } from '@/api/employ'
    import {myinfo,findOneCompany} from '@/api/company.js'
    import {resumedetail}  from '@/api/ucenter.js'
    import {formatDate} from '@/utils/date.js'

     export default {
        name: 'employDetail',
        components: {
            XButton,
            Alert
        },
        directives: {
            TransferDom
        },
        filters: {
            formatDate (time) {
                let date = new Date(time)
                return formatDate(date, 'yyyy-MM-dd')
            }
        },
        data(){
            return {
                icon: 'col-icon',
                collec: 'wetherCollec',
                headimgurl: '',
                nickName: '',
                workingYear: '',
                userCity: '',
                age:'',
                description: '',
                us_name: '',
                us_sex: '',
                birthday: '',
                tel: '',
                picUrl: '',
                licenseData: [],
                diplomasData: [],
                titleData: [],
                applicationList: [],
                wantPost: '',
                wantCity: '',
                wantPrivince: '',
                collected: '',
                expectedSalaryStart: '',
                expectedSalaryEnd: '',
                jobCategoryName: '',
                mydescription: '',
                userId: '',
                flag: 0,
                otherId: '',
                collectInfoId: '',
                recruitmentId: '',
                messageShow: false,
                resMessage: '',
                isOpen: '',
                currentUserType: ''
            }
             
        },
        created(){
            // console.log(this.$route.params.data)
            // let user = this.$route.params.data.userDetail;
            // let  resume = this.$route.params.data.userDetail.resume
            // let recruiment = this.$route.params.data.recruiment
            resumedetail(this.$route.params.data.userId).then(res => {
                this.headimgurl = res.data.datas.user.headimgurl;
                this.nickName = res.data.datas.user.nickName;
                this.workingYear = res.data.datas.workingYear;
                this.userCity = res.data.datas.user.city;
                this.age = res.data.datas.age;
                this.description = res.data.datas.description;
                this.us_name = res.data.datas.name;
                let sex = res.data.datas.sex;
                if(sex == 1){
                    this.us_sex = '男'
                }else if(sex == 2){
                    this.us_sex = '女'
                }else{
                    this.us_sex = '未知'
                };
                this.birthday = res.data.datas.birthday;

                this.isOpen = res.data.datas.isOpen;
                if(this.isOpen == 0){
                    this.tel = "***********"
                }else{
                    this.tel = res.data.datas.tel
                };
                this.collected = res.data.datas.collected
                // console.log(res.data.datas)
                if(res.data.datas.collected == 1){
                    this.icon = 'col-icon-actived';
                    this.collec = 'wetherCollec-change';
                    this.flag = 1;
                } else if (this.collected == 0) {
                    this.icon = 'col-icon';
                    this.collec = 'wetherCollec';
                    this.flag = 0;
                }
                this.picUrl = res.data.datas.picUrl;
                this.licenseData = res.data.datas.licenseData;
                this.diplomasData = res.data.datas.diplomasData;
                this.applicationList = res.data.datas.applicationList
                this.titleData = res.data.datas.titleData;
                this.wantPost = res.data.datas.post;
                this.wantPrivince= res.data.datas.provinceName;
                this.wantCity = res.data.datas.cityName;
                this.expectedSalaryStart = res.data.datas.expectedSalaryStart;
                this.expectedSalaryEnd =  res.data.datas.expectedSalaryEnd;
                this.jobCategoryName = res.data.datas.jobCategoryName;
                this.mydescription = res.data.datas.description
              
                
                this.userId = res.data.datas.userId;
                this.collectInfoId = res.data.datas.id;
                this.recruitmentId = res.data.datas.id;
            })
            myinfo().then( res => {
                if( res.data.result == 0 ) {
                    this.currentUserType = res.data.datas.currentUserType
                } 
                    
            })
        },
        methods: {
            clickCollection(){
                
                // if (this.currentUserType != 2) {
                //     this.messageShow = true
                //     this.resMessage = '您当前不是企业用户，请切换'
                //     return
                // }
                if(this.flag == 0){
                    if(this.icon == 'col-icon'){
                        let data = {
                            "userId": this.userId
                        };
                        addTalent(data).then(res => {
                            if(res.data.message == 'success'){
                                this.icon = 'col-icon-actived';
                                this.collec = 'wetherCollec-change';
                                this.otherId = res.data.datas.id;
                            }
                        })
                    }else{
                        let data = {
                            id: this.otherId
                        };
                        clectTalent(data).then(res => {
                            if(res.data.message == 'success'){
                                this.icon = 'col-icon';
                                this.collec = 'wetherCollec';
                            }
                        })
                    }
                }
                else{
                     let data = {
                        id: this.collectInfoId
                    };
                    clectTalent(data).then(res => {
                        if(res.data.message == 'success'){
                            this.icon = 'col-icon';
                            this.collec = 'wetherCollec';
                        }
                    })
                }
            },
            appointment(){
                // if (this.currentUserType == 1) {
                //     this.messageShow = true
                //     this.resMessage = '您当前不是企业用户，请切换'
                //     return
                // }
                let data =  {
                    userId: this.userId
                };
                appoint(data).then( res => {
                    if(res.data.message == 'success'){
                       
                        if(res.data.message == 'success'){
                            if(this.isOpen == 0){
                                this.messageShow = true;
                                this.resMessage = '恭喜，发送成功！'
                            }else{
                                window.location.href = "tel://" + this.tel
                            }
                        }else {
                            this.messageShow = true;
                            this.resMessage = '发送失败，'+res.data.message
                        }
                    }
                })
            },
            deleteres () {
                let data= {
                    "id": this.$route.params.data.id
                }
                delresume(data).then(res => {
                    if(res.data.message == 'success'){
                        this.$router.go(-1)
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .left{
        float: left;
    }
    .right{
        float: right;
    }
    .container-wrap{
        padding-bottom: 80px;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 555;
        overflow: auto;
        background-color: #fff;
        .company-info{
            padding: 30px 15px 0 15px;
            height: 120px;
            background: #fff;
            border-bottom: 6px solid #eee;
            .company-desc{
                width: 99%;
                padding: 6px 18px;
                float: left;
                font-size: 16px;
                color: #aaa;
                overflow: hidden;
                white-space:nowrap;
                text-overflow: ellipsis;
            }
        }
        .info-title{
            height: 55px;
        }
        .title-logo{
            height: 52px;
            width: 52px;
            // border-radius: 50%;
            float: left;
            margin-left: 15px;
        }
        .title-about{
            width: 78%;
            height: 40px;
            float: left;
            // border: 1px solid red;
            padding-left:25px;
            h3{
                margin-bottom: 3px;
                font-size: 20px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            ul li{
                display: inline-block;
                font-size: 16px;
                padding: 2px 3% 2px 0;
                margin-right: 6px;
                border-right: 1px solid #eee;
            }
            ul li:last-child{
                 border-right: none;
            }
        }
    }
    section{
        margin-top: 8px;
        padding: 5px;
        background: #fefefe;
    }
    .post-desc{
        min-height: 196px;
        border-bottom: 6px solid #eee;
        ul{
            margin-bottom: 15px;
        }
        li{
            padding: 10px 26px;
            font-size: 15px;
        }
        .resumeImg{
            width: 40px;
            height: 60px;
            position: absolute;
            top: 55px;
            right: 65px;
        }
        .description {
            padding: 0 20px;
            font-size: 17px;
            line-height: 23px;
            margin-bottom: 20px;
        }
    }
    h1{
        padding: 20px 12px;
        font-size: 18px;
        font-weight: 700;
    }
    .title-line{
        display: inline-block;
        width: 6px;
        height: 18px;
        background: #6eebdd;
        vertical-align: middle;
        margin-right: 10px;
        font-size: 18px;
    }
    .content-tex{
        min-height: 60px;
        font-size: 16px;
    }

    .post-detail-ft{
        position: fixed;
        z-index: 9;
        width: 100%;
        height: 56px;
        background: #fefefe;
        bottom: 0;
        padding: 6px 0;
        box-shadow: -2px -2px 4px #e4dcdc;
        .ft-ul{
            height: 100%;
            li{
               display: inline-block;
               height: 100%;
               vertical-align: top;
               width: 30%;
            }
            .collection{
                width: 20%;
                padding-left: 15px;
                text-align: center;
                .col-icon{
                    display: block;
                    width: 22px;
                    height: 22px;
                    background: url(./img/rck_n@2x.png);
                    margin: 3px 0 4px 30px;
                }
                .col-icon-actived{
                    display: block;
                    width: 22px;
                    height: 22px;
                    background: url(./img/rck1@2x.png);
                    margin: 3px 0 4px 30px;
                }
                .wetherCollec{
                    font-size: 14px;
                    color: #9b9b9b;
                }
                .wetherCollec-change{
                    font-size: 14px;
                    color: #f05522;
                }
            }
            .line{
                width: 7%;
                span{
                    display: block;
                    width: 2px;
                    height: 80%;
                    background: #e0e0e0;
                }
            }
        }
        .button{
            background:#f05522!important;
            color: #fefefe!important;
            font-size: 22px;
            height: 44px;
            line-height: 44px;
            &:active {
                border-color: rgba(240, 85, 34,.9)!important;
                color: rgba(240, 240, 240, 0.7)!important;
                background-color: transparent;
            }
        }

    }
</style>
