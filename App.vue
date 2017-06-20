<template>
  <div class="container">
    <keep-alive>
      <transition name="fade" mode="out-in" appear>
        <router-view></router-view>
      </transition>
    </keep-alive>
  </div>
</template>
<style>
.fade-enter-active, .fade-leave-active{
  transition: all .2s ease
}
.fade-enter, .fade-leave-active{
  opacity: 0
}
body{
  background-color: #5b6270
}
.container{
  margin-top: 20px;
}
.input-group{
  margin-top: 10px;
}
.fl{
  float: left;
}
.fr{
  float: right;
}
</style>