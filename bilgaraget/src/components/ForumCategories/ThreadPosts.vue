<template>
    <div class="posts">
        <div class="thread-start-post">
            <div class="jumbotron start-post">
                <h1 class="display-3">{{ this.thread.title }}</h1>
                <hr class="my-4">
                <h4>{{ this.thread.threadInfo }}</h4>
                <div class="post-info-container">
                    <p class="post-info" v-if="this.$store.getters.loggedInStatus == true">Skapare: <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#user-modal" @click="getUser()"> {{ this.thread.creator }} </button></p>
                    <br>
                    <p class="post-info" v-if="this.$store.getters.loggedInStatus == false">Skapare: {{ this.thread.creator }}</p>
                </div>
                <AnswerPost v-if="this.$store.getters.loggedInStatus == true" v-bind:thread="thread"></AnswerPost>
                <br>
                
                <button class="btn btn-primary" @click="lockThread()" v-if="this.thread.locked !== 1">Lås tråd</button>
            </div>
        </div>
        <div class="thread-answers">
            <ul>
            <li v-for="post in posts" :key="post.info" class="jumbotron">
                <h4 v-if="post.warning === true" class="warning-message">{{ post.message }}</h4>
                <h4 v-else>{{ post.message }}</h4>
                <hr class="my-4">
                <div class="post-info-container">
                    <p class="post-info">Skapare: {{ post.sender }}</p>
                    <button class="btn btn-primary" @click="removeThread(post)">Ta bort inlägg</button>
                </div>
            </li>
        </ul>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="user-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Användere: {{ this.user.username }}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <h2>Moderator för: </h2>
                                <ul class="list-group">
                                    <li v-for="moderatorOfThread in moderatorOfThreads" :key="moderatorOfThread.title" class="list-group-item list-group-item-action">
                                        {{ moderatorOfThread.title }}
                                    </li>
                                </ul>
                                <br>
                                <h3>Inte moderator för:</h3>
                                <br>
                                <ul class="list-group">
                                    <li v-for="notModeratorOfThread in notModeratorOfThreads" :key="notModeratorOfThread.title" class="list-group-item list-group-item-action" @click="changeModerator(notModeratorOfThread)">
                                        {{ notModeratorOfThread.title }}
                                    </li>
                                </ul>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Stäng</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AnswerPost from './AnswerPost'
import axios from 'axios';

export default{
    name: 'thread-posts',
    props: ['thread'],
    components: {
        AnswerPost,
    },
    data: function(){
      return {
        posts: [],
        showRemoveModerator: false,
        showAddModerator: false,
        user: {
            id: '',
            email: '',
            username: '',
            roleid: ''
        },
        moderatorOfThreads: [],
        notModeratorOfThreads: []
      }
    },
    methods: {
        async getReplies(){
            let result = await axios.get('http://localhost:3000/routes/replies/' + this.thread.id)
            //result = await result.json()
            
            this.posts = result.data
        },
         async getUser(){
            if (this.showRemoveModerator){
                this.showRemoveModerator = false
            }
            let result = await axios.get('http://localhost:3000/routes/' + this.thread.creator)
            this.user = result.data
            console.log(result)
            this.getModeratedThreads()
            this.getAllThreads(result.data)
        },
        async changeUserRole(newRole){
            console.log(newRole)

        },
        async getModeratedThreads(){
            let result = await axios.get('http://localhost:3000/routes/moderator/' + this.user.id)
            this.moderatorOfThreads = result.data
        },
        async getAllThreads(user){
            let result = await axios.get('http://localhost:3000/routes/threads')
            result = result.data
            console.log(result)
            if (user.username !== ''){
                for (var i = 0; i < result.length; i++){
                    if (this.user.username !== result.creator){
                        this.notModeratorOfThreads.push(result[i])
                    }
                }
            }else {
                this.notModeratorOfThreads = result
            }

            console.log(this.notModeratorOfThreads)
            
            //this.notModeratorOfThreads = result
        },
        async changeModerator(thread){
            await axios.get('http://localhost:3000/routes/addModerator/' + this.user.id + '/' + thread.id)
        },
        async removeUser(){
            await axios.delete('http://localhost:3000/routes/deleteUser/' + this.user.id)
        },
        async lockThread(){
            await axios.get('http://localhost:3000/routes/lockThread/' + this.thread.id)
        },
        async removeThread(reply){
            await axios.get('http://localhost:3000/routes/deleteReply/' + reply.id)
        }
    },
    created(){
        //console.log(this.thread)
        this.getReplies()
       // this.getUser()
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

.modal{
    background-color: transparent;
}

.warning-message {
    color: red;
}

</style>