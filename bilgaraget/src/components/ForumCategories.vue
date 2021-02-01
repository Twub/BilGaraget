<template>
    <div class="categories">
        <div class="card text-white bg-secondary mb-3" style="max-width: 20rem;">
            <div class="card-header">Allmänt</div>
                <div class="card-body">
                <p class="card-text">Ämnet är fritt i princip så länge det hålls inom ramarna motorfordon och inte passar in i någon av de övriga kategorierna.</p>
                <button type="button" class="btn btn-primary btn-lg btn-block" @click="$router.push({name: 'forum', params: {categoryType: 'General'}})">Till trådar:</button>
            </div>
        </div>
        <div class="card text-white bg-secondary mb-3" style="max-width: 20rem;">
            <div class="card-header">Motorteknik</div>
                <div class="card-body">
                <p class="card-text">Allmänna frågor om motorteknik och motorer i standardutförande. Kategorin omfattar även frågor om standardmodifikationer samt enkla och/eller vanligt förekommande uppgraderingar (t.ex. chiptrimning)..</p>
                <button type="button" class="btn btn-primary btn-lg btn-block" @click="$router.push({name: 'forum', params: {categoryType: 'EngineTech'}})">Till trådar:</button>
            </div>
        </div>
        <div class="card text-white bg-secondary mb-3" style="max-width: 20rem;">
            <div class="card-header">Billjud</div>
                <div class="card-body">
                <p class="card-text">Allt som rör "ICE" (In Car Entertainment), bilstereo, högtalare, multimedia etc.</p>
                <button type="button" class="btn btn-primary btn-lg btn-block" @click="$router.push({name: 'forum', params: {categoryType: 'CarSound'}})">Till trådar:</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ForumCategories',
    }
</script>

<style>

</style>