<template>
    <main>
        <form class="create-form" @submit.prevent="handleSubmit()">
            <div class="form-control">
                <label for="title">Title</label>
                <input type="text" name="title" id="title" v-model="title">
            </div>
            <div class="form-control">
                <label for="method">Method</label>
                <textarea name="method" id="method" v-model="method"></textarea>
            </div>
            <div class="form-control">
                <label for="rating">Rating</label>
                <input type="number" min="1" max="10" name="rating" id="rating" v-model="rating">
            </div>
            <div>
                <button class="button">Create Smoothie Recipe</button>
            </div>
            <p>{{ validation }}</p>
        </form>
    </main>
</template>

<script setup>
import { ref } from 'vue';
import supabase from '../config/supabaseClient';
import { useRoute, useRouter } from 'vue-router'
import { useSmoothiesStore } from '../store/Smoothie'

const smoothieStore = useSmoothiesStore();
const { fetchSmoothies } = smoothieStore;
const router = useRouter();
const route = useRoute();

const title = ref(null)
const rating = ref(null)
const method = ref(null)
const validation = ref(null)

const handleSubmit = async (id) => {

    if (!title.value || !rating.value || !method.value) {
        validation.value = 'Please fill in all the field correctly!'
        return
    }

    validation.value = null

    if (title.value && method.value && rating.value) {

        const { data, error } = await supabase.from('smoothies').insert([{ title: title.value, rating: rating.value, method: method.value }]).select();

        if (error) {
            validation.value = 'Please fill in all the field correctly!'
            return
        }

        console.log(data)
        validation.value = null

        fetchSmoothies()
        router.push('/')
    }

}
</script>

<style  scoped>
main {
    padding: 1rem;
    box-sizing: border-box;
}

.create-form {
    box-sizing: border-box;
    max-width: 768px;
    background-color: white;
    padding: 1rem;
    border-radius: 5px;
    border: 2px solid rgb(66, 66, 66);
    margin: 1rem auto 0 auto;
}
</style>