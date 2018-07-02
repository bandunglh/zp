<template>
    <div class="mycollect_wrap">

        <header class="header_top">
            <img @click.stop='$router.push("/home/enterprise")' class="back" src='../img/back.png' width="25" height="22">
            <span class="title">人才库</span>
        </header>
        <load-more
            :bottom-method="loadBottom"
            :bottom-all-loaded="allLoaded"
            :bottomPullText='bottomText'
            :auto-fill="false"
            @bottom-status-change="handleBottomChange"
            ref="loadmore">
            <!-- <ul class="nw_ul">
                <li class="nw_lists"
                    v-for='(item,index) in historylists'
                    :key='index'>
                    <div class="nwl_header">
                        <img :src='item.company.headimgurl' width="36" height="36">
                        <div class="name" >
                            <p>{{item.company.name}}</p>
                            <p>{{item.company.address}}</p>
                        </div>
                    </div>
                    <div class="nwl_content">
                        <p class="title">{{ }}</p>
                    </div>

                 </li>
            </ul> -->

            <ul class="nw_ul">
                <li class="nw_lists"
                		v-for='(item,index) in historylists'
                		@click="godetail(item)"
                        :key='index'
                        v-if='item.talentInfo'>
                    <div class="nwl_header" >
                        <img :src='item.talentInfo.resume.user.headimgurl' class="avatar" width="36" height="36">
                        <div class="name" >
                            <p>{{ item.talentInfo.resume.name }}</p>
                            <ul class="liter">
                                 <li>{{item.talentInfo.resume.age}}岁</li>
                                <li>{{item.talentInfo.resume.user.sex ==1 ?  '男' : '女'}}</li>
                            </ul>
                        </div>
                        <div class="add_icon" style="padding: 0 10px" @click.stop="toggle(item.id)">
                            <img src='../img/rck1@2x.png'>
                        </div>
                    </div>
                    <div class="nwl_content" v-if='item.talentInfo'>
                        <!--<p class="title">岗位名称</p>-->
                        <p class="nc_des"><pre class='question-content ellipsis' style='-webkit-box-orient: vertical;'>{{item.talentInfo.resume.description}}</pre>
                        </p>
                        <ul class="liter">
                            <li v-if="item.talentInfo.resume.user.province">{{item.talentInfo.resume.user.province + item.talentInfo.resume.user.city}}</li>
                            <li>{{item.talentInfo.resume.workingYear}}年</li>
                            <!-- <li>南京一级监理</li>
                            <li>全职</li> -->
                        </ul>
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
import { collection} from '@/api/company.js'
import { addTalent,clectTalent } from '@/api/employ'
import {formatDate} from '@/utils/date.js'

export default {
    components: {
        loadMore,
        LoadMore  
    },
    created () {
        this.recruiterUserId = this.$route.query.recruiterUserId
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
            recruiterUserId: '',
            showadd_icon: false,
            collected: '',
        }
    },
    filters: {
        formatDate (time) {
            let date = new Date(time)
            return formatDate(date, 'yyyy-MM-dd')
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
            let pdata = {
                "recruiterUserId": this.recruiterUserId,
                "pageLastId": this.recruitmentId
            }
          
            collection(pdata).then(res => {
                                if (res.data.result == 0) {
                    let lists = res.data.datas.list
                    if (lists.length == 0) {
                        this.endtext = '再也没有了...'
                    }
                    this.total = res.data.datas.total
                    
                    if (this.recruitmentId == '') {
                        
                        lists.forEach(item => {
                            this.historylists.push(item)
                            console.log(item);            

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
        toggle (val) {
             
                let data = {
                    id: val
                }
                clectTalent(data).then(res => {
                    this.showadd_icon = !this.showadd_icon
                    this.historylists = [],
                    this.recruitmentId =  '',
                    this.getrecruiment()
                })
                
                
            
         },
        godetail(val){
            this.$router.push({name:'librarydetail',params:{'data':val}});
        },
    }
}
</script>
<style>


</style>
