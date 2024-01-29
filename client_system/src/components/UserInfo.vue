
<template>
  <Popper arrow>
    <a v-if="userStore.user.role" class="cursor-pointer">
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

    <template #content="{ close }">
      <div class="card m-3 w-52 bg-base-100 shadow-xl">
        <div class="card-body p-5">
          <div class="flex">
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
            <h3 class="card-title">{{ userStore.user.name }}</h3>
          </div>
          <hr />
          <a
            class="text-neutral-700 font-semibold cursor-pointer hover:text-indigo-500 text-center"
            @click="logout"
            >Выйти</a
          >
        </div>
      </div>
    </template>
  </Popper>
</template>

<script setup>
import Popper from "vue3-popper";
import { useUserStore } from "../stores/userStore";
import { logoutUser } from "../services/useUser";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useRouter } from "vue-router";
const router = useRouter();


const userStore = useUserStore();

const logout = async () => {
  const result = await logoutUser();
  if (result === 'logout') {
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/login");
    userStore.deleteUserData();
  } else {
    toast.error(`Не удалось выйти из системы`, {
      autoClose: 3000,
    });
  }
  login.value = "";
  password.value = "";
};
</script>