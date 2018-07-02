<template>
    <div class="company_wrap">
        <div class="cw_head">
            <div class="head_info">
                <p class="com_name">{{comInfo.name}}</p>
                <p class="com_intro">{{comInfo.qualification}}</p>
            </div>
            <div class="head_img">
                <img :src="comInfo.headimgurl" width="70" height="70">
            </div>
        </div>

        <!-- tab切换 -->
        <tab>
            <tab-item selected @on-item-click="onItemClick">公司信息</tab-item>
            <tab-item @on-item-click="onItemClick">热招职位<span>({{comInfo.total}})</span></tab-item>
        </tab>

        <!-- 公司信息 -->

        <div class="com" v-show="toggleshow">
            <div class="com_item">
                <p class="detail_title">公司介绍</p>
                <p class="detail">{{comInfo.description ? comInfo.description : '暂无'}}</p>
            </div>
            <div class="com_item">
                <p class="detail_title">公司地址</p>
                <p class="detail">{{comInfo.provinceName + comInfo.cityName + comInfo.countryName + comInfo.address}}</p>
            </div>


            <div class="com_item">
                <p class="detail_title">基本信息</p>
                <!-- <p class="detail_item">
                    <span class="di_lf">成立时间</span>
                    <span class="di_lf"></span>
                </p> -->
                <p class="detail_item">
                    <span class="di_lf">联系人</span>
                    <span class="di_lr">{{comInfo.contactName ? comInfo.contactName : '无'}}</span>
                </p>
                <p class="detail_item">
                    <span class="di_lf">联系电话</span>
                    <span class="di_lr">{{comInfo.tel ? comInfo.tel : '无'}}</span>
                </p>
                <p class="detail_item">
                    <span class="di_lf">邮箱</span>
                    <span class="di_lr">{{comInfo.email ? comInfo.email : '无'}}</span>
                </p>
            </div>
            
            

        </div>
        <!-- 职位列表 -->

        <div class="job_list" v-show="!toggleshow" style="padding: 20px">
            <load-more
            :bottom-method="loadBottom"
            :bottom-all-loaded="allLoaded"
            :bottomPullText='bottomText'
            :auto-fill="false"
            @bottom-status-change="handleBottomChange"
            ref="loadmore">
                <ul>
                    <li class="hw_jobs" v-for="(item,index) in historylists" v-show="!item.isClosed" :key=index @click="$router.push({name:'postDetail',query: {'id': item.id}})">
                        <div class="hwj_right">
                            <div class="title">
                                <span>{{item.post}}</span>
                             </div>
                            <p class="time">{{item.createdDesc}}</p>
                            <p class="hw_content">{{item.description}}</p>
                        </div>
                        <div class="hwj_left" style="text-align: right">
                            <span v-show="item.expectedSalaryStart" style="font-weight:700;float:right;color:#6eebdd">{{ item.salaryStart + 'k~' + item.salaryEnd + 'k'}}</span>
                            <span style="font-weight:700;float:right;color:#6eebdd" class="money_range" v-show="!item.expectedSalaryStart">面议</span>
                        </div>
                    </li>
                </ul>
                <div v-show="loading" slot="bottom" class="loading"> 
                    <LoadMore slot="bottom" :show-loading='loading '></LoadMore>   
                </div>

                <p class="endtext" v-show="endtext">{{endtext}}</p>
            </load-more>
        </div>
    </div>
</template>

<script>
import { Tab, TabItem } from 'vux'
import loadMore from '@/components/loadmore'
import { LoadMore } from 'vux'
import { findCompany,recruiment } from '@/api/company.js'

export default {
    components: {
        Tab,
        TabItem,
        loadMore,
        LoadMore,
    },
    data () {
        return {
            comInfo: {},
            toggleshow: true,
            historylists: [],
            orderId: '',
            total: 0,
            loading: false,
            allLoaded: false,
            bottomText: '',
            endtext: '',
            id: ''
        }
    },
    created () {
        this.id = this.$route.query.id
        findCompany(this.id).then(res => {
            // console.log(res.data.datas)
            this.comInfo = res.data.datas
            this.$nextTick( () => {
                this.getrecruiment ()
            })
            // this.userId = this.comInfo.userId
        })

        
    },
    methods: {
        onItemClick () {
            this.toggleshow = !this.toggleshow
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
            // console.log(this.comInfo.userId)
            let pdata = {
                "pagesize": "10",
                "pageLastId": this.orderId,
                "userId": this.comInfo.userId
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
    }
}
</script>

<style lang="less">
    .company_wrap {
        // padding: 0 20px;
    }
    .cw_head {
        height: 130px;
        display: flex;
        padding: 20px;
        border-bottom: 10px solid #f5f5f5;
        // border-bottom: 1px solid #eee;
        .head_info {
            flex: 1;
            .com_name {
                font-size: 20px;
                font-weight: 700;
                padding: 5px 0;
            }
            .com_intro {
                padding: 10px 0;
            }
        }
        .head_img {
            flex: 0 0 80px;
            img {
                border-radius: 50%;
            }
        }

    }
    .com {
        padding: 20px;
        .com_item {
            padding: 15px 0;
            .detail_title {
                font-size: 18px;
                padding: 5px  0 10px 0;
                font-weight: 600;
            }
            .detail {
                font-size: 17px;
                line-height: 30px;
            }
            .detail_item {
                padding: 15px 0;
                display: flex;
                align-items: center;
                font-size: 17px;
                .di_lf {
                    flex: 0 0 100px;
                    width: 100px;
                }
                .di_lr {
                    flex: 1;
                    text-align: right;
                }
            }
            .detail_item + detail_item {
              border-top: 1px solid #eee;   
            }
        }
        .com_item + .com_item {
            border-top: 1px solid #eee;
        }        
    }

    .vux-tab-container {
        height: 55px !important;
    }

    .vux-tab {
        height: 55px !important; 
    }
    .vux-tab .vux-tab-item.vux-tab-selected {
        color: #6febdb !important;
        border-bottom: 3px solid #fff !important;
    }
    .vux-tab-ink-bar {
        background-color: #6febdb !important;
    }
    .vux-tab .vux-tab-item {
        font-size: 18px !important;
    }
    .job_list {
        position: absolute;
        top: 185px;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: auto;
    }
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


 
</style>