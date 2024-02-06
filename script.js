"use strict";
import { GoogleGenerativeAI } from "@google/generative-ai";

const textareaEl = document.querySelector("textarea");
// const btnEl = document.querySelector("button");
const pEl = document.querySelector("p");
const formEl = document.getElementById("form");

const API_KEY = "AIzaSyCDACNtgHaI3vlIj9IDB_0BRuoUo6e7ve8";
const genAI = new GoogleGenerativeAI(API_KEY);

const timeBetween = 5;

const run = async (inputValue) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = inputValue;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text().replace(/\*/g, "");

  appearChars(text, pEl, timeBetween);
};

const appearChars = (str, pEl, timeBetween) => {
  pEl.innerHTML = ``;

  let index = -1;

  (function go() {
    if (++index < str.length) {
      pEl.innerHTML += str.charAt(index);
      setTimeout(go, timeBetween);
    }
  })();
};

formEl.addEventListener("submit", async (e) => {
  e.preventDefault();

  const inputValue = textareaEl.value.trim();

  try {
    pEl.textContent = `Loading...`;
    textareaEl.value = ``;
    await run(inputValue);
  } catch (error) {
    textareaEl.value = ``;
    appearChars(error.message, pEl, timeBetween);
  }
});
