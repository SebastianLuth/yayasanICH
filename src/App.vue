<template>
  <div id="app">
    <Navbar />
    <div id="main-container">
      <Sidebar />
      <div id="content">
        <router-view />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from './components/NavbarVue.vue';
import Footer from './components/FooterVue.vue';
import Sidebar from './components/SidebarVue.vue';

export default {
  components: {
    Navbar,
    Footer,
    Sidebar
  }
};
</script>

<style lang="scss">
:root {
  --primary: #4ade80;
  --primary-alt: #22c55e;
  --grey: #64748b;
  --dark: #1e293b;
  --dark-alt: #334155;
  --light: #f1f5f9;
  --sidebar-width: 300px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: var(--light);
}

button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}

html, body, #app {
  height: 100%;
  margin: 0;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

#main-container {
  display: flex;
  flex: 1;
}

#content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

aside {
  display: flex;
  flex-direction: column;
  background-color: var(--dark);
  color: var(--light);
  width: var(--sidebar-width);
  min-height: 100vh;
  transition: width 0.2s ease-in-out;
}

aside.is-expanded {
  width: calc(2rem + 32px); /* Adjust width when collapsed */
}

aside .logo img {
  width: 100%;
  max-width: 200px; /* Ensure logo size is appropriate */
}

aside .menu-toggle-wrap {
  display: flex;
  justify-content: flex-end;
}

aside .menu-toggle .material-icons {
  font-size: 2rem;
  color: var(--light);
  transition: color 0.2s ease-out, transform 0.2s ease-out;
}

aside .menu-toggle:hover .material-icons {
  color: var(--primary);
  transform: translateX(0.5rem);
}

aside h3,
aside .button .text {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

aside.is-expanded h3,
aside.is-expanded .button .text {
  opacity: 1;
}

aside .button {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  text-decoration: none;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
}

aside .button .material-icons {
  font-size: 2rem;
  color: var(--light);
  margin-right: 1rem;
}

aside .button:hover {
  background-color: var(--dark-alt);
  color: var(--primary);
}

aside .button.router-link-exact-active {
  background-color: var(--dark-alt);
  border-right: 5px solid var(--primary);
  color: var(--primary);
}

@media (max-width: 1024px) {
  aside {
    position: absolute;
    z-index: 99;
  }
}
</style>
