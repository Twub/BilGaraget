<template>
    <div class="answer-post">
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#answer-modal" v-if="this.thread.locked !== 1">
            Svara:
        </button>

        <!-- Modal -->
        <div class="modal fade" id="answer-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Svara på {{ this.thread.thread_title }}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label for="message-text" class="col-form-label">Meddelande:</label>
                                <textarea class="form-control" id="message-text" v-model="answer"></textarea>
                                <button class="btn btn-primary" v-on:click="warning = !warning" v-if="this.$store.getters.currentUser.userRole !== 'user'">Varnings meddelande</button>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Stäng</button>
                        <button type="button" class="btn btn-primary" @click="answerPost">Svara</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default{
    name: 'answer-post',
    props: ['thread'],
    data: function(){
      return {
        answer: '',
        warning: false
      }
    },
    methods: {
        answerPost(){
            if (this.answer.length <= 0){
                return
            }
            let newPost = {
                message: this.answer,
                threadId: this.thread.id,
                timestamp: this.getCurrentDate(),
                sender: this.$store.getters.currentUser.id,
                warning: this.warning,
            }
            this.postToDb(newPost)
        },
        getCurrentDate(){
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            
            today = mm + '/' + dd + '/' + yyyy;
            return today
        },
        async postToDb(post){
            await axios.post("http://localhost:3000/routes/replies/" + this.thread.id, JSON.stringify(post), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            })
            
        }
    },
    created(){
        //console.log(this.thread)
    }
}
</script>

<style>
.modal{
    background-color: transparent;
}
</style>