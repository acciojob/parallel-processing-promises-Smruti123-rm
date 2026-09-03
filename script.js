//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(imageUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = function () {
      resolve(img);
    };

    img.onerror = function () {
      reject(`Failed to load image: ${imageUrl}`);
    };

    img.src = imageUrl;
  });
}

function downloadImages() {
  loading.textContent = "Loading...";
  errorDiv.textContent = "";
  output.innerHTML = "";

  const promises = images.map((image) =>
    downloadImage(image.url)
  );

  Promise.all(promises)
    .then((downloadedImages) => {
      loading.textContent = "";

      downloadedImages.forEach((img) => {
        output.appendChild(img);
      });
    })
    .catch((error) => {
      loading.textContent = "";

      errorDiv.textContent = error;
    });
}

downloadImages();