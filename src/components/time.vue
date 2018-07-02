<template>
    <group class="time_wrap">
        <datetime format="YYYY-MM" title="项目开工时间	" placeholder="起始时间" :value.sync="startime"  @on-change='startchange'></datetime>
        <datetime format="YYYY-MM" title="项目竣工时间	" placeholder="结束时间" :value.sync="endtime" default-selected-value @on-change='endchange'></datetime>
    </group>

</template>

<script>
import { Datetime, Group  } from 'vux'
import { endianness } from 'os';

export default {
    components: {
        Datetime,
        Group 
    },
    data () {
        return {
            startime: '',
            endtime: ''            
        }

    },
    methods: {
        startchange (val) {
            this.startime = val
            this.$emit('timechange', 0, val)
        },
        endchange (val) {
            this.endtime = val
            this.$emit('timechange', 1, val)
        }
    }
}
</script>

<style>
</style>
