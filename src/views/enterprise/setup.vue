<template>
    <div class="setup_wrap">
        <div class="sw_item">
            <span class="item_left">头像</span>
            <span class="item_right">
                <myuploadimg @outimg='outimg' style="display: inline-block" ref='upload'></myuploadimg>
            </span>
        </div>

        <div class="sw_item">
            <span class="item_left">公司名</span>
            <input class="item_right setup_name" type="text" v-model.trim="comInfo.name">
        </div>

        <div class="setup_save" @click="update">保存</div>
        <toast v-model="showtoast" type="text" width="20em">{{toastmes}}</toast>

    </div>
</template>

<script>
import {findOneCompany, updateCompany} from '@/api/company.js'
import myuploadimg from '@/components/uploaderImg'
import {Toast} from 'vux'

export default {
    components: {
        myuploadimg,
        Toast
    },
    data () {
        return {
           comInfo: {},
           showtoast: false,
           toastmes: ''
        }
        
    },
    created () {
        this.getCompany()
    },
    methods: {
        outimg(val){
            this.comInfo.headimgurl = val
        },
        getCompany() {
            findOneCompany().then(res => {
                if (res.data.result == 0) {
                    this.comInfo = res.data.datas
                    
                    this.$refs.upload.imgsrc = this.comInfo.headimgurl
                }
                
            })
        },
        update () {
            if (this.comInfo.name == '') {
                this.showtoast = true
                this.toastmes = '请输入公司名'
                return false
            }

            let pdata = {
                "id": this.comInfo.companyId,
                "headimgurl": this.comInfo.headimgurl,
                "address": this.comInfo.address,
                "contactName": this.comInfo.contactName,
                "licensePic": this.comInfo.licensePic,
                "name": this.comInfo.name,
                "tel": this.comInfo.tel,
                "licenseNum": this.comInfo.licenseNum,
                "email": this.comInfo.email,
                "qualification": this.comInfo.qualification
            }
            updateCompany(pdata).then(res => {
                if (res.data.result == 0) {
                     this.$router.go(-1)
                }
            })
        }
    }
}
</script>

<style scoped>
.setup_wrap {
    width: 100%;
    background-color: #fff;
}
.setup_avatar {
    padding: 19px 24px 10px 24px;
}
.setup_wrap_avatar img:first-child {
    margin-right: 20px;
}
.hr {
    width: 100%;
    height: 4px;
    background: #ebebeb;
}
.setup_name h3 {
    padding: 0 24px;
    height: 58px;
    line-height: 58px;
    font-size: 16px;
}
.setup_name input  {
    width: 263px;
    height: 36px;
    line-height: 36px;
    border-radius: 4%;
    margin-left: 24px;
    padding-left: 30px;
    border: 1px solid #909091;
    background: url(./img/CombinedShape@2x.png) 10px center no-repeat;
    background-size: 15px 15px;
    outline: none;
}
.setup_save {
    height: 48px;
    margin: 66px 24px 0 24px;
    text-align: center;
    line-height: 48px;
    background-color: #6febdb;
    color: #fff;
    font-size: 18px;
    letter-spacing: 12px;
    border-radius: 4px;
}
</style>
