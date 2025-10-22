<script>
export default {
    name: 'SceneList',
    props: {
        scenes: {
            type: Array,
            required: true
        },
        currentScene: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            showInsertDialog: false,
            insertSceneNumber: 1
        }
    },
    methods: {
        selectScene(sceneNumber) {
            this.$emit('scene-selected', sceneNumber)
        },
        addScene() {
            this.$emit('add-scene')
        },
        insertScene() {
            if (this.insertSceneNumber >= 1 && this.insertSceneNumber <= this.scenes.length + 1) {
                this.$emit('insert-scene', this.insertSceneNumber)
                this.showInsertDialog = false
                this.insertSceneNumber = 1
            }
        }
    }
}
</script>

<template>
    <div class="scene-list">
        <div class="list-header">
            <h3>Liste des Scènes</h3>
        </div>

        <div class="scene-thumbnails">
            <div v-for="scene in scenes" :key="scene.number" class="scene-thumbnail"
                :class="{ active: scene.number === currentScene }" @click="selectScene(scene.number)">
                <div class="thumbnail-number">{{ scene.number }}</div>
                <div class="thumbnail-preview">
                    <img v-if="scene.image" :src="scene.image" alt="Scene thumbnail">
                    <div v-else class="thumbnail-placeholder"></div>
                </div>
                <div class="thumbnail-description">
                    {{ scene.description ? scene.description.substring(0, 50) + '...' : 'Aucune description' }}
                </div>
            </div>
        </div>

        <div class="scene-actions">
            <button @click="addScene" class="btn">+ Ajouter une scène</button>
            <button @click="showInsertDialog = true" class="btn">Insérer une scène</button>
        </div>

        <div v-if="showInsertDialog" class="modal">
            <div class="modal-content">
                <h4>Insérer une scène</h4>
                <label>Numéro de la scène :</label>
                <input type="number" v-model="insertSceneNumber" min="1" :max="scenes.length + 1">
                <div class="modal-actions">
                    <button @click="insertScene" class="btn-primary">Insérer</button>
                    <button @click="showInsertDialog = false" class="btn-secondary">Annuler</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.scene-list {
    /* display: grid; */
    /* grid-template-columns: 1fr; */
    /* grid-template-rows: repeat(3, 1fr); */
    gap: .7rem;
    height: 100%;
}

.scene-list .list-header {
    border-bottom: 5px solid var(--dark);
    display: flex;
    align-items: center;
    padding: 0 1rem;
    height: 51px;
}

.scene-thumbnails {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 1rem;
    max-height: 545px;
    padding-block: .5rem;
    padding-inline: 1rem;
    overflow-y: auto;
}

.scene-thumbnail {
    border: 2px solid #bdc3c7;
    padding: 0.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

.scene-thumbnail.active {
    border-color: var(--dark);
    background-color: var(--light);
}

.scene-thumbnail:hover {
    transform: translateY(-2px);
}

.thumbnail-number {
    font-weight: bold;
    text-align: center;
    margin-bottom: 0.5rem;
    color: var(--dark);
}

.thumbnail-preview {
    width: 100%;
    aspect-ratio: 16/9;
    margin-bottom: 0.5rem;
    overflow: hidden;
}

.thumbnail-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.thumbnail-placeholder {
    width: 100%;
    height: 100%;
    background: #ecf0f1;
    display: flex;
    align-items: center;
    justify-content: center;
}

.thumbnail-description {
    font-size: 0.7rem;
    color: #7f8c8d;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.scene-actions {
    grid-row: span 2;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: .5rem 1rem;
    border-top: 5px solid var(--dark);
    align-self: end;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal-content {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    min-width: 300px;
}

.modal-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
}
</style>