<template>
    <div class="enterpriseInfo_wrap ew_wrap">
        <header class="header_top">
            <img @click='$router.go(-1)' class="back" src='@/assets/back.png' width="25" height="22">
            <span class="title">企业信息</span>
        </header>
        <div>
            <div class="ew-item ew_name">
                <p class="main_title">公司名称</p>
                <input type='text' placeholder="输入名称" v-model.trim="comInfo.name">
            </div>

            <div class="ew-item">
                <p class="main_title" style="margin-bottom: 20px">公司头像</p>
                <myuploadimg @outimg='outimgavatar' style="display: inline-block;padding-left:15px" ref='upload_two'></myuploadimg>
            </div>

            <div class="ew-item ew_qualification">
                <p class="main_title" style="margin-bottom: 0">公司资质</p>
                <group>
                    <x-textarea class="weui-textarea" :rows='4' v-model.trim="comInfo.qualification" placeholder="请输入企业资质"></x-textarea>
                </group>
            </div>

            <div class="ew-item ew_place">
                <p class="main_title">公司地址</p>
                <group>
                    <x-address
                     title="请选择地址"
                     v-model="sitevalue"
                     :list="addressData"
                     @on-shadow-change="sitechange">
                     </x-address>
                </group>
                
                <group style="border-top: 1px solid #eee">
                    <x-input title="详细地址" v-model.trim="comInfo.address" placeholder="街道地址"></x-input>
                </group>
            </div>

            <div class="ew-item ew_contact">
                <p class="main_title">联系信息</p>
                <group>
                    <x-input title="姓名：" v-model="comInfo.contactName" placeholder="请输入姓名"></x-input>
                </group>
                <group>
                    <x-input mask="999 9999 9999" name="mobile" keyboard="number" is-type="china-mobile" title="电话：" @on-change='getinput' v-model="comInfo.tel" placeholder="请输入手机号"></x-input>
                </group>
                <group>
                    <x-input title="邮箱：" name="email" is-type="email"  v-model="comInfo.email" placeholder="请输入邮箱"></x-input>
                </group>
            </div>

            <div class="ew-item ew_license">
                <p class="main_title" style="margin-bottom: 20px">营业执照</p>
                <myuploadimg @outimg='outimglisence' style="display: inline-block" ref='upload'></myuploadimg>

                <group>
                    <x-input title="营业执照号：" v-model.trim="comInfo.licenseNum" placeholder="请输入营业执照号"></x-input>
                </group>
            </div>


       
            <div class="ew-item ew_intro">
                <p class="main_title" style="margin-bottom: 0">企业介绍</p>
                <group>
                    <x-textarea class="weui-textarea" :rows='4' v-model.trim="comInfo.description" placeholder="请输入企业简介"></x-textarea>
                </group>            
            </div>

            <div class="ew_footer">
                <span @click="updatecompany" v-if="comInfo.companyId">修改</span>
                <span @click="submit" v-if="!comInfo.companyId">提交</span>
            </div>
            
            <toast v-model="showtoast" type="text" width="20em">{{toastmes}}</toast>

        </div>
        
    </div>
</template>

