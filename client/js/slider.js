const slideContainer = document.querySelector(".slider-container");

const slideData = [
  {
    img: "/images/grid-img-8.jpg",
    name: "User 1",
    position: "Developer",
    comment:
      "Positive reviews can be a powerful marketing tool. When potential customers see positive reviews from others who have used your product or service, they are more likely to choose your business.",
  },
  {
    img: "/images/grid-img-5.jpeg",
    name: "User 2",
    position: "Developer",
    comment:
      "Positive reviews can be a powerful marketing tool. When potential customers see positive reviews from others who have used your product or service, they are more likely to choose your business.",
  },
  {
    img: "/images/grid-img-8.jpg",
    name: "User 3",
    position: "Developer",
    comment:
      "Positive reviews can be a powerful marketing tool. When potential customers see positive reviews from others who have used your product or service, they are more likely to choose your business.",
  },
  {
    img: "/images/grid-img-5.jpeg",
    name: "User 4",
    position: "Developer",
    comment:
      "Positive reviews can be a powerful marketing tool. When potential customers see positive reviews from others who have used your product or service, they are more likely to choose your business.",
  },
  {
    img: "/images/grid-img-8.jpg",
    name: "User 5",
    position: "Developer",
    comment:
      "Positive reviews can be a powerful marketing tool. When potential customers see positive reviews from others who have used your product or service, they are more likely to choose your business.",
  },
  {
    img: "/images/grid-img-5.jpeg",
    name: "User 6",
    position: "Developer",
    comment:
      "Positive reviews can be a powerful marketing tool. When potential customers see positive reviews from others who have used your product or service, they are more likely to choose your business.",
  },
  {
    img: "/images/grid-img-8.jpg",
    name: "User 7",
    position: "Developer",
    comment:
      "Positive reviews can be a powerful marketing tool. When potential customers see positive reviews from others who have used your product or service, they are more likely to choose your business.",
  },
];

slideInserter();

function slideInserter() {
  slideContainer.innerHTML = `
${slideData
  .map(
    (slide) =>
      `<div class="blog_post min-w-[500px] p-4 transition-all duration-500 rounded-lg text-left bg-white">
        <div class="w-20 aspect-square shadow-lg shadow-gray-700 rounded-full grid place-items-center bg-[#523bae] mb-5">
            <img class="w-16 aspect-square rounded-full object-cover" src=${slide.img} alt="images">
        </div>
        
        <div class="text-sm ml-2">
          <h3 class="font-bold text-gray-500 ">${slide.position}</h3>
          <h1 class="text-lg font-semibold mb-2">${slide.name}</h1>
          <p class="mb-6">${slide.comment}</p>
          <a class="bg-[#523bae] text-white py-2 px-4 text-xs rounded-2xl"      
          href='#' target="_blank">Read More</a>
        </div>
    </div>
      
      `
  )
  .join("")}
        `;
}

const slides = slideContainer.querySelectorAll(".blog_post");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

const moveableWidth = slides[0].clientWidth + 16;

let counter = 0;

const move = () => {
  Array.from(slides).map((item) => {
    item.style.transform = `translateX(-${counter * moveableWidth}px)`;
  });
};

prevBtn.addEventListener("click", () => {
  counter--;
  if (counter <= 0) counter = 0;
  move();
});

nextBtn.addEventListener("click", () => {
  counter++;
  let lastIdx = slideData.length - 2;
  if (counter >= lastIdx) counter = lastIdx;
  move();
});
