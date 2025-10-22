<script>
export default {
    name: 'ActorMovement',
    props: {
        movements: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        getMovementSymbol(movement) {
            const symbols = {
                'Entrée': 'bi-arrow-right',
                'Sortie': 'bi-arrow-left',
                'Déplacement gauche': 'bi-arrow-left ',
                'Déplacement droit': 'bi-arrow-right',
                'Action': 'bi-fire'
            }
            return symbols[movement] || movement
        }
    }
}
</script>


<template>
    <div class="actor-movements">
        <div v-for="movement in movements" :key="movement" class="movement-indicator" :title="movement">
            <i class="bi-person-walking" v-if="movement === 'Entrée'"></i>
            <i :class="getMovementSymbol(movement)"></i>
            <i class="bi-person-walking mirror" v-if="movement === 'Sortie'"></i>
        </div>
    </div>
</template>

<style scoped>
.actor-movements {
    position: absolute;
    bottom: 10px;
    left: 10px;
    display: flex;
    gap: 5px;
}

.movement-indicator {
    background: var(--dark);
    color: var(--white);
    padding: 5px;
    border-radius: 4px;
    font-size: 0.8rem;
    text-align: center;
    display: flex;
}

.movement-indicator .mirror {
    transform: scaleX(-1);
}
</style>