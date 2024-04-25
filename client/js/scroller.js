const scroller = document.querySelector(".scroller");

const cardsData = [
  {
    icon: `<i class="fa-solid fa-cat"></i>`,
    heading: "Animals",
    categoryID: 27,
    img: "/images/scroller-animals.jpg",
  },
  {
    icon: `<i class="fa-solid fa-music"></i>`,
    heading: "Music",
    categoryID: 12,
    img: "/images/scroller-music.jpg",
  },
  {
    icon: `<i class="fa-solid fa-baseball-bat-ball"></i>`,
    heading: "Sports",
    categoryID: 21,
    img: "/images/scroller-sports.jpg",
  },

  {
    icon: `<i class="fa-solid fa-brain"></i>`,
    heading: "General Knowledge",
    categoryID: 9,
    img: "/images/scroller-gk.jpg",
  },
  {
    icon: `<i class="fa-solid fa-book-atlas"></i>`,
    heading: "Geography",
    categoryID: 22,
    img: "/images/scroller-geography.jpg",
  },
  {
    icon: `<i class="fa-solid fa-clock-rotate-left"></i>`,
    heading: "History",
    categoryID: 23,
    img: "/images/scroller-history.jpg",
  },
  {
    icon: `<i class="fa-brands fa-pied-piper-alt"></i>`,
    heading: "Cartoons & Anime",
    categoryID: 32,
    img: "/images/scroller-cartoons.jpg",
  },
  {
    icon: `<i class="fa-solid fa-handshake"></i>`,
    heading: "Politics",
    categoryID: 24,
    img: "/images/scroller-politics.jpg",
  },
];

cardInserter();

function cardInserter() {
  scroller.innerHTML = `
${cardsData
  .map(
    (card) =>
      `
        <section class="min-w-[20%] p-4 rounded-lg space-y-5 cursor-pointer hover:scale-[1.03] transition-all"
        style="background: linear-gradient(-90deg, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.7)), url(${card.img}) no-repeat center/cover"
        >
            <span class="bg-white rounded-[50%] p-2 grid items-center w-fit shadow-md shadow-gray-500">${card.icon}</span>
            <h3 class="font-bold text-lg text-white" category-id="${card.categoryID}">${card.heading}</h3>
            <p class="text-xs text-white">Start Now <i class="fa-solid fa-arrow-right-long "></i></p>
        </section>
      
      `
  )
  .join("")}
        `;
}

function categorySetter() {
  let sections = scroller.getElementsByTagName("section");
  Array.from(sections).forEach((section) => {
    section.addEventListener("click", () => {
      let h1Tag = section.children[1];

      let data = {
        category: h1Tag.innerHTML.toLowerCase(),
        value: h1Tag.attributes["category-id"].value,
      };
      localStorage.setItem("categoryData", JSON.stringify(data));
      location.href = "/pages/dashboard.html";
    });
  });
}

categorySetter();
