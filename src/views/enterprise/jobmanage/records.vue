<template>
    <div class="history_wrap">
        <ul>
            <li class="hw_jobs">
                <div class="hwj_right">
                    <div class="title">
                        <span>职位描述</span>
                        <span>面议</span>                        
                    </div>
                    <p class="time">1天</p>
                    <p class="hw_content">准也需求准也需求准也需求准也需求准也需求准也需求准也需求准也需求准也需求准也需求准也需求准也需求准也需求准也需求准也需求准也需求准也需求准也需求准也需求准也需求准也需求准也需求准也需求准也需求准也需求准也需求准也需求准也需求准也需求</p>
                </div>

            </li>
        </ul> 
    </div>
</template>

<script>
export default {
    data () {
        return {
            historys: []
        }
    }
}
</script>

<style scoped>
.history_wrap {
    padding: 0 18px;
    background-color: #fff;
}
.hw_jobs {
    display: flex;
    padding: 16px 0;
}
.hw_jobs + .hw_jobs {
    border-top: 1px solid #e8e8e8;
}
.hwj_right {
    flex: 1;
}

.hwj_right .time {
    font-size: 16px;
    color: #abaaaa;
    margin-bottom: 10px;
    letter-spacing: 6px;
}

.hwj_left {
    flex: 0 0 50px;
    width: 50px;
}
.hwj_left span {
    display: inline-block;
    width: 100%;
    height: 100%;
}
.hwj_left .delete_one {
    background: url(../img/deleteone@2x.png) center right no-repeat;
}
.hwj_left .delete_two {
    background: url(../img/deletetwo@2x.png) center right no-repeat;
}
</style>
