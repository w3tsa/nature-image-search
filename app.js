import getImages from "./api.js";

const form = document.querySelector("form");
const imageSection = document.querySelector(".images");
const loadingImage = document.querySelector("#loadingImage");

loadingImage.style.display = "none";

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  loadingImage.style.display = "";
  imageSection.innerHTML = "";
  const formData = new FormData(form);
  const searchTerm = formData.get("searchTerm");

  try {
    const images = await getImages(searchTerm);
    if (images.length > 0) {
      addImagesToPage(images);
    } else {
      imageSection.innerHTML =
        "<img class= 'gif' src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.vieodesign.com%2Fhs-fs%2Fhubfs%2FImages_and_Video%2FBlog_Images%2F2017%2F404-gif.gif%3Fwidth%3D501%26name%3D404-gif.gif&f=1&nofb=1'>";
      loadingImage.style.display = "none";
    }
  } catch (error) {
    // Handle the error....
    console.log(error);
  }
});

function addImagesToPage(images) {
  images.forEach((item) => {
    const ImageElement = document.createElement("img");
    ImageElement.src = item.image;
    ImageElement.classList.add("image-hover");
    imageSection.append(ImageElement);
    loadingImage.style.display = "none";
    //console.log(images.length);
  });
}
