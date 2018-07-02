<template>
    <div class="mycollect_wrap">

        <header class="header_top">
            <img @click.stop='$router.push("/home/ucenter")' class="back" src='../img/back.png' width="25" height="22">
            <span class="title">我的收藏</span>
        </header>
        <load-more
            :bottom-method="loadBottom"
            :bottom-all-loaded="allLoaded"
            :bottomPullText='bottomText'
            :auto-fill="false"
            @bottom-status-change="handleBottomChange"
            ref="loadmore">
            <ul class="nw_ul">
                <li class="nw_lists"
                    v-for='(item,index) in historylists'
                    :key='index'
                    @click="$router.push({name: 'postDetail',query:{id: item.recruitmentId}})">
                    <div class="nwl_header">
                        <img class="avatar" :src='item.recruiment.company.headimgurl' width="36" height="36">
                        <div class="name" v-if='item.recruiment'>
                            <p>{{item.recruiment.company.name}}</p>
                            <p>{{item.recruiment.createdDesc}}</p>
                        </div>
                    </div>
                    <div class="nwl_content"  v-if='item.recruiment'>
                        <p class="title">{{item.recruiment.post}}</p>
                        <p class="intro">
                        <pre class='question-content ellipsis' style='-webkit-box-orient: vertical;'>{{item.recruiment.description}}</pre></p>
                    </div>

                    <div class="nwl_mark"  v-if='item.recruiment'>
                        <span class="fulltime">{{item.recruiment.workingType == 0 ? '不限' : item.recruiment.workingType == 1 ? '全职' : '兼职' }}</span>
                        <span class="require">{{item.recruiment.certMajorL1}}</span>
                        <span class="place">{{item.recruiment.provinceName}}{{item.recruiment.cityName}}</span>
                    </div>

                    <span class="delcollect" @click.stop="confirm(item.id)">删除</span>
                </li>
            </ul>
            <div v-show="loading" slot="bottom" class="loading"> 
                <LoadMore slot="bottom" :show-loading='loading '></LoadMore>   
            </div>

            <p class="endtext" v-show="endtext">{{endtext}}</p>
        </load-more>


        <Confirm 
        v-model="showdialog"
        title='确定删除吗'
        @on-confirm='delcollect()'>
        
    </Confirm> 
    </div>
</template>

<script>
import loadMore from '@/components/loadmore'
import { LoadMore,Confirm } from 'vux'
import {collectlist, deletecollect} from '@/api/objective.js'
export default {
    components: {
        loadMore,
        LoadMore,
        Confirm 
    },
    created () {
        this.getrecruiment()
    },
    data () {
        return {
            historylists: [],
            recruitmentId: '',
            total: 0,
            loading: false,
            allLoaded: false,
            bottomText: '',
            endtext: '',
            showdialog: false,
            id: ''
        }
    },
    methods: {
        confirm(val){
            this.showdialog = true
            this.id = val
        },
        loadBottom: function() {
            if (!this.endtext) {
                this.loading = true;
            }
            this.recruitmentId = this.historylists[this.historylists.length - 1].id
            if (this.recruitmentId == 0) {
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
                "pageLastId": this.recruitmentId
            }
          
            collectlist(pdata).then(res => {
                if (res.data.result == 0) {
                    let lists = res.data.datas.list
                    if (lists.length == 0) {
                        this.endtext = '再也没有了...'
                    }
                    this.total = res.data.datas.total
                    // 初次加载不延迟
                    if (this.recruitmentId == '') {
                        
                        lists.forEach(item => {
                            this.historylists.push(item)
                        })                              
                        
 
                    } else if (this.recruitmentId != 0) {
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
        // 删除收藏
        delcollect () {
            let fdata = {
                id: this.id
            }
            deletecollect(fdata).then(res => {
                if (res.data.result == 0) {
                    this.recruitmentId = ''
                    this.historylists = []
                    this.getrecruiment()
                }
            })
        }
    }
}
</script>
<style>
.mycollect_wrap {
    padding-top: 46px;
    background-color: #fff;
    overflow: auto;
}
.nw_ul {
    padding: 18px 10px;
}
.nw_lists {
    position: relative;
    width: 100%;
    padding: 12px 16px;
    box-shadow: 2px 2px 20px #e2e0e0
}
.nw_lists + .nw_lists {
    margin-top: 15px;
}
.nwl_header {
    display: flex;
}
.nwl_header .name {
    flex: 1;
    margin-left: 20px;
}
.nwl_mark {
    margin-top: 26px;
    margin-bottom: 40px;
}

.nwl_mark .fulltime {
    margin-left: 0;
    background: url(../img/briefcase@2x.png) 0 center no-repeat
}
.nwl_mark .require {
    background: url(../img/award@2x.png) 0 center no-repeat
}
.nwl_mark .place {
    background: url(../img/flag@2x.png) 0 center no-repeat 
}
</style>
