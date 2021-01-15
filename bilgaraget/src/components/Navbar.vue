<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="#" @click="$router.push('/')">BilGaraget</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarColor02">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" @click="$router.push('/')">Hem</a>
      </li>
      <li class="nav-item active">
        <a class="nav-link" @click="$router.push('/create-account')" v-if="this.$store.getters.loggedInStatus == false">Skapa konto</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" @click="$router.push('/my-page')" v-if="this.$store.getters.loggedInStatus == true">Min sida</a>
      </li>
      <li class="nav-item">
          <a class="nav-link" @click="logout()" v-if="this.$store.getters.loggedInStatus == true">Logga ut</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" @click="$router.push('/about')">Om oss</a>
      </li>
    </ul>

    <div class="input">
      <input type="email" class="input-field" id="email-input"  placeholder="Epost:" v-model="email" v-if="this.$store.getters.loggedInStatus == false">
    </div>
    <div class="input">
      <input type="password" class="input-field" id="password-input" placeholder="Lösenord:" v-model="password" v-if="this.$store.getters.loggedInStatus == false">
    </div>
    <div class="input">
      <button type="button" class="btn btn-primary" v-on:click="login()" v-if="this.$store.getters.loggedInStatus == false">Logga in</button>
    </div>
    

  </div>

</nav>
</template>

<script>
import axios from 'axios';

export default{
    name: 'navbar',
    data: function(){
      return {
        email: '',
        password: '',
      }
    },
    methods: {
      async login() {
        if (this.email.length <= 0 || this.password.length <= 0){
          return
        }
        let credentials = {email: this.email, password: this.password}
        credentials = JSON.stringify(credentials)
        axios.post("http://localhost:3000/routes/login", credentials, {
        headers: { "Content-Type": "application/json" },
      })
        //console.log(res.data)
        this.fetchUser()
      },
      async fetchUser(){
        let res = axios.get("http://localhost:3000/routes/whoami", {
          method: "GET",
          mode: 'cors',
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          referrerPolicy: 'no-referrer',
          //credentials: 'include'
        });
        res = (await res).data
        this.$store.commit('setCurrentUser', res)
        this.$store.commit('setIsLoggedIn', true)
    },
      async logout(){
        await axios.get('http://localhost:3000/auth/logout')
        this.$store.commit('setCurrentUser', null)
        this.$store.commit('setIsLoggedIn', false)
      }
      
    }
}
</script>

<style>
.input-field{
  color:white;
}

.input{
  margin-left: 20px;
}
</style>