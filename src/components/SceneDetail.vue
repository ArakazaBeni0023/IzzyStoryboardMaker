<script>
export default {
    name: 'SceneDetail',
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
    computed: {
        formatClass() {
            return `format-${this.format.replace(':', '-')}`
        }
    }
}
</script>

<template>
    <div class="scene-detail">
        <div class="detail-header">
            <h3>Scène {{ scene.number }}</h3>
        </div>

        <div class="detail-content">
            <div class="preview-section">
                <div class="detail-preview" :class="formatClass">
                    <img v-if="scene.image" :src="scene.image" alt="Scene" class="detail-image">
                    <div v-else class="detail-placeholder">
                        Aucune image disponible
                    </div>
                </div>
            </div>

            <div class="info-section">
                <div class="description-box">
                    <h4>Description</h4>
                    <p>{{ scene.description || 'Aucune description' }}</p>
                </div>

                <div class="movements-box">
                    <div class="camera-movements">
                        <h4>Mouvements de caméra</h4>
                        <div v-if="scene.cameraMovements.length > 0" class="movement-list">
                            <span v-for="move in scene.cameraMovements" :key="move" class="movement-item">
                                {{ move }}
                            </span>
                        </div>
                        <p v-else class="no-data">Aucun mouvement de caméra</p>
                    </div>

                    <div class="actor-movements">
                        <h4>Mouvements d'acteurs</h4>
                        <div v-if="scene.actorMovements.length > 0" class="movement-list">
                            <span v-for="move in scene.actorMovements" :key="move" class="movement-item">
                                {{ move }}
                            </span>
                        </div>
                        <p v-else class="no-data">Aucun mouvement d'acteur</p>
                    </div>
                </div>

                <div class="comments-box" v-if="scene.comments && scene.comments.length > 0">
                    <h4>Commentaires</h4>
                    <div v-for="comment in scene.comments" :key="comment.id" class="comment-item">
                        {{ comment.text }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.scene-detail {
    background: white;
}

.detail-header {
    background: var(--current-theme);
    color: var(--dark);
    padding: 1.5rem;
    text-align: center;
    border-bottom: 3px solid var(--dark);
}

.detail-header h3 {
    margin: 0;
    font-size: 1.5rem;
}

.detail-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    padding: 1rem;
}

.detail-preview {
    background: #ecf0f1;
    overflow: hidden;
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

.detail-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: 3px solid #000;
}

.detail-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #7f8c8d;
    font-size: 1rem;
}

.info-section {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.description-box,
.movements-box,
.comments-box {
    padding: 1.5rem;
    border: 3px solid var(--dark);
}

.description-box h4,
.movements-box h4,
.comments-box h4 {
    margin: 0 0 1rem 0;
    color: #2c3e50;
    border-bottom: 2px solid var(--dark);
    padding-bottom: 0.5rem;
}

.description-box p {
    margin: 0;
    line-height: 1.6;
    color: #5a6c7d;
    font-size: 14px;
}

.movements-box {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.movement-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.movement-item {
    background: var(--dark);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
}

.no-data {
    color: #7f8c8d;
    font-style: italic;
    margin: 0;
}

.comment-item {
    background: var(--light);
    padding: 1rem;
    margin-bottom: 0.5rem;
    border-left: 4px solid var(--dark);
    font-size: 12px;
}

.comment-item:last-child {
    margin-bottom: 0;
}
</style>