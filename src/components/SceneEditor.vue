<script>
import CameraMovement from './CameraMovement.vue'
import ActorMovement from './ActorMovement.vue'

export default {
    name: 'SceneEditor',
    components: {
        CameraMovement,
        ActorMovement
    },
    props: {
        scene: {
            type: Object,
            required: true
        },
        format: {
            type: String,
            default: '16:9'
        }
    },
    data() {
        return {
            cameraMovements: ['Zoom In', 'Zoom Out', 'Pan gauche', 'Pan droit', 'Tilt haut', 'Tilt bas', 'Travelling'],
            actorMovements: ['Entrée', 'Sortie', 'Déplacement gauche', 'Déplacement droit', 'Action'],
            newComment: '',
            localScene: {}
        }
    },
    computed: {
        formatClass() {
            return `format-${this.format.replace(':', '-')}`
        }
    },
    watch: {
        scene: {
            handler(newScene) {
                this.localScene = {
                    ...newScene,
                    cameraMovements: [...newScene.cameraMovements],
                    actorMovements: [...newScene.actorMovements],
                    comments: newScene.comments ? [...newScene.comments] : []
                }
            },
            immediate: true,
            deep: true
        }
    },
    methods: {
        deleteScene() {
            this.$emit('delete-scene', this.localScene.number)
        },
        triggerFileInput() {
            this.$refs.fileInput.click()
        },
        handleImageUpload(event) {
            const file = event.target.files[0]
            if (file) {
                const reader = new FileReader()
                reader.onload = (e) => {
                    this.localScene.image = e.target.result
                    this.updateScene()
                }
                reader.readAsDataURL(file)
            }
        },
        toggleCameraMovement(movement) {
            const index = this.localScene.cameraMovements.indexOf(movement)
            if (index > -1) {
                this.localScene.cameraMovements.splice(index, 1)
            } else {
                this.localScene.cameraMovements.push(movement)
            }
            this.updateScene()
        },
        toggleActorMovement(movement) {
            const index = this.localScene.actorMovements.indexOf(movement)

            if (index > -1) {
                this.localScene.actorMovements.splice(index, 1)
            } else {
                this.localScene.actorMovements.push(movement)
            }
            this.updateScene()
        },
        addComment() {
            if (this.newComment.trim()) {
                if (!this.localScene.comments) {
                    this.localScene.comments = []
                }

                this.localScene.comments.push({
                    id: Date.now(),
                    text: this.newComment.trim()
                })
                this.newComment = ''
                this.updateScene()
            }
        },
        updateScene() {
            this.$emit('scene-updated', { ...this.localScene })
        }
    }
}
</script>

<template>
    <div class="scene-editor">
        <div class="scene-header">
            <h3>Scène {{ scene.number }}</h3>
            <button @click="deleteScene" class="bi-trash"></button>
        </div>

        <div class="editor-grid">
            <div class="preview-area">
                <div class="image-container">
                    <div class="format-container" :class="formatClass">
                        <div class="scene-preview">
                            <img v-if="localScene.image" :src="localScene.image" alt="Scene preview"
                                class="scene-image">
                            <div v-else class="placeholder">Aucune image</div>

                            <!-- Mouvements de caméra -->
                            <CameraMovement :movements="localScene.cameraMovements" />

                            <!-- Mouvements d'acteurs -->
                            <ActorMovement :movements="localScene.actorMovements" />
                        </div>
                    </div>

                    <div class="image-upload">
                        <input type="file" @change="handleImageUpload" accept="image/*" ref="fileInput">
                        <button @click="triggerFileInput" class="bi-camera btn-secondary"></button>
                    </div>
                </div>

                <div class="form-group">
                    <label>Description de la scène</label>
                    <textarea v-model="localScene.description" rows="6" @input="updateScene"
                        placeholder="Ajouter la description ..."></textarea>
                </div>

                <div class="comments-section">
                    <div class="form-group">
                        <label>Commentaires</label>
                        <textarea v-model="newComment" rows="6" @keyup.enter="addComment"
                            placeholder="Ajouter un commentaire ..."></textarea>
                    </div>
                    <div v-for="comment in localScene.comments" :key="comment.id" class="comment">
                        {{ comment.text }}
                    </div>
                </div>
            </div>

            <div class="details-area">
                <div class="movement-controls">
                    <h4>Mouvements de caméra</h4>
                    <div class="movement-buttons">
                        <button v-for="move in cameraMovements" :key="move" @click="toggleCameraMovement(move)"
                            :class="{ active: localScene.cameraMovements.includes(move) }">
                            {{ move }}
                        </button>
                    </div>
                </div>

                <hr>

                <div class="movement-controls">
                    <h4>Mouvements d'acteurs</h4>
                    <div class="movement-buttons">
                        <button v-for="move in actorMovements" :key="move" @click="toggleActorMovement(move)"
                            :class="{ active: localScene.actorMovements.includes(move) }">
                            {{ move }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.scene-editor {
    overflow: hidden;
}

.scene-header {
    padding: .5rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 5px solid var(--dark);
}

.bi-trash {
    border: none;
    cursor: pointer;
    width: 30px;
    height: 30px;
    text-align: center;
    transition: all .5s ease;
    border: 3px solid var(--gray);
}

.bi-trash:hover {
    background-color: var(--dark);
    color: var(--white);
}

.editor-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 1rem;
    padding: 1rem;
}

.preview-area {
    grid-column: span 8;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.format-container {
    background: #ecf0f1;
}

.form-group {
    display: flex;
    flex-direction: column;
}

.form-group label {
    width: 100%;
    display: block;
    font-weight: bold;
    border: 3px solid var(--dark);
    padding: .3rem 0.75rem;
    border-bottom: none;
    font-size: 14px;
}

.form-group input,
.form-group textarea {
    outline: none;
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
    border: 3px solid var(--dark);
    text-transform: uppercase;
    font-size: 14px;
}

.preview-area .form-group textarea,
.comments-section .form-group textarea {
    resize: none;
}

.format-16-9 {
    aspect-ratio: 16 / 9;
}

.format-4-3 {
    aspect-ratio: 4 / 3;
}

.format-1-1 {
    aspect-ratio: 1 / 1;
}

.format-9-16 {
    aspect-ratio: 9 / 16;
}

.scene-preview {
    width: 100%;
    height: 100%;
    border: 3px solid var(--dark);
    position: relative;
    overflow: hidden;
}

.scene-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #7f8c8d;
}

.image-upload input[type="file"] {
    display: none;
}

.btn-secondary {
    color: var(--dark);
    border: none;
    font-size: 14px;
    padding: .5rem 1rem;
    cursor: pointer;
    border: 3px solid var(--dark);
    border-top: none;
    transition: all .5s ease;
}

.btn-secondary:hover {
    background: var(--dark);
    color: var(--white);
}

.details-area {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    grid-column: span 4;
}

.movement-controls h4 {
    margin-bottom: 1rem;
    color: var(--dark);
}

.movement-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.movement-buttons button {
    padding: 0.5rem;
    font-size: 12px;
    background: var(--light);
    border-radius: 50px;
    cursor: pointer;
    border: 1px solid var(--dark);
    transition: all .5s ease;
}

.movement-buttons button:hover:not(.active) {
    border: 1px solid var(--dark);
}

.movement-buttons button.active {
    background: var(--dark);
    color: var(--white);
}

.comments-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.comment {
    background: var(--light);
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    font-size: 12px;
    border-left: 3px solid #000;
}
</style>