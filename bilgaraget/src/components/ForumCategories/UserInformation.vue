<template>
    <div class="user-modal">

    </div>
</template>

<script>
import axios from 'axios';

export default{
    name: 'user-modal',
    props: ['user'],
    data: function(){
      return {
        showRemoveModerator: false,
        showAddModerator: false,
        user: null,
      }
    },
    methods: {
        async getUser(){
            if (this.showRemoveModerator){
                this.showRemoveModerator = false
            }
            let result = await axios.get('http://localhost:3000/rest/' + this.user.username)
            this.user = result.data
        }
    },
    created(){
        this.getUser()
    }
}
</script>

<style>

</style>