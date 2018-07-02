<template>
    <div class="editIntent_wrap">
        <header class="header_top">
            <img @click='$router.go(-1)' class="back" src='@/assets/back.png' width="25" height="22">
            <span class="title">求职意向</span>
        </header>
        <div class="ew-item">
            <h2>求职岗位类别</h2>
            <div class="ewn_right" @click="$refs.stationtype.byShow = true">
                <span>{{jobCategoryname}}</span>
                <router-link to='' class="jump jump_ed"></router-link>
            </div>
         </div>
        <div class="ew-item">
            <h2>求职岗位名称</h2>
            <div class="ewn_right"  @click="$refs.stationame.byShow = true">
                <span>{{fdata.post}}</span>
                <router-link to='' class="jump jump_ed"></router-link>
            </div>

        </div>

        <div class="ew-item">
            <h2>工作地点</h2>
            <div style="margin-top: 20px">
                <group>
                    <x-address
                     title="请选择地址"
                     v-model="sitevalue"
                     :list="addressData"
                     :hide-district='true'
                     @on-shadow-change="sitechange">
                     </x-address>
                </group>
            </div>

        </div>

        <div class="ew-item">

            <h2>薪酬选择</h2>
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
            <h2>工作性质</h2>
            <group>
                <radio :options="jobTimeoptions" v-model="fdata.jobTime" :max=1 :selected-label-style="{color: '#4ee1d1'}"></radio>
            </group>
        </div>
        <div class="ew_footer">
            <span @click="submit()" v-if="!fdata.status && fdata.status != 0">提交</span>

            <span @click="updata(1)" v-if="fdata.status == 0">关闭</span>
            <span @click="updata(0)" v-if="fdata.status == 1">开启</span>

            <span @click="updata()" v-if="fdata.status == 0 | fdata.status == 1">修改</span>
        </div>

        <stationtype ref='stationtype'  @choosetype='choosetype'></stationtype>
        <stationame ref='stationame'  @choosename='choose'></stationame>

    </div>
</template>

<script>
import { Datetime,XAddress,ChinaAddressV4Data,Picker,XInput,XTextarea,Checklist, Radio, Group,Alert} from 'vux'
import VTime from '@/components/time'
import VSite from '@/components/site'
import {createobjective,updateById} from '@/api/objective.js'
import { listByTypeAndPid } from '@/api/dictionary'
import mypicker from '@/components/mypicker'

import stationame from '@/views/enterprise/jobpost/stationame'
import stationtype from '@/views/enterprise/jobpost/stationtype'
export default {
    components: {
        VTime,
        VSite,
        mypicker,
        stationame,
        stationtype,
        Group,
        Radio,
        XAddress
    },
    created () {
        if (this.$route.params.objitem) {

            let objdata = this.$route.params.objitem
            this.fdata.jobCategoryId = objdata.jobCategoryId
            this.fdata.post = objdata.post
            this.fdata.jobTime = objdata.jobTime
            this.fdata.province = objdata.province
            this.fdata.city = objdata.city
            this.fdata.expectedSalaryStart = objdata.expectedSalaryStart
            this.fdata.expectedSalaryEnd = objdata.expectedSalaryEnd
            this.fdata.id = objdata.id
            this.fdata.status = objdata.status

            if (this.fdata.expectedSalaryStart == '0') {
                this.picker1 = '面议'
            } else {
                this.picker1 = this.fdata.expectedSalaryStart + 'K~' + this.fdata.expectedSalaryEnd + 'k'
            }
            this.cityname = objdata.cityName
            this.provincename = objdata.provinceName
            this.jobCategoryname = objdata.jobCategoryName
            this.sitevalue[0] = objdata.province
            this.sitevalue[1] = objdata.city
        }

    },
    data () {
        return {
            sitevalue: [],
            addressData: ChinaAddressV4Data,
            flag: false,
            jobTimeoptions: [{key: '1', value: '全职'}, {key: '2', value: '兼职'},{key: '0', value: '不限'}],
            picker1: "点击选择",
            jticon: 'jt-icon',
            value2: ['1','00'],
            posttype: [],
            postname: [],
            showstationame: false,
            showstationtype: false,
            jobCategoryname: '',
            cityname: '',
            provincename: '',
            fdata: {
                jobCategoryId: Number,
                post: '',
                jobTime: 0,
                province: '',
                provinceName: '',
                cityName: '',
                city: '',
                expectedSalaryStart: Number,
                expectedSalaryEnd: Number,
            }
        }
    },
    methods: {
        submit (flag) {
            createobjective(this.fdata).then(res => {
                if (res.data.result == 0) {
                    this.$router.push('/objective')
                }
            })
        },
        updata (flag) {
            this.fdata.status = flag
            updateById(this.fdata).then(res => {
                if (res.data.result == 0) {
                    this.$router.go(-1)
                }
            })
        },
        changeMony(p, val){
            this.flag = false
            if (val[0] == '00') {
                this.picker1 = p[0]
                this.fdata.expectedSalaryStart = val[0].substr(0, 1)
                this.fdata.expectedSalaryEnd = val[1].substr(0, 1)
             } else {
                this.picker1 = p.join("~");
                this.fdata.expectedSalaryStart = val[0]
                this.fdata.expectedSalaryEnd = val[1]                
            }

            
         },
        choose (val) {
            this.fdata.post = val.name
        },
        choosetype (val) {
            this.jobCategoryname = val.name
            this.fdata.jobCategoryId = val.id
        },
        sitechange (id,name) {
            let val = {
                province: {
                    code: id[0],
                    value: name[0]
                },
                city: {
                    code: id[1],
                    value: name[1]
                },
                area: {
                    code: id[2],
                    value: name[2]
                }
            }
            this.fdata.province = val.province.code
            this.fdata.city = val.city.code
            this.fdata.provinceName = val.province.value
            this.fdata.cityName = val.city.value
        },
        showMony(){
            this.$refs.mypicker.pickerShow = true;
            this.flag = true
        },
        

    }
}
</script>

<style  scope>


.editIntent_wrap {
    margin-top: 66px;
    background-color: #fff;
    overflow: auto;
}
.editIntent_wrap .weui-cell {
    padding-right: 0;
}
.ew-item {
    position: relative;
    margin: 0 20px;
    padding: 20px 0;
}
.ew-item + .ew-item {
    border-top: 1px solid #6febdb;
}

.ew-item .describe {
    position: relative;
    left: 50%;
    top: 20px;
    width: 100%;
    transform: translate(-50%,0);
    resize: none;
    border: none;
    background-color: #eee;
    margin-bottom: 40px;
    font-size: 16px;
}

.editIntent_wrap h2 {
    padding-left: 10px;
    border-left: 6px solid #6febdb;
    font-size: 18px;
}

.jt-icon{
    position: absolute;
    right: 0;
    top: 20px;
    display: block;
    width:14px;
    height: 14px;
    font-weight: 700;
    background: url(../img/jt-right.png);
    background-size: 12px 12px;
    background-repeat: no-repeat;
    top: 24px;
}
.jt-icon-change{
    position: absolute;
    right: 0;
    top: 20px;
    display: block;
    width:16px;
    height: 16px;
    font-weight: 700;
    background: url(../img/jt-down.png);
}
.jump_ed {
    padding: 2px;
}
.ewn_right span {
    display: inline-block;
    width: 100px;
    text-align: right;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
