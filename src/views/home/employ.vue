<template>
    <div style="overflow: auto">
        <div class="ew_content">
            <load-more
                :bottom-method="loadBottom"
                :bottom-all-loaded="allLoaded"
                :bottomPullText='bottomText'
                :auto-fill="false"
                @bottom-status-change="handleBottomChange"
                ref="loadmore">
                <!-- header -->
                <header class="nav-hd re_hd re_hd_em">
                    <flexbox :gutter="0">
                        <flexbox-item :span='3/10' >
                            <div class="flex-demo flex-odd flex_odd_one" @click="showDialog">
                                <span class="flex-odd-item1"><img src="./img/location@2x.png" alt=""  width="15" height="15" class="location"></span>
                                <!-- <span class="flex-odd-item2">{{ city }}</span> -->
                                <v-site 
                                    :a='true'
                                    :showonesite='true'
                                    @sitechange='getCity'
                                    @closeother='closeother'>
                                </v-site>
                            </div>
                        </flexbox-item>
                        <flexbox-item :span='3.5/7'>
                            <div class="flex-demo flex-mid recruit_rh">
                                <tab :line-width="3" :custom-bar-width="barWidth" bar-active-color="#6eebdd" active-color="#404041">
                                    <tab-item @on-item-click="post" style="background: #fff;">岗位</tab-item>
                                    <tab-item @on-item-click="timeType" style="background: #fff;">全/兼职</tab-item>
                                    <tab-item @on-item-click="age" style="background: #fff;">年龄</tab-item>
                                </tab>
                            </div>
                        </flexbox-item>
                        <flexbox-item :span='11/50'>
                            <div class="flex-demo flex-odd"><img src="./img/filter@2x.png" style="position: relative;top: -2px;"></div>

                            <!-- <div class="flex-demo flex-odd" style="color: #fff;background-color:#6febdb" @click="resetdata"><span>重置</span></div> -->
                        </flexbox-item>
                    </flexbox>

                            <!-- 岗位选择 -->
                    <transition name="fade">
                        <div class="rt_dialog" style="">
                            <div class="post-select" v-if="postShow">
                                <!-- <checker
                                    type="checkbox"
                                    default-item-class="item-choose_item"
                                    selected-item-class="item-choose_item-changeColor"
                                    style="padding-top: 10px;"
                                    >
                                    <checker-item v-for="(item,index) in postlist" :key="index" :value="index" @on-item-click="postSelect(item.name,item.id,index)" v-show='item.name'>{{item.name}}</checker-item>
                                </checker> -->
                                <ul class="ps_ul">
                                    <li v-for="(item,index) in postlist" 
                                        :key="index" 
                                        :value="index"
                                        class="ps_list"
                                        v-show='item.name'
                                        :class="{active: checkActive(index)}"
                                        @click="postSelect(item.name,item.id,index)">
                                        {{item.name}}
                                    </li>
                                </ul>
                                <div class="ps_btn">
                                    <span class="cancel" @click="postShow = false, maskdialog = false,resetdata()">重置</span>
                                    <span class="makesure" @click="surePost">确定</span>
                                </div>
                                
                            </div>
                        </div>

                    </transition>
                    <!-- 全/兼职 -->
                    <transition name="fade">
                        <div class="rt_dialog">
                            <div class="time-select_one" style="padding: 0px"  v-if="timeShow">
                                <div style="padding:6px 20px;margin:20px 20px 10px 20px"
                                    :class="nowIndex == indexs?'time-select_item':'time-select_item-changeColor'"
                                    v-for="(item,indexs) in timeList"
                                    :key="indexs"
                                    @click="timeSelect(item,indexs)">
                                    {{item}}
                                </div>
                                <div class="ps_btn">
                                    <span class="cancel" @click="timeShow = false , maskdialog = false, resetdata()">重置</span>
                                    <span class="makesure" @click.stop="suretime">确定</span>
                                </div>
                            </div>
                        </div>

                    </transition>

                    <!-- 年龄 -->
                    <transition name="fade">
                        <div class="rt_dialog">
                            <div class="time-select" v-if="ageShow">
                                <span style="font-size: 16px;padding-left: 30px;">年龄范围：</span>
  
                                <group>
                                    <x-input title="" v-model="min_value" placeholder="请输入最低年龄" :required='true' style="font-size: 16px;padding-left: 30px"></x-input>
                                    <x-input title="" v-model="max_value" placeholder="请输入最高年龄" :required='true' style="font-size: 16px;padding-left: 30px"></x-input>
                                </group>
                                <div class="ps_btn">
                                    <span class="cancel" @click="ageShow = false,maskdialog = false,resetdata()">重置</span>
                                    <span class="makesure" @click.stop="sureAge">确定</span>
                                </div>
                            </div>
                        </div>

                    </transition>


                </header>




                <!-- content -->
                <div class="content" style="padding-top: 66px;">
                    <div class="list-item" v-for="(item,index) in allList" :key="index" @click="goPostDetail(item.id)">
                        <div class="item-top">
                            <p class="item-logo">
                                <img :src="item.userDetail.headimgurl" class="img_radious">
                            </p>
                            <div class="item-name" v-if='item.userDetail'>
                                <p class="item_username">{{item.userDetail.nickName}}</p>
                                <ul class="item-name_sm">
                                    <!-- <li>{{item.userDetail.resume.diplomasData[0].majorName}}</li> -->
                                    <li>{{item.age}}岁</li>
                                    <li>{{item.userDetail.sex=='1'?'男':(item.userDetail.sex=='2'?'女':'未知')}}</li>
                                    <li>{{item.createdDesc}}</li>
                                </ul>
                            </div>
                        </div>
                        <div class="item-content">
                            <h4 class="item-title">
                                <span class="it_left">{{item.post}}</span>
                                <span class="money_range" v-show="item.expectedSalaryStart">{{item.expectedSalaryStart + 'k~' + item.expectedSalaryEnd + 'k'}}</span>
                                <span class="money_range" v-show="!item.expectedSalaryStart">面议</span>
                            </h4>
                            <p class="item-content"><pre class='question-content ellipsis' style='-webkit-box-orient: vertical;'>{{ item.userDetail.resume.description }}</pre></p>
                         </div>
                        <div class="item-bottom-s">
                                <span class="item-bottom_msg">{{ item.jobTime=='1'?'全职':(item.jobTime=='2')?'兼职':'不限'}}</span>
                                <span class="item-bottom_msg">{{item.userDetail.resume.workingYear}}年</span>
                                <span class="item-bottom_msg">{{item.jobCategoryName == '' ? '无' : item.jobCategoryName}}</span>
                                <span class="item-bottom_msg">{{item.provinceName == '' ? '无' : item.provinceName}}{{item.cityName== ''?'无':item.cityName}}</span>
                            
                        </div>
                    </div>
                    <p class="endtext" v-show="endtext">{{endtext}}</p>
                </div>
                <div v-show="loading" slot="bottom" class="loading">
                        <LoadMore slot="bottom" :show-loading='loading '></LoadMore>
                </div>
            </load-more>
        </div>
        <router-view></router-view>
        <div class="rm_mask" @touchmove.prevent @click='close' v-show='maskdialog'>
        </div>
     </div>
