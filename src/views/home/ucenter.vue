<template>
    <div class="enterprise_wrap">
        <header>
            <!-- 动态头像获取 -->
            <div class="enterprise_avatar">
                <img :src=userInfo.headimgurl width="70px" height="70px" style="border-radius: 50%;">
            </div>
            <!-- 动态值 -->
            <p class="enterprise_name">{{userInfo.nickName}}</p>

            <!-- 接口没有值 -->
           <!-- <p class="enterprise_name">设计师 | 中兴通讯</p>-->
            
            <router-link to='/usetup'><span class="enterprise_set">设置</span></router-link>
        </header>
        
 
        <div class="enterprise_info" 
            v-show="userInfo.currentUserType">
            <div class="enterprise_info_item"
            @click.stop='$router.push({path: "/collect",query:{userId: userInfo.userId}})'>
                <span>{{userInfo.userCollectedCount}}</span>
                <span>我被收藏</span>
            </div>
            <div class="enterprise_info_item" @click.stop="$router.push('/position')">
                <span>{{userInfo.recruitmentCount}}</span>
                <span>应聘职位</span>
            </div>
            <div class="enterprise_info_item" @click.stop='$router.push("/mycollect")'>
                <span>{{userInfo.userCollectCount}}</span>
                <span>我的收藏</span>
            </div>
        </div>

        <!-- <div class="hr"></div> -->

        <div class="user_row">
            <ul>
                <li v-for="(item,index) in list" 
                    :key='index'
                    v-if="!(userInfo.currentUserType == 0 && array.indexOf(index) != -1)"
                    @click="topath(item, index)"
                    class="ucenter_list">
                    <div class="row_header" :class="item.listclass">
                        <div class="rol_left">{{item.listname}}</div>
                        <div class='rol_right' v-if="index == 0">完善简历</div>
                        <div class="rol_icon">

                            <span 
                                :class="visibledetails && index == 3 ? 'jt_rightnow' : 'jt_right'"
                                v-show="index == 3">
                            </span>
                            <span :class="visibledetails && index == 3 ? 'jt_rightnow' : 'jt_right'" v-show="index != 3">
                            </span>
                        </div>
                        
                        
                    </div>


                    <div class="bole_details" v-if="index == 3 && visibledetails">
                        <p @click="$router.push({name: 'raters',query: {userId: userInfo.userId}})">评价</p>
                        <p @click.stop="$router.push({name: 'employed',query: {userId: userInfo.userId}})">录用</p>
                    </div>
                </li>
            </ul>
        </div>

        <div class="sf_person">
            
            
            <router-link class="sf_container" to="/login" v-show="userInfo.currentUserType == 0">
                开通会员
            </router-link>
            <router-link class="sf_container" @click.native="tocompany" to='' v-show="userInfo.currentUserType == 0 ? false : true">
                切换到企业身份
            </router-link>

        </div>

        <Confirm 
            v-model="showdialog"
            title='确定开通企业会员'
            @on-confirm='$router.push("/enterpriseInfo")'>
        
    </Confirm> 
 
    </div>
</template>

<script>
import { Confirm } from 'vux'
import vPosition from '@/views/ucenter/position'
import {changeCurrentUserType} from '@/api/ucenter.js'
import {myinfo,findOneCompany} from '@/api/company.js'

export default {
    components: {
        vPosition,
        Confirm
    },
    created(){
            // 个人信息
            myinfo().then( res => {
    	     	if( res.data.result == 0 ) {
                    this.userInfo = res.data.datas
    	     	} 
    	     	
            })
    },
    data () {
        return {
            showdialog: false,
            visibledetails: false,
            array: [1,2,3,0],
            list: [
                {
                    path: '/resume',
                    listname: '我的简历',
                    listclass: 'enterprise'
                },
                {
                    path: '/objective',
                    listname: '求职意向',
                    listclass: 'objective'
                },
                {
                    path: '',
                    listname: '隐私设置',
                    listclass: 'setup'
                },
                {
                    path: '',
                    listname: '我的伯乐',
                    listclass: 'bole'
                },
                {
                    path: '/opinion',
                    listname: '意见反馈',
                    listclass: 'write'
                },
                {
                    // path: '/about',
                    path: '',
                    listname: '关于我们',
                    listclass: 'about'
                }
            ],
            collectdata: {},
            positiondata: {},
            userInfo: {},
        }
    },
    methods: {
        showMony(){
            this.$refs.mypicker.pickerShow = true;
            this.flag = true
        },
        // 切换身份
        tocompany () {
            // 判断企业身份是否注册
                let data = {
                    currentUserType: 2
                }
                changeCurrentUserType(data).then( res => {
                    if (res.data.result == 0) {
                        this.$router.push('/home/enterprise')
                    }
                })
            

            
        },
        showcollect (val, flag) {
            // 被收藏接口
            if (flag == 0) {
                this.collectdata = {}
            } else if (flag == 1) {  // 收藏接口
                this.collectdata =  {}
            }
             
            this.$refs.collect.show(val)
        },
        topath (item, index) {
            if (index != 3) {
                this.$router.push(item.path)
            } else {
                this.visibledetails = !this.visibledetails
            }
        },
        showposition (val) {
            this.$refs.position.show(val)
        },
        // 显示二级菜单
        showdetail (i) {
            if (i == 3) {
                this.visibledetails = !this.visibledetails
            }

        }
    }
}
</script>

