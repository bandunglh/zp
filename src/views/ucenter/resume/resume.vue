<template>
    <div class="enterpriseInfo_wrap resume">
        <header class="header_top">
            <img @click='$router.go(-1)' class="back" src='@/assets/back.png' width="25" height="22">
            <span class="title">我的简历</span>
        </header>
        <div class="ew_bottom" v-show="ew_bottom">
            <div class="ew-item ew_name">
                <p class="main_title">姓名</p>
                <div class="weui-cells">

                        <div class="weui-cell__bd">
                            <input class="weui-input" v-model.trim="rdata.name" type="text" placeholder="请输入姓名"/>
                        </div>

                </div>
            </div>
            <div class="ew-item">
                <p class="main_title">性别</p>
                <group>
                    <radio :options="sexoptions" v-model="rdata.sex" :max=1 :selected-label-style="{color: '#4ee1d1'}"></radio>
                </group>
            </div>

            <p class="main_title" style="float:left;margin-left: 20px;">出生年月</p>
            <group style="font-size: 14px;position: relative;top: -20px;padding-left: 20px;">
                <datetime
                    title="" 
                    v-model="rdata.birthday"
                    start-date='1900-01-01'
                    @on-change="changeBir"
                    placeholder="点击选择">
                    </datetime>
            </group>
            <div class="ew-item">
                <p class="main_title">上传照片</p>
                <myuploadimg @outimg='outimg' style="margin-top: 15px" ref='upload'></myuploadimg>
             
            </div>
        
            <div class="ew-item" style="padding-bottom: 0">
                <p class="main_title" style="margin-bottom: 20px;">联系信息</p>
                <div :class="kaiguan" @click="kaiGuan">
                    <span>{{rdata.isOpen == 0 ? '隐藏' : '公开'}}</span>
                    <span :class="dian"></span>
                </div>
                <group style="margin-left: -10px;">
                    <x-input type='tel' is-type='china-mobile' @on-change = 'getinput' v-model="rdata.tel" placeholder="请填写手机号码"></x-input>
                </group>
            </div>
    
            <div v-show="showcertificate">
                <div class="ew-item ew_intro">
                    <p class="main_title">毕业信息</p>
                    <div class='graduation_list' v-for="(item,index) in rdata.diplomasData" :key='index'>
                        <span>{{item.majorName}}</span>
                        <span>{{item.typeName}}</span>
                        <span @click.stop="deletegraduate(item)">删除</span>
                    </div>
                    <div class="graAdd" @click="graAdd">
                        <img src="../../../assets/add_icon.png" width="25" height="25px" >
                    </div>
                </div>

                <div class="ew-item ew_intro">
                    <p class="main_title">上岗证</p>
                    <div class='graduation_list' v-for="(item,index) in rdata.licenseData" :key='index'>
                        <span>{{item.majorL2}}</span>
                        <span>{{item.typeName}}</span>
                        <span @click.stop="deletepost(item)">删除</span>
                    </div>
                    <div class="graAdd"  @click="certAdd">
                        <img src="../../../assets/add_icon.png" width="25" height="25px">
                    </div>
                </div>

                <div class="ew-item ew_intro">
                    <p class="main_title">职称</p>
                    <div class='graduation_list' v-for="(item,index) in rdata.titleData" :key='index'>
                        <span>{{item.majorName}}</span>
                        <span>{{item.levelName}}</span>
                         <span @click.stop="deletetitle(item)">删除</span>
                    </div>
                    <div class="graAdd"  @click="titleAdd">
                        <img src="../../../assets/add_icon.png" width="25" height="25px">
                    </div>
                </div>
            </div>


            <div class="ew-item ew_intro">
                <p class="main_title">从业时间</p>
                <div  @click="showAge">
                    <span style="position: absolute;right: 20px;top: 21px;font-size:14px">
                        {{picker2}}
                    </span>
                    <span :class="jticon"></span>
                </div>

                <picker :data='dataAge' :fixed-columns="1" :columns=1  v-model='dataAgeValue' 
                        @on-change='changeAge' 
                        ref="picker2" 
                        v-if="ageShow">
                </picker>
                
            </div>

            <div class="ew-item ew_intro">
                <p class="main_title" style="margin-bottom: 0">个人简介</p>
                <x-textarea class="weui-textarea" :rows='6' :col='25' v-model.trim="rdata.description" show-counter :max=200 placeholder="请输入个人简介"></x-textarea>
            </div>

            <div class="ew-item">
                <p class="main_title">隐藏简历</p>
                <group>
                    <radio :options="scopeoptions" v-model="rdata.scope" :max=1 :selected-label-style="{color: '#4ee1d1'}"></radio>
                </group>
            </div>

            <div class="ew_footer">
                <span @click="submit(1)">暂存</span>
                <span @click="submit(2)">发布</span>
            </div>
        </div>
        

        <div class="likeDialog" v-if="byShow" style="z-index: 1000">
            <header class="header_top" >
                <img @click='byShow = false' class="back" src='../img/back.png' width="25" height="22">
                <span class="title">毕业信息</span>
            </header>
            <div class="gra-head bg-need paddings">
                毕业信息
            </div>
            <div class="record">
                学历
            </div>
            <div class="record_detail" >
                <span class='rd_list'
                    v-for="(item,index) in degreeList"
                    :class="noweducation == index ? 'rd_list_active' : ''"
                    :key="index"
                    @click="getEducation(item,index)"
                    v-show="item.name">
                {{ item.name }}
                </span>
            </div>
            <div class="record">
                证书专业
            </div>
            <div class="record_detail" >
                <span class='rd_list'
                    v-for="(item,index) in cerList"
                    :class="nowdegreen == index ? 'rd_list_active' : ''"
                    :key="index"
                    @click="getDegree(item,index)"
                    v-show="item.name">
                    {{ item.name }}
                </span>

                <flexbox :gutter="0"> 
                    <flexbox-item :span='0.8'>
                        <group>
                            <x-input 
                                title="添加证书"
                                v-model.trim="inputValue" 
                                placeholder="请输入证书名称">
                            </x-input>
                        </group>
                    </flexbox-item>
                    <flexbox-item style="margin-left: 10px;">
                        <x-button style="background-color: #6eebdb;color: #fff" @click.stop.native="addNewMajory">添加</x-button>
                    </flexbox-item>
                </flexbox>
            </div>
            <div class="submit_btn"><span @click="submitEdu">确定提交</span></div>
        </div>


        <div class="likeDialog" v-if="zcShow"  style="z-index: 1000">
            <header class="header_top">
                <img @click='zcShow = false' class="back" src='../img/back.png' width="25" height="22">
                <span class="title">职称信息</span>
            </header>
            <div class="gra-head bg-need paddings">
                职称信息
            </div>

            <div class="record">
                职称等级
            </div>
            <div class="record_detail">
                <span class='rd_list'
                    v-for="(item,index) in postlist"
                    :class="noweducation == index ? 'rd_list_active' : ''"
                    :key="index"
                    @click="getTitleRange(item,index)">
                {{ item.name }}
                </span>
            </div>
            <div class="record">
                职称专业
            </div>
            <div class="record_detail" >
                <span class='rd_list'
                    v-for="(item,index) in prolist"
                    :class="nowTitle == index ? 'rd_list_active' : ''"
                    :key="index"
                    @click="getTitleDegree(item,index)"
                    v-show="item.name">
                    {{ item.name }}
                </span>

                <flexbox :gutter="0"> 
                    <flexbox-item :span='0.8'>
                        <group>
                            <x-input 
                                title="添加职称"
                                v-model.trim="inputValue_2" 
                                placeholder="请输入职称名称">
                            </x-input>
                        </group>
                    </flexbox-item>
                    <flexbox-item style="margin-left: 10px;">
                        <x-button style="background-color: #6eebdb;color: #fff" @click.stop.native="addNewTitle">添加</x-button>
                    </flexbox-item>
                </flexbox>
            </div>
            
            <div class="submit_btn"><span @click="addProfessionalTitle">确定提交</span></div>

        </div>

        <div class="likeDialog" v-if="zsShow"  style="z-index: 1000">
            <header class="header_top">
                <img @click='zsShow = false' class="back" src='../img/back.png' width="25" height="22">
                <span class="title">上岗证</span>
            </header>
            

            <group>
                <cell
                    title="证书类别"
                     @click.native="showContent001 = !showContent001"
                    style="background-color: #f5f5f5;margin-top: 54px;">
                </cell>

                <template>
                    <div v-for="(item,index) in raoptions" 
                        :key="index"
                        @click="getMost(item,index)">
                        <cell-box 
                            :border-intent="false" 
                            :class="some == index ? 'rd_list_active' : ''">
                            {{item.name}}
                        </cell-box>
                    </div>
                </template>
            </group>
           
            <div class="gra-head bg-need paddings" style="position:relative;" @click.stop="show">
                上岗证专业
                <span class="info-jticon-toRight"></span>
            </div>

             <div class="submit_btn"><span @click.stop="zsSure">确定提交</span></div>
        </div>


        <certicate ref='certicate' @postchange='postchange'></certicate>
        
        <div v-transfer-dom>
             <alert v-model="messageShow"
                title="提示">
                  {{  resMessage }}
            </alert>
        </div>

        <toast v-model="showtoast" type="text" width="20em">{{toastmes}}</toast>

    </div>
