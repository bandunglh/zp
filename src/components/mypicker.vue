<template>
    <div class="picker_wrap" v-show="pickerShow">
        <transition name="fold">
            <div class="fold_wrap">
                <div class="pw_header">
                    <span @click="pickerShow = false">取消</span>
                    <span @click="confirm">确定</span>
                </div>
                <picker 
                    :data='datas' 
                    :fixed-columns="2" 
                    :columns=2  
                    v-model='value2' 
                    @on-change='changeMony(value2)' 
                    ref="picker">
                </picker>
             </div>
            
        </transition>

       
        <transition name='fade'>
            <div class="list-mask" @touchmove.prevent @click='pickerShow = false,$emit("changeflag")' v-show="pickerShow">
            </div>
        </transition>
    </div>
</template>

<script>
import { Picker,Group} from 'vux'

export default {
    components: {
        Picker,
        Group
    },
    created () {

    },
    data () {
        return {
            datas:[

                {name: '面议',value: '00',parent: 0},
                {name: '1k',value: '1',parent: 0},
                {name: '2k',value: '2',parent: 0},
                {name: '3k',value: '3',parent: 0},
                {name: '5k',value: '5',parent: 0},
                {name: '7k',value: '7',parent: 0},
                {name: '9k',value: '9',parent: 0},
                {name: '11k',value: '11',parent: 0},
                {name: '13k',value: '13',parent: 0},
                {name: '15k',value: '15',parent: 0},
                {name: '18k',value: '18',parent: 0},
                {name: '20k',value: '20',parent: 0},
                {name: '22k',value: '22',parent: 0},
                {name: '25k',value: '25',parent: 0},


                {name: '面议',value: '0',parent: '00'},

                {name: '2k',value: '2',parent: '1'},

                {name: '3k',value: '3',parent: '2'},
                {name: '4k',value: '4',parent: '2'}, 

                {name: '4k',value: '4',parent: '3'},
                {name: '5k',value: '5',parent: '3'},
                {name: '6k',value: '6',parent: '3'},

                {name: '7k',value: '7',parent: '5'},
                {name: '8k',value: '8',parent: '5'},
                {name: '9k',value: '9',parent: '5'},
                {name: '10k',value: '10',parent: '5'},

                {name: '9k',value: '9',parent: '7'},
                {name: '10k',value: '10',parent: '7'},
                {name: '11k',value: '11',parent: '7'},
                {name: '12k',value: '12',parent: '7'},

                {name: '11k',value: '11',parent: '9'},
                {name: '12k',value: '12',parent: '9'},
                {name: '13k',value: '13',parent: '9'},
                {name: '14k',value: '14',parent: '9'},
                {name: '15k',value: '15',parent: '9'},

                {name: '12k',value: '12',parent: '11'},
                {name: '13k',value: '13',parent: '11'},
                {name: '14k',value: '14',parent: '11'},
                {name: '15k',value: '15',parent: '11'},
                {name: '16k',value: '16',parent: '11'},

                {name: '14k',value: '14',parent: '13'},
                {name: '15k',value: '15',parent: '13'},
                {name: '16k',value: '16',parent: '13'},
                {name: '17k',value: '17',parent: '13'},
                {name: '18k',value: '18',parent: '13'},

                {name: '16k',value: '16',parent: '15'},
                {name: '17k',value: '17',parent: '15'},
                {name: '18k',value: '18',parent: '15'},
                {name: '19k',value: '19',parent: '15'},
                {name: '20k',value: '20',parent: '15'},

                {name: '19k',value: '19',parent: '18'},
                {name: '20k',value: '20',parent: '18'},
                {name: '21k',value: '21',parent: '18'},
                {name: '22k',value: '22',parent: '18'},
                {name: '23k',value: '23',parent: '18'},

                
                {name: '21k',value: '21',parent: '20'},
                {name: '22k',value: '22',parent: '20'},
                {name: '23k',value: '23',parent: '20'},
                {name: '24k',value: '24',parent: '20'},
                {name: '25k',value: '25',parent: '20'},

                {name: '23k',value: '23',parent: '22'},
                {name: '24k',value: '24',parent: '22'},
                {name: '25k',value: '25',parent: '22'},
                {name: '26k',value: '26',parent: '22'},
                {name: '27k',value: '27',parent: '22'},

                {name: '30k',value: '30',parent: '25'},
            
            ],
            value2: [],
            pickerShow: false,
            p: [],
            val: []
        }
    },
    methods: {
        changeMony (val) {
            this.p = this.$refs.picker.getNameValues().split(" ")
            this.val = val
            
        },
        confirm () {
            this.pickerShow = false
            this.$emit('changeMony', this.p, this.val)
        }
    }
}
</script>

<style>
.picker_wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 400;
    background-color: #fff;
}
.pw_header {
    display: flex;
    height: 60px;
    line-height: 60px;
    font-size: 18px;
    padding: 0 40px;
    background-color: #f5f5f5;
}
.pw_header span {
    flex: 1;
}
.pw_header span:first-child {
    text-align: left;
    border-right: 1px solid #fff;
 }
.pw_header span:last-child {
    text-align: right;
    color: #6febdb;
}
.fold_wrap .fold-enter-active,.fold_wrap .fold-leave-active {
    transition: all 0.5s;
    transform: translate3d(0, 0, 0)
}
.fold_wrap .fold-enter,.fold_wrap .fold-leave-active {
    transform: translate3d(0, 100%, 0)
}
.list-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 1;
    z-index: -1;
    background: rgba(7, 17, 27, 0.6);
}
.list-mask .fade-enter-active,.list-mask  .fade-leave-active {
    transition: all 0.5s;
}
.list-mask .fade-enter,.list-mask .fade-leave-active {
    opacity: 0;
    background: rgba(7, 17, 27, 0) ;
}
.picker_wrap .scroller-mask {
    background-color: #fff;
    z-index: 1;
} 
.picker_wrap .scroller-content {
    z-index: 222 !important;
}
</style>
