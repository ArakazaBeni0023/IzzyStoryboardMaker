<script>
import SceneCard from '../components/SceneCard.vue'
import SceneDetail from '../components/SceneDetail.vue'

export default {
    name: 'StoryboardView',
    components: {
        SceneCard,
        SceneDetail
    },
    data() {
        return {
            storyboard: {
                name: '',
                description: '',
                format: '16:9',
                scenes: []
            },
            groupView: false,
            sceneGroups: [],
            showAddGroup: false,
            editingGroup: null,
            newGroupName: '',
            selectedScenes: [],
            selectedScene: null
        }
    },
    computed: {
        sortedScenes() {
            return [...this.storyboard.scenes].sort((a, b) => a.number - b.number)
        },
        scenesWithComments() {
            return this.storyboard.scenes.filter(scene =>
                scene.comments && scene.comments.length > 0
            )
        }
    },
    mounted() {
        this.loadStoryboard()
        this.loadGroups()
    },
    methods: {
        loadStoryboard() {
            const saved = localStorage.getItem('izzy.currentStoryboard')
            if (saved) {
                this.storyboard = JSON.parse(saved)
            }
        },
        loadGroups() {
            const savedGroups = localStorage.getItem('izzy.StoryboardGroups')
            if (savedGroups) {
                this.sceneGroups = JSON.parse(savedGroups)
            }
        },
        saveGroups() {
            localStorage.setItem('izzy.StoryboardGroups', JSON.stringify(this.sceneGroups))
        },
        toggleGroupView() {
            this.groupView = !this.groupView
        },
        selectScene(sceneNumber) {
            this.selectedScene = this.storyboard.scenes.find(scene => scene.number === sceneNumber)
        },
        navigateScene(direction) {
            if (this.selectedScene) {
                const newNumber = this.selectedScene.number + direction
                const newScene = this.storyboard.scenes.find(scene => scene.number === newNumber)
                if (newScene) {
                    this.selectedScene = newScene
                }
            }
        },
        editGroup(group) {
            this.editingGroup = group
            this.newGroupName = group.name
            this.selectedScenes = group.scenes.map(scene => scene.number)
            this.showAddGroup = true
        },
        deleteGroup(groupId) {
            this.sceneGroups = this.sceneGroups.filter(group => group.id !== groupId)
            this.saveGroups()
        },
        saveGroup() {
            if (!this.newGroupName.trim()) {
                alert('Veuillez donner un nom au groupe')
                return
            }

            const groupScenes = this.storyboard.scenes.filter(scene =>
                this.selectedScenes.includes(scene.number)
            )

            if (this.editingGroup) {
                // Modification d'un groupe existant
                const index = this.sceneGroups.findIndex(group => group.id === this.editingGroup.id)
                if (index !== -1) {
                    this.sceneGroups[index] = {
                        ...this.editingGroup,
                        name: this.newGroupName,
                        scenes: groupScenes
                    }
                }
            } else {
                // Création d'un nouveau groupe
                const newGroup = {
                    id: Date.now(),
                    name: this.newGroupName,
                    scenes: groupScenes
                }
                this.sceneGroups.push(newGroup)
            }

            this.saveGroups()
            this.cancelGroup()
        },
        cancelGroup() {
            this.showAddGroup = false
            this.editingGroup = null
            this.newGroupName = ''
            this.selectedScenes = []
        },
        exportStoryboard() {
            const data = {
                storyboard: this.storyboard,
                groups: this.sceneGroups,
                exportDate: new Date().toISOString()
            }

            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `storyboard-${this.storyboard.name}-${new Date().getTime()}.json`
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            URL.revokeObjectURL(url)
        }
    }
}
</script>

