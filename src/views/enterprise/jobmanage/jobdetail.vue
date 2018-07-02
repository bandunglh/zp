<template>
    <div class="newjob_wrap">
        <header class="header_top">
            <img @click='$router.go(-1)' class="back" src='@/assets/back.png' width="25" height="22">
            <span class="title">职位详情</span>
        </header>
            <ul>
                <li class="nw_lists">
                    <div class="nwl_header">
                        <img :src='company.headimgurl' width="36px" height="36px">
                        <div class="name">
                            <p>{{company.name}}</p>
                            <p>{{jobInfo.createdDesc}}</p>
                        </div>
                    </div>
             

                    <main class="post-info">
           
                        <section class="post-desc">
                            <h1 class="item-desc"><span class="title-line"></span>岗位描述</h1>
                            <p class="pd_post" >
                                <span>{{ jobInfo.post }}</span>
                                <span style="font-weight:700;float:right;color:#6eebdd" v-show="jobInfo.salaryStart">{{ jobInfo.salaryStart + 'k~' + jobInfo.salaryEnd + 'k'}}</span>
                                <span style="font-weight:700;float:right;color:#6eebdd" v-show="!jobInfo.salaryStart">面议</span>

                            </p>

                            <div class="content-tex">
                                <pre class='question-content'>{{ jobInfo.description }}</pre>
                            </div>
                            <ul class="item-bottom_other">
                                <li>
                                    <span><img src="../img/briefcase@2x.png" alt="" style="vertical-align: middle"></span>
                                    <span class="item-bottom_msg">{{ jobInfo.workingType == 1 ? '全职' : jobInfo.workingType == 2 ? '兼职' : '不限' }}</span>
                                </li>
                                <li>
                                    <span><img src="../img/award@2x.png" alt="" style="vertical-align: middle"></span>
                                    <span class="item-bottom_msg">{{ jobInfo.jobCategory }}</span>
                                </li>
                                <li>
                                    <span><img src="../img/flag@2x.png" style="vertical-align: middle"></span>
                                    <span class="item-bottom_msg">{{jobInfo.provinceName+jobInfo.cityName}}</span>
                                </li>
                            </ul>
                            

                            <div v-if="jobInfo.certMajorL1">
                                <h1 class="item-desc"><span class="title-line"></span>上岗证书要求</h1>
                            
                                <p style="padding-left: 16px;padding-bottom: 20px">
                                    {{jobInfo.certMajorL1}}<span style="position: relative;top: -4px;padding: 0 5px"> . </span>
                                    {{jobInfo.certMajorL2}}
                                </p>
                            </div>
                            
                            

                        </section>
                        <section class="category-info"  v-show="jobInfo.projectName" style="border-bottom: 6px solid #eee;padding-bottom: 20px">
                            <h1 class="item-desc"><span class="title-line"></span>项目描述</h1>
                            
                            <div class="project">项目名称: {{jobInfo.projectName}}</div>
                            <div class="project">项目描述: <pre class='question-content'>{{ jobInfo.projectDesc }}</pre></div>
                            <div class="project">项目开工时间: {{ jobInfo.startTime }}</div>
                            <div class="project">项目竣工时间: {{ jobInfo.endTime }}</div>

                        </section>

                        <section class="pd">
                            <h1 class="item-desc"><span class="title-line"></span>基本信息</h1>
                            <ul>
                                <li>公司名称:<span style="margin-left:35px;">{{company.name}}</span></li>
                                <li>
                                    <span>地址:</span><span style="margin-left:66px;">{{company.provinceName + company.cityName + company.countryName }}</span>
                                    <p style='padding-top: 14px'><span>详细地址:</span><span style="margin-left: 30px;">{{ company.address }}</span></p>
                                </li>
                                <li>联系人:<span style="margin-left:45px;">{{company.contactName ? company.contactName : '无'}}</span></li>
                                <li>联系方式：<span style="margin-left:13px;">{{ company.tel? company.tel : '无' }}</span></li>
                                <li>
                                    <p>公司简介：</p>
                                    <p style="margin-top: 10px;line-height: 23px"><pre class='question-content'>{{company.description?company.description : '无'}}</pre></p>
                                </li>
                            </ul>
                        </section>
                    </main>
                    
                    


                </li>
            </ul>
            <div class="nwl_btn">
                <span @click="modifyjob(1)" v-if="!jobInfo.isClosed">关闭招聘</span>
                <span @click="modifyjob(0)" v-if="jobInfo.isClosed">开启招聘</span>
            </div>
    </div>
