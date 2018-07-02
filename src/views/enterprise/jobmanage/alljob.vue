<template>
    <div class="enterpriseInfo_wrap all_wrap">
        <header class="header_top">
            <img @click='$router.go(-1)' class="back" src='@/assets/back.png' width="25" height="22">
            <span class="title">职位发布</span>
        </header>
        <div class="ew-item">
            <p class="main_title">岗位类别</p>
            <div class="ewn_right" @click="$refs.stationtype.byShow = true">
                <span>{{jobCategoryname}}</span>
                <router-link to='' class="jump"></router-link>
            </div>
         </div>
        <div class="ew-item">
            <p class="main_title">岗位名称</p>
            <div class="ewn_right" @click="$refs.stationame.byShow = true">
                <span>{{fdata.post}}</span>
                <router-link to='' class="jump"></router-link>
            </div>            
        </div>

        <div class="ew-item">
            <p class="main_title">性别要求</p>
            <group>
                <radio :options="sexoptions" v-model="fdata.sex" :max=1 :selected-label-style="{color: '#4ee1d1'}"></radio>
            </group>
        </div>

        <div class="ew-item">
            <p class="main_title">上岗证</p>
            <p style="padding-left: 16px;font-size: 17px"><span style="padding-right: 20px">{{majorL1Name}}</span> {{majorL2Name}}</p>
            <div class="ewn_right" @click="$refs.lisence.byShow = true">
                <span></span>
                <router-link to='' class="jump"></router-link>
            </div>
         </div>
        <div class="ew-item">
            <p class="main_title">工作地点</p>
            <div style="margin-top: 20px">
               <v-site :a='true' @sitechange='sitechange' :showtitle='true'></v-site> 
            </div>
        </div>

        <div class="ew-item">
            <p class="main_title">工作性质</p>
            <group>
                <radio :options="jobTimeoptions" 
                    v-model="fdata.workingType" 
                    :max=1 
                    :selected-label-style="{color: '#4ee1d1'}">
                </radio>
            </group>
        </div>

        <div class="ew-item">
            <p class="main_title">薪资范围</p>
            <div @click="showMony">
                <span style="position: absolute;
                    right: 20px;
                    top: 21px;
                    font-size:16px">{{picker1}}
                </span>
                <span :class="flag ? 'jt-icon-change' : 'jt-icon'"></span>
            </div>
            <mypicker ref='mypicker' @changeMony='changeMony' @changeflag='flag = false'></mypicker>
        </div>    

        <div class="ew-item">
            <p class="main_title">岗位描述</p>
            <textarea rows='6' class="describe" v-model="fdata.description"></textarea>
         </div>

        

        <div class="ew-item">
            <p class="main_title">项目名称</p>
            <input type='text' class="project_name" v-model="fdata.projectName">
            
        </div>
        <div class="ew-item">
            <p class="main_title">时间</p>
            <v-time @timechange='timechange'></v-time>

        </div>
        <div class="ew-item">
            <p class="main_title">项目地点</p>
            <v-site @sitechange='projectchange' :a='false' :showtitle='true'></v-site>
        </div>

        <div class="ew-item">
            <p class="main_title">项目描述</p>
            <x-textarea :rows='7' :col='25' class="weui-textarea describe" v-model="fdata.projectDesc" show-counter :max=200></x-textarea>
        </div>
        
        <div class="ew_footer">
            <span>保存</span>
            <span @click="post">提交</span>
        </div>


        
        <lisence ref='lisence' @chooselisence='chooselisence'></lisence>
        <stationtype ref='stationtype' @choosetype='choosetype'></stationtype>
        <stationame ref='stationame' @choosename='choose' ></stationame>

        <toast v-model="showtoast" type="text" width="20em">{{toastmes}}</toast>
   
    </div>
</template>

<script>
import VTime from '@/components/time.vue'
import VSite from '@/components/site.vue'
import mypicker from '@/components/mypicker'
import lisence from '@/views/enterprise/jobpost/lisence'
import stationame from '@/views/enterprise/jobpost/stationame'
import stationtype from '@/views/enterprise/jobpost/stationtype'
import { listByTypeAndPid } from '@/api/dictionary'
import { postjob, findOneCompany } from '@/api/company.js'
import { Toast,XInput,XTextarea,Checklist, Radio, Group,Alert} from 'vux'

