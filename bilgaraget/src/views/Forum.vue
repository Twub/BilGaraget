<template>
  <div class="forum">
    <ListThreads v-bind:category="this.category"></ListThreads>
  </div>
</template>

<script>
// @ is an alias to /src
import ListThreads from '@/components/ForumCategories/ListThreads'


export default {
  name: 'Forum',
  props: ['categoryType'],
  components: {
      ListThreads,
  },
  data: function(){
      return {
        category: this.categoryType,
      }
    },
    methods: {
      
    },
} 
</script>