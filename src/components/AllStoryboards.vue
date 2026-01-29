<script>
export default {
    name: 'AllStoryboards',
    data() {
        return {
            activePopoverIndex: null,
            allStoryboards: []
        };
    },
    mounted() {
        const stored = localStorage.getItem("izzy.allStoryboards");
        this.allStoryboards = stored ? JSON.parse(stored) : [];
    },
    methods: {
        togglePopover(index) {
            this.activePopoverIndex = this.activePopoverIndex === index ? null : index;
        },
        viewStoryboard(index) {
            const current = localStorage.getItem('izzy.currentStoryboard');
            if (current) {
                const confirmAction = window.confirm(
                    "Vous avez des modifications non enregistrées. Voulez-vous les enregistrer avant de continuer?"
                );

                if (confirmAction) {
                    const all = JSON.parse(localStorage.getItem('izzy.allStoryboards') || '[]');
                    const updated = [...all, JSON.parse(current)];
                    localStorage.setItem('izzy.allStoryboards', JSON.stringify(updated));
                }

                localStorage.removeItem('izzy.currentStoryboard');
            }

            const storyboard = this.allStoryboards[index];
            localStorage.setItem('izzy.currentStoryboard', JSON.stringify(storyboard));
            this.$router.push('/editor');
        },
        deleteStoryboard(index) {
            if (!confirm("Voulez-vous vraiment supprimer ce storyboard?")) return;

            this.allStoryboards.splice(index, 1);
            localStorage.setItem('izzy.allStoryboards', JSON.stringify(this.allStoryboards));
        }
    }
};
</script>

<template>
    <div class="film-container" v-if="allStoryboards.length > 0">
        <div class="film" v-for="(storyboard, index) in allStoryboards" :key="index"
            :style="{ '--current-theme': `var(--${storyboard.theme})` }">
            <div class="popover">
                <button class="menu-btn bi-three-dots-vertical" @click="togglePopover(index)"></button>
                <div class="popover-options" v-if="activePopoverIndex === index">
                    <button class="option option-1" @click="deleteStoryboard(index)">
                        <i class="bi-trash"></i> Supprimer
                    </button>
                </div>
            </div>

            <div class="cover" @click="viewStoryboard(index)">
                <img v-if="storyboard.cover" :src="storyboard.cover" alt="Couverture" />
                <div v-else class="no-cover">
                    <i class="bi-image"></i>
                    <p>Pas de couverture</p>
                </div>
            </div>

            <div class="nom-film" @click="viewStoryboard(index)">
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
    position: relative;
    transition: all .5s ease;
}

.film-container .film:hover .cover {
    box-shadow: 10px 10px 0px var(--current-theme);
    transition: all .5s ease;
    z-index: -100;
}

.film-container .film:hover .nom-film {
    box-shadow: 10px 10px 0px var(--current-theme);
    transition: all .5s ease;
    z-index: 1000;
}

.film-container .film:hover {
    transform: translateY(-3px);
}

.film-container .film .popover {
    position: absolute;
    right: 0;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: .5rem;
    padding: .5rem;
}

.popover-options {
    background: var(--light);
    display: flex;
    flex-direction: column;
    gap: .2rem;
    border: 3px solid #000;
    width: 100%;
    height: 100%;
    margin-inline-end: .1rem;
    animation: come-up .5s ease;
    overflow: hidden;
}

.popover-options .option {
    padding: .5rem;
    transition: all .5s ease;
    cursor: pointer;
    font-size: 14px;
}

.popover-options .option:hover {
    background: var(--current-theme);
}

.option-1 {
    animation: come-up .9s ease;
}

.option-2 {
    animation: come-up .7s ease;
}

@keyframes come-up {
    0% {
        transform: translateY(-10px);
    }

    100% {
        transform: translateY(0);
    }
}

.menu-btn {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: var(--current-theme);
    text-align: center;
    border: 3px solid #000;
    cursor: pointer;
}

.film-container .film .cover,
.film-container .film .nom-film {
    border: 5px solid var(--dark);
}

.film-container .film .cover {
    width: 100%;
    height: 169px;
    cursor: pointer;
    z-index: -100;
    /* height: 180px; */
    background-color: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.film-container .film .cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.film-container .film .cover .no-cover {
    text-align: center;
    color: #999;
    font-size: 14px;
}

.film-container .film .nom-film {
    width: fit-content;
    min-width: 70%;
    height: 40px;
    background: var(--current-theme);
    border-top: none;
    display: flex;
    align-items: center;
    font-family: "Poppins";
    text-transform: uppercase;
    padding-left: 1rem;
    font-weight: bold;
    cursor: pointer;
    z-index: 1001;
}

.empty {
    margin: auto;
    width: 30%;
    text-align: center;
}
</style>