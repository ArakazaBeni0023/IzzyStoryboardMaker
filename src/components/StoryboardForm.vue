<script>
export default {
    name: 'StoryboardForm',
    data() {
        return {
            filmName: '',
            description: '',
            selectedFormat: '16:9'
        }
    },
    methods: {
        createStoryboard() {
            const storyboard = {
                name: this.filmName,
                description: this.description,
                format: this.selectedFormat,
                scenes: [],
                createdAt: new Date().toISOString()
            }
            this.$emit('storyboard-created', storyboard)
        }
    }
}
</script>

<template>
    <div class="storyboard-form">
        <form @submit.prevent="createStoryboard">
            <div class="form-group">
                <label for="filmName">Nom du film</label>
                <input type="text" id="filmName" v-model="filmName" required placeholder="Entrez le nom du film">
            </div>

            <div class="form-group">
                <label for="description">Description</label>
                <textarea id="description" v-model="description" maxlength="250"
                    placeholder="Description (max 250 mots)" rows="4"></textarea>
                <div class="char-count">{{ description.length }}/250</div>
            </div>

            <div class="form-group">
                <label for="format">Format</label>
                <select id="format" v-model="selectedFormat">
                    <option value="16:9">16:9 (Cinéma)</option>
                    <option value="4:3">4:3 (TV)</option>
                    <option value="1:1">1:1 (Carré)</option>
                    <option value="9:16">9:16 (Mobile)</option>
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