</template>

<script>
    import { Flexbox,Radio, FlexboxItem,Tab,TabItem,XDialog,XInput,Group } from 'vux'
    import VDistpicker from 'v-distpicker'
    import { getAllEmpList,postCategory } from '@/api/employ'
    import loadMore from '@/components/loadmore'
    import { LoadMore,Checker, CheckerItem } from 'vux'
    import VSite from '@/components/site.vue'
    import {changeCurrentUserType} from '@/api/ucenter.js'

    export default {
        name: 'employ',
        components:{
            Flexbox,
            FlexboxItem,
            Tab,
            TabItem,
            VDistpicker,
            XDialog,
            XInput,
            loadMore,
            LoadMore,
            Checker,
            CheckerItem,
            VSite,
            Group,
        },
        data(){
            return {
                nowIndex: 'no',
                barWidth: '0px',
                maskdialog: false,
                postShow: false,
                timeShow: false,
                ageShow: false,
                hideOnBlur: true,
                city: '选择城市',
                dialogShow: false,
                postlist: [],
                timeList: ["全职","兼职","不限"],
                allList: [],
                orderId: '',
                total: 0,
                loading: false,
                allLoaded: false,
                bottomText: '',
                endtext: '',
                likePosts:[],
                min_value: '',
                max_value: '',
                workType: 0,
                nowIndexes: [],
                flag: 0,
            }
        },
        created(){
            this.getAllList();
            postCategory().then(res => {
                this.postlist = res.data.datas;
            })

            
        },
        watch: {
            maskdialog (val) {
                if (val == true) {
                    document.body.style.position = 'fixed'
                    document.body.style.width = '100%'
                } else {
                    document.body.style.position = 'initial'
                    document.body.style.height = 'auto'
                }
            }
        },
        methods: {
            tocompany () {
                let data = {
                    currentUserType: 2
                }
                changeCurrentUserType(data).then( res => {
                    if (res.data.result == 0) {
                    }
                })
            
            },
            resetdata () {
                this.reset()
                this.flag = 0
                this.getAllList()
                this.close()
            },
            close () {
                this.maskdialog = false
                this.postShow = false;
                this.timeShow = false;
                this.ageShow = false;
                
            },
            reset () {
                this.endtext = ''
                this.orderId = ''
                this.allList = []
                this.total = 0
            },
            loadBottom: function() {
                
                
                if (!this.endtext) {
                    this.loading = true;
                }
                this.orderId = this.allList[this.allList.length - 1].orderId
                if (this.orderId == 0) {
                    this.loading = false;
                    this.allLoaded = true;
                    return;
                }

                if (this.flag == 0) {
                    this.getAllList();
                } else if (this.flag == 1) {
                    this.chooseCity()
                    
                } else if (this.flag == 2) {
                    this.getPost()
                    
                } else if (this.flag == 3) {
                    this.getimeslect()
                    
                }else if (this.flag == 4) {
                    this.chooseage() 
                }
               
            },
            handleBottomChange(val) {
                this.bottomText = val;
            },
            getAllList(){
                let data = {
                    "pagesize": 10,
                    "pageLastId": this.orderId,
                     "status": '0'
                };
                getAllEmpList(data).then(res => {
                    if (res.data.result == 0) {
                        let lists = res.data.datas.list
                        if (lists.length == 0) {
                            this.endtext = '再也没有了...'
                        }
                        this.total = res.data.datas.total
                        // 初次加载不延迟
                        if (this.orderId == '') {
                            lists.forEach(item => {
                                this.allList.push(item)
                            })
                        } else if (this.orderId != 0) {
                            setTimeout(() => {
                                this.loading = false;
                                lists.forEach(item => {
                                    this.allList.push(item)
                                })
                            }, 600)
                        }
                    }

                })
            },
            showDialog(){
                this.dialogShow = true;
            },
            closeother () {
                this.ageShow = false
                this.timeShow = false
                this.postShow = false
                this.maskdialog = false
            },
            post(){
                this.flag = 2
                this.postShow = true;
                this.timeShow = false;
                this.ageShow = false;
                this.maskdialog = true;
                this.barWidth = "15px";
            },
            timeType(){
                this.flag = 3
                this.postShow = false;
                this.timeShow = true;
                this.ageShow = false;
                this.maskdialog = true;
                this.barWidth = "15px";
            },
            age(){
                this.flag = 4
                this.postShow = false;
                this.timeShow = false;
                this.ageShow = true;
                this.maskdialog = true;
                this.barWidth = "15px";
            },
            sureAge(){
                this.ageShow = false
                this.maskdialog = false
                if (this.min_value == '' | this.max_value == '') {
                    return
                }
                this.reset()
                
                this.chooseage()

            },
            chooseage () {
                let data = {
                    "pagesize": 10,
                    "ageStart": this.min_value,
                    "ageEnd": this.max_value,
                    "pageLastId": this.orderId,
                    "status": '0'
                };
                getAllEmpList(data).then(res => {
                    let lists = res.data.datas.list
                        if (lists.length == 0) {
                            // console.log('adv')
                            this.endtext = '再也没有了...'
                        }
                        this.total = res.data.datas.total
                        // 初次加载不延迟
                        if (this.orderId == '') {
                            lists.forEach(item => {
                                this.allList.push(item)
                            })
                        } else if (this.orderId != 0) {
                            setTimeout(() => {
                                this.loading = false;
                                lists.forEach(item => {
                                    this.allList.push(item)
                                })
                            }, 600)
                        }
                })
            },
            
            getCity(res){
                this.flag = 1
                this.reset()
                this.city = res.city.code;
                this.dialogShow = false;

                this.chooseCity ()
            },
            chooseCity () {
                let data = {
                    "pagesize": "10",
                    "city": this.city,
                    "pageLastId": this.orderId,
                     "status": '0'
                };
                getAllEmpList(data).then(res => {
                    let lists = res.data.datas.list
                        if (lists.length == 0) {
                            // console.log('adv')
                            this.endtext = '再也没有了...'
                        }
                        this.total = res.data.datas.total
                        // 初次加载不延迟
                        if (this.orderId == '') {
                            lists.forEach(item => {
                                this.allList.push(item)
                            })
                        } else if (this.orderId != 0) {
                            setTimeout(() => {
                                this.loading = false;
                                lists.forEach(item => {
                                    this.allList.push(item)
                                })
                            }, 600)
                        }
                });
            },
            postSelect(name,id,index){

                if (this.nowIndexes.indexOf(index) === -1) {
                     this.nowIndexes.push(index)
                    this.likePosts.push(id)
                }
                else {
                    this.nowIndexes = this.nowIndexes.filter(el => {
                        return el != index
                    })
                    this.likePosts = this.likePosts.filter(el => {
                        return el != id
                    })
                }
                // console.log(this.likePosts)
            },
            checkActive (index) {
                return this.nowIndexes.indexOf(index) !== -1
            },
            surePost(){
                this.postShow = false
                this.maskdialog = false
                this.flag = 1
                if (this.likePosts.length == 0) {
                   return
                }
                this.reset()
                this.getPost()
            },
            getPost () {
                let data = {
                    "pagesize": 10,
                    "jobCategoryIdList": this.likePosts,
                    "pageLastId": this.orderId,
                     "status": '0'
                };
                getAllEmpList(data).then(res => {
                    if (res.data.result == 0) {
                        let lists = res.data.datas.list
                        if (lists.length == 0) {
                            this.endtext = '再也没有了...'
                        }
                        this.total = res.data.datas.total
                        if (this.orderId == '') {
                            lists.forEach(item => {
                                this.allList.push(item)
                            })
                        } else if (this.orderId != 0) {
                            setTimeout(() => {
                                this.loading = false;
                                lists.forEach(item => {
                                    this.allList.push(item)
                                })
                            }, 600)
                        }
                    }
                    
                })
            },
            timeSelect(item,index){
                
                this.nowIndex = index;
                if(item == '全职'){
                    this.workType = 1
                }else if(item == '兼职'){
                    this.workType = 2
                }else{
                    this.workType = 0
                }                
            },
            suretime () {
                this.reset()
                this.maskdialog = false
                this.timeShow = false
                this.flag = 3
                this.getimeslect()
            },
            getimeslect () {
                
                let data = {
                    "pagesize": "10",
                    "jobTime": this.workType,
                    "pageLastId": this.orderId,
                     "status": '0'
                };
                getAllEmpList(data).then(res => {
                    if (res.data.result == 0) {
                        let lists = res.data.datas.list
                        if (lists.length == 0) {
                            this.endtext = '再也没有了...'
                        }
                        this.total = res.data.datas.total
                        if (this.orderId == '') {
                            lists.forEach(item => {
                                this.allList.push(item)
                            })
                        } else if (this.orderId != 0) {
                            setTimeout(() => {
                                this.loading = false;
                                lists.forEach(item => {
                                    this.allList.push(item)
                                })
                            }, 600)
                        }
                    }
                });

            },
            goPostDetail(fid){
                this.$router.push({name:'employDetail',query:{id: fid}})
            }
        }
}
</script>

<style>
.loading {
    margin-bottom: 80px;
}
.ew_content {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
}
.ps_ul {
    padding: 10px;
    overflow: auto;
    max-height: 250px;
}
.ps_list {
    display: inline-block;
    flex: 0 11 30%;
    margin: 6px 0% 6px 0;
    font-size: 14px;
    padding: 10px;
    text-align: center;
    background: #f5f5f5;
    /* margin-top: 10px;
    float: left;
    margin-left: 12px;
    padding: 4px 18px;
    border: 1px solid #eee;
    border-radius: 4px; */
}
.ps_list.active {
    background: #6eebdd;
    color: #fff;
}
</style>

