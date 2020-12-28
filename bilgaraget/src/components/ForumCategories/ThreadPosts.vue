<template>
    <div class="posts">
        <div class="thread-start-post">
            <div class="jumbotron start-post">
                <h1 class="display-3">{{ this.thread.thread_title }}</h1>
                <hr class="my-4">
                <h4>{{ this.thread.thread_info }}</h4>
                <div class="post-info-container">
                    <p class="post-info">Skapare: {{ this.thread.created_by }}</p>
                    <p class="post-info">Datum: {{ this.thread.created }}</p>
                </div>
                <button type="button" class="btn btn-primary" @click="answerPost" v-if="this.$store.getters.loggedInStatus == false">Svara:</button>
                <AnswerPost></AnswerPost>
            </div>
        </div>
        <div class="thread-answers">
            <ul>
            <li v-for="post in posts" :key="post.info" class="jumbotron">
                <h1>{{ post.thread }}</h1>
                <hr class="my-4">
                <h4>{{ post.info }}</h4>
                <div class="post-info-container">
                    <p class="post-info">Skapare: {{ post.creator }}</p>
                    <p class="post-info">Datum: {{ post.date }}</p>
                </div>
            </li>
        </ul>
        </div>
    </div>
</template>

<script>
import AnswerPost from './AnswerPost'

export default{
    name: 'thread-posts',
    props: ['thread'],
    components: {
        AnswerPost,
    },
    data: function(){
      return {
        posts: []
      }
    },
    methods: {
        async getPostsFromDb(){
            let postsFromDb = await fetch('http://localhost:3000/api/Posts/')
            postsFromDb = await postsFromDb.json()
            
            for (var i = 0; i < postsFromDb.length; i++){
                if (this.thread.id === postsFromDb[i].thread){
                    this.posts.push(postsFromDb[i])
                }
            }
            for (var j = 0; j < this.posts.length; j++){
                let creator = await fetch('http://localhost:3000/api/users/' + this.posts[j].creator)
                creator = await creator.json()

                this.posts[j].creator = creator.name
                this.posts[j].thread = this.thread.thread_title
            }
            //console.log(this.posts)
        },
        answerPost(){
            alert('SVARA NU!!!')
        }
    },
    created(){
        //console.log(this.thread)
        this.getPostsFromDb()
    }
}
</script>

<style>
.post-info{
    font-weight: bold;
    margin: 0px;
}

.start-post{
    border-color: blue;
}

.jumbotron{
    border-style: solid;
}

</style>