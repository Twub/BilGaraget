<template>
    <div class="threads">
        <h1>{{ this.title }}</h1>
        <ForumMenu v-bind:category="threadCategory" v-if="this.$store.getters.loggedInStatus == true"></ForumMenu>
        <ul class="list-group">
            <li v-for="thread in threads" :key="thread.thread_title" class="list-group-item list-group-item-action" @click="$router.push({name: 'thread', params: {thread: thread}})">
                {{ thread.thread_title }}
            </li>
        </ul>
    </div>
</template>

<script>
import ForumMenu from './ForumMenu'

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
          let thread = await fetch('http://localhost:3000/rest/threads/CarSound')
          thread = await thread.json()
          
          for (var j = 0; j < thread.length; j++){
            let threadCreator = await fetch('http://localhost:3000/rest/users') //+ thread[j].created_by)
            threadCreator = await threadCreator.json()
            let creator = ''
            for (var i = 0; i < threadCreator.length; i++){
                if(threadCreator[i].id === thread[j].created_by){
                    creator = threadCreator[i]
                }
            }
            thread[j].created_by = creator.name

            let threadCategory = await fetch('http://localhost:3000/rest/subjects') //+ thread[j].category)
            threadCategory = await threadCategory.json()

            let category = ''
            for(var k = 0; k < threadCategory.length; k++){
                if (threadCategory[k].id === thread[j].category){
                    category = threadCategory[k]
                }
            }

            thread[j].category = category.Category

            if (thread[j].category === this.category){
                this.threads.push(thread[j])
            }
          } 
          //console.log(this.threads)
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