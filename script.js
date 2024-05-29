const form = document.querySelector("form");
const input = document.querySelector(".input");

const replaceImages = (url) => {
  const images = document.querySelectorAll("img");
  images.forEach((image) => (image.src = url));
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (
    !tab.url.startsWith("chrome://") &&
    !tab.url.startsWith("chrome-extension://")
  ) {
    chrome.scripting.executeScript({
      target: {
        tabId: tab.id,
      },
      function: replaceImages,
      args: [input.value],
    });
  } else {
    console.error(
      "Cannot execute scripts on chrome:// or chrome-extension:// URLs."
    );
  }
});
