<template>
    <div class="station_wrap" v-show="byShow">
        <header class="header_top">
            <img @click='byShow = false' class="back" src='@/assets/back.png' width="25" height="22">
            <span class="title">岗位类别</span>
        </header>
        <p class="sw_title">选择的岗位类别 (0/1)</p>
        <ul class="sw_name">
            <li v-for='(item,index) in posttype' 
                :key='index' 
                class="sw_list"
                :class="nowIndex == index ? 'activelist' : ''"
                @click="chooseitem(item,index)">
                <span>{{item.name}}</span>
                <span>+</span>
            </li>
        </ul>

        <flexbox :gutter="0"> 
            <flexbox-item :span='0.75'>
                <group>
                    <x-input 
                        title="添加职称"
                        v-model.trim="name" 
                        placeholder="请输入职称名称"
                        style="background: #f0f0f0;margin-left: 10px">
                    </x-input>
                </group>
            </flexbox-item>
            <flexbox-item :span='0.2' style="margin-left: 10px;margin-right: 15px;margin-top: 20px">
                <x-button style="background-color: #6eebdb;color: #fff" @click.stop.native="addstationtype">添加</x-button>
            </flexbox-item>
        </flexbox>
        
        <div v-transfer-dom>
             <alert v-model="messageShow"
                title="提示">
                  {{  resMessage }}
            </alert>
        </div>

   

        
        
    </div>
</template>

<script>
import { createcommonDic } from '@/api/dictionary.js'
import { listByTypeAndPid } from '@/api/dictionary'
import { addMajory } from '@/api/ucenter.js'
import { XButton ,XInput, Radio, Group,Alert,Flexbox, FlexboxItem,TransferDomDirective as TransferDom, } from 'vux'

export default {
    components: {
        Group,
        XInput,
        XButton,
        Flexbox,
        FlexboxItem,
        Alert
    },
    directives: {
        TransferDom
    },
    created() {
        this.getposttype()
    },
    data () {
        return {
            messageShow: false,
            resMessage: '',
            name: '',
            byShow: false,
            nowIndex: -1,
            posttype:[]
        }
    },    
    methods: {
        getposttype () {
            listByTypeAndPid(1,0).then(res => {
                if (res.data.result == 0) {
                    this.posttype = res.data.datas
                }
            })
        },
        chooseitem (val,index) {
            this.nowIndex = index
            this.byShow = false
            this.$emit('choosetype',val)
        },
        addstationtype () {
            if (this.name == '') {
                this.messageShow = true;
                this.resMessage = '请填写岗位名称'
                return
            }
            let data = {
                name: this.name,
                pid: 0,
                type: 1
            };
            addMajory(data).then(res => {
             
                this.getposttype()
                this.name = ''
            })

        },
    }
}
</script>

<style>
.station_wrap {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f5f5f5;
    z-index: 1000;
    overflow: auto;
    background-color: #fff;
    padding-bottom: 50px;
}
.sw_name {
    text-align: center;
    clear: both;
    overflow: hidden;
}
.activelist {
    background-color: #6febdb;
    color: #fff
}
.sw_list {
    float: left;
    padding: 8px 6px;
    background-color: #f0f0f0;
    margin-top: 22px;
    margin-left: 18px;
    margin-right: 18px;
    font-size: 16px;
}

.sw_list span {
    padding: 0 10px;
    font-size: 14px;
    word-wrap : break-word;
    word-break : break-all;   
}
.input_wrap {
    margin: 50px 0;
}
.sw_wite {
    position: absolute;
    left: 0;
    top: -3px;
    padding-left: 24px;
    background-color: transparent;
    background: url(../img/write@2x.png) 0 center no-repeat;
    background-size: 16px 16px;
}
</style>
