const output = document.getElementById("output");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      resolve(img);
    };

    img.onerror = () => {
      reject(`Failed to download image: ${url}`);
    };

    img.src = url;
  });
}

function downloadImages() {
  loading.textContent = "Loading...";
  errorDiv.textContent = "";
  output.innerHTML = "";

  const imagePromises = images.map((image) =>
    downloadImage(image.url)
  );

  Promise.all(imagePromises)
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