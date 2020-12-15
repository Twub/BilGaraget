<template>
    <div class="threads">
        <h1>THREADS LIST</h1>
        <h4>{{ this.category }}</h4>
    </div>
</template>

<script>
export default{
    name: 'list-threads',
    props: ['category'],
    data: function(){
      return {
        threads: [],
      }
    },
    methods: {
      async getThreads(){
          
      }
    },
}
</script>

<style>

</style>