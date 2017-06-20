<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <h3 class="panel-title">密码生成器</h3>
    </div>
    <div class="panel-body">
      <div class="input-group">
        <span class="input-group-addon" id="sizing-addon1">密钥</span>
        <input type="password" v-model="key" @input="syncKey()" class="form-control" placeholder="请输入密钥" aria-describedby="sizing-addon1">
      </div>
      <div class="input-group">
        <span class="input-group-addon" id="sizing-addon1">标识</span>
        <input type="text" v-model="flag" class="form-control" placeholder="请输入标识" aria-describedby="sizing-addon1">
      </div>
      <div class="input-group">
        <span class="input-group-addon" id="sizing-addon1">6位密码</span>
        <input type="text" v-model="p8" class="form-control" placeholder="8位密码" id="p8">
        <span class="input-group-btn">
          <button class="btn btn-default" id="p8button" type="button" @click="copy(1, $event)">复制</button>
        </span>
      </div>
      <div class="input-group">
        <span class="input-group-addon" id="sizing-addon1">12位密码</span>
        <input type="text" v-model="p16" class="form-control" placeholder="16位密码" id="p16">
        <span class="input-group-btn">
          <button class="btn btn-default" id="p16button" type="button" @click="copy(2, $event)">复制</button>
        </span>
      </div>
      <div class="input-group">
        <span class="input-group-addon" id="sizing-addon1">24位密码</span>
        <input type="text" v-model="p24" class="form-control" placeholder="24位密码" id="p24">
        <span class="input-group-btn">
          <button class="btn btn-default" id="p24button" type="button" @click="copy(3, $event)">复制</button>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import sha1 from 'sha1'
let configKey

export default {
  data: function(){
    return {
      flag: '',
      pkey: '',
      key: ''
    }
  },
  beforeMount(){
    configKey = this.$ipc.sendSync('getConf')
  },
  mounted(){
    this.key = configKey
    this.pkey = sha1(this.key + 'zznova\'s')
  },
  computed: {
    p8: function(){
      if (this.flag == '') {
        return ''
      }else{
        return this.genPassword(6)
      }
    },
    p16: function(){
      if (this.flag == '') {
        return ''
      }else{
        return this.genPassword(12)
      }
    },
    p24: function(){
      if (this.flag == '') {
        return ''
      }else{
        return this.genPassword(24)
      }
    }
  },
  methods: {
    syncKey: function(e){
      this.pkey = sha1(this.key + 'zznova\'s')
      this.$ipc.send('saveConf', this.key)
    },
    genPassword: function(len){
      this.reset()
      let pwd = sha1(this.pkey + this.flag)
      pwd = pwd.replace(/a/g,'@')
      pwd = pwd.replace(/1/g,'!')
      pwd = pwd.replace(/d/g,'~')
      pwd = pwd.replace(/0/g,'^')
      return 'Z' + pwd.substring(0, len - 2) + 'z'
    },
    copy: function(id, event){
      event.target.innerHTML = '已复制'
      if (id == 1) {
        this.$clipboard.writeText(this.p8)
      }else if(id == 2){
        this.$clipboard.writeText(this.p16)
      }else if(id == 3){
        this.$clipboard.writeText(this.p24)
      }
    },
    reset: function(){
      document.querySelector('#p8button').innerHTML = '复制'
      document.querySelector('#p16button').innerHTML = '复制'
      document.querySelector('#p24button').innerHTML = '复制'
    }
  }
}
</script>