<template>
    <div class="enterprise_wrap">
        <header>

            <img class="enterprise_avatar" :src='comInfo.headimgurl' width="70px" height="70px">

            <p class="enterprise_name">{{comInfo.name ? comInfo.name : '企业名称'}}</p>
            <router-link to='/esetup'><span class="enterprise_set">设置</span></router-link>
        </header>

        <div class="enterprise_info">
            <div class="enterprise_info_item" @click="$router.push('/archives')">
                <span>{{receivedCount}}</span>
                <span>已收简历</span>
            </div>
            <div class="enterprise_info_item" @click="$router.push({path: '/library',query: {recruiterUserId: comInfo.userId} })">
                <span>{{talentCount}}</span>
                <span>人才库</span>                
            </div>
            <div class="enterprise_info_item" @click="$router.push({path: '/received',query: {recruiterUserId: comInfo.userId} })">
                <span>{{employCount}}</span>
                <span>员工档案库</span>                
            </div>
           
        </div>
 
        <div class="user_row" style="padding: 0 15px;">
            <ul>
                <li v-for="(item,index) in list" 
                    :key='index' 
                    :class="item.listclass"
                    @click="$router.push({path:item.path,query:{id: comInfo.userId}})">
                    <div class="row_left">
                        <span></span>{{item.listname}}<span></span>
                    </div>
                    <span class="jt_right"></span>
                </li>
            </ul>
        </div>

        <div class="sf_person">
            <router-link class="sf_container"  @click.native="toucenter" to="/home/ucenter">
                切换到个人身份
            </router-link>
        </div>
        
     </div>
</template>

<script>
import {findOneCompany,companyindex} from '@/api/company.js'
import {changeCurrentUserType} from '@/api/ucenter.js'

export default {
    created () {
        this.getCompany()
        companyindex().then( res => {
        		if ( res.data.result == 0 ) {
        			this.receivedCount = res.data.datas.receivedCount
        			this.talentCount = res.data.datas.talentCount
                    this.employCount = res.data.datas.employCount
                    this.currentUserType = res.data.datas.currentUserType
        		}
        })
    },
    data () {
        return {
            list: [
                {
                    path: '/enterpriseInfo',
                    listname: '企业信息',
                    listclass: 'enterprise'
                },
                {
                    path: '/jobmanage/jhistory',
                    listname: '职位管理 (发布职位)',
                    listclass: 'release'
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
            comInfo: {},
            currentUserType: '',
            receivedCount : 0,
            talentCount : 0,
            employCount :  0,
        }
    },
    methods: {
        toucenter () {
            let data = {
                currentUserType: 1
            }
            changeCurrentUserType(data).then( res => {
                if (res.data.result == 0) {
                }
            })
        },
        getCompany() {
            findOneCompany().then(res => {
                if (res.data.result == 0) {
                    this.comInfo = res.data.datas
                    
                }
                
            })
        }
    }
}
</script>

<style scoped>
.enterprise_wrap {
    background-color: #fff;
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
    width: 70;
    height: 70;
    margin: 0 auto;
    border: 1px solid #7c7a7a;
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
    font-size: 14px;
    text-align: center;
}

.hr {
    width: 100%;
    height: 6px;
    background: #ddd;
}
.jt_right {
    display: inline-block; 
    margin-top: 22px;
    margin-right: 5px;   
    border-right: 2px solid; 
    border-bottom: 2px solid;  
    width: 12px; 
    height: 12px;  
    transform: rotate(-45deg);
    float: right;
}
.row_left {
    float: left;

}
.user_row ul li {
    height: 60px;
    line-height: 60px;
    padding-left: 30px;
    overflow: hidden;
    font-size: 18px;
    
}
.user_row ul li.enterprise {
    background: url(./img/file-text@2x.png) 0 center no-repeat;
}
.user_row ul li.release {
    background: url(./img/navigation@2x.png) 0 center no-repeat;
}
.user_row ul li.write {
    background: url(./img/write@2x.png) 0 center no-repeat;
}
.user_row ul li.about {
    background: url(./img/CombinedShape@2x.png) 0 center no-repeat;
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

</style>

