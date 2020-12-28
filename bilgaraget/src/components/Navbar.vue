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
        <a class="nav-link" @click="$router.push('/create-account')">Skapa konto</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/myPage" v-if="this.$store.getters.loggedInStatus == true">Min sida</a>
      </li>
      <li class="nav-item">
          <a class="nav-link" href="/logout" v-if="this.$store.getters.loggedInStatus == true">Logga ut</a>
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
        const credentials = {email: this.email, password: this.password}
        let res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((err) => console.error(err));
        console.log(res)
        console.log(this.fetchUser())
      },
      async fetchUser(){
        let res = await fetch("http://localhost:3000/auth/whoami");
        console.log(res.json())
        try {
          if (res.ok) {
            res = await res.json();
          
          } else {
            console.log('error')
          }
        } catch {
          console.log('catch error')
        }
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