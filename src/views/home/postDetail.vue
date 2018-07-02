<template>
    <div class="container-wrap">

        <!-- header -->
        <header class="company-info" @click="$router.push({path: '/company', query: {'id': info.companyId}})">
            <div class="info-title">
                <div class="title-logo">
                    <img :src="hdImgurl" alt="" class="img_radious">
                </div>
                <div class="title-about">
                    <h3>{{ companyName }}</h3>
                    <div class="com-addr">{{ info.createdDesc }}</div>
                </div>
            </div>
            <div class="company-desc">
                {{ qualification }}
            </div>
        </header>

        <!-- main -->
        <main class="post-info">
           
            <section class="post-desc">
                <h1 class="item-desc"><span class="title-line"></span>岗位描述</h1>
                <p class="pd_post" >
                    <span>{{ post }}</span>
                    <span v-show="info.expectedSalaryStart" style="font-weight:700;float:right;color:#6eebdd">{{ info.salaryStart + 'k~' + info.salaryEnd + 'k'}}</span>
                    <span style="font-weight:700;float:right;color:#6eebdd" class="money_range" v-show="!info.expectedSalaryStart">面议</span>
                </p>

                <!-- div变成ul标签循环被分割的字符串 -->
                <ul class="content-tex">
                    <p style='font-size: 17px;padding-bottom: 10px'>岗位描述: </p>
                    <li>
                        <pre class='question-content'>{{ info.description}}</pre>
                    </li>
                    <li v-show='tex'>无</li>
                </ul>


                <ul class="item-bottom_other">
                    <li>
                        <span><img src="./img/briefcase@2x.png" alt=""></span>
                        <span class="item-bottom_msg">{{ working }}</span>
                    </li>
                    <li>
                        <span><img src="./img/award@2x.png" alt=""></span>
                        <span class="item-bottom_msg">{{ jobCategory }}</span>
                    </li>
                    <li>
                        <span><img src="./img/flag@2x.png" ></span>
                        <span class="item-bottom_msg">{{provinceName+cityName}}</span>
                    </li>
                </ul>
                

                <div v-if="info.certMajorL1">
                    <h1 class="item-desc"><span class="title-line"></span>上岗证书要求</h1>
                
                    <p style="padding-left: 16px;padding-bottom: 20px">
                        {{info.certMajorL1}}<span style="position: relative;top: -4px;padding: 0 5px"> . </span>
                        {{info.certMajorL2}}
                    </p>
                </div>
                
                  

            </section>
            <section class="category-info">
                <h1 class="item-desc"><span class="title-line"></span>项目描述</h1>
                
                <div class="project">项目名称: {{projectName}}</div>

                <!-- 这里同上 -->
                <!-- <ul class="project">
                    项目描述: 
                    <li class="project-item" v-for="(item) in tex" :key="item">
                        {{Info.projectDesc}}；
                    </li>
                </ul> -->
                <div class="project">
                    <div>项目描述:</div>
                     <pre class='question-content'>{{ info.projectDesc}}</pre>
                  </div>
                 <!-- <ul class="project">
                    <li>
                        <span><img src="./img/flag@2x.png" ></span>
                        <span class="item-bottom_msg">{{info.projectCityName + info.projectCountryName}}</span>
                    </li>
                </ul>
            </section>

             <section class="pd">
                <h1 class="item-desc"><span class="title-line"></span>基本信息</h1>
                <ul v-if="info.company">
                    <li><p style="overflow: hidden;text-overflow: ellipse;white-space: nowrap;padding: 2px 0;"><span style="padding-right:35px;">公司名称:</span>{{info.company.name}}</p></li>
                    <li>地址:<span style="margin-left:66px;">{{info.company.provinceName + info.company.cityName + info.company.countryName }}</span></li>
                    <li>联系人:<span style="margin-left:45px;">{{info.company.contactName ? info.company.contactName : '无'}}</span></li>
                    <li>联系方式：<span style="margin-left:13px;">{{ info.company.tel? info.company.tel : '无' }}</span></li>
                    <li>
                        <p>公司简介：</p>
                        <p style="margin-top: 10px;line-height: 23px">{{info.company.description?info.company.description : '无'}}</p>
                    </li>
                </ul>
                <p class="resumeImg"><img :src="info.company.headimgurl" width="60px" height="70px"></p> -->
            </section>
        </main>
        <!-- footer -->
        <footer class="post-detail-ft">
            <ul class="ft-ul" v-show="info.isClosed == 0">
                <li class='collection' @click="clickCollection">
                    <span :class="icon"></span>
                    
                    <span :class="collec">{{ collection }}</span>
                </li>
                <li class="line">
                    <span></span>
                </li>
                 
                <li><x-button :class='info.delivered ? "button_close" : "button"' @click.native="wantTo">{{info.delivered? '已投递' : '我要应聘'}}</x-button></li>
                 
            </ul>

            <ul class="ft-ul" v-show="info.isClosed == 1">
                <li class='collection' @click="clickCollection">
                    <span class="col-icon"></span>
                    <span class="wetherCollec">{{ collection }}</span>
                </li>
                <li class="line">
                    <span></span>
                </li>
                 
                <li><x-button class='button_close'>招聘已关闭</x-button></li>
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
    import { recruitInfo,collect,cancelColl,wantEmploy } from '@/api/recruit'
    import {myinfo} from '@/api/company.js'

    export default {
        name: 'postDetail',
        components: {
            XButton,
            Alert
        },
        directives: {
            TransferDom
        },
        data(){
            return {
                info: {},
                collection: '未收藏',
                icon: 'col-icon',
                collec: 'wetherCollec',
                hdImgurl: '',
                companyName: '',
                address: '',
                qualification: '',
                post: '',
                description: '',
                working: '',
                projectDesc: '',
                jobCategory: '',
                projectName: '',
                projectDesc: '',
                flag: 0,
                userCollectionId: '',
                recruitmentId:'',
                provinceName: '',
                cityName: '',
                userId:'',
                companyId: '',
                messageShow: false,
                resMessage: '',

                // 添加了一个tex数组在data里
                tex:[],
            }
        },
        created(){
            recruitInfo(this.$route.query.id).then(res => {
                 if(res.status == 200){
                    this.info = res.data.datas
                    // console.log(this.info)
                    this.hdImgurl = res.data.datas.company.headimgurl;
                    this.companyName = res.data.datas.company.name;
                    this.address = res.data.datas.company.address;
                    this.qualification = res.data.datas.company.qualification;
                    this.post = res.data.datas.post;
                    this.description = res.data.datas.description;
                    
                    let texArr = this.description.split('；');
                    this.tex = texArr.splice(0,texArr.length-1);

                    let workingType = res.data.datas.workingType;
                    if( workingType == 0  ){
                        this.working = "不限";
                    }else if(workingType == 1){
                        this.working = "全职";
                    }else{
                        this.working = "兼职"
                    };
                    this.projectDesc = res.data.datas.projectDesc;
                    this.jobCategory = res.data.datas.jobCategory;
                    this.projectName = res.data.datas.projectName;
                    this.projectDesc = res.data.datas.projectDesc;
                    if(res.data.datas.collected == "1"){
                        this.collection = '已收藏';
                        this.icon = 'col-icon-actived';
                        this.collec = 'wetherCollec-change';
                        this.flag = 1;
                    };
                    this.recruitmentId = res.data.datas.id;
                    this.userCollectionId = res.data.datas.userCollectionId;
                    this.provinceName = res.data.datas.provinceName;
                    this.cityName = res.data.datas.cityName;
                    this.userId = res.data.datas.userId;
                    this.companyId = res.data.datas.companyId;
                }
            });
            myinfo().then( res => {
                if( res.data.result == 0 ) {
                    this.currentUserType = res.data.datas.currentUserType
                } 

                    
            })
        },
        methods: {

            clickCollection(){
                if (this.currentUserType != 1) {
                    this.messageShow = true
                    this.resMessage = '您当前不是个人用户，请切换'
                    return
                }
                if(this.flag == 0){
                    if(this.icon == 'col-icon'){
                        let data = {
                            recruitmentId: this.recruitmentId
                        }
                        collect(data).then(res => {
                            this.otherId = res.data.datas.id;
                        });
                        this.collection = '已收藏';
                        this.icon = 'col-icon-actived';
                        this.collec = 'wetherCollec-change'
                    }else {
                        let data = {
                            id: this.otherId
                        };
                        cancelColl(data).then(res => {
                        })
                        this.icon = 'col-icon';
                        this.collection = '未收藏';
                        this.collec= 'wetherCollec';
                    }
                }else{
                    let data = {
                        id: this.userCollectionId
                    };
                    cancelColl(data).then(res => {
                        this.flag = 0;
                        this.icon = 'col-icon';
                        this.collection = '未收藏';
                        this.collec= 'wetherCollec';
                    })
                }

            },
            wantTo(){
                if (this.currentUserType != 1) {
                    this.messageShow = true
                    this.resMessage = '您当前不是个人用户，请切换'
                    return
                }
                let data = {
                    recruitmentId: this.recruitmentId,
                    userId: this.userId ,
                    companyId: this.companyId
                };
                wantEmploy(data).then(res => {
                    this.messageShow = true;
                    if(res.data.message == 'success'){
                        this.resMessage = '恭喜，简历发送成功！'
                    }else {
                        if (res.data.message == '数据已经存在') {
                            this.resMessage = '已投递'
                        }
                       
                    }

                })
            },
            onShow(){},
            onHide(){},
        }
    }
