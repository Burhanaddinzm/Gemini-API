"use strict";
import { GoogleGenerativeAI } from "@google/generative-ai";

const textareaEl = document.querySelector("textarea");
const pEl = document.querySelector("p");

const API_KEY = "AIzaSyCDACNtgHaI3vlIj9IDB_0BRuoUo6e7ve8";
const genAI = new GoogleGenerativeAI(API_KEY);

async function run(inputValue) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = inputValue;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  pEl.innerHTML = "";
  appearChars(text, pEl, 5);
}

const appearChars = (str, pEl, timeBetween) => {
  var index = -1;
  (function go() {
    if (++index < str.length) {
      pEl.innerHTML += str.charAt(index);
      setTimeout(go, timeBetween);
    }
  })();
};

textareaEl.addEventListener("keydown", async (e) => {
  const inputValue = textareaEl.value.trim();

  if (e.key === "Enter") {
    pEl.textContent = "Loading...";
    await run(inputValue);
    textareaEl.value = "";
  }
});