export default {
    components: {
        VTime,
        VSite,
        lisence,
        stationame,
        stationtype,
        Group,
        Radio,
        XInput,
        XTextarea,
        mypicker,
        Toast
    },
    created () {
        this.getCompany()
    },
    data () {
        return {
            showtoast: false,
            toastmes: '',
            flag: false,
            picker1: "点击选择",
            sexoptions: [{key: '1', value: '男'}, {key: '2', value: '女'},{key: '0', value: '不限'}],
            jobTimeoptions: [{key: '1', value: '全职'}, {key: '2', value: '兼职'},{key: '0', value: '不限'}],
            showstationame: false,
            showstationtype: false,
            jobCategoryname: '',
            fdata: {
                jobCategoryId: '',
                post: '',
                certMajorL1Id: '',
                certMajorL2Id: '',
                description: '',
                workingType: 1,
                sex: 1,
                province:'',
                provinceName : "",
                cityName: "",
                city: '',
                contactName:'',
                email: '',
                cellNumber: '',
                projectProvinceName: '',
                projectCityName: '',
                projectCountryName: '',
                projectProvince: '',
                projectCity:'',
                projectCountry: '', 
                projectName:'',
                projectDesc:'',
                startTime: '',
                endTime: '',
                salaryEnd: '',
                salaryStart: ''
            },
            majorL1Name: '',
            majorL2Name: ''
            
        }
    },
    methods: {
        changeMony(p, val){
            this.flag = false
            if (val[0] == '00') {
                this.picker1 = p[0]
                this.fdata.salaryStart = val[0].substr(0, 1)
                this.fdata.salaryEnd = val[1].substr(0, 1)
            } else {
                this.picker1 = p.join("~");
                this.fdata.salaryStart = val[0]
                this.fdata.salaryEnd = val[1]                
            }
            
         },
        showMony(){
            this.$refs.mypicker.pickerShow = true;
            this.flag = true
        },
        post () {
            if (this.fdata.jobCategoryId == '') {
                this.showtoast = true
                this.toastmes = '请选择岗位类别'
                return
            }
            if (this.fdata.post == '') {
                this.showtoast = true
                this.toastmes = '请选择岗位名称'
                return
            }
            if (this.fdata.certMajorL1Id == '') {
                this.showtoast = true
                this.toastmes = '请选择上岗证专业'
                return
            }
            if (this.fdata.province == '') {
                this.showtoast = true
                this.toastmes = '请选择工作工作地点'
                return
            }
            if (this.fdata.salaryEnd == '') {
                this.showtoast = true
                this.toastmes = '请选择薪资范围'
                return
            }
            if (this.fdata.description == '') {
                this.showtoast = true
                this.toastmes = '请填写岗位描述'
                return
            }
            
            // if (this.fdata.contactName == '') {
            //     this.showtoast = true
            //     this.toastmes = '请填写联系人姓名'
            //     return
            // }
            // if (this.fdata.email == '') {
            //     this.showtoast = true
            //     this.toastmes = '请填写联系人邮箱'
            //     return
            // }
            // if (this.fdata.cellNumber == '') {
            //     this.showtoast = true
            //     this.toastmes = '请填写联系人手机号'
            //     return
            // }
            postjob(this.fdata).then(res => {
                if (res.data.result == 0) {
                    this.$router.go(-1)
                }
            })
        },
        choose (val) {
            this.fdata.post = val.name
        },
        choosetype (val) {
            this.jobCategoryname = val.name
            this.fdata.jobCategoryId = val.id
        },
        chooselisence(val) {
             this.fdata.certMajorL1Id = val.majorL1Id
            this.fdata.certMajorL2Id = val.majorL2Id
            this.majorL1Name = val.majorL1Name
            this.majorL2Name = val.majorL2Name

        },
        sitechange (val) {
            this.fdata.province = val.province.code
            this.fdata.provinceName = val.province.value
            this.fdata.city = val.city.code
            this.fdata.cityName = val.city.value
         },
        projectchange (val) {
            this.fdata.projectProvince = val.province.code
            this.fdata.projectProvinceName = val.province.value
            this.fdata.projectCity = val.city.code
            this.fdata.projectCityName = val.city.value
            this.fdata.projectCountry = val.area.code
            this.fdata.projectCountryName = val.area.value
        },
        timechange (flag, val) {
            if (flag == 0) {
                this.fdata.startTime = val
            } else {
                this.fdata.endTime = val
            }
        },
        getCompany () {
            findOneCompany().then(res => {
                if (res.data.result == 0) {
                    let data = res.data.datas
                    this.fdata.contactName = data.contactName
                    this.fdata.email = data.email
                    this.fdata.cellNumber = data.tel
                }
            })
        }
    }
}
</script>

<style>
.enterpriseInfo_wrap {
    margin-top: 60px;
}
.all_wrap .ew-item {
    position: relative;
    margin: 0 20px;
    padding: 20px 0;
}
.ew-item + .ew-item {
    border-top: 1px solid #6eebdd;
}
.ew-item .subtitle {
    padding: 20px 0 20px 14px;
}
.ew-item .describe {
    position: relative;
    left: 50%;
    top: 0;
    width: 94%;
    transform: translate(-50%,0);
    resize: none;
    border: none;
    padding: 10px 6px;
    background-color: #fff;
    font-size: 18px;
    border: 1px solid #eee;
}
.ew_footer {
    display: flex;
    align-items: center;
    margin-bottom: 50px;
}
.jump {
    padding: 2px;
}
.jt-icon {
    background-size: 12px 12px;
    background-repeat: no-repeat;
    top: 24px;
}
</style>
