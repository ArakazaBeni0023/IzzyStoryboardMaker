<script>
import SceneEditor from '../components/SceneEditor.vue'
import SceneList from '../components/SceneList.vue'

export default {
    name: 'CreateStoryboard',
    components: {
        SceneEditor,
        SceneList
    },
    data() {
        return {
            storyboard: {
                name: '',
                description: '',
                format: '16:9',
                scenes: []
            },
            currentSceneNumber: 1
        }
    },
    computed: {
        currentScene() {
            return this.storyboard.scenes.find(scene => scene.number === this.currentSceneNumber)
        }
    },
    mounted() {
        const saved = localStorage.getItem('currentStoryboard')
        if (saved) {
            this.storyboard = JSON.parse(saved)
            if (this.storyboard.scenes.length === 0) {
                this.addScene()
            }
        }
    },
    methods: {
        selectScene(sceneNumber) {
            this.currentSceneNumber = sceneNumber
        },
        addScene() {
            const newSceneNumber = this.storyboard.scenes.length + 1
            const newScene = {
                number: newSceneNumber,
                description: '',
                image: null,
                cameraMovements: [],
                actorMovements: [],
                comments: []
            }
            this.storyboard.scenes.push(newScene)
            this.currentSceneNumber = newSceneNumber
            this.saveStoryboard()
        },
        insertScene(position) {
            // Réorganiser les numéros de scènes
            this.storyboard.scenes.forEach(scene => {
                if (scene.number >= position) {
                    scene.number++
                }
            })

            const newScene = {
                number: position,
                description: '',
                image: null,
                cameraMovements: [],
                actorMovements: [],
                comments: []
            }

            // Insérer la nouvelle scène à la position correcte
            this.storyboard.scenes.splice(position - 1, 0, newScene)
            this.currentSceneNumber = position
            this.saveStoryboard()
        },
        deleteScene(sceneNumber) {
            if (this.storyboard.scenes.length > 1) {
                this.storyboard.scenes = this.storyboard.scenes.filter(scene => scene.number !== sceneNumber)

                // Renumérotation automatique
                this.storyboard.scenes.forEach((scene, index) => {
                    scene.number = index + 1
                })

                this.currentSceneNumber = Math.min(this.currentSceneNumber, this.storyboard.scenes.length)
                this.saveStoryboard()
            }
        },
        updateScene(updatedScene) {
            const index = this.storyboard.scenes.findIndex(scene => scene.number === updatedScene.number)
            if (index !== -1) {
                this.storyboard.scenes[index] = updatedScene
                this.saveStoryboard()
            }
        },
        saveStoryboard() {
            localStorage.setItem('currentStoryboard', JSON.stringify(this.storyboard))
        }
    }
}
</script>

<template>
    <div class="storyboard-editor">
        <div class="editor-header">
            <div class="name-film">
                <h3>{{ storyboard.name }}</h3>
            </div>
            <div>
                <p>{{ storyboard.description }}</p>
            </div>
            <div class="format-info"> <i
                    :class="{ 'bi-rectangle': storyboard.format === '16:9', 'bi-tv': storyboard.format === '4:3', 'bi-square': storyboard.format === '1:1', 'bi-phone': storyboard.format === '9:16', }"></i>
                {{ storyboard.format }}
            </div>
        </div>

        <div class="editor-layout">
            <div class="scenes-container">
                <SceneEditor v-if="currentScene" :scene="currentScene" :format="storyboard.format"
                    @delete-scene="deleteScene" @scene-updated="updateScene" />
            </div>

            <div class="sidebar">
                <SceneList :scenes="storyboard.scenes" :current-scene="currentSceneNumber" @scene-selected="selectScene"
                    @add-scene="addScene" @insert-scene="insertScene" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.storyboard-editor {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: minmax(60px, auto);
    border: 5px solid var(--dark);
    color: var(--dark);
    text-transform: uppercase;
}

.editor-header {
    grid-column: span 12;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--aurore);
    text-align: center;
    border-bottom: 5px solid var(--dark);
}

.editor-header span {
    color: #7f8c8d;
    font-size: 12px;
}

.editor-header .name-film {
    font-size: 1rem;
    padding: 1rem;
}

.editor-header .format-info {
    display: inline-block;
    height: 100%;
    padding: 1rem;
}

.editor-layout {
    grid-column: span 12;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
}

.scenes-container {
    grid-column: span 7;
    border-right: 5px solid var(--dark);
}

.sidebar {
    grid-column: span 5;
}
</style>