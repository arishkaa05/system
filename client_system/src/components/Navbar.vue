
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
                @click="$router.push('/')"
                >Главная</a
              >
              <a
                class="block cursor-pointer px-3 py-2 rounded-2lg text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                @click="$router.push('/expert')"
                >Эксперту
              </a>
              <a
                class="block cursor-pointer px-3 py-2 rounded-2lg text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                @click="$router.push('/patient')"
                >Пациенты</a
              >
            </div>
          </div>
        </div>
      </div>

      <div class="hidden sm:block w-full ">
        <div class="navbar-start  w-full flex justify-between">
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
          <a class="cursor-pointer" @click="$router.push('/login')">
            <svg
              data-v-fd4e8d83=""
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              class="mr-4 h-[2.5em] w-[2.5em] rounded-full text-neutral-300"
            >
              <path
                fill-rule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
