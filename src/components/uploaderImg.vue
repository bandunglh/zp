<template>
    <div style="margin-left: 10px;">
        <img :src='imgsrc' @click="getready" width="75" height="75">
    </div>
</template>

<script>
import {updateucenter,myinfo,getConfig,uploadimg,weixinuploadimg} from '@/api/ucenter.js'
export default {
    created () {
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
    data () {
        return {
            mediaId: '',
            imgsrc: ''
        }
    },
    methods: {
        getready () {
            let _this = this
            wx.ready(function(){
                _this.getImg()
            });
             wx.error(function(res){
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
                             _this.$emit('outimg', _this.imgsrc)
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
    }
}
</script>

<style>

</style>