</template>
<script>
import {findById, updatejob} from '@/api/company.js'
import {formatDate} from '@/utils/date.js'
export default {
    created () {
        this.id = this.$route.query.id
        this.getdetail()
    },
    data () {
        return {
            id: '',
            jobInfo: {},
            company: {}
        }
    },
    filters: {
        formatDate (time) {
            let date = new Date(time)
            return formatDate(date, 'yyyy-MM-dd')
        }
    },
    methods: {
        getdetail () {
            findById(this.id).then(res => {
                if (res.data.result == 0) {
                    this.jobInfo = res.data.datas
                    this.company = res.data.datas.company
                }
            })
        },
        modifyjob (val) {
            let fdata = {
                'id': this.id,
                'jobCategoryId': this.jobInfo.jobCategoryId,
                'post': this.jobInfo.post,	
                'certMajorL1Id': this.jobInfo.certMajorL1Id,
                'certMajorL2Id': this.jobInfo.certMajorL2Id,
                'description': this.jobInfo.description,
                'workingType': this.jobInfo.workingType,
                'sex': this.jobInfo.SEX,
                'province': this.jobInfo.province,
                'city': this.jobInfo.city,	
                'contactName': this.jobInfo.contactName,
                'email': this.jobInfo.email,
                'cellNumber': this.jobInfo.cellNumber,	
                'projectProvince': this.jobInfo.projectProvince,
                'projectCity': this.jobInfo.projectCity,
                'projectCountry': this.jobInfo.projectCountry,
                'projectName': this.jobInfo.projectName,
                'projectDesc': this.jobInfo.projectDesc,
                'startTime'	: this.jobInfo.startTime,
                'endTime': this.jobInfo.endTime,
                'isClosed':	val
            }

             updatejob(fdata).then(res => {
                if (res.data.result == 0) {
                    this.getdetail()
                }
            })
        }
    }
}
</script>

<style scoped lang="less">
.newjob_wrap {
    background-color: #fff;
    margin-top: 54px;
    overflow: auto;
}
.nw_lists {
    padding: 20px 16px;
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
    margin-bottom: 40px;
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
.nwl_btn {
    width: 100%;
    text-align: center;
    padding: 40px 0;
    background: #ebebeb;
    // margin: 20px 0;
}
.nwl_btn span {
    display: inline-block;
    width: 116px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    background-color: #6febdb;
    border-radius: 4px;
    color: #fff;
    font-size: 18px;
}
.nwl_btn span:first-child {
    margin-right: 35px;
}

.pd_post 
{
    font-weight: 700;
    font-size: 17px;
    padding-left: 16px;
    padding-bottom: 15px;

}
.pd_post span:first-child {
    display: inline-block;
    max-width:calc(100% - 90px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 700;
    font-size: 17px;
}
section
{
    margin-top: 8px;
    background: #fefefe;
}
.post-desc{
    min-height: 240px;
    border-bottom: 6px solid #eee;
}
.item-desc {
    padding: 20px 0;
    font-size: 18px;
    font-weight: 700;
}
.content-tex{
    font-size: 16px;
    line-height: 26px;
    padding-left: 16px;
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
.title-line{
    display: inline-block;
    width: 6px;
    height: 18px;
    background: #6eebdd;
    vertical-align: top;
    margin-right: 10px;
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
.item-bottom_other{
    padding: 0 16px;
    margin-top: 10px;
    li{
        display: inline-block;
        margin-right: 10px;
        max-width: 32%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        min-width: 10%;
        padding: 2px 0;
    }
}
.project {
    line-height: 32px;
    font-size: 17px;
    padding-left: 16px;
}

.pd {
    position: relative;
    min-height: 196px;
    // border-top: 6px solid #eee;
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
