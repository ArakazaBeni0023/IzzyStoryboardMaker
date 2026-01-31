import { ref } from 'vue';
import { db } from '../db';

export function useStoryboard() {
    const currentStoryboard = ref(null);
    const scenes = ref([]);

    // Charger un storyboard et ses scènes
    const loadStoryboard = async (id) => {
        currentStoryboard.value = await db.storyboards.get(id);
        scenes.value = await db.scenes
            .where('storyboardId')
            .equals(id)
            .sortBy('number');
    };

    // Ajouter une scène
    const addScene = async (storyboardId) => {
        const nextNumber = scenes.value.length + 1;
        const newScene = {
            storyboardId,
            number: nextNumber,
            image: null,
            description: '',
            cameraMovements: [],
            actorMovements: [],
            comments: []
        };
        const id = await db.scenes.add(newScene);
        scenes.value.push({ ...newScene, id });
    };

    // Mettre à jour une scène
    const updateScene = async (sceneId, data) => {
        await db.scenes.update(sceneId, data);
        // Mise à jour locale
        const index = scenes.value.findIndex(s => s.id === sceneId);
        if (index !== -1) scenes.value[index] = { ...scenes.value[index], ...data };
    };

    return {
        currentStoryboard,
        scenes,
        loadStoryboard,
        addScene,
        updateScene
    };
}