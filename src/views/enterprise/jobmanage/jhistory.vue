<template>
    <div class="history_wrap">
        <header class="header_top">
            <img @click='$router.go(-1)' class="back" src='@/assets/back.png' width="25" height="22">
            <span class="title">职位管理</span>
        </header>
        <load-more
            :bottom-method="loadBottom"
            :bottom-all-loaded="allLoaded"
            :bottomPullText='bottomText'
            :auto-fill="false"
            @bottom-status-change="handleBottomChange"
            ref="loadmore">
                <ul>
                    <li class="hw_jobs" v-for="(item,index) in historylists" :key=index @click="$router.push({path: '/jobmanage/jobdetail',query: {'id': item.id}})">
                        <div class="hwj_right">
                            <div class="title">
                                <span>{{item.post}}</span>
                                <span :class="!item.isClosed ? 'isClosed' : ''">{{item.isClosed ? '已关闭' : '招聘中'}}</span>                        
                            </div>
                            <p class="time">{{item.createdDesc}}</p>
                            <p class="hw_content">
                                <pre class='question-content ellipsis' style='-webkit-box-orient: vertical;'>{{item.description}}
                                </pre>
                            </p>
                        </div>

                        <div class="hwj_left">
                            <span class="delete_one" @click.stop="chooseitem(item)"></span>
                        </div>
                    </li>
                </ul>
                <div v-show="loading" slot="bottom" class="loading"> 
                    <LoadMore slot="bottom" :show-loading='loading '></LoadMore>   
                </div>

                <p class="endtext" v-show="endtext">{{endtext}}</p>
    </load-more>
    <router-link to="/jobmanage/alljob" class="add-footer">
        <img src="../../../assets/add_icon.png" height="26" width="26" class="addpng">
        <span>发布岗位</span>
    </router-link>    
    
    <Confirm 
        v-model="showdialog"
        title='确定删除吗'
        @on-confirm='delete_one'>
        
    </Confirm> 
    </div>
</template>

<script>
import loadMore from '@/components/loadmore'
import { LoadMore } from 'vux'
import {recruiment,deleteById} from '@/api/company.js'
import { Confirm } from 'vux'

export default {
    components: {
        loadMore,
        LoadMore,
        Confirm 
    },
    created () {
        this.id = this.$route.query.id
        this.getrecruiment()  
    },
    data () {
        return {
            historylists: [],
            orderId: '',
            total: 0,
            loading: false,
            allLoaded: false,
            bottomText: '',
            endtext: '',
            showdialog: false,
            nowId: '',
            id: ''
        }
    },
    methods: {

        chooseitem (item) {
            this.nowId = item.id
            this.showdialog = true
            
        },
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
            let pdata = {
                "pagesize": "10",
                "pageLastId": this.orderId,
                "userId": this.id
            }
          
            recruiment(pdata).then(res => {
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
        delete_one () {
            let data = {
                id: this.nowId
            }
            deleteById(data).then(res => {
                if (res.data.result == 0) {
                    this.orderId = ''
                     this.historylists = []
                    this.getrecruiment()
                }
            })
            
        }
    }
}
</script>

<style>
.history_wrap {
    padding: 0 18px;
    background-color: #fff;
    overflow: auto;
    margin-bottom: 90px;
    margin-top: 60px;
}
.hw_jobs {
    display: flex;
    padding: 16px 0;
}
.hw_jobs {
    border-bottom: 1px solid #e8e8e8;
}
.hwj_right {
    flex: 1;
    width: 70%;
}
.hwj_right .time {
    font-size: 16px;
    color: #abaaaa;
    margin-bottom: 10px;
}
.hwj_left {
    flex: 0 0 66px;
    width: 66px;
}
.hwj_left span {
    display: inline-block;
    width: 100%;
    height: 100%;
}
.hwj_left .delete_one {
    background: url(../img/deleteone@2x.png) top right no-repeat;
    background-size: 33px 33px;
}
.hwj_left .delete_two {
    background: url(../img/deletetwo@2x.png) center right no-repeat;
}
.loading {
    margin-bottom: 50px;
}
.add-footer {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 56px;
    line-height: 56px;
    width: 100%;
    text-align: center;
    font-size: 18px;
    color: #6eebdb;
    background-color: #fff;
    border-top: 1px solid;
}

.addpng {
    position: relative;
    top: -2px;
    vertical-align: middle;
}
   
</style>