</template>

<script>
import {Toast, Cell, CellBox, CellFormPreview,Datetime,Picker,XButton ,XInput,XTextarea,Checklist, Radio, Group,Alert,TransferDomDirective as TransferDom,Flexbox, FlexboxItem } from 'vux'
import mypicker from '@/components/mypicker'
import myuploadimg from '@/components/uploaderImg'
import certicate from '@/views/ucenter/resume/certificate'
import {formatDate} from '@/utils/date.js'
import { myresume } from '@/api/company.js'
import { createresume,resumedetail,addMajory,postMajory,addTitle,addPosted,removeLicense,removeDiplomas,removeTitle } from '@/api/ucenter.js'
import { listByTypeAndPid } from '@/api/dictionary'
 
export default {
    name: 'resume',
    components: {
        Datetime,
        Picker,
        XInput,
        Radio,
        Group,
        mypicker,
        Alert,
        myuploadimg,
        certicate,
        Checklist,
        XTextarea,
        Flexbox, 
        FlexboxItem,
        XButton,
        Cell,
        CellBox,
        Toast
    },
    directives: {
            TransferDom
    },
    computed: {
        ew_bottom (val) {
            if (this.byShow | this.zcShow | this.zsShow) {
                return false
            } else {
                return true
            }
        }
    },
    data () {
        return {
            picker1: "点击选择",
            monyflag: false,
            showtoast: false,
            toastmes: '',
            showContent001: false,
            sexoptions: [{key: '1', value: '男'}, {key: '2', value: '女'}],
            scopeoptions: [{key: '0',value: '公开'},{key: '1',value: '所投递公司可见'},{key: '2',value: '只有自己可见'}],
            showcertificate: false,  
            value1: '',
            stringValue: '0',
            kaiguan: 'switch-on',
            open: true,
            dian: 'on',
            pickerShow: false,
            certicateshow: false,
            jticon: 'jt-icon',
            dataAge: [],
            dataAgeValue:[],
            ageShow: false,
            picker1: "点击选择",
            picker2: '1年',
            byShow: false,
            hideonblur: true,
            info_jticon: 'info-jticon-toDown',
            degreeList: {}, 
            cerList: {},
            postlist: {}, 
            prolist: {}, 
            nowdegreen: '-1',
            nowTitle: '-1',
            userId: '',
            noweducation: '-1',
            some:1000,
            zcShow: false,
            zsShow: false,
            cateShow: false,
            raoptions:  [],
            ravalue: '',
            rdata: {
                sex: 1,
                tel: '',
                scope: 0,  
                isOpen: 1, 
                expectedSalaryStart: null,
                expectedSalaryEnd: null,
                workingYear: null,
                picUrl: "",
            },
            bdata: {}, 
            zdata: {},
            gdata: {}, 
            messageShow: false,
            resMessage: '',
            inputValue: '',
            inputValue_2: '',
        }
    },
    created(){
        
        for (var i = 1; i <= 60; i++) {
            this.dataAge.push({
                name: i + '年',
                value: i
            })
        }

        this.getresumedetail()
        

        this.getcertificateInfo(5,'')
        this.getcertificateInfo(6,'')

        this.getcertificateInfo(3,'')
        this.getcertificateInfo(4,'')

        this.getcertificateInfo(8,'')
        this.getcertificateInfo(2,'')
    },

    methods: {
        changeMony(p, val){
            this.monyflag = false
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
        deletegraduate (val) {
            removeDiplomas(val.id).then(res => {
                if (res.data.result == 0) {
                    this.getresumedetail()
                }
            })
        },
        deletepost (val) {
            removeLicense(val.id).then(res => {
                if (res.data.result == 0) {
                    this.getresumedetail()
                }
            })
        },
        deletetitle (val) {
            removeTitle(val.id).then(res => {
                if (res.data.result == 0) {
                    this.getresumedetail()
                }
            })
        },
        show() {
            this.$refs.certicate.show()
        },
        getresumedetail () {
            resumedetail().then( res => {
                if( res.data.result ==0 ) {
                    if (res.data.datas != null) {
                        this.rdata = res.data.datas
                        this.$refs.upload.imgsrc = this.rdata.picUrl
                        this.rdata.birthday = this.datachange(this.rdata.birthday)
                        this.rdata.diplomasData = res.data.datas.diplomasData
                        this.rdata.titleData = res.data.datas.titleData
                        
                        this.rdata.licenseData = res.data.datas.licenseData
                        
                        this.picker2 = this.rdata.workingYear + '年'
                        this.dian = this.rdata.isOpen == 0 ? 'off' : 'on'
                        this.showcertificate = true
                        this.userId = res.data.datas.userId
                        this.bdata.userId = res.data.datas.userId
                        this.zdata.userId = res.data.datas.userId
                        this.gdata.userId = res.data.datas.userId
                    } else {
                        this.showcertificate = false
                    }
                }
                    
            })
        },
        getcertificateInfo (type, pid) {
            listByTypeAndPid(type, pid).then(res => {
                if (res.data.result == 0) {
                    switch(type)
                    {
                        case 3: this.postlist  =  res.data.datas;break;
                        case 4: this.prolist  =  res.data.datas;break;
                        case 5: this.degreeList = res.data.datas; break;
                        case 6: this.cerList = res.data.datas;break;
                        case 8: this.raoptions = res.data.datas;;break;
                    }
                }
            })
        },

        datachange (time) {
                let date = new Date(time)
                return formatDate(date, 'yyyy-MM-dd')
        },
        getinput(val) {
            this.rdata.tel = val
        },
        submit (flag) {
            this.rdata.status = flag
            if (this.rdata.name == '') {
                this.showtoast = true
                this.toastmes = '请输入姓名'
                return
            }
            if (this.rdata.birthday == '') {
                this.showtoast = true
                this.toastmes = '请选择出生日期'
                return
            }
            
            if (this.rdata.tel == '') {
                this.showtoast = true
                this.toastmes = '请输入联系电话'
                return
            } else if (!/^1[0-9]{10}$/.test(this.rdata.tel)) {
               
                this.showtoast = true
                this.toastmes = '手机号格式不正确'
                return
            }
            if (this.rdata.expectedSalaryStart == '') {
                this.showtoast = true
                this.toastmes = '请选择薪酬'
                return
            }
            if (this.rdata.workingYear == '') {
                this.showtoast = true
                this.toastmes = '请选择工作年限'
                return
            }
            if (this.rdata.description == '') {
                this.showtoast = true
                this.toastmes = '请输入个人简介'
                return
            }
            
            let pdata = {
                name: this.rdata.name,
                sex: this.rdata.sex,
                birthday: this.rdata.birthday,
                picUrl: this.rdata.picUrl,
                workingYear: this.rdata.workingYear,
                description: this.rdata.description,
                tel: this.rdata.tel,
                isOpen: this.rdata.isOpen,
                scope: this.rdata.scope,
                mail: this.rdata.mail,
                status: this.rdata.status,
            }
             createresume(pdata).then(res => {
                if (res.data.result == 0) {
                    this.$router.go(-1)
                }
            })
        },
        geiValue(val){
            
        },
        changeBir(){
             
        },
       
        showMony(){
            if(this.$refs.mypicker.pickerShow == false){
                this.$refs.mypicker.pickerShow = true;
                this.jticon = 'jt-icon-change'
            }else{
                this.$refs.mypicker.pickerShow = false;
                this.jticon = 'jt-icon'
            }
        },
         changeAge(val){
            this.picker2 = val[0] + '年'
            this.rdata.workingYear = val[0]
         },
         showAge(){
            if(this.ageShow == false){
                this.ageShow = true;
                this.jticon = 'jt-icon-change'
            }else{
                this.ageShow = false;
                this.jticon = 'jt-icon'
            }
        },
         kaiGuan(){
             if( this.dian == 'on'){
                this.dian = 'off'
             }else{
                this.dian = 'on'
            }
        },
         showInfo(){
            if(this.info_jticon == 'info-jticon-toDown'){
                this.info_jticon = 'info-jticon-toRight'
            }else{
                this.info_jticon = 'info-jticon-toDown'
            }
        },
         getEducation(item, i){
            this.noweducation = i
            this.bdata.typeId = item.id
            this.bdata.typeName = item.name
         },
         getDegree(item, i){
             this.nowdegreen = i
            this.bdata.majorId = item.id
            this.bdata.majorName = item.name
         },

         
        addNewMajory () {
            if (this.inputValue == '') {
                this.messageShow = true;
                this.resMessage = '请填写证书名称'
                return
            }
            let data = {
                name: this.inputValue,
                pid: 0,
                type: 6
            };
            addMajory(data).then(res => {
                this.bdata.majorId = res.data.datas.id;
                this.bdata.majorName = res.data.datas.name;
              
                
                this.getcertificateInfo(5,'')
                this.getcertificateInfo(6,'')
            })

        },
         
        submitEdu(){
            if (this.bdata.typeId == undefined) {
                this.messageShow = true
                this.resMessage = '请选择学历'
                return
            }
            if (this.bdata.majorId == undefined) {
                this.messageShow = true
                this.resMessage = '请选择证书专业'
                return
            }
            
            postMajory(this.bdata).then(res => {
                 if(res.data.message == 'success'){
                     if(res.data.message == 'success'){
                        this.byShow = false
                        this.getresumedetail()
                    }else {
                        this.resMessage = '提交失败，'+res.data.message
                    }
                }

            })
        },


         getTitleRange(item,index){
            this.noweducation = index;
            this.zdata.levelId = item.id;
            this.zdata.levelName = item.name;
        },
         addNewTitle(){
            if (this.inputValue_2 == '') {
                this.messageShow = true;
                this.resMessage = '请填写职称名称'
                return
            }
            let data = {
                name: this.inputValue_2,
                pid: 0,
                type: 4
            };
             addMajory(data).then(res => {
                 if(res.data.message == 'success'){
                     this.getcertificateInfo(3,'')
                    this.getcertificateInfo(4,'')
                 }
             })
        },
        getTitleDegree(item,index){
            this.nowTitle = index;
            this.zdata.majorId = item.id;
            this.zdata.majorName = item.name;
        },


        addProfessionalTitle(){
           
            addTitle(this.zdata).then(res => {
                if(res.data.message == 'success'){
                    
                    if(res.data.message == 'success'){
                        
                        this.zcShow = false
                        
                        this.getresumedetail()
                    }else {
                        this.resMessage = '提交失败，'+res.data.message
                    }
                }
            })
        },

        getMost(item,index){
            this.nowcategory = index;
            this.some = index;
            this.gdata.categoryId = item.id;
            this.gdata.categoryName = item.name;
            this.showContent001 = false
        },
        postchange (val) {
            this.gdata.majorL1Id = val.majorL1Id
            this.gdata.majorL1Name = val.majorL1Name
            this.gdata.majorL2Id = val.majorL2Id
            this.gdata.majorL2Name = val.majorL2Name
             
        },
        zsSure(){
            if (this.gdata.categoryId == undefined) {
                this.messageShow = true;
                this.resMessage = '请选择证书类别'
                return
            }
            if (this.gdata.majorL1Id == undefined) {
                this.messageShow = true;
                this.resMessage = '请选择上岗证类别'
                return
            }
            

            let fdata = {
                userId: this.gdata.userId,
                majorL1Id: this.gdata.majorL1Id,
                majorL1: this.gdata.majorL1Name,
                majorL2Id: this.gdata.majorL2Id,
                majorL2: this.gdata.majorL2Name,
                typeId: this.gdata.categoryId,
                typeName: this.gdata.categoryName
            }
            
            addPosted(fdata).then(res => {
                if (res.data.result == 0) {
                  
                    this.zsShow = false
                    
                    this.getresumedetail()
                }
            })
        },

      
        graAdd(){
            this.byShow = true;
        },
      
        titleAdd(){
            this.zcShow = true;
        },
        
        certAdd(){
            this.zsShow = true;
        },
       
        outimg(val){
            this.rdata.picUrl = val
        }

    },
    watch: {
        dian (val) {
            if (val == 'on') {
                return this.rdata.isOpen = 1
            } else {
                return this.rdata.isOpen = 0
            }
        }
    },
    destroyed () {
        this.$router.push('/home/ucenter')
    }
}
</script>

<style lang="less" scoped>
.enterpriseInfo_wrap  {
    position: relative;
    margin-top: 50px;
    background: #fff;
}

input, textarea {
    outline: none
}
.ew-item {
    margin: 0px 20px 10px 20px;
    padding: 20px 0;
    position: relative;
}
.ew-item + .ew-item {
    border-top: 1px solid #efefef;
}

.ew_name {
    padding-bottom: 0;
    background: url(../img/CombinedShape@2x.png) 100% 20px no-repeat
}

.graduation_list {
    border-bottom: 1px solid #eee;
    padding: 15px 6px;
    font-size: 17px;
    display: flex;
    align-items: center;
}
.graduation_list span {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 2px 0;
}
.graduation_list span:nth-child(2) {
   text-align: center;
}
.graduation_list span:last-child {
    text-align: right;
    color: #6eebdd;
}
.ewc_item {
    padding-top: 20px;
    padding-left: 10px;
    font-size: 14px;
}
.ew_footer {
    width: 100%;
    height: 116px;
    line-height: 116px;
    background-color: #ebebeb;
    text-align: center;
}
.ew_footer span:first-child {
    margin-right: 14px;
}
.upload-img{
    padding: 20px 0 0 20px;
}
.add{
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 60px;
    font-weight: 100;
    color: #d8d8d8;
    border: 2px solid #d8d8d8;
    border-radius: 4px;
}
.switch-on{
    position: absolute;
    right: 10px;
    top: 15px;
    width: 68px;
    line-height: 18px;
    height: 26px;
    padding: 2px 8px;
    border: 1px solid #6eebdd;
    border-radius: 10px;
    font-size: 14px;
}
.on{
    display: block;
    float: right;
    width: 15px;
    height: 15px;
    background: #6eebdd;
    border-radius: 50%;
    margin-top: 2px;
}
.off{
    display: block;
    float: left;
    width: 15px;
    height: 15px;
    background: #dedede;
    border-radius: 50%;
    margin: 2px 4px 0 0;
}
.jt-icon{
    position: absolute;
    right: 0;
    top: 20px;
    display: block;
    width:16px;
    height: 16px;
    font-weight: 700;
    background: url(../img/jt-right.png);
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
/* 毕业信息 */
.likeDialog{
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 333;
    background: #fff;
    overflow:scroll;
}
.bg-need{
    background: #f5f5f5;
    font-size: 18px;
}
.paddings{
    padding:0 20px;
}
.gra-head{
    height: 56px;
    line-height: 56px;
    font-size: 18px;
}
.mydegree{
    position: relative;
}

.paddings{
    padding:0 20px;
}
.mydegree{
    position: relative;
}
.info-jticon-toRight{
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    display: block;
    width:16px;
    height: 16px;
    background: url(../img/jt-right.png) center right no-repeat;
    padding: 20px;
}
.info-jticon-toDown{
    position: absolute;
    right: 25px;
    top: 20px;
    display: block;
    width:16px;
    height: 16px;
    background: url(../img/jt-down.png);
}
.flex{
    display: flex;
    flex-wrap: wrap;
}
.flexed{
    flex: 0 1 23%;
    margin: 10px 1%;
    font-size: 14px;
    border: 1px solid #6eebdd;
    line-height: 1;
    text-align: center;
    padding: 2px;
}
.record {
    position: relative;
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
}
.record_detail {
    position: relative;
    padding: 8px 20px;
    background-color: #f8f8f8;
}
.rd_list_active {
    color: #fff;
    background-color: #6eebdd !important;
}
.record_detail .rd_list {
    display: inline-block;
    padding: 12px;
    border: 1px solid #6eebdb;
    font-size: 16px;
    text-align: center;
    margin: 8px;
    background-color: #fff;
    border-radius: 6px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 80%;
}
.sw_wite {
    position: absolute;
    left: 0;
    top: -3px;
    padding-left: 24px;
    background-color: transparent;
    background: url(../../enterprise/img/write@2x.png) 0 center no-repeat;
    background-size: 16px 16px;
}
.add_btn {
    position: absolute;
    bottom: 22px;
    right: 20px;
    display: inline-block;
    width: 51px;
    padding: 5px;
    text-align: center;
    color: #fff;
    font-size: 12px;
    border-radius: 4px;
    background-color: #6eebdd;
}

.submit_btn {
    width: 100%;
    height: 40px;
    height: 40px;
    text-align: center;
    margin: 30px 0;
}
.submit_btn span {
    display: inline-block;
    height: 40px;
    line-height: 40px;
    width: 150px;
    text-align: center;
    background: #6eebdb;
    color: #fff;
    border-radius: 4px;
    font-size: 18px;

}

.enterpriseInfo_wrap .weui-cells {
    margin-top: 1.17647059em;
}
.weui-cell:before {
    display: none !important;
}
.jt-icon{
    position: absolute;
    right: 0;
    top: 20px;
    display: block;
    width:16px;
    height: 16px;
    font-weight: 700;
    background: url(../img/jt-right.png);
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
.ei_age .weui-cells {
    margin-top: 0 !important;
}
.resume .scroller-content {
    z-index: 1 !important;
}
</style>
