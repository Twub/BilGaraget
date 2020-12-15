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
        <a class="nav-link" href="/myPage">Min sida</a>
      </li>
      <li class="nav-item">
          <a class="nav-link" href="/logout">Logga ut</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/about">Om oss</a>
      </li>
    </ul>

    
    <div class="input">
      <input type="email" class="input-field" id="email-input"  placeholder="Epost:">
    </div>
    <div class="input">
      <input type="password" class="input-field" id="password-input" placeholder="Lösenord:">
    </div>
    <div class="input">
      <button type="button" class="btn btn-primary">Logga in</button>
    </div>
    

  </div>

</nav>
</template>

<script>

export default{
    name: 'navbar',
    
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