<template>
    <div class="storyboard-view">
        <div class="view-header">
            <h2>{{ storyboard.name }}</h2>
            <p class="description">{{ storyboard.description }}
            </p>
            <div class="view-controls">
                <button @click="toggleGroupView" class="btn">
                    {{ groupView ? 'Vue détaillée' : 'Vue par groupes' }}
                </button>
                <button @click="exportStoryboard" class="btn">
                    Exporter le storyboard
                </button>
                <button @click="$router.push('/editor')" class="btn">
                    Retour à l'édition
                </button>
            </div>
        </div>

        <!-- Vue par groupes -->
        <div v-if="groupView" class="groups-view">
            <div v-for="group in sceneGroups" :key="group.id" class="scene-group">
                <div class="group-header">
                    <h3>{{ group.name }}</h3>
                    <div class="btns">
                        <button @click="editGroup(group)" class="bi-pencil btn-edit-group"></button>
                        <button @click="deleteGroup(group.id)" class="bi-trash btn-delete-group"></button>
                    </div>
                </div>
                <div class="group-scenes">
                    <div v-for="scene in group.scenes" :key="scene.number" class="group-scene-card">
                        <SceneCard :scene="scene" :format="storyboard.format" @click="selectScene(scene.number)" />
                    </div>
                </div>
            </div>

            <div class="add-group">
                <button @click="showAddGroup = true" class="btn btn-one">
                    + Ajouter un groupe
                </button>
            </div>
        </div>

        <!-- Vue détaillée (par défaut) -->
        <div v-else class="detailed-view">
            <div class="scenes-grid">
                <div v-for="scene in sortedScenes" :key="scene.number" class="scene-card-wrapper">
                    <SceneCard :scene="scene" :format="storyboard.format" @click="selectScene(scene.number)" />
                </div>
            </div>
        </div>

        <!-- Modal pour ajouter/modifier un groupe -->
        <div v-if="showAddGroup || editingGroup" class="modal">
            <div class="modal-content">
                <h2>{{ editingGroup ? 'Modifier le groupe' : 'Nouveau groupe' }}</h2>
                <div class="form-group">
                    <label>Nom du groupe</label>
                    <input v-model="newGroupName" type="text" placeholder="Nom du groupe">
                </div>
                <div class="">
                    <label>Scènes à inclure</label>
                    <div class="scene-selection">
                        <div v-for="scene in storyboard.scenes" :key="scene.number" class="scene-checkbox">
                            <label class="check-box-input" :for="'scene-' + scene.number">
                                <input type="checkbox" :value="scene.number" v-model="selectedScenes"
                                    :id="'scene-' + scene.number" />
                                <span>Scène {{ scene.number }}</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="modal-actions">
                    <button @click="saveGroup" class="btn btn-one">
                        {{ editingGroup ? 'Modifier' : 'Créer' }}
                    </button>
                    <button @click="cancelGroup" class="btn btn-cancel">Annuler</button>
                </div>
            </div>
        </div>

        <!-- Modal de visualisation d'une scène -->
        <div v-if="selectedScene" class="scene-modal">
            <div class="scene-modal-content">
                <button @click="selectedScene = null" class="bi-x close-btn"></button>
                <SceneDetail :scene="selectedScene" :format="storyboard.format" />
                <div class="scene-navigation">
                    <button @click="navigateScene(-1)" :disabled="selectedScene.number === 1" class="nav-btn">
                        <i class="bi-arrow-left"></i> Précédent
                    </button>
                    <span>Scène {{ selectedScene.number }} / {{ storyboard.scenes.length }}</span>
                    <button @click="navigateScene(1)" :disabled="selectedScene.number === storyboard.scenes.length"
                        class="nav-btn">
                        Suivant <i class="bi-arrow-right"></i>
                    </button>
                </div>
            </div>
        </div>

        <!-- Liste des commentaires en bas de page -->
        <div class="comments-footer">
            <h3>Commentaires des scènes</h3>
            <div class="comments-list">
                <div v-for="scene in scenesWithComments" :key="scene.number" class="comment-item"
                    @click="selectScene(scene.number)">
                    <div class="comment-scene-info">
                        <strong>Scène {{ scene.number }}</strong>
                    </div>
                    <div class="comment-content">
                        <div v-for="comment in scene.comments" :key="comment.id" class="comment-text">
                            {{ comment.text }}
                        </div>
                        <div v-if="!scene.comments || scene.comments.length === 0" class="no-comments">
                            Aucun commentaire
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.storyboard-view {
    /* max-width: 1400px; */
    /* margin: 0 auto; */
    border: 5px solid var(--dark);
}

