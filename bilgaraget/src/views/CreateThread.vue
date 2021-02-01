<template>
    <div class="create-thread-view">
        <CreateThreadForm></CreateThreadForm>
    </div>
</template>

<script>
import CreateThreadForm from '@/components/ForumCategories/CreateThreadForm'

export default{
    name: 'create-thread-view',
    props: ['category'],
    components: {
        CreateThreadForm,
    },
}
</script>

<style>

</style>