<template>
  <div class="container pt-5">
    <div class=" col-md-6 offset-md-5"><h2><b>LOGOP</b> </h2></div>
    <br><hr>
    <form @submit.prevent="sendNewPost" >
        <div class="form-group">
          <label><dt>Name</dt></label>
          <input v-model="post.name" type="text" class="form-control">
        </div>
        <div class="form-group">
          <label><dt>Surname</dt></label>
          <input v-model="post.surname" type="text" class="form-control">
        </div>
        <div class="form-group">
          <label><b>E-Mail</b></label>
          <input v-model="post.email" type="text" class="form-control ">
        </div>

        <div class="row">
          <div class="col-sm-3">
            <div class="form-group">
              <label><b>Gender</b></label>
              <select v-model="post.gender" class="selectpicker form-control" data-width="100px">
                 <option value="">--Select--</option>
                <option value="1">Female</option>
                <option value="2">Male</option>
              </select>
            </div>
          </div>
        </div>
        <br>
        <button type="insert" class="btn btn-success btn-sm move-right">Ekle</button>
    </form>   
</div>

</template>

<script>
import axios from "axios"
export default {
  data  () {
    return {      
      post : {               
          name : "",
          surname: "",
          email : "",
          gender: ""
      },
    }
  },
  methods : {
    sendNewPost(){
      
      var willInsert = {
        logObject : this.post
      };

      var list = [];
      list.push(willInsert);
      axios.post("http://localhost:3000/insert",[...list])
      .then(response =>  (console.log(response)))
      .catch(e => console.log(e))
    }
  }
}
</script>

<style>
</style>