/* -------------------------- */
.view-header {
    padding: 2rem;
    border-bottom: 5px solid var(--dark);
    text-align: center;
}

.view-header h2 {
    color: #2c3e50;
    margin-bottom: 0.5rem;
}

.description {
    color: #7f8c8d;
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
    text-align: justify;
}

.view-controls {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
}


/* ----------------------------- Vue par groupes */
.groups-view {
    display: flex;
    flex-direction: column;
    border-bottom: 5px solid var(--dark);
}

.scene-group {
    border-bottom: 5px solid var(--dark);
    overflow: hidden;
}

.group-header {
    border-bottom: 5px solid var(--dark);
    padding: 1rem 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.group-header h3 {
    margin: 0;
    font-size: 1.2rem;
}

.group-scenes {
    padding: 1.5rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
}

.add-group {
    text-align: center;
    padding: 2rem;
}


.btns {
    display: flex;
    gap: .5rem;
}

.btns button {
    width: 30px;
    height: 30px;
    text-align: center;
    cursor: pointer;
    transition: all .5s ease;
    font-size: 12px;
    border: 3px solid var(--gray);
}

.btns button:hover {
    background: var(--dark);
    color: var(--white);
    transform: scale(.97);
    border: 3px solid var(--dark);
}


/* Vue détaillée */
.detailed-view {
    border-bottom: 5px solid var(--dark);
    padding: 1rem;
}

.scenes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1rem;
}

.scene-card-wrapper {
    cursor: pointer;
    transition: transform 0.3s ease;
}

.scene-card-wrapper:hover {
    transform: translateY(-4px);
}

/* Modal */
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
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border: 5px solid #000;
}

.scene-selection {
    max-height: 200px;
    overflow-y: auto;
}

.scene-selection label {
    margin-top: .5rem;
}

.scene-checkbox {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.modal-actions {
    display: flex;
    gap: 1rem;
}

/* Modal scène */
.scene-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1001;
    padding: 2rem;
}

.scene-modal-content {
    background: var(--white);
    border: 5px solid #000;
    max-width: 800px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: var(--aurore);
    color: var(--dark);
    border: none;
    width: 40px;
    height: 40px;
    border: 3px solid #000;
    border-radius: 50%;
    text-align: center;
    cursor: pointer;
    z-index: 1002;
    font-size: 1.2rem;
    transition: all .5s ease;
}

.close-btn:hover {
    transform: rotate(95deg);
}

.scene-navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-top: 3px solid var(--dark);
}

.nav-btn {
    padding: 0.5rem 1rem;
    border: 3px solid var(--dark);
    color: var(--dark);
    cursor: pointer;
    transition: all .5s ease;
}

.nav-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.nav-btn:hover:not(:disabled) {
    background: var(--dark);
    color: var(--white);
}

/* Footer des commentaires */
.comments-footer {
    padding: 1.5rem;
}

.comments-footer h3 {
    color: #2c3e50;
    margin-bottom: 1rem;
    border-bottom: 2px solid var(--gray);
    padding-bottom: 0.5rem;
}

.comments-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-height: 400px;
    overflow-y: auto;
}

.comment-item {
    border: 1px solid #ecf0f1;
    border-radius: 6px;
    padding: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

.comment-item:hover {
    background: #f8f9fa;
    border-color: var(--dark);
}

.comment-scene-info {
    font-weight: bold;
    color: #2c3e50;
    margin-bottom: 0.5rem;
}

.comment-text {
    background: #ecf0f1;
    padding: 0.75rem;
    border-radius: 4px;
    margin-bottom: 0.5rem;
    font-size: 12px;
}

.no-comments {
    color: #7f8c8d;
    font-style: italic;
    font-size: 0.9rem;
}
</style>