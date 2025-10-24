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
        const saved = localStorage.getItem('izzy.currentStoryboard')
        if (saved) {
            this.storyboard = JSON.parse(saved)
            if (this.storyboard.scenes.length === 0) {
                this.addScene();
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

            this.storyboard.scenes.splice(position - 1, 0, newScene)
            this.currentSceneNumber = position
            this.saveStoryboard()
        },
        deleteScene(sceneNumber) {
            if (this.storyboard.scenes.length > 1) {
                this.storyboard.scenes = this.storyboard.scenes.filter(scene => scene.number !== sceneNumber)

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
            localStorage.setItem('izzy.currentStoryboard', JSON.stringify(this.storyboard))
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
            <div class="format-info">
                <span
                    :class="{ 'format-16-9': storyboard.format === '16:9', 'format-4-3': storyboard.format === '4:3', 'format-1-1': storyboard.format === '1:1', 'format-9-16': storyboard.format === '9:16', }"></span>
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
    border-left: 5px solid var(--dark);
    display: flex;
    align-items: center;
    height: 100%;
    padding: 1rem;
    gap: .5rem;
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

.format-1-1,
.format-4-3,
.format-9-16,
.format-16-9 {
    border: 3px solid #000;
    border-radius: 5px;
    padding: .4rem;
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
</style>