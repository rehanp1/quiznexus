const gridImagesContainer = document.querySelector(".grid-images-contianer");

const gridImages = [
  {
    src: "/images/grid-img-1.webp",
    height: "100%",
    alt: "img-gallery-1",
  },
  {
    src: "/images/grid-img-7.jpg",
    height: "51.5vh",
    alt: "img-gallery-7",
  },
  {
    src: "/images/grid-img-2.jpeg",
    height: "100%",
    alt: "img-gallery-2",
  },
  {
    src: "/images/grid-img-4.jpg",
    height: "24.5vh",
    alt: "img-gallery-4",
  },
  {
    src: "/images/grid-img-3.avif",
    height: "100%",
    alt: "img-gallery-3",
  },
  {
    src: "/images/grid-img-6.jpeg",
    height: "34vh",
    alt: "img-gallery-6",
  },
  {
    src: "/images/grid-img-5.jpeg",
    height: "100%",
    alt: "img-gallery-5",
  },
  {
    src: "/images/grid-img-8.jpg",
    height: "100%",
    alt: "img-gallery-8",
  },
];

gridImagesInserter();

function gridImagesInserter() {
  gridImagesContainer.innerHTML = `
        ${gridImages
          .map(
            (image) =>
              `<div>
                <img
                  class="custom-img"
                  src=${image.src}
                  alt=${image.alt}
                  style="height:${image.height}"
                />
            </div>  
            `
          )
          .join("")}
    `;
}
