<template>
  <div class="home">
    <div class="jumbotron">
      <h1 class="display-3">Välkommen till BilGaraget</h1>
      <p class="lead">Detta är ett forum för bilintresserade personer.</p>
      <hr class="my-4">
      <p>Detta forum är för allt som har med bilar att göra veteranbilar, ombyggda bilar, vanliga bilar etc.</p>
      <p class="lead">
      </p>
    </div>
    <ForumCategories></ForumCategories>
  </div>
</template>

<script>
// @ is an alias to /src
import ForumCategories from '@/components/ForumCategories'

export default {
  name: 'Home',
  components: {
    ForumCategories,
  }
}
</script>
