<template>
    <div class="site_wrap">
        <group>    
            <x-address
                :title="title"
                v-model="value"
                :list="addressData" 
                @on-shadow-change="sitechange"
                @on-show="logShow"
                :hide-district='a'
                ref='address'
                province='dsv'
                raw-value>
            </x-address>
        </group>
    </div>
    
</template>

<script>
import { XAddress,ChinaAddressV4Data,Group } from 'vux'

export default {
    props: {
       a: {
            type: Boolean,
            default: false
        },
        showonesite: {
            type: Boolean,
            default: false
        },
        showtitle: {
            type: Boolean,
            default: false
        }
    },
    components: {
        Group,
        XAddress,
    },
    data () {
        return {
            addressData: ChinaAddressV4Data,
            value: [],
            title: '请选择',
            onesite: '',
            data: {}
         }
    },
    watch: {
        value (val) {
            if (val) {
                if (this.showtitle == true) {

                } else {
                    this.title = ''
                }
                
                if (this.showonesite) {
                    this.$nextTick( () => {
                            let span = document.querySelector('.vux-cell-value')
                            if ( this.$refs.address.nameValue.split(' ')[1] == '市辖区') {
                                span.innerHTML =  this.$refs.address.nameValue.split(' ')[0]
                                return
                            }
                            span.innerHTML =  this.$refs.address.nameValue.split(' ')[1]
                    })
                
                }
                this.$emit('sitechange', this.data)
            }
        }
    },
    methods: {
        
        sitechange (id,name) {
            this.data = {
                province: {
                    code: id[0],
                    value: name[0]
                },
                city: {
                    code: id[1],
                    value: name[1]
                },
                area: {
                    code: id[2],
                    value: name[2]
                }
            }
        },
        logShow (val) {
            this.$emit('closeother')
        }
        
    },

}
</script>

<style>
.site_wrap {
    z-index: 99999;
    height: 54px;
    line-height: 54px;
}
.ew_content .weui-cell {
    height: 54px;
    line-height: 54px;
    overflow: hidden;
    text-align: center !important;
}

.ew_content .weui-cells {
    margin-top: 0 !important;
}
.ew_content .vux-cell-value .showone {
    display: inline-block;
    min-width: 70px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.ew_content .weui-cell__hd,.ew_content .vux-popup-picker-select {
    text-align: center !important;
    line-height: 24px;
}
.ew_content .weui-cell_access .weui-cell__ft:after {
    display: none !important;
}
.ew_content .weui-label {
    position: absolute;
    top: 47%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 100% !important;
}
.ew_content .weui-cell_access .weui-cell__ft {
    padding-right: 0 !important;
}
</style>
