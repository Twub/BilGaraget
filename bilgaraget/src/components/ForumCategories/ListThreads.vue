<template>
    <div class="threads">
        <h1>{{ this.title }}</h1>
        <ForumMenu v-bind:category="threadCategory" v-if="this.$store.getters.loggedInStatus == true"></ForumMenu>
        <ul class="list-group">
            <li v-for="thread in threads" :key="thread.thread_title" class="list-group-item list-group-item-action" @click="$router.push({name: 'thread', params: {thread: thread}})">
                {{ thread.title }}
            </li>
        </ul>
    </div>
</template>

<script>
import ForumMenu from './ForumMenu'
import axios from 'axios';

export default{
    name: 'list-threads',
    props: ['category'],
    components: {
        ForumMenu,
    },
    data: function(){
      return {
        threads: [],
        title: '',
        threadCategory: this.category,
      }
    },
    methods: {
      async getThreads(){
          let result = await axios.get('/api/threads/' + this.getThreadId())
          result = result.data
          for (var i = 0; i < result.length; i++){
              this.threads.push(result[i])
          }
      },
      getThreadId(){
          switch(this.category){
              case 'General':
                  return 1
              case 'EngineTech':
                  return 2
              case 'CarSound':
                  return 3
          }
      }
    },
    created(){
        this.getThreads()
        switch(this.category){
            case 'General':
                this.title = 'Allmänt'
                break
            case 'EngineTech':
                this.title = 'Motorteknik'
                break
            case 'CarSound':
                this.title = 'Billjud'
                break
        }
    }
}
</script>

<style>

</style>