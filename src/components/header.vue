<template>
    <header>
        <h1>Supa Smoothies</h1>
        <nav>
            <router-link to="/">Home</router-link>
            <router-link to="/create">Create Smoothies</router-link>
        </nav>
    </header>
</template>

<script setup>

</script>

<style scoped>
header {
    padding: 1rem;
    background-color: #38E54D;
    color: white;
    text-align: center;
    border-top: 2px solid rgb(66, 66, 66);
    border-bottom: 2px solid rgb(66, 66, 66);
}

nav a {
    margin-right: 10px;
    color: white;
    text-underline-offset: 4px;
}

.router-link-active {
    text-decoration-color: yellow;
    text-decoration-thickness: 2px;
}
</style>