<template>
    <div class="create-thread-form jumbotron">
        <h1>Skapa tråd:</h1>
        <div class="form-group">
            <h5>Title:</h5>
            <textarea class="form-control" id="title-input" rows="3" v-model="title"></textarea>
        </div>
        <hr class="my-4">
        <div class="form-group">
            <h5>Text:</h5>
            <textarea class="form-control" id="text-input" rows="3" v-model="text"></textarea>
        </div>
        <button type="button" class="btn btn-primary btn-lg btn-block" @click="createThread">Skapa tråd</button>
    </div>
</template>

<script>
export default {
    name: 'create-thread-form',
    props: ['category'],
    data: function(){
      return {
        title: '',
        text: '',
      }
    },
    methods: {
        createThread(){
            console.log(this.category)
            if(this.title === '' || this.text === ''){
                alert('Du måste skriva in en title och text')
                return
            }
            let newThread = {
                thread_info: this.text,
                created: this.getCurrentDate(),
                created_by: 1, //this.$store.getters.currentUser.id,
                thread_title: this.title,
                category: 1//this.getCategory()
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
        getCategory(){
            switch(this.category){
                case 'General':
                    return 1
                case 'EngineTech':
                    return 2
                case 'CarSound':
                    return 3
            }
        },
        async postToDb(thread){
            let res = await fetch("http://localhost:3000/rest/threads/1", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(thread),
            })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((err) => console.error(err));
            console.log(res)
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

.jumbotron button{
    margin-top: 40px;
}

</style>