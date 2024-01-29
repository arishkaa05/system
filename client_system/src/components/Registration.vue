

<template>
  <div class="flex flex-col items-center mx-auto md:h-screen lg:py-0">
    <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1
          class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl"
        >
          Регистрация
        </h1>
        <form class="space-y-4 md:space-y-6" action="#">
          <div>
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Имя</label
            >
            <input
              v-model="name"
              type="text"
              name=""
              id="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="name@etu.ru"
              required=""
            />
          </div>
          <div>
            <label
              for="lastname"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Фамилия</label
            >
            <input
              v-model="lastname"
              type="text"
              name=""
              id="lastname"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="name@etu.ru"
              required=""
            />
          </div>
          <div>
            <label
              for="fathername"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Отчество</label
            >
            <input
              v-model="fathername"
              type="text"
              name=""
              id="fathername"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="name@etu.ru"
            />
          </div>
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
import { createUser, User } from "../services/useUser";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

let login = ref<String>("");
let password = ref<String>("");
let name = ref<String>("");
let lastname = ref<String>("");
let fathername = ref<String>("");

const sendData = async () => {
  const newUser: User = {
    username: login.value as string,
    password: password.value as string,
    name: name.value as string,
    lastname: lastname.value as string,
  };
  if (fathername.value.length > 0)
    newUser.fathername = fathername.value as string;
  const result = await createUser(newUser);
  if (result.status === 200) {
  } else {
    toast.error(`${result.response.data.message}`, {
      autoClose: 3000,
    });
  }
  login.value = "";
  password.value = "";
  name.value = "";
  lastname.value = "";
  fathername.value = "";
};
</script>

<style scoped>
</style>