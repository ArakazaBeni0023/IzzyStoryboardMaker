<script>
export default {
    data() {
        return {
            allStoryboards: [],
        }
    },
    /* mounted() {
        const films = localStorage.getItem('izzy.currentStoryboard')
        this.allStoryboards = JSON.parse(films)
        console.log(this.allStoryboards);
    },
    methods: {
        viewStoryboard(index) {
            const i = index;
            this.storyboard.push(i);
            localStorage.setItem('izzy.currentStoryboard', JSON.stringify(this.storyboard))
        }
    } */

}
</script>

<template>
    <div class="film-container" v-if="allStoryboards.length">
        <div class="film" v-for="(storyboard, index) in allStoryboards" :key="storyboard"
            @click="viewStoryboard(index)">
            <div class="cover">
                <!-- <img :src="storyboard.scenes[0].image" alt=""> -->
            </div>
            <div class="nom-film">
                <b>{{ storyboard.name }}</b>
            </div>
        </div>
    </div>
    <div class="empty" v-else>
        <i class="bi-box-empty"></i>
        <p>Maintenant, c'est vide!</p>
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