<script>
import VSite from '@/components/site.vue'
import myuploadimg from '@/components/uploaderImg'
import {Toast, XInput,XAddress,ChinaAddressV4Data,XTextarea,Checklist, Radio, Group,Alert} from 'vux'
import {findOneCompany,createOneCompany, updateCompany} from '@/api/company.js'
export default {
    components: {
        VSite,
        myuploadimg,
        Group,
        XInput,
        XTextarea,
        XAddress,
        Toast
    },
    created () {
        this.getCompany() 
    },
    data () {
        return {
            showtoast: false,
            toastmes: '',
            sitevalue: [],
            addressData: ChinaAddressV4Data,
            comInfo: {
                headimgurl: '',
                licensePic: '',
            }
        }
    },
    methods: {
        getCompany() {
            findOneCompany().then(res => {
                if (res.data.result == 0) {
                    this.comInfo = res.data.datas
                    this.$refs.upload.imgsrc = this.comInfo.licensePic
                    this.$refs.upload_two.imgsrc = this.comInfo.headimgurl
                    
                    this.$set(this.sitevalue, 0, this.comInfo.province)
                    this.$set(this.sitevalue, 1, this.comInfo.city)
                    this.$set(this.sitevalue, 2, this.comInfo.country)
                     
                } else {
                    this.showprovince = true
                }
                
            })
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
            this.comInfo.province =  val.province.code
            this.comInfo.provinceName = val.province.value
            this.comInfo.city = val.city.code
            this.comInfo.cityName = val.city.value
            this.comInfo.country = val.area.code
            this.comInfo.countryName = val.area.value
        },
        getinput(val) {
            this.comInfo.tel = val
        },
        submit () {
            
            if (this.comInfo.name == '') {
                this.showtoast = true
                this.toastmes = '请输入公司名'
                return false
            }
            if (this.comInfo.address == '') {
                this.showtoast = true
                this.toastmes = '请输入详细地址'
                return false
            }
            if (this.comInfo.contactName == '') {
                this.showtoast = true
                this.toastmes = '请输入联系人姓名'
                return false
            }
            
            if (this.comInfo.licenseNum == '') {
                this.showtoast = true
                this.toastmes = '请输入营业执照号码'
                return false
            }
            if (this.comInfo.tel == '') {
                this.showtoast = true
                this.toastmes = '请输入联系电话'
                return false
            }else if (!/^1[0-9]{10}$/.test(this.comInfo.tel)) {
               
                this.showtoast = true
                this.toastmes = '联系电话格式不正确'
                return
            }
            if (this.comInfo.email == '') {
                this.showtoast = true
                this.toastmes = '请输入联系邮箱'
                return false
            }
            if (this.comInfo.qualification == '') {
                this.showtoast = true
                this.toastmes = '请输入资质'
                return false
            }
            
            if (this.comInfo.province == '') {
                this.showtoast = true
                this.toastmes = '请选择地址'
                return false
            }
            if (this.comInfo.description == '') {
                this.showtoast = true
                this.toastmes = '请填写公司介绍'
                return false
            }
            let pdata = {
                headimgurl: this.comInfo.headimgurl,
                address: this.comInfo.address,
                province: this.comInfo.province, 
                provinceName: this.comInfo.provinceName,
                city:this.comInfo.city,
                cityName:this.comInfo.cityName,
                country: this.comInfo.country,
                countryName: this.comInfo.countryName,
                contactName: this.comInfo.contactName,
                licensePic: this.comInfo.licensePic,
                name: this.comInfo.name,
                tel: this.comInfo.tel,
                licenseNum: this.comInfo.licenseNum,
                email: this.comInfo.email,
                qualification: this.comInfo.qualification,
                description: this.comInfo.description
            }
            createOneCompany(pdata).then(res => {
                if (res.data.result == 0) {
                    this.$router.push('/home/enterprise')
                }
            })
        },
        updatecompany () {
            if (this.comInfo.name == '') {
                this.showtoast = true
                this.toastmes = '请输入公司名'
                return false
            }
            if (this.comInfo.address == '') {
                this.showtoast = true
                this.toastmes = '请输入详细地址'
                return false
            }
            if (this.comInfo.contactName == '') {
                this.showtoast = true
                this.toastmes = '请输入联系人姓名'
                return false
            }
            
            if (this.comInfo.licenseNum == '') {
                this.showtoast = true
                this.toastmes = '请输入营业执照号码'
                return false
            }
            if (this.comInfo.tel == '') {
                this.showtoast = true
                this.toastmes = '请输入联系电话'
                return false
            }else if (!/^1[0-9]{10}$/.test(this.comInfo.tel)) {
               
                this.showtoast = true
                this.toastmes = '联系电话格式不正确'
                return
            }
            if (this.comInfo.email == '') {
                this.showtoast = true
                this.toastmes = '请输入联系邮箱'
                return false
            }
            if (this.comInfo.qualification == '') {
                this.showtoast = true
                this.toastmes = '请输入资质'
                return false
            }
            
            if (this.comInfo.province == '') {
                this.showtoast = true
                this.toastmes = '请选择地址'
                return false
            }
            if (this.comInfo.description == '') {
                this.showtoast = true
                this.toastmes = '请填写公司介绍'
                return false
            }
            let pdata = {
                id: this.comInfo.companyId,
                headimgurl: this.comInfo.headimgurl,
                address: this.comInfo.address,
                province: this.comInfo.province, 
                provinceName: this.comInfo.provinceName,
                city:this.comInfo.city,
                cityName:this.comInfo.cityName,
                country: this.comInfo.country,
                countryName: this.comInfo.countryName,
                contactName: this.comInfo.contactName,
                licensePic: this.comInfo.licensePic,
                name: this.comInfo.name,
                tel: this.comInfo.tel,
                licenseNum: this.comInfo.licenseNum,
                email: this.comInfo.email,
                qualification: this.comInfo.qualification,
                description: this.comInfo.description
            }
            updateCompany(pdata).then(res => {
                if (res.data.result == 0) {
                     this.$router.go(-1)
                }
            })
        },
        outimgavatar(val){
            this.comInfo.headimgurl = val
        },
        outimglisence(val){
            this.comInfo.licensePic = val
        }
    },
}
</script>

<style>
.ew_wrap {
    margin-top: 60px;
}
input, textarea {
    outline: none
}
.ew-item {
    padding: 20px 20px;
}


.ew_name {
    padding-bottom: 0;
    background: url(./img/CombinedShape@2x.png) 98% 20px no-repeat;
    background-size: 20px 20px;
}


.ewc_item {
    padding-top: 20px;
    padding-left: 10px;
    font-size: 20px;
}
.enterpriseInfo_wrap .weui-cells {
    margin-top: 0;
}
</style>
