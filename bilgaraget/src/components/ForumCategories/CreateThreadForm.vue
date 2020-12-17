<template>
    <div class="create-thread-form jumbotron">
        <h1>Skapa tråd:</h1>
        <div class="form-group">
            <h5>Title:</h5>
            <textarea class="form-control" id="title-input" rows="3"></textarea>
        </div>
        <hr class="my-4">
        <div class="form-group">
            <h5>Text:</h5>
            <textarea class="form-control" id="text-input" rows="3"></textarea>
        </div>
        <button type="button" class="btn btn-primary btn-lg btn-block" @click="createThread">Skapa tråd</button>
    </div>
</template>

<script>
export default {
    name: 'create-thread-form',
    props: ['category'],
    methods: {
        createThread(){

        }
    }
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