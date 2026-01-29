<script>
export default {
    name: 'StoryboardForm',
    data() {
        return {
            filmName: '',
            synopsis: '',
            cover: '',
            selectedFormat: '16:9',
            theme: 'aurore',
            availableThemes: ['aurore', 'forest', 'ocean', 'sky', 'barby', 'sunset'],
            allStoryboards: []
        };
    },
    computed: {
        wordCount() {
            return this.synopsis.trim().split(/\s+/).filter(Boolean).length;
        }
    },
    methods: {
        handleCoverUpload(event) {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                this.cover = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        createStoryboard() {
            const storyboard = {
                name: this.filmName,
                synopsis: this.synopsis,
                format: this.selectedFormat,
                theme: this.theme,
                cover: this.cover,
                scenes: [],
                createdAt: new Date().toISOString()
            };

            localStorage.setItem('izzy.currentStoryboard', JSON.stringify(storyboard));
            // this.allStoryboards.push(storyboard);
            // localStorage.setItem('izzy.allStoryboards', JSON.stringify(this.allStoryboards));
            this.$router.push('/editor');
        },
        limitWords() {
            const words = this.synopsis.trim().split(/\s+/);
            if (words.length > 250) {
                this.synopsis = words.slice(0, 250).join(' ');
            }
        }

    }
};
</script>

<template>
    <div class="storyboard-form">
        <form @submit.prevent="createStoryboard">
            <!-- Couverture -->
            <div class="form-group">
                <label for="cover" :class="{ 'bd-btm': cover === '' }"> <i class="bi-camera"></i> Image de
                    couverture</label>
                <input type="file" id="cover" accept="image/*" @change="handleCoverUpload" />
                <div v-if="cover" class="preview">
                    <img :src="cover" alt="Aperçu de la couverture" />
                </div>
            </div>

            <!-- Nom -->
            <div class="form-group">
                <label for="filmName">Nom du film</label>
                <input type="text" id="filmName" v-model="filmName" required placeholder="Entrez le nom du film" />
            </div>

            <!-- synopsis -->
            <div class="form-group">
                <label for="synopsis">Synopsis</label>
                <textarea v-model="synopsis" @input="limitWords" rows="4"
                    placeholder="Synopsis (max 250 mots)"></textarea>
                <div class="char-count">{{ wordCount }}/250</div>
            </div>

            <!-- Format -->
            <div class="form-group">
                <label for="format">Format</label>
                <select v-model="selectedFormat">
                    <option value="16:9">16:9 (Cinéma)</option>
                    <option value="4:3">4:3 (TV)</option>
                    <option value="1:1">1:1 (Carré)</option>
                    <option value="9:16">9:16 (Mobile)</option>
                </select>
            </div>

            <!-- Thème -->
            <div class="form-group">
                <label for="theme">Thème couleur</label>
                <select v-model="theme">
                    <option v-for="color in availableThemes" :key="color" :value="color">{{ color }}</option>
                </select>
            </div>

            <button type="submit" class="btn-primary">Commencer</button>
        </form>
    </div>
</template>



<style scoped>
.storyboard-form {
    width: 65%;
}

.storyboard-form form {
    font-size: 14px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    text-transform: uppercase;
}

.bd-btm {
    border-bottom: 3px solid var(--dark);
}

input[type="file"] {
    display: none;
}

.char-count {
    text-align: right;
    font-size: 0.8rem;
    color: #7f8c8d;
    border: 3px solid var(--dark);
    border-top: none;
    width: 10%;
    align-self: flex-end;
}

.btn-primary {
    background-color: var(--succes-lw);
    color: var(--dark);
    padding: .8rem;
    text-transform: uppercase;
    font-size: 1rem;
    cursor: pointer;
    width: fit-content;
    border: 3px solid var(--dark);
    font-weight: bold;
    transition: all .5s ease;
}

.btn-primary:hover {
    background-color: var(--sucess);
}
</style>