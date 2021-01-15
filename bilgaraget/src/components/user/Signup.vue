<template>
  <div class="jumbotron">
    <h4>Skapa konto</h4>
    <hr/>
    <form @submit.prevent="signup">
      <div class="input-field">
        <input type="text" id="text" v-model="username" />
        <label for="text">Användarnamn:</label>
      </div>
      <div class="input-field">
        <input type="email" id="email" v-model="email" />
        <label for="email">E-post:</label>
      </div>
      <div class="input-field">
        <input type="password" id="password" v-model="password" />
        <label for="password">Lösenord:</label>
      </div>
      <div v-if="alert !== ''">
        <h6>{{alert}}</h6>
      </div>
        <button type="submit" class="btn btn-primary">Skapa konto</button>
      </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "register",
  data: function() {
    return {
      username: "",
      email: "",
      password: "",
      alert: "",
      message: ""
    };
  },
  methods: {
    async signup() {
        let newUser = {
          email: this.email,
          username: this.username,
          password: this.password,
          roleId: 3    
      };
        await axios.post("http://localhost:3000/auth/register", JSON.stringify(newUser), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
    },
  }
};
</script>

<style lang="css" scoped>
button {
  margin-top: 5%;
}
.jumbotron{
  border:none;
}
</style>