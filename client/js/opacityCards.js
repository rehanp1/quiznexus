const opacityCardContainer = document.querySelector(".opacity-cards");

const opacityCardsData = [
  {
    img: "/images/main2_img1.jpg",
    heading: "Test your IQ!",
    link: "./pages/dashboard.html",
  },
  {
    img: "/images/main2_img2.jpg",
    heading: "Learn and Earn",
    link: "./pages/dashboard.html",
  },
  {
    img: "/images/main2_img3.jpg",
    heading: "Test before play",
    link: "./pages/dashboard.html",
  },

  {
    img: "/images/main2_img1.jpg",
    heading: "Test your IQ!",
    link: "./pages/dashboard.html",
  },
];

cardInserter();

function cardInserter() {
  opacityCardContainer.innerHTML = `
${opacityCardsData
  .map(
    (card) =>
      `<section class="h-[60vh] relative flex-1 text-left rounded-2xl overflow-hidden shadow-lg shadow-gray-400"
      style="background: url(${card.img}) no-repeat center/cover;" >

        <div class="bg-gradient-to-b from-[rgba(0,0,0,.9)] to-[rgba(0,0,0,0)] text-white absolute inset-0 p-4">

            <h3 class="text-lg font-semibold">${card.heading}</h3>
            <a href=${card.link} class="text-xs hover:text-purple-700">Start now <i class="fa-solid fa-arrow-right-long ml-52"></i></a>
        </div>
      Hello
    </section>
      `
  )
  .join("")}
        `;
}
