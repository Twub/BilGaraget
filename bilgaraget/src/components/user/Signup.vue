<template>
  <div class="jumbotron">
    <h4>Skapa konto</h4>
    <hr/>
    <form @submit.prevent="signup">
      <div class="input-field">
        <input type="text" id="text" v-model="name" />
        <label for="email">Namn</label>
      </div>
      <div class="input-field">
        <input type="email" id="email" v-model="email" />
        <label for="email">E-post</label>
      </div>
      <div class="input-field">
        <input type="password" id="password" v-model="password" />
        <label for="password">Lösenord</label>
      </div>
      <div v-if="alert !== ''">
        <h6>{{alert}}</h6>
      </div>
        <button type="submit" class="btn btn-primary">Skapa konto</button>
      </form>
  </div>
</template>

<script>
export default {
  name: "register",
  data: function() {
    return {
      name: "",
      email: "",
      password: "",
      alert: "",
      message: ""
    };
  },
  methods: {
    async signup() {
      const newUser = {name: this.name, email: this.email, password: this.password}
        let res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((err) => console.error(err));
        console.log(res)
    },
    async fetchUser(){
      let res = await fetch("/rest/auth/whoami");
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