<template>
  <div class="forum">
    <h1>FORUM</h1>
    <button @click="test">Click me!</button>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Forum',
  props: ['categoryType'],
  data: function(){
      return {
        category: '',
      }
    },
    methods: {
      test(){
          console.log(this.categoryType)
      }
    },
} 
</script>