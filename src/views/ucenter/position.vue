<template>
    <div class="mycollect_wrap">

        <header class="header_top">
        <img @click.stop='$router.push("/home/ucenter")' class="back" src='./img/back.png' width="25" height="22">

            <span class="title">应聘职位</span>
        </header>
        <load-more
            :bottom-method="loadBottom"
            :bottom-all-loaded="allLoaded"
            :bottomPullText='bottomText'
            :auto-fill="false"
            @bottom-status-change="handleBottomChange"
            ref="loadmore">
           
            <ul style="margin: 20px 10px 20px 10px">
            <li class="nw_lists" 
                v-for='(item,index) in historylists' 
                :key='index' 
                v-if='item.recruiment'
                @click="$router.push({name: 'postDetail',query:{id: item.recruitmentId}})">
                <div class="nwl_header"  v-if='item.recruiment'>
                    <img class="avatar" :src='item.recruiment.company.headimgurl' width="36px" height="36px">
                    <div class="name">
                        <p>{{item.recruiment.company.name }}</p>
                        <p>{{item.recruiment.createdDesc}}</p>
                    </div>
                </div>
                <div class="nwl_content"  v-if='item.recruiment'>
                    <!--<p class="title">岗位描述</p>-->
                    <p class="intro" style='padding-top: 10px;'><pre class='question-content ellipsis' style='-webkit-box-orient: vertical;'>{{item.recruiment.description}}</pre></p>
                </div>

                <div class="nwl_mark"  v-if='item.recruiment'>
                    <span class="fulltime">{{item.recruiment.workingType == 0 ? '不限' : item.recruiment.workingType == 1 ? '全职' : '兼职' }}</span>
                    <span class="require">{{item.recruiment.post}}</span>
                    <span class="place">{{item.recruiment.provinceName}}{{item.recruiment.cityName}}</span>
                </div>

            </li>
        </ul>


            <div v-show="loading" slot="bottom" class="loading"> 
                <LoadMore slot="bottom" :show-loading='loading '></LoadMore>   
            </div>

            <p class="endtext" v-show="endtext">{{endtext}}</p>
        </load-more>
    </div>
</template>

<script>
import loadMore from '@/components/loadmore'
import { LoadMore } from 'vux'
import {companyResume} from '@/api/ucenter.js'
export default {
    components: {
        loadMore,
        LoadMore  
    },
    created () {
        this.userId = this.$route.query.userId
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
            endtext: ''
        }
    },
    methods: {
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
            // let pdata = {
            //     "userId": this.userId,
            //     "pageLastId": this.recruitmentId
            // }
          
            companyResume().then(res => {
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
        }
    }
}
</script>
<style scoped>
.mycollect_wrap {
    background-color: #fff;
    padding: 50px  4px 18px 4px;
    overflow: auto;
}
.nw_lists {
    padding: 10px 16px;
    box-shadow: 2px 2px 30px #f0eded;
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
    margin-bottom: 23px;
}

.nwl_mark .fulltime {
    margin-left: 0;
    background: url(./img/briefcase@2x.png) 0 center no-repeat
}
.nwl_mark .require {
    background: url(./img/award@2x.png) 0 center no-repeat
}
.nwl_mark .place {
    background: url(./img/flag@2x.png) 0 center no-repeat
}
</style>