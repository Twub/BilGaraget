<template>
    <div class="create-thread-form jumbotron">
        <h1>Skapa tråd:</h1>
        <div class="form-group btn-group">
            <button class="btn btn-primary create-form-btn" @click="setCategory('General')">Allmänt</button>
            <button class="btn btn-primary create-form-btn" @click="setCategory('EngineTech')">Motorteknik</button>
            <button class="btn btn-primary create-form-btn" @click="setCategory('CarSound')">Billjud</button>
        </div>
        <div class="form-group">
            <h5>Title:</h5>
            <textarea class="form-control" id="title-input" rows="3" v-model="title"></textarea>
        </div>
        <hr class="my-4">
        <div class="form-group">
            <h5>Text:</h5>
            <textarea class="form-control" id="text-input" rows="3" v-model="text"></textarea>
        </div>
        <button type="button create-button" class="btn btn-primary btn-lg btn-block" @click="createThread">Skapa tråd</button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'create-thread-form',
    props: ['category'],
    data: function(){
      return {
        title: '',
        text: '',
        threadCategory: ''
      }
    },
    created(){
        console.log(this.category)
    },
    methods: {
        createThread(){
            if(this.title === '' || this.text === ''){
                alert('Du måste skriva in en title och text')
                return
            }
            console.log(this.$store.getters.currentUser)
            let newThread = {
                title: this.title,
                category: this.threadCategory,
                creator: this.$store.getters.currentUser.username,
                locked: false,
                moderators: null,
                threadInfo: this.text
            }
            this.postToDb(newThread)
        },
        getCurrentDate(){
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            
            today = mm + '/' + dd + '/' + yyyy;
            return today
        },
        setCategory(cat){
            switch(cat){
                case 'General':
                    this.threadCategory = 'General'
                    break
                case 'EngineTech':
                    this.threadCategory = 'EngineTech'
                    break
                case 'CarSound':
                    this.threadCategory = 'CarSound'
                    break
            }
        },
        async postToDb(thread){
            let formData = JSON.stringify(thread)
            await axios.post("/threads/1", formData, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            })
        }
    },
}
</script>

<style scoped>
.jumbotron{
    border:none;
}

.jumbotron h5{
    font-weight: bold;
}

.jumbotron h1{
    font-weight: bold;
    margin-bottom: 30px;
}

.jumbotron textarea{
    border: solid;
}

.create-button{
    margin-top: 40px;
}


</style>