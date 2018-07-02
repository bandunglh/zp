<template>
    <div class="mycollect_wrap">

        <header class="header_top">
            <img @click.stop='$router.push("/home/ucenter")' class="back" src='../img/back.png' width="25" height="22">
            <span class="title">我被收藏</span>
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
                		@click="$router.push({path: '/company', query: {'id': item.companyId}})"
                        :key='index'
                        >
                    <div class="nwl_header">
                        <img :src='item.company.headimgurl' class="avatar" width="36" height="36">
                        <div class="name" >
                            <p>{{ item.company.name }}</p>
                            <p>{{item.company.provinceName + item.company.cityName + item.company.countryName}}</p>

                        </div>
                    </div>
                    <div class="nwl_content">
                        <p class="nc_des">{{item.company.qualification}}
                        </p>
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
import { mycollected} from '@/api/company.js'
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
            endtext: '',
            userId: ''
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
                "userId": this.userId,
                "pageLastId": this.recruitmentId
            }
          
            mycollected(pdata).then(res => {
                if (res.data.result == 0) {
                    let lists = res.data.datas.list
                    if (lists.length == 0) {
                        this.endtext = '再也没有了...'
                    }
                    this.total = res.data.datas.total
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
        delcollect (i) {
            let fdata = {
                id: i
            }
            deletecollect(fdata).then(res => {
                if (res.data.result == 0) {
                    this.recruitmentId = ''
                    this.historylists = []
                    this.getrecruiment()
                }
            })
        },
        godetail(val){
            this.$router.push({name:'collectdetail',params:{'data':val}});
        },
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

</style>