</script>
<style lang="less" scoped>
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
            padding: 22px 15px 0 15px;
            height: 120px;
            background: #fff;
            border-bottom: 6px solid #eee;
            .company-desc{
                width: 99%;
                padding: 6px 18px;
                // border: 1px solid red;
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
            border-radius: 50%;
            float: left;
            margin-left: 15px;
        }
        .title-about{
            width: 75%;
            height: 40px;
            float: left;
            // border: 1px solid red;
            padding-left: 25px;
            h3{
                margin-bottom: 6px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                padding: 2px 0;
            }
            .com-addr{
                font-size: 14px;
                padding: 2px 3% 2px 0;
            }
        }
    }
    section{
        margin-top: 8px;
        padding: 0px 25px;
        background: #fefefe;
    }
    .post-desc{
        min-height: 240px;
        border-bottom: 6px solid #eee;
    }
    h1{
        padding: 20px 0;
        font-size: 18px;
        font-weight: 700;
    }
    .title-line{
        display: inline-block;
        width: 6px;
        height: 18px;
        background: #6eebdd;
        vertical-align: top;
        margin-right: 10px;
    }
    .content-tex{
        // min-height: 60px;
        font-size: 16px;
        line-height: 26px;
        padding-left: 15px;
        .content-tex-item{
            margin-bottom: 10px;
        }
    }
    .category-info{
        ol{
            li{
                padding-left:40px;
                position: relative;
                font-size: 12px;
            }
        }
        .project {
            line-height: 32px;
            font-size: 17px;
            padding-left: 16px;
            .project-item{
                line-height: 25px;
                margin-bottom: 20px;
            }
        }
    }
    .disc{
        position: absolute;
        left: 15px;
        top: 3px;
        display: block;
        width: 5px;
        height: 5px;
        background: #888;
        border-radius: 50%;
        margin-right: 10px;
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
               width: 60%;
            }
            .collection{
                width: 20%;
                padding-left: 15px;
                text-align: center;
                .col-icon{
                    display: block;
                    width: 22px;
                    height: 22px;
                    background: url(./img/star@2x.png);
                    margin: 3px auto;
                }
                .col-icon-actived{
                    display: block;
                    width: 22px;
                    height: 22px;
                    background: url(./img/star_seach@2x.png);
                    margin: 3px auto;
                }
                .wetherCollec{
                    font-size: 10px;
                    color: #9b9b9b;
                }
                .wetherCollec-change{
                    font-size: 10px;
                    color: #f05522;
                }
            }
            .line{
                width: 10%;
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
        .button_close {
            background:#b2b2b2!important;
            color: #fefefe!important;
            font-size: 22px;
            height: 44px;
            line-height: 44px;
        }
    }
.item-bottom_other{
    padding: 0 16px;
    margin-top: 10px;
    align-items: center;
    li{
        display: inline-block;
        margin-right: 10px; 
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: 2px 0;
    }
}
 
.item-bottom_msg {
    font-size: 16px;
    position: relative;
    top: -4px;
}
.pd {
        position: relative;
        min-height: 196px;
        border-top: 6px solid #eee;
        ul{
        }
        li{
            padding: 10px 16px;
            font-size: 17px;
        }
        .resumeImg{
            width: 40px;
            height: 60px;
            position: absolute;
            top: 55px;
            right: 40px;
        }
    }
</style>