<style scoped>
.enterprise_wrap {
    background-color: #fff;
    overflow: auto;
    margin-bottom: 55px;
}
header {
    position: relative;
    width: 100%;
    height: 180px;
    padding: 32px 0;
    background: url(./img/enterprise_bg.png) center center no-repeat;
    background-size: 100% 100%;
    text-align: center;
    color: #fff;
}
header .enterprise_avatar {
    width: 70px;
    height: 70px;
    margin: 0 auto;
   
    border-radius: 50%;
    margin-bottom: 20px;
}
header .enterprise_name {
    font-size: 18px;
    line-height: 20px;
    margin: 0 auto;
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
header .enterprise_set {
    position: absolute;
    right: 10px;
    top: 24px;
    display: block;
    padding: 10px;
    color: #fff;
    font-size: 18px;
}
.enterprise_info {
    display: flex;
    height: 80px;
    padding-bottom: 20px;
    border-bottom: 6px solid #ddd;
}
.enterprise_info_item {
    height: 70px;
    padding: 12px 0;
    flex: 1;
    text-align: center;
}
.hr {
    width: 100%;
    height: 6px;
    background: #ddd;
}
.jt_right, .jt_rightnow {
    display: inline-block;
    margin-right: 5px;
    border-right: 2px solid;
    border-bottom: 2px solid;
    width: 12px;
    height: 12px;
    float: right;
}
.jt_right {
  transform: rotate(-45deg);
}

.jt_rightnow {
    transform: rotate(45deg);
}
/* .row_left {
    float: left;
}
.rol_right {
    position: absolute;
    right: 36px;
    top: 28%;
     color: #cdcdcd;
} */
.user_row ul li {
    position: relative;
    overflow: hidden;
    font-size: 18px;
}
.row_header {
    margin: 0 15px;
    /* padding-left: 30px;
    height: 60px;
    line-height: 60px; */
    padding: 20px 0px 20px 30px;
}
.user_row ul .row_header.enterprise {
    background: url(./img/file-text@2x.png) 0 center no-repeat;
}
.user_row ul .row_header.setup {
    background: url(./img/navigation@2x.png) 0 center no-repeat;
}
.user_row ul .row_header.write {
    background: url(./img/write@2x.png) 0 center no-repeat;
}
.user_row ul .row_header.about {
    background: url(./img/CombinedShape@2x.png) 0 center no-repeat;
}
.user_row ul .row_header.objective {
    background: url(./img/Shape@2x.png) 0 center no-repeat;
}
.user_row ul .row_header.bole {
    background: url(./img/Shape@2x.png) 0 center no-repeat;
}
.bole_details p {
    height: 54px;
    line-height: 54px;
    padding-left: 30px;
    border-bottom: 1px solid #fff;
    background-color: #ebebeb;

}
.user_row ul li:not(:last-child) {
    border-bottom: 1px solid #e8e8e8;
}
.sf_person {
    text-align: center;
    height: 100px;
    line-height: 100px;
    background: #ebebeb;
}
.sf_container {
    display: inline-block;
    width: 310px;
    height: 46px;
    line-height: 46px;
    margin: 27px auto;
    background: #6febdb;
    color: #fff;
}
.row_header {
    display: flex;
    align-items: center;
}
.rol_left {
    flex: 1;
}
.rol_right {
    flex: 1;
    text-align: right;
    color: #bebebe;
}
.rol_icon {
    flex: 0 0 30px;
    width: 30px;
}
</style>

