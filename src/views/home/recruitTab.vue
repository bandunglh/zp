 <template>
    <div class="recritTab_wrap">
        <div class="rw_content ew_content">
            <load-more
                :bottom-method="loadBottom"
                :bottom-all-loaded="allLoaded"
                :bottomPullText='bottomText'
                :auto-fill="false"
                @bottom-status-change="handleBottomChange"
                ref="loadmore">
                <div><img id="scrollImg" src="./img/ad.jpeg" width="100%" height="180px"></div>
                <header class="nav-hd" :class="fixedheader ? 're_hd_re' : 're_hd'">
                    <flexbox :gutter="0">
                        <flexbox-item :span='7/25' >
                            <div class="flex-demo flex_odd_one" @click="showDialog">
                                <span class="flex-odd-item1" style="margin-left: 9%;"><img src="./img/location@2x.png" width="15" height="15" class="location"></span>
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
                                    <tab-item @on-item-click="post" style="background: #fff;">专业</tab-item>
                                    <tab-item @on-item-click="timeType" style="background: #fff;">全/兼职</tab-item>
                                    <tab-item @on-item-click="age" style="background: #fff;">性别</tab-item>
                                </tab>
                            </div>
                        </flexbox-item>
                        <flexbox-item :span='11/50'>
                            <!-- <div class="flex-demo flex-odd" style="color: #fff;background-color:#6febdb" @click="resetdata"><span>重置</span></div> -->
                            <div class="flex-demo flex-odd"><img src="./img/filter@2x.png" style="position: relative;top: -2px;"></div>
                        </flexbox-item>
                    </flexbox>
                    <transition name="fade">
                        <div class="rt_dialog">
                            <screening ref='screening' @postchange='postchange' @closescreen='maskdialog = false, resetdata()'></screening>
            
                        </div>
            
                    </transition>
                    <transition name="fade">
                        <div class="rt_dialog">
                            <div class="time-select_one" style="padding: 0px" v-if="timeShow">
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
                    <transition name="fade">
                        <div class="rt_dialog">
                            <div class="time-select" v-if="ageShow">

                                <div style="padding:6px 20px;margin:20px 20px 10px 20px"
                                    :class="nowIndex == indexs?'time-select_item':'time-select_item-changeColor'"
                                    v-for="(item,indexs) in sexoptions"
                                    :key="indexs"
                                    @click="sexSelect(item,indexs)">
                                    {{item.value}}
                                </div>


                                <!-- <group>
                                      <radio :options="sexoptions" v-model="sex" :max=1 :selected-label-style="{color: '#4ee1d1'}"></radio>
                                </group> -->
                                <div class="ps_btn">
                                    <span class="cancel" @click="ageShow = false,maskdialog = false,resetdata()">重置</span>
                                    <span class="makesure" @click.stop="sureAge">确定</span>
                                </div>
                            </div>
                        </div>

                    </transition>
                </header>



            

                <div class="content" style="margin-bottom: 50px;">
                    <div class="list-item"
                        v-for="(item,index) in allCompList"
                        :key="index"
                        @click="goPostDetail(item.id)"
                        >
                        <div class="item-top">
                            <p class="item-logo">
                                <img :src="item.company.headimgurl" class="img_radious">
                            </p>
                            <div class="item-name">
                                <p class="item_username">{{ item.company.name}}</p>
                                <ul class="item-name_sm">
                                    <li>{{item.createdDesc}}</li>
                                </ul>
                            </div>
                        </div>
                        <div class="item-content">
                            <h4 class="item-title">
                                <!-- <p class="item_post">{{item.post}}</p> -->
                                {{item.post}}
                                <span class="money_range" v-show="item.salaryStart">{{item.salaryStart + 'k~' + item.salaryEnd + 'k'}}</span>
                                <span class="money_range" v-show="!item.salaryStart">面议</span>
                             </h4>
                            <p class="item-content">
                                <pre class='question-content ellipsis' style='-webkit-box-orient: vertical;'>{{ item.description}}</pre>
                            </p>
                            <!--<p class="changline" v-html="changeline(item.description)"></p> -->
                         </div>
                        <ul class="item-bottom">
                            <li>
                                <span><img src="./img/briefcase@2x.png" alt="" style="vertical-align: middle"></span>
                                <span class="item-bottom_msg">
                                    {{item.workingType==0?"不限":(item.workingType==1?"全职":"兼职")}}
                                    </span>
                            </li>
                            <li>
                                <span><img src="./img/award@2x.png" alt="" style="vertical-align: middle"></span>
                                <span class="item-bottom_msg">{{ item.certMajorL2}}</span>
                            </li>
                            <li>
                                <span><img src="./img/flag@2x.png" alt="" style="vertical-align: middle" ></span>
                                <span class="item-bottom_msg">{{item.provinceName + item.cityName}}</span>
                            </li>
                        </ul>
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

    import { Flexbox, Radio, FlexboxItem,Tab,TabItem,XDialog,XInput,LoadMore,Checker,CheckerItem,Group } from 'vux'
    import VDistpicker from 'v-distpicker'
    import { allRecruitList,majorFir,majorSec } from '@/api/recruit'
    import loadMore from '@/components/loadmore'
    import myaddress from '../../../static/pc-code.json'
    import VSite from '@/components/site.vue'
    import {formatDate} from '@/utils/date.js'
    import screening from '@/components/screening.vue'

    export default {
        name: 'recruitTab',
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
            screening,
            Group,
            Radio

        },
        data(){
            return{
                sexoptions: [{key: '1', value: '男'}, {key: '2', value: '女'},{key: '0', value: '不限'}],
                sex:'',
                fixedheader:　false,
                min_value: '',
                max_value:　'',
                currentIndex: 'no',
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
                allCompList: [],
                headimgurl: '',
                orderId: '',
                total: 0,
                loading: false,
                allLoaded: false,
                bottomText: '',
                endtext: '',
                majorFirtList: [],
                majorSectList: [],
                likeMajors:[],
                proviceList: [],
                cityList: [],
                areaData:[],
                workType: 0,
                flag: 0, 
            }
        },
        created(){

            this.proviceList = Object.values(myaddress)
            for(let i = 0; i<this.proviceList.length; i++){
               this.cityList.push(this.proviceList[i].children)
            };
            this.getrecruiment();
            majorFir().then(res => {
                this.majorFirtList = res.data.datas;
                if(res.data.message == 'success'){
                    for(let i=0; i<this.majorFirtList.length; i++){
                        let pid = this.majorFirtList[i].id;
                        majorSec(pid).then(res => {
                            this.majorSectList.push(res.data.datas);
                        });
                    }
                }
            });
        },
        
        filters: {
            formatDate (time) {
                let date = new Date(time)
                return formatDate(date, 'yyyy-MM-dd')
            },
        },
        mounted () {
            let scrollDom = document.querySelector('.rw_content')
            scrollDom.addEventListener('scroll', this.handle)
        },
        destroyed () {
            let scrollDom = document.querySelector('.rw_content')
            window.removeEventListener('scroll', this.handle)
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
        methods:{
            changeline (val) {
                // console.log( val.replace(/[\n\r]/g,'<br>'))
                return val.replace(/[\n\r]/g,'<br>')
            },
            handle () {
                let scrollDom = document.querySelector('.rw_content')
                var scrollTop =scrollDom.scrollTop
                var offsetTop = document.querySelector('#scrollImg').offsetTop + 126
                if (scrollTop > offsetTop) {
                    this.fixedheader = true
                } else {
                    this.fixedheader = false
                }
            },
            resetdata () {
                this.reset()
                this.flag = 0
                this.getrecruiment()
                this.close()
            },
            close () {
                this.maskdialog = false
                this.ageShow = false
                this.timeShow = false
                this.postShow = false
                this.$refs.screening.certicateshow = false
            },
            reset () {
                this.endtext = ''
                this.orderId = ''
                this.allCompList = []
                this.total = 0
            },
            loadBottom: function() {
                if (!this.endtext) {
                    this.loading = true;
                }
                this.orderId = this.allCompList[this.allCompList.length - 1].orderId
                if (this.orderId == 0) {
                    this.loading = false;
                    this.allLoaded = true;
                    return;
                }

                if (this.flag == 0) {
                    this.getrecruiment()
                } else if (this.flag == 1) {
                    this.chooseCity ()
                } else if (this.flag == 2) {
                   this.sureMajor ()
                } else if (this.flag == 3) {
                     this.getimeslect()
                } else if (this.flag == 4) {
                    this.chooseage()
                }
               
            },
            handleBottomChange(val) {
                this.bottomText = val;
            },

            getrecruiment () {
                let data = {
                    "pagesize": "10",
                    "pageLastId": this.orderId,
                    "isClosed": '0'
                };

                allRecruitList(data).then(res => {
                    if (res.data.result == 0) {
                        let lists = res.data.datas.list
                        if (lists.length == 0) {
                            this.endtext = '再也没有了...'
                        }
                        this.total = res.data.datas.total
                        if (this.orderId == '') {
                            lists.forEach(item => {
                                this.allCompList.push(item)
                            })
                        } else if (this.orderId != 0) {
                            setTimeout(() => {
                                this.loading = false;
                                lists.forEach(item => {
                                    this.allCompList.push(item)
                                })
                            }, 600)
                        }
                    }
                })
            },

            closeother () {
                this.ageShow = false
                this.timeShow = false
                this.postShow = false
                this.maskdialog = false
                this.$refs.screening.certicateshow = false
            },
            post(){
                this.postShow = true;
                this.$refs.screening.certicateshow = true
                this.timeShow = false;
                this.ageShow = false;
                this.maskdialog = true
                this.barWidth = "15px";
            },
            timeType(){
                this.timeShow = true
                this.$refs.screening.certicateshow = false
                this.$refs.screening.nowIndexes = []
                this.$refs.screening.selected = []
                this.ageShow = false;
                this.maskdialog = true
                this.barWidth = "15px";
            },
            age(){
                this.flag = 4
                this.ageShow = true
                this.maskdialog = true
                this.postShow = false;
                this.timeShow = false;
                this.$refs.screening.certicateshow = false
                this.$refs.screening.nowIndexes = []
                this.$refs.screening.selected = []
                this.barWidth = "15px";
            },
            sexSelect(item,index){
                
                this.nowIndex = index;
                this.sex = item.key
            },
            sureAge(){
                this.ageShow = false
                this.maskdialog = false
                this.reset()
                
                this.chooseage()

            },
            chooseage () {
                let data = {
                    "pagesize": 10,
                    "sex": this.sex,
                    "pageLastId": this.orderId,
                    "isClosed": '0'
                };
                allRecruitList(data).then(res => {
                    let lists = res.data.datas.list
                        if (lists.length == 0) {
                            this.endtext = '再也没有了...'
                        }
                        this.total = res.data.datas.total
                        if (this.orderId == '') {
                            lists.forEach(item => {
                                this.allCompList.push(item)
                            })
                        } else if (this.orderId != 0) {
                            setTimeout(() => {
                                this.loading = false;
                                lists.forEach(item => {
                                    this.allCompList.push(item)
                                })
                            }, 600)
                        }
                })
            },
            showDialog(){
                this.dialogShow = true;
            },
            getCity(res){
                this.flag = 1
                this.reset()
                this.dialogShow = false;
                this.city = res.city.code;
                this.chooseCity ()
            },
            chooseCity () {
                let data = {
                    "pagesize": "10",
                    "city": this.city,
                    "pageLastId": this.orderId,
                    "isClosed": '0'
                };
                allRecruitList(data).then(res => {
                    let lists = res.data.datas.list
                        if (lists.length == 0) {
                            this.endtext = '再也没有了...'
                        }
                        this.total = res.data.datas.total
                        if (this.orderId == '') {
                            lists.forEach(item => {
                                this.allCompList.push(item)
                            })
                        } else if (this.orderId != 0) {
                            setTimeout(() => {
                                this.loading = false;
                                lists.forEach(item => {
                                    this.allCompList.push(item)
                                })
                            }, 600)
                        }
                });
            },

            postSelect(index,itemer){
                this.currentIndex = index;
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
                this.maskdialog = false
                this.timeShow = false
                this.reset()

                this.flag = 3
                this.getimeslect()
            },
            getimeslect () {
                
                let data = {
                    "pagesize": "10",
                    "workingType": this.workType,
                    "pageLastId": this.orderId,
                    "isClosed": '0'
                };
                allRecruitList(data).then(res => {
                    let lists = res.data.datas.list
                        if (lists.length == 0) {
                            this.endtext = '再也没有了...'
                        }
                        this.total = res.data.datas.total
                        if (this.orderId == '') {
                            lists.forEach(item => {
                                this.allCompList.push(item)
                            })
                        } else if (this.orderId != 0) {
                            setTimeout(() => {
                                this.loading = false;
                                lists.forEach(item => {
                                    this.allCompList.push(item)
                                })
                            }, 600)
                        }
                });

            },
            majorSelect(name,id){
                this.likeMajors.push(id);
            },
            goPostDetail(fid){
                this.$router.push({name:'postDetail',query:{id: fid}})//应该传被点击的公司信息
            },
            postchange (val) {
                this.maskdialog = false
                this.reset()
                this.flag = 2
                this.likeMajors = val
                this.sureMajor()
            },
            sureMajor(){
                let data = {
                    "pagesize": 10,
                    "certMajorL2IdList": this.likeMajors,
                    "pageLastId": this.orderId,
                    "isClosed": '0'
                };
                allRecruitList(data).then(res => {
                    let lists = res.data.datas.list
                        if (lists.length == 0) {
                            this.endtext = '再也没有了...'
                        }
                        this.total = res.data.datas.total
                        if (this.orderId == '') {
                            lists.forEach(item => {
                                this.allCompList.push(item)
                            })
                        } else if (this.orderId != 0) {
                            setTimeout(() => {
                                this.loading = false;
                                lists.forEach(item => {
                                    this.allCompList.push(item)
                                })
                            }, 600)
                        }
                });
                this.postShow = false;
            },
        }
    }
</script>
<style>

.loading {
    margin-bottom: 80px;
}
.recritTab_wrap {
    width: 100%;
    overflow: auto;
    min-height: 667px;
}
.rw_content {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
}
.post-select-item{
    width:100%;
    min-height: 50px;
    font-size: 12px;
    padding-top: 10px;
    position: relative;
}
.select-item-title{
    position: absolute;
    top: 10px;
    left: 12px;
    color: #6febdb;
    width: 18%;
    /* overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis */
}
.box{
    width: 70%;
    min-height: 20px;
    margin-left: 30%;

}
.checkbox_item{
    padding: 0 10px 5px 10px;
    background: #f5f5f5;
    margin: 0 5px 10px 0;
    display: inline-block;
    font-size: 12px;
    text-align: center;
    padding: 3px;
}
.checkbox_item-changeColor{
    display: inline-block;
    padding: 0 10px 5px 10px;
    background: #6eebdd;
    margin: 0 5px 10px 0;
    color: #fefefe;
    padding: 3px;
}

</style>
