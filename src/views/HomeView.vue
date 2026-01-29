<script>
import AllStoryboards from '@/components/AllStoryboards.vue';
import StoryboardForm from '../components/StoryboardForm.vue';

export default {
    name: 'HomeView',
    components: {
        StoryboardForm,
        AllStoryboards
    },
    data() {
        return {
            allStories: true,
            storyboards: []
        };
    },
    mounted() {

    },
    methods: {
        newStoryboard() {
            this.allStories = false;
        }
    }
};
</script>

<template>
    <div class="home">
        <div class="top-title">
            <h2>CRÉER VOTRE STORYBOARD</h2>
            <button v-if="allStories" class="bi-plus-lg" @click="newStoryboard()"></button>
        </div>

        <AllStoryboards v-if="allStories" :storyboards="storyboards" />
        <StoryboardForm v-else />
    </div>
</template>


<style scoped>
.top-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
}

.top-title h2 {
    font-family: "Poppins";
    font-weight: bold;
}

.top-title .bi-plus-lg {
    background: var(--color-theme);
    border: 3px solid var(--dark);
    width: 50px;
    height: 50px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    font-weight: 900;
    cursor: pointer;
    transition: transform .5s ease;
}

.top-title .bi-plus-lg:hover {
    transform: scale(.94);
}
</style>