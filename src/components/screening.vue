<template>
    <div class="screening_wrap" v-show="certicateshow">
        <ul class="sw_left">
            <li @click="choose(item,index)" 
                :class="leftnowIndex == index ? 'active' : ''"
                v-for='(item,index) in certificatelists' 
                :key='index'>
                <span>{{item.name}}</span>
            </li>
        </ul>
        <ul class="sw_right" v-show="showleft">
            <li v-for="(item,index) in rightlists" 
                :key='index'
                :class="{active: checkActive(index)}"
                @click="chooseSon(item,index)"
                v-show="item.name">
                <span>{{item.name}}</span>
            </li>

            <li v-show="!rightlists.length">暂无数据</li>

      

        </ul>


        
        <div class="footer">
            <span @click="cancel">重置</span>
            <span @click="confirm">确定</span>
        </div>
    </div>
</template>

<script>
import { listByTypeAndPid } from '@/api/dictionary.js'
import { addMajory } from '@/api/ucenter.js'

export default {
    data () {
        return {
            certicateshow: false,
            name: '',
            certificatelists: '',
            rightlists: '',
            showleft: false,
            majorL1Id:'',
            majorL1Name: '',
            majorL2Id: '',
            majorL2Name: '',
            queryData: {},
            nowIndex: '-1',
            leftnowIndex: '-1',
            nowIndexes: [],
            selected: []
        }
    },
    created () {
        this.getcertificate()
    },
    methods: {
        getcertificate () {
            listByTypeAndPid(0,0).then(res => {
                if (res.data.result == 0) {
                    this.certificatelists = res.data.datas
                }
            })
        },
        choose (item,index) {
            this.leftnowIndex = index
            this.showleft = true
            listByTypeAndPid(0,item.id).then(res => {
                if (res.data.result == 0) {
                    this.rightlists = res.data.datas;

                    this.majorL1Id = item.id;
                    this.majorL1Name = item.name;

                }
            })
        },
        chooseSon(item, index){
            this.nowIndex = index
            this.majorL2Id = item.id;

            if (this.nowIndexes.indexOf(index) === -1) {
                this.nowIndexes.push(index)  
            }
            else {
                this.nowIndexes = this.nowIndexes.filter(el => {
                    return el != index
                })
            }

        },
        checkActive (index) {
            return this.nowIndexes.indexOf(index) !== -1
        },
        addNewMajory () {
            let id = this.certificatelists[this.leftnowIndex].id
            let data = {
                name: this.name,
                pid: id,
                type: 0
            };
             addMajory(data).then(res => {
               listByTypeAndPid(0, id).then(res => {
                if (res.data.result == 0) {
                    this.rightlists = res.data.datas;

                    this.majorL1Id = item.id;
                    this.majorL1Name = item.name;

                }
                })
            })

        },
        confirm () {
            this.nowIndexes.forEach( item => {
                this.selected.push(this.rightlists[item].id)
            })
            this.$emit('postchange',this.selected)
            this.certicateshow = false
        },
        cancel () {
            this.selected = []
            this.nowIndexes = []
            this.certicateshow = false
            this.$emit('closescreen')
        }

    }
}
</script>

<style>
.screening_wrap {
    position: relative;
    display: flex;
    background-color: #f2eeee;
    overflow: auto;
 }
.footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    border-top: 1px solid #eee;
}
.footer span {
    flex: 1;
    text-align: center;
    background-color: #fff;
}
.footer span:last-child {
    color: #fff;
    background: #6febdb;
}
.screening_wrap .sw_label {
    top: 30px;
}
.sw_left {
    flex: 0 0 150px;
    width: 150px;
    height: 340px;
    overflow: auto;
    /* margin-bottom: 50px; */
    background-color: #fff;
}
.sw_left li {
    text-align: center;
    padding: 14px 0;
    line-height: 20px;
    font-size: 14px;
}
/* .sw_left li:nth-of-type(odd) {
    background-color: #dddbdb;
} */

.sw_right {
    flex: 1;
    height: 340px;
    padding-left: 8px;
    background-color: #f5f5f5;
    margin-bottom: 50px;
    overflow-y: auto;
    overflow-x: hidden;
}
.sw_right li {
    padding: 14px;
    line-height: 20px;
    font-size: 14px;
}
.screening_wrap .active {
    background-color: #f5f5f5 !important;
    color: #6febdb;
}
/* .sw_right li:nth-of-type(odd) {
    background-color: #f5f5f5;
} */

.sw_wite {
    position: absolute;
    left: 0;
    top: -3px;
    width: 100%;
    padding-left: 24px;
    background-color: transparent;
    /* background: url(../img/write@2x.png) 0 center no-repeat; */
    background-size: 16px 16px;
}
.screening_wrap .move-enter-active, .screening_wrap .move-leave-active {
    transition: all 0.5s linear;
    transform: translate3d(0, 0, 0);
}
.screening_wrap .move-enter, .screening_wrap .move-leave {
    transform: translate3d(100%, 0, 0);
} 

.screening_wrap .add_btn {
    position: absolute;
    bottom: -38px;
    right: 20px;
    display: inline-block;
    width: 55px;
    padding: 5px;
    text-align: center;
    color: #fff;
    font-size: 14px;
    border-radius: 4px;
    background-color: #6febdb;
}
</style>
