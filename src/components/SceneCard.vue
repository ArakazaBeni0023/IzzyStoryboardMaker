<script>
export default {
    name: 'SceneCard',
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
    <div class="scene-card" @click="$emit('click')">
        <div class="card-header">
            <h4>Scène {{ scene.number }}</h4>
            <div class="movement-indicators">
                <div v-if="scene.cameraMovements.length > 0" class="bi-camera-reels camera-indicator"></div>
                <div v-if="scene.actorMovements.length > 0" class="bi-person actor-indicator"></div>
                <div v-if="scene.comments && scene.comments.length > 0" class="bi-chat-left-text comment-indicator">
                </div>
            </div>
        </div>

        <div class="card-preview" :class="formatClass">
            <img v-if="scene.image" :src="scene.image" alt="Scene preview" class="preview-image">
            <div v-else class="preview-placeholder">
                Aucune image
            </div>
        </div>

        <div class="card-description">
            {{ scene.description ? scene.description.substring(0, 100) + '...' : 'Aucune description' }}
        </div>

        <div class="card-movements" v-if="scene.cameraMovements.length > 0">
            <div class="movement-tags">
                <span v-for="move in scene.cameraMovements.slice(0, 2)" :key="move" class="movement-tag camera">
                    {{ move }}
                </span>
                <span v-if="scene.cameraMovements.length > 2" class="movement-tag more">
                    +{{ scene.cameraMovements.length - 2 }}
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.scene-card {
    border: 3px solid var(--dark);
    overflow: hidden;
    transition: all 0.3s ease;
    cursor: pointer;
}

.scene-card:hover {
    transform: translateY(-2px);
    border: 3px solid var(--dark);
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-inline-start: 1rem;
    height: 50px;
    border-bottom: 3px solid var(--dark);
}

.card-header h4 {
    margin: 0;
    font-size: 14px;
}

.movement-indicators {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    /* border-left: 3px solid #000; */
    height: 100%;
}

.movement-indicators div {
    border-left: 3px solid var(--dark);
    display: flex;
    align-items: center;
    padding: 0rem 1rem;
    height: 100%;
}

.camera-indicator,
.actor-indicator,
.comment-indicator {
    font-size: 0.8rem;
}

.card-preview {
    background: #ecf0f1;
    position: relative;
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

.preview-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.preview-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #7f8c8d;
    font-size: 0.8rem;
}

.card-description {
    padding: 0.75rem 1rem;
    font-size: 0.8rem;
    color: #5a6c7d;
    line-height: 1.4;
    border-block: 3px solid var(--dark);
    min-height: 3.5rem;
}

.card-movements {
    padding: 0.5rem 1rem;
}

.movement-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
}

.movement-tag {
    padding: 0.3rem 0.5rem;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 500;
}

.movement-tag.camera {
    background: var(--light);
    color: var(--dark);
    border: 1px solid #000;
}

.movement-tag.more {
    background: var(--light);
    color: var(--gray-2);
    border: 1px solid var(--gray-2);
}
</style>