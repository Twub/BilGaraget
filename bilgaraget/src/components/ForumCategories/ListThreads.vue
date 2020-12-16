<template>
    <div class="threads">
        <h1>{{ this.title }}</h1>
        <ul class="list-group">
            <li v-for="thread in threads" :key="thread.thread_title" class="list-group-item list-group-item-action">
                {{ thread.thread_title }}
            </li>
        </ul>
    </div>
</template>

<script>
export default{
    name: 'list-threads',
    props: ['category'],
    data: function(){
      return {
        threads: [],
        title: ''
      }
    },
    methods: {
      async getThreads(){
          let thread = await fetch('http://localhost:3000/api/ForumThreads/')
          thread = await thread.json()
          
          for (var j = 0; j < thread.length; j++){
            let threadCreator = await fetch('http://localhost:3000/api/users/' + thread[j].created_by)
            threadCreator = await threadCreator.json()
            thread[j].created_by = threadCreator.name

            let threadCategory = await fetch('http://localhost:3000/api/category/' + thread[j].category)
            threadCategory = await threadCategory.json()
            thread[j].category = threadCategory.Category

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