<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <h3 class="panel-title">密码生成器 <router-link to="/"><span class="glyphicon glyphicon-home fr"></span></router-link></h3>
    </div>
    <div class="panel-body">
      <div class="input-group">
        <span class="input-group-addon" id="sizing-addon1">密钥</span>
        <input type="text" v-model="key" class="form-control" placeholder="请输入密钥" aria-describedby="sizing-addon1">
      </div>
      <div class="input-group">
        <button class="btn btn-default" type="button" @click="setConfig">确定修改</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: function(){
    return {
      key: this.$ipc.sendSync('getConf')
    }
  },
  methods: {
    setConfig: function(){
      this.$ipc.send('saveConf', this.key)
      this.$router.push('/')
    }
  }
}
</script>