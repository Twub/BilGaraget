<template>
  <div>
    <div>
      <div>
        <div>
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
            <button type="submit" class="btn">Skapa konto</button>
          </form>
        </div>
      </div>
    </div>
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
    signup() {
      
    }
  }
};
</script>

<style lang="css" scoped>
button {
  margin-top: 5%;
}
.hr-style {
  border: 0;
  height: 1px;
  margin: 0 0 10px 0;
  background: #fff;
  background-image: -webkit-linear-gradient(
    left,
    rgb(255, 255, 255),
    rgba(184, 10, 103, 0.993),
    rgb(255, 255, 255)
  );
}
.btn {
  background: rgb(230, 12, 128);
}
</style>