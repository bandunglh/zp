<template>
    <div class="setup_wrap">
        <div class="sw_item">
            <span class="item_left">头像</span>
            <span class="item_right"><img :src='imgsrc' @click="getready"></span>
        </div>

        <div class="sw_item">
            <span class="item_left">姓名</span>
            <input class="item_right setup_name" type="text" v-model.trim="name">
        </div>

        <div class="setup_save" @click="update">保存</div>
        <toast v-model="showtoast" type="text" width="20em">{{toastmes}}</toast>

    </div>
</template>

<script>
import {updateucenter,myinfo,getConfig,uploadimg,weixinuploadimg} from '@/api/ucenter.js'
import {Toast} from 'vux'

export default {
    components: {
        Toast
    },
    data () {
        return {
            showtoast: false,
            toastmes:　'',
            name: '',
            textValue: '',
            remnant: 0,
            imgsrc: '',
            mediaId: ''
        }
    },
    created () {

        myinfo().then( res => {
            if( res.data.result == 0 ) {
                this.userInfo = res.data.datas
                this.name = this.userInfo.nickName
                this.imgsrc = this.userInfo.headimgurl
            }

        })

        let href = window.location.href.split("#")
        let url = href[0]
        let data = {
            url: url
        };

        getConfig(data).then(res => {
            wx.config({
			debug: false,
			appId: res.data.appId,
			timestamp: res.data.timestamp,
			signature: res.data.signature,
			nonceStr: res.data.nonceStr,
			jsApiList: [
				'checkJsApi',
				'getLocation',
				'chooseImage',
                'uploadImage',
                'downloadImage'
			]
        });
        });
        



        
    },
    methods: {
        getready () {
            let _this = this
            wx.ready(function(){
                _this.getImg()
            });
            wx.error(function(res){
                // console.log(res)
            });
        },
        getImg(){
            let _this = this
            wx.chooseImage({
                count: 1,
                sizeType: ['original', 'compressed'], 
                sourceType: ['album', 'camera'], 
                success: function (res) {
                    var localIds = res.localIds[0].toString()
                    _this.uploadImg(localIds)
                }
            });
        },
        uploadImg(val) {
            let _this = this 
            wx.uploadImage({  
                localId: val,
                isShowProgressTips: 1,
                success: function (res) {  
                    _this.mediaId = res.serverId;
                    
                    let fdata = {
                        SERVER_ID:  _this.mediaId 
                    }
                    weixinuploadimg(fdata).then(res => {
                        if (res.data.result == 0) {

                            _this.imgsrc = res.data.datas.headimgurl
            
    
                        }
                    })
  
                },  
                fail: function (error) {  
                    picPath = '';  
                    localIds = '';  
                    alert(Json.stringify(error));  
  
                }  
  
            });   
        },
        descInput(){
            var txtVal = this.textValue.length;
            this.remnant = txtVal;
        },
        update () {
            if (this.name == '') {
                this.showtoast = true
                this.toastmes = '请输入姓名'
                return false
            }

            let fdata = {
                "nickName": this.name,
                "headimgurl": this.imgsrc
            }
            updateucenter(fdata).then(res => {
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
    height: 100%;
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
.setup_uname {
    position: relative;
    padding: 0 24px;
}
.setup_uname h3 {
    height: 58px;
    line-height: 58px;
    font-size: 18px;
}
.setup_uname input  {
    position: absolute;
    right: 24px;
    bottom: 0;
    width: 114px;
    height: 36px;
    line-height: 36px;
    font-size: 16px;
    border-bottom: 2px solid #7d7d7d;
    background: url(./img/CombinedShape@2x.png) 100% center no-repeat;
    background-size: 15px 15px;
    outline: none;
}
.setup_uname textarea {
    width: 100%;
    font-size: 14px;
    padding: 2px;
    border: none;
    resize: none;
    background: #ebebeb url(./img/CombinedShape@2x.png) 96% 90% no-repeat;
    background-size: 15px 15px;
}
.setup_uname .tip {
    position: absolute;
    bottom: 8px;
    right: 60px;
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
    border-radius: 2px;
}
.setup_name {
    background-color: #fff;
}
</style>
