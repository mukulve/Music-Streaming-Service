<template>
  <nav>
    <div class="nav_header">
      <h1>Mus<i class="fa-solid fa-podcast"></i>c</h1>
    </div>
    <div class="nav_body">
      <ul>
        <li>
          <router-link to="/"
            ><i class="fa-solid fa-house"></i> Home</router-link
          >
        </li>
        <li>
          <router-link to="/search"
            ><i class="fa-solid fa-magnifying-glass"></i> Search</router-link
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
nav {
  position: fixed;
  height: calc(100vh - 80px);
  width: 220px;
  border-right: var(--border);
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 0rem;
  padding-bottom: 0.5rem;
  z-index: 2;
  background-color: white;
}

nav .nav_header h1 {
  font-size: 2rem;
  font-weight: 900;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  text-decoration: none;
  color: var(--text);
  list-style-type: none;
}

li {
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  text-decoration: none;
  color: var(--text);
}

a {
  text-decoration: none;
  color: var(--text);
}

@media screen and (max-width: 750px) {
  nav {
    position: fixed;
    bottom: 0;
    height: 50px;
    width: 100vw;
    border-top: var(--border);
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    z-index: 4;
    background-color: var(--bg);
    align-items: center;
    font-size: 0.8rem;
    justify-content: space-between;
    align-content: center;
  }
  .nav_header {
    display: none;
  }

  ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
  }
}
</style>
