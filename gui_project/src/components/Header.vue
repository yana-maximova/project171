<template>
  <header class="header">
    <div class="logo">
      <router-link to="/">
        <img src="assets/logo.png" alt="логотип">
      </router-link>
    </div>
    <nav class="menu">
      <ul class="menu__list">
        <li class="menu__link"><router-link to="/tester">Тестирование</router-link></li>
        <li class="menu__link"><router-link to="/annotation">Аннотации</router-link></li>
        <li class="menu__link"><router-link to="/training">Обучение сети</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
	name: 'Header'
}
</script>

<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em 2em;
  border-bottom: 2px solid var(--primary);
}

.menu__list {
  display: flex;
  justify-content: space-around;
  align-items: center;

  li {
    margin-right: 1em;
    &:last-child {
      margin-right: 0;
    }
  }

  a {
    font-weight: bold;
    color: var(--text-color);
    text-decoration: none;
    transition: color .3s;

    &.router-link-exact-active, &:hover {
       color: var(--primary);
     }
  }
}
</style>
