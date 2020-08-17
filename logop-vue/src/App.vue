<template>
  <div class="container pt-5">
    <h3> LOGOP </h3>
    <hr>
    <form @submit.prevent="sendNewPost">
        <div class="form-group">
          <label>Document</label>
          <input v-model="post.logObject" type="text" class="form-control">
        </div>
        <button type="insert" class="btn btn-info">Kaydet</button>
    </form>   
</div>
</template>

<script>
import axios from "axios"
export default {
  data  () {
    return {
      post : {
        logObject : ""
      }
    }
  },
  methods : {
    sendNewPost(){
      var list = [];
      list.push(this.post);
      axios.post("http://localhost:3000/insert",[...list])
      .then(response =>  (console.log(response)))
      .catch(e => console.log(e))
    }
  }
}
</script>

<style>
</style>
