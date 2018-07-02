<template>
    <div class='opwrap'>
         <header class="header_top">
            <img @click='$router.go(-1)' class="back" src='@/assets/back.png' width="25" height="22">
            <span class="title">意见反馈</span>
        </header>
        <x-textarea class="weui-textarea" :rows='6' :col='40' v-model.trim="CONTENT" show-counter :max=200 placeholder="请简要描述你的问题和意见"></x-textarea>


         
            <group>
                <x-input type='tel' 
                    is-type='china-mobile' 
                    @on-change = 'getinput' 
                    v-model="TEL"
                    title='联系电话' 
                    placeholder="请填写手机号">
                </x-input>
            </group>
         
        

        <div style='padding: 10px 15px;'>
            <p>上传照片（选填，提供意见截图）</p>
            <myuploadimg @outimg='outimg' style="margin-top: 15px" ref='upload'></myuploadimg>
        </div>

        <div class="setup_save" @click="update">提交</div>
        <toast v-model="showtoast" type="text" width="20em">{{toastmes}}</toast>
    </div>
</template>

<script>
   import {XTextarea,XInput,Group,Toast} from 'vux'
   import myuploadimg from '@/components/uploaderImg'
   import {feedback} from '@/api/company.js'

    export default {
        components: {
            XTextarea,
            XInput,
            myuploadimg,
            Group,
            Toast
        },
        data () {
            return {
                CONTENT: '',
                IMGURL: '',
                TEL: '',
                showtoast: false,
                toastmes: ''
            }
        },
        methods: {
            outimg(val){
                this.IMGURL = val
            },
            getinput(val) {
                this.TEL = val
            },
            update () {
                if (this.CONTENT == '') {
                    this.showtoast = true
                    this.toastmes = '请输入您要反馈意见'
                    return false
                }

                if (this.TEL == '') {
                    this.showtoast = true
                    this.toastmes = '请输入您的手机号'
                    return false
                }

                let fdata = {
                    "CONTENT": this.CONTENT,
                    "IMGURL": this.IMGURL,
                    "TEL": this.TEL,
                    "TYPE": 0
                }
                feedback(fdata).then(res => {
                    if (res.data.result == 0) {
                        this.$router.go(-1)
                    }
                })
            }
        }
    }
</script>

<style lang="less">
    .opwrap {
        background: #fff;
        padding: 54px 0 15px 0;
        font-size: 18px;
        textarea {
            padding: 10px;
            background: #eee;
            font-size: 18px;
            box-sizing: border-box;
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
    }
    
</style>