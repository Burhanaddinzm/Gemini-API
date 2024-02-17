"use strict";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const textareaEl = document.querySelector("textarea");
// const btnEl = document.querySelector("button");
const pEl = document.querySelector("p");
const formEl = document.getElementById("form");

const API_KEY = "AIzaSyCDACNtgHaI3vlIj9IDB_0BRuoUo6e7ve8";
const genAI = new GoogleGenerativeAI(API_KEY);

const timeBetween = 5;

const run = async (inputValue) => {
  
  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
  ];

  const model = genAI.getGenerativeModel({
    model: "gemini-pro",
    safetySettings,
  });

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
    if (!inputValue) return;
    pEl.textContent = `Loading...`;
    textareaEl.value = ``;
    await run(inputValue);
  } catch (error) {
    textareaEl.value = ``;
    appearChars(error.message, pEl, timeBetween);
  }
});
