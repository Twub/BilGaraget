<template>
    <div class="thread">
        <ThreadPosts v-bind:thread="this.thread"></ThreadPosts>
    </div>
</template>

<script>
import ThreadPosts from '@/components/ForumCategories/ThreadPosts'

export default{
    name: 'thread-view',
    props: ['thread'],
    components: {
        ThreadPosts,
    },
    
}
</script>

<style>
</style>