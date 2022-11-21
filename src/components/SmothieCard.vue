<template>
    <div class="card-wrapper">
        <h3>{{ smoothie.title }}</h3>
        <p>{{ smoothie.method }}</p>
        <div class="rating">{{ smoothie.rating }}</div>
        <div class="edit-icon">
            <i class="material-icons" @click="router.push(`/${smoothie.id}`)">edit</i>
        </div>
        <div class="delete-icon">
            <i class="material-icons" @click="handleDelete(smoothie.id)">delete</i>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import supabase from '../config/supabaseClient';
import { useSmoothiesStore } from '../store/Smoothie'

defineProps(['smoothie'])

const smoothieStore = useSmoothiesStore()
const router = useRouter()
const deleteResult = ref(null)
const { fetchSmoothies } = smoothieStore

const handleDelete = async (id) => {
    const { data, error } = await supabase.from('smoothies').delete().eq('id', id).select();

    if (error) {
        deleteResult.value = null
        console.log(error)
        return
    }

    deleteResult.value = data
    fetchSmoothies()
}

</script>

<style scoped>
.card-wrapper {
    position: relative;
}

h3 {
    margin-bottom: 5px;
}

.card-wrapper .rating {
    position: absolute;
    width: 30px;
    height: 30px;
    display: grid;
    place-items: center;
    box-sizing: border-box;
    background-color: #FDFF00;
    border-radius: 2px;
    top: -25px;
    right: -25px;
    border: 2px solid rgb(66, 66, 66);
}

.edit-icon {
    border: 2px solid rgb(66, 66, 66);
    width: 30px;
    height: 30px;
    display: grid;
    place-items: center;
    box-sizing: border-box;
    border-radius: 2px;
    position: absolute;
    top: -25px;
    right: 10px;
    background-color: #9CFF2E;
}

.delete-icon {
    border: 2px solid rgb(66, 66, 66);
    width: 30px;
    height: 30px;
    display: grid;
    place-items: center;
    box-sizing: border-box;
    border-radius: 2px;
    position: absolute;
    top: -25px;
    right: 45px;
    background-color: #F96666;
}
</style>