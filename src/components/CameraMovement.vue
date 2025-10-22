<script>
export default {
    name: 'CameraMovement',
    props: {
        movements: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        getMovementSymbol(movement) {
            const symbols = {
                'Zoom In': 'bi-search',
                'Zoom Out': 'bi-search',
                'Pan gauche': 'bi-arrow-left',
                'Pan droit': 'bi-arrow-right ',
                'Tilt haut': 'bi-arrow-up',
                'Tilt bas': 'bi-arrow-down',
                'Travelling': 'bi-camera-reels-fill'
            }
            return symbols[movement] || movement
        }
    }
}
</script>


<template>
    <div class="camera-movements">
        <div v-for="movement in movements" :key="movement" class="movement-indicator" :title="movement">
            <i :class="getMovementSymbol(movement)"></i>
            <i class="bi-plus" v-if="movement === 'Zoom In'"></i>
            <i class="bi-dash" v-if="movement === 'Zoom Out'"></i>
        </div>
    </div>
</template>

<style scoped>
.camera-movements {
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.movement-indicator {
    background: var(--dark);
    color: var(--white);
    padding: 5px;
    border-radius: 4px;
    font-size: 0.8rem;
    text-align: center;
}
</style>