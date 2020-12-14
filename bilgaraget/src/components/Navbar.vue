<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="#">BilGaraget</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarColor02">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#">Hem</a>
      </li>
      <li class="nav-item">
          <a class="nav-link modal-trigger" href="/login">Logga in</a>
      </li>
      <li class="nav-item">
          <a class="nav-link" href="/register">Registrera dig</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/myPage">Min sida</a>
      </li>
      <li class="nav-item">
          <a class="nav-link" href="/logout">Logga ut</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Om oss</a>
      </li>
    </ul>
  </div>

  <div class="modal grey lighten-4" id="signin">
      <Signin v-on:close="closeModal($event)" />
    </div>

    <div class="modal grey lighten-4" id="signup">
      <Signup v-on:close="closeModal($event)" />
    </div>
</nav>
</template>

<script>
import Signin from "@/components/user/Signin";
import Signup from "@/components/user/Signup";

export default{
    name: 'navbar',
    components: {
        Signin,
        Signup
    },
}
</script>