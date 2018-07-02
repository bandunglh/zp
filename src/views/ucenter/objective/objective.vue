<template>
    <div class="objective_wrap">
        <header class="header_top">
            <img @click='$router.go(-1)' class="back" src='@/assets/back.png' width="25" height="22">
            <span class="title">求职意向</span>
        </header>
        <load-more
            :bottom-method="loadBottom"
            :bottom-all-loaded="allLoaded"
            :bottomPullText='bottomText'
            :auto-fill="false"
            @bottom-status-change="handleBottomChange"
            ref="loadmore">
            
            <ul>
                <li class="ow_list" 
                    @click="toedit(item)"
                    v-for='(item,index) in historylists'
                    :key='index'>
                    <div class="ob_row">
                        
                        <span class="item_post" style="overflow: hidden">{{item.post}}</span>
  
                        <span class="status" :class="!item.status ? 'status_open' : 'status_close'">{{item.status ? '已开启' : '已关闭'}}</span>
                        <span class="delete" @click.stop="confirm(item.id)">删除</span>
                    </div>
                    <div class="ob_rowtwo">
                        <span v-show="item.expectedSalaryStart">[{{item.expectedSalaryStart}}k~{{item.expectedSalaryEnd}}k] | </span>
                        <span v-show="!item.expectedSalaryStart">面议 | </span>
                        <span class='item-bottom_msg'>{{item.jobCategoryName}} | </span>
                        <span class='item-bottom_msg'>{{item.provinceName}}{{item.cityName}}</span>
                    </div>
                </li>
            </ul>

            <div v-show="loading" slot="bottom" class="loading"> 
                <LoadMore slot="bottom" :show-loading='loading '></LoadMore>   
            </div>

            <p class="endtext" v-show="endtext">{{endtext}}</p>
            <div class="ow_footer" @click="newobjective">
                <span>新建意向</span>
            </div>
    
       
        </load-more>

        <div v-transfer-dom>
            <confirm v-model="showConfirm"
            @on-cancel="showConfirm = true"
            @on-confirm="deleteobj">
                <p style="text-align:center;">确定删除此意向吗？</p>
            </confirm>
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
import { Group,Confirm,TransferDomDirective as TransferDom, Alert} from 'vux'
import {objectivelists, deleteById} from '@/api/objective.js'
import {resumedetail} from '@/api/ucenter.js'
import loadMore from '@/components/loadmore'
import { LoadMore } from 'vux'
export default {
    components: {
        loadMore,
        LoadMore,
        Confirm,
        Alert
    },
    directives: {
        TransferDom
    },
    created () {
        this.getrecruiment()
        resumedetail().then(res => {
            if (res.data.result == 0) {
                this.status = res.data.datas.status
            }
        })
    },
    data () {
        return {
            messageShow: false,
            resMessage:　'',
            showConfirm: false,
            showColse: false,
            historylists: [],
            orderId: '',
            total: 0,
            loading: false,
            allLoaded: false,
            bottomText: '',
            endtext: '',
            nowId: '',
            status: ''
        }
    },
    methods: {
        loadBottom: function() {
            if (!this.endtext) {
                this.loading = true;
            }
            this.orderId = this.historylists[this.historylists.length - 1].orderId
            if (this.orderId == 0) {
                this.loading = false;
                this.allLoaded = true;
                return;
            }
            this.getrecruiment()
        },
        handleBottomChange(val) {
            this.bottomText = val;
        },
        getrecruiment () {
            let fdata = {
                "pagesize": 10,
 	            "pageLastId": this.orderId

            }
            objectivelists(fdata).then(res => {
                if (res.data.result == 0) {
                    let lists = res.data.datas.list
                    if (lists.length == 0) {
                        this.endtext = '再也没有了...'
                    }
                    this.total = res.data.datas.total
                    if (this.orderId == '') {
                        lists.forEach(item => {
                            this.historylists.push(item)
                        })   
                    } else if (this.orderId != 0) {
                         setTimeout(() => {
                            this.loading = false;
                            lists.forEach(item => {
                                this.historylists.push(item)
                            })
                        }, 600)
                    }
                    
                }
            })
        },
        confirm (i) {
            this.nowId = i
            this.showConfirm = true
        },
        close (i) {
            this.nowId = i
            this.showColse = true
        },
        closeobj () {

        },
        deleteobj () {

            let fdata = {
                id: this.nowId
            }
            deleteById(fdata).then(res => {
                if (res.data.result == 0) {
                    this.orderId = ''
                    this.historylists = []
                    this.getrecruiment()
                }
            })
        },
        toedit (item) {
            this.$router.push(
                {
                    name: 'editIntent',
                    params: {'objitem': item}
                }
            ) 

        },
        newobjective () {
            if (this.status == 2) {
                this.$router.push('/editIntent')
            } else {
                this.messageShow = true
                this.resMessage = '您的简历尚未发布'
            }
            
        }
        
    }
}
</script>

<style>
.objective_wrap {
    padding: 0 10px;
    margin: 64px 0;
}
.ow_list {
    padding: 18px 15px;
    box-shadow: 2px 2px 22px #e5e5e5;
    margin-bottom: 15px;
    font-size: 18px;
}
.ob_row:first-child span {
    font-weight: 700;
}
.ob_rowtwo {
    margin-top: 16px;
    font-size: 17px;
}
.ob_row .item_post {
    display: inline-block;
    width: 28%;
    /* overflow: hidden; */
    text-overflow: ellipsis;
    white-space: nowrap
}
.ob_row {
    display: flex;
    padding: 12px 0;
}
.ob_row span {
    vertical-align: middle;
    
}
.ob_row span:first-child {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
}
.delete {
    display: inline-block;
    float: right;
    width: 78px;
    padding: 4px 0;
    font-size: 14px;
    color: #fff;
    text-align: center;
    background-color: #fb2929;
    border-radius: 10px;
    margin-left: 10px;
}
.ow_footer {
    width: 100%;
    height: 116px;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 116px;
    font-size: 20px;
}
.ow_footer span {
    display: inline-block;
    width: 160px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    background-color: #6febdb;
    border-radius: 4px;
}
</style>
