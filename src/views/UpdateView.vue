<template>
    <main>
        <form class="update-form" @submit.prevent="handleSubmit(route.params.id)">
            {{ smoothiesError }}
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
                <button class="button">Update Smoothie Recipe</button>
            </div>
            <p>{{ validation }}</p>
        </form>
    </main>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { onMounted, onUnmounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { useSmoothiesStore } from '../store/Smoothie'
import supabase from '../config/supabaseClient';

const smoothieStore = useSmoothiesStore();
const { getSmoothie, fetchSmoothies } = smoothieStore
const { smoothie, smoothiesError } = storeToRefs(smoothieStore)

const router = useRouter();
const route = useRoute();


const title = ref('')
const rating = ref(null)
const method = ref('')

const validation = ref('')

onMounted(async () => {
    await getSmoothie(route.params.id)
    title.value = smoothie.value.title
    rating.value = smoothie.value.rating
    method.value = smoothie.value.method
})


const handleSubmit = async (id) => {

    if (!title.value || !rating.value || !method.value) {
        validation.value = 'Please fill in all the field correctly!'
        return
    }

    validation.value = null

    if (title.value && method.value && rating.value) {

        const { data, error } = await supabase.from('smoothies').update([{ title: title.value, rating: rating.value, method: method.value }]).eq('id', id).select();

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

onUnmounted(() => {
    smoothieStore.$patch({ smoothie: null })
})
</script>

<style scoped>
main {
    padding: 1rem;
}

.update-form {
    box-sizing: border-box;
    max-width: 768px;
    background-color: white;
    padding: 1rem;
    border-radius: 5px;
    border: 2px solid rgb(66, 66, 66);
    margin: 1rem auto 0 auto;
}
</style>