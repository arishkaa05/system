<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="navbar z-[1001] sticky top-0 shadow-xl bg-base-100">
    <div class="container max-w-screen-lg mx-auto">
      <div class="sm:hidden block">
        <div class="navbar-start">
          <div class="dropdown">
            <label tabindex="0" class="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <div
              class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <a
                class="block cursor-pointer px-3 py-2 rounded-2lg text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                @click="$router.push('/')">Главная</a>
              <a
                class="block cursor-pointer px-3 py-2 rounded-2lg text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                @click="$router.push('/expert')">Эксперту </a>
              <a
                class="block cursor-pointer px-3 py-2 rounded-2lg text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                @click="$router.push('/patient')">Пациенты</a>
        
            </div>
          </div>
        </div>
      </div>

    <div class="hidden sm:block">
      <div class="navbar-start">
        <div class="hidden sm:ml-6 xl:ml-8 sm:flex sm:space-x-8">
          <a
            class="border-transparent cursor-pointer text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            @click.stop="$router.push('/')"
            >Главная</a
          >
          <a
            class="border-transparent cursor-pointer text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            @click="$router.push('/expert')"
            >Эксперту</a
          >
          <a
            class="border-transparent cursor-pointer text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            @click="$router.push('/patient')"
            >Пациенты</a
          >
        </div>
      </div>
      <div class="navbar-end flex"></div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Navbar'
}
</script>

<style scoped>
.router-link-exact-active {
  color: #7c3aed; /* Цвет текста для активной ссылки */
  /* Другие стили, которые вы хотите применить к активной ссылке */
}
</style>
