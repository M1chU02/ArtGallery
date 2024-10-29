// script.js
const gallery = document.getElementById("gallery");

async function uploadImage() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];
  if (!file) return alert("Please select an image file.");

  const formData = new FormData();
  formData.append("image", file);

  try {
    await fetch("http://localhost:5000/api/upload", {
      method: "POST",
      body: formData,
    });
    loadImages();
  } catch (error) {
    console.error("Error uploading image:", error);
  }
}

async function loadImages() {
  try {
    const response = await fetch("http://localhost:5000/api/images");
    const images = await response.json();
    displayImages(images);
  } catch (error) {
    console.error("Error loading images:", error);
  }
}

function displayImages(images) {
  gallery.innerHTML = "";
  images.forEach((image) => {
    const imgElement = document.createElement("div");
    imgElement.classList.add("gallery-item");
    imgElement.innerHTML = `<img src="http://localhost:5000/images/${image.filename}" alt="Artwork" />`;
    gallery.appendChild(imgElement);
  });
}

document.addEventListener("DOMContentLoaded", loadImages);
