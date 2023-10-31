

<template>
  <div class="flex flex-col items-center mx-auto md:h-screen lg:py-0">
    <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1
          class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl"
        >
          Вход в систему
        </h1>
        <form class="space-y-4 md:space-y-6" action="#">
          <div>
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Логин</label
            >
            <input
              v-model="login"
              type="text"
              name=""
              id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="name@etu.ru"
              required=""
            />
          </div>
          <div>
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Пароль</label
            >
            <input
              v-model="password"
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              required=""
            />
          </div>
          <button
            type="submit"
            @click.prevent="sendData()"
            class="w-full text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Sign in
          </button>
          <p class="text-sm font-light text-gray-500">
            Нет аккаунта?
            <a href="#" class="font-medium text-primary-600 hover:text-gray-900"
              >Зарегистрируйтесь</a
            >
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref } from "vue";
import { loginUser } from "../hooks/useUser";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

let login = ref<String>("");
let password = ref<String>("");

const sendData = async () => {
  const logUser = {
    username: login.value,
    password: password.value,
  };
  console.log(loginUser);
  const result = await loginUser(logUser);
  if (result.status === 200) {
    localStorage.setItem("jwt", result.data.jwt);
  } else {
    toast.error(`${result.response.data.message}`, {
      autoClose: 3000,
    });
  }
  login.value = "";
  password.value = "";
};
</script>

<style scoped>
</style>