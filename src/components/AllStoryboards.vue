<script>
export default {
    data() {
        return {
            films: 3
        }
    }
}
</script>

<template>
    <div class="film-container">
        <div class="film" v-for="f in films" :key="f">
            <div class="cover"></div>
            <div class="nom-film">
                <b>Nom de film</b>
            </div>
        </div>
    </div>
</template>

<style scoped>
.film-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    gap: 2rem;
}

.film-container .film {
    grid-column: span 1;
    display: flex;
    flex-direction: column;
}

.film-container .film .cover,
.film-container .film .nom-film {
    border: 5px solid var(--dark);
}

.film-container .film .cover {
    height: 169px;
}

.film-container .film .nom-film {
    width: 70%;
    height: 40px;
    background: var(--aurore);
    border-top: none;
    display: flex;
    align-items: center;
    font-family: "Poppins";
    text-transform: uppercase;
    padding-left: 1rem;
    font-weight: bold;
}
</style>