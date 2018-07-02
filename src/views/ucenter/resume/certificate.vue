<template>
    <div class="certificate_wrap" v-show="certicateshow">
        <header class="header_top" style="z-index: 9999">
            <img @click.stop='goBack' class="back" src='../img/back.png' width="25" height="22">
            <span class="title">上岗证</span>
        </header>
        <div class="cw_content">
            <ul class="cw_left">
                <li @click="choose(item,index)" 
                    :class="leftnowIndex == index ? 'active' : ''"
                    v-for='(item,index) in certificatelists' 
                    :key='index'>
                    <span>{{item.name}}</span>
                </li>
            </ul>
            <transition name="move">
                <ul class="cw_right" v-show="showleft">
                    <li v-for="(item,index) in rightlists" 
                        :key='index'
                        :class="nowIndex == index ? 'active' :''"
                        @click="chooseSon(item,index)"
                        v-show="item.name">
                        <span>{{item.name}}</span>
                    </li>

                    <li v-show="!rightlists.length">暂无数据</li>



                    <flexbox :gutter="0" style="margin-top: 20px;"> 
                        <flexbox-item :span='0.7'>
                            <group>
                                <x-input 
                                    title="添加岗位"
                                    v-model="name" 
                                    placeholder="请输入岗位名称">
                                </x-input>
                            </group>
                        </flexbox-item>
                        <flexbox-item style="margin-left: 10px;margin-right: 6px;">
                            <x-button style="background-color: #6eebdb;color: #fff" @click.stop.native="addNewMajory">添加</x-button>
                        </flexbox-item>
                    </flexbox>
       

                </ul>
            </transition>

        </div>
        

        <div v-transfer-dom>
             <alert v-model="messageShow"
                title="提示">
                  {{  resMessage }}
            </alert>
        </div>
    </div>
</template>

<script>
import { listByTypeAndPid } from '@/api/dictionary.js'
import { addMajory } from '@/api/ucenter.js'
import { Datetime,Picker,XButton ,XInput,XTextarea,Checklist, Radio, Group,Alert,TransferDomDirective as TransferDom,Flexbox, FlexboxItem } from 'vux'

export default {
    components: {
        XButton,
        Flexbox, 
        FlexboxItem,
        XInput,
        Group,
        Alert
    },
    directives: {
            TransferDom
    },
    data () {
        return {
            certicateshow: false,
            name: '',
            certificatelists: '',
            rightlists: '',
            showleft: false,
            majorL1Id:'',
            majorL1Name: '',
            majorL2Id: '',
            majorL2Name: '',
            queryData: {},
            nowIndex: '-1',
            leftnowIndex: '-1',
            messageShow: false,
            resMessage: '',
        }
    },
    created () {
        this.getcertificate()
    },
    methods: {
        show(){
            this.certicateshow = true
        },
        getcertificate () {
            listByTypeAndPid(0,0).then(res => {
                if (res.data.result == 0) {
                    this.certificatelists = res.data.datas
                }
            })
        },
        choose (item,index) {
            this.leftnowIndex = index
            this.showleft = true
            listByTypeAndPid(0,item.id).then(res => {
                if (res.data.result == 0) {
                    this.rightlists = res.data.datas;

                    this.majorL1Id = item.id;
                    this.majorL1Name = item.name;

                }
            })
        },
        chooseSon(item, index){
            this.nowIndex = index
            this.majorL2Id = item.id;
            this.majorL2Name = item.name;

            this.queryData = {
                majorL1Id:this.majorL1Id,
                majorL1Name: this.majorL1Name,
                majorL2Id: this.majorL2Id,
                majorL2Name: this.majorL2Name
            };
            this.$emit('postchange',this.queryData)
            

            this.certicateshow = false
        },
        addNewMajory () {
            if (this.name == '') {
                this.messageShow = true;
                this.resMessage = '请填写岗位名称'
                return
            }
            let id = this.certificatelists[this.leftnowIndex].id
            let data = {
                name: this.name,
                pid: id,
                type: 0
            };
             addMajory(data).then(res => {
               listByTypeAndPid(0, id).then(res => {
                if (res.data.result == 0) {
                    this.rightlists = res.data.datas;

                    this.nowIndex = this.rightlists.length - 1
                   
                    this.majorL2Id = this.rightlists[this.nowIndex].id
                    this.majorL2Name =  this.rightlists[this.nowIndex].name

                    this.queryData = {
                        majorL1Id:this.majorL1Id,
                        majorL1Name: this.majorL1Name,
                        majorL2Id: this.majorL2Id,
                        majorL2Name: this.majorL2Name
                    };
                    this.name = ''

                }
                })
            })

        },
        goBack (){
            this.certicateshow = false
            this.$emit('postchange',this.queryData)
        }

    }
}
</script>

<style>
.certificate_wrap {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 9999;
    background-color: #f2eeee;
}
.cw_content {
    display: flex;
    height: 100%;
}
.certificate_wrap .sw_label {
    top: 30px;
}
.cw_left {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 108px;
    flex: 0 0 108px;
    width: 108px;
    overflow: auto;
    margin-top: 58px;
    background-color: #fff;
}
.cw_left li {
    text-align: center;
    padding: 14px 0;
    line-height: 20px;
    font-size: 14px;
}


.cw_right {
    flex: 1;
    padding-left: 8px;
    margin-top: 58px;
    padding-bottom: 58px;
    background-color: #ece8e8;
    overflow-y: auto;
    overflow-x: hidden;
}
.cw_right li {
    padding: 14px;
    line-height: 20px;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.certificate_wrap .active {
    background-color: #6eebdd !important;
    color: #fff;
}
.cw_right li:nth-of-type(odd) {
    background-color: #f5f5f5;
}

.sw_wite {
    position: absolute;
    left: 0;
    top: -3px;
    width: 100%;
    padding-left: 24px;
    background-color: transparent;
    background: url(../img/write@2x.png) 0 center no-repeat;
    background-size: 16px 16px;
}
.certificate_wrap .move-enter-active, .certificate_wrap .move-leave-active {
    transition: all 0.5s linear;
    transform: translate3d(0, 0, 0);
}
.certificate_wrap .move-enter, .certificate_wrap .move-leave {
    transform: translate3d(100%, 0, 0);
} 

.certificate_wrap .add_btn {
    position: absolute;
    bottom: -38px;
    right: 20px;
    display: inline-block;
    width: 55px;
    padding: 5px;
    text-align: center;
    color: #fff;
    font-size: 14px;
    border-radius: 4px;
    background-color: #6eebdd;
}
</style>
