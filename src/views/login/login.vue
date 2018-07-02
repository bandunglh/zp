<template>
    <div class="login_wrap">
        <header class="header_top">
            <img @click='$router.go(-1)' class="back" src='@/assets/back.png' width="25" height="22">
            <span class="title">开通会员</span>
        </header>
       <div class="lw_item user">
           <img src='@/assets/user@2x.png' width='116' height="116">
           <router-link to='/resume'>个人用户</router-link>
        </div>

        <div class="lw_item company">
           <img src='@/assets/bitmap@2x.png' width='116' height="116">
           <router-link to='/enterpriseInfo'>企业用户</router-link>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.login_wrap {
    display: flex;
    margin-top: 130px;
}
.lw_item {
    flex: 1;
    text-align: center;
}
.lw_item a {
   display: block;
   width: 110px;
   margin: 10px auto;
   height: 34px;
   line-height: 34px;
   border: 1px solid #6febdb;
   border-radius: 4px;
   color: #6febdb;
   font-size: 16px;
}
.company {

}
</style>
