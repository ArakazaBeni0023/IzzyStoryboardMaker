<script>
export default {
    name: 'HeaderCmp',
    computed: {
        showNavigation() {
            return this.$route.name !== 'home'
        }
    }
}
</script>

<template>
    <div class="header" :class="{ 'small-height': showNavigation, 'normal-height': !showNavigation }">
        <h1>EAZYSTORYBOARD</h1>
        <nav v-if="showNavigation" class="main-nav">
            <router-link to="/" class="nav-link">Accueil</router-link>
            <router-link to="/editor" class="nav-link">Éditeur</router-link>
            <router-link to="/view" class="nav-link">Visualisation</router-link>
        </nav>
    </div>
</template>

<style scoped>
.header {
    background: var(--aurore);
    width: 100%;
    height: 230px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    border-bottom: 5px solid var(--dark);
    transition: height 1s ease;
}

.small-height {
    height: 80px;
}

.normal-height {
    height: 230px;
}

.normal-height {
    height: 230px;
}

.header h1 {
    font-size: 1.8rem;
    margin: 0;
    font-weight: 700;
}

.main-nav {
    display: flex;
    gap: 1.5rem;
}

.nav-link {
    color: var(--dark);
    text-decoration: none;
    padding: 0.5rem 1.5rem;
    border-radius: 50px;
    transition: all 0.5s ease;
    font-weight: 500;
    border: 1px solid transparent;
    cursor: pointer;
    text-transform: uppercase;

}

.nav-link:hover {
    background-color: rgba(0, 0, 0, 0.1);
}

.nav-link.router-link-active {
    background-color: var(--dark);
    color: var(--white);
}

/* Responsive */
@media (max-width: 768px) {
    .header {
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
        text-align: center;
    }

    .main-nav {
        gap: 0.5rem;
        flex-wrap: wrap;
        justify-content: center;
    }

    .nav-link {
        padding: 0.4rem 0.8rem;
        font-size: 0.9rem;
    }

    main {
        padding: 1rem;
    }

    .header h1 {
        font-size: 1.5rem;
    }
}
</style>
