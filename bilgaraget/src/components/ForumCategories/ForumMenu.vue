<template>
    <div class="forum-menu">
        <nav class="navbar navbar-expand-lg navbar-dark bg-secondary">
            <button type="button" class="btn btn-primary" @click="$router.push({name: 'create-thread', params: {category: category}})">Skapa tråd</button>
        </nav>
    </div>
</template>

<script>

export default{
    name: 'forum-menu',
    props: ['category'],
}
</script>

<style>
.forum-menu{
    margin-bottom: 20px;
}
</style>