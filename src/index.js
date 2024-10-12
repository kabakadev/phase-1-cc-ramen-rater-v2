// index.js
let ramenDivImg = document.querySelector("#ramen-menu");
// let ramenDetail = document.querySelector("#ramen-detail");
// let ramenRatingParagraph = document.querySelector("p#rating-display");
// let ramenCommentParagraph = document.querySelector("p#comment-display");
let ramenForm = document.querySelector("#new-ramen");
let detailImage = document.querySelector(".detail-image");
let detailName = document.querySelector(".name");
let detailRestaurant = document.querySelector(".restaurant");
let detailRating = document.querySelector("#rating-display");
let detailComment = document.querySelector("#comment-display");
// Callbacks
const handleClick = (ramen) => {
  console.log(ramen);

  detailImage.src = ramen.image;
  detailName.textContent = ramen.name;
  detailRestaurant.textContent = ramen.restaurant;
  detailComment.textContent = ramen.comment;
  detailRating.textContent = ramen.rating;
  // ramenDetail.appendChild(detailImage, detailName, detailRestaurant);
  // ramenRatingParagraph.appendChild(detailRating);
  // ramenCommentParagraph.appendChild(detailComment);

  // Add code
};

const addSubmitListener = () => {
  // Add code
  ramenForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(e.target);
    let ramenObj = {
      name: document.querySelector("#new-name").value,
      restaurant: document.querySelector("#new-restaurant").value,
      image: document.querySelector("#new-image").value,
      rating: document.querySelector("#new-rating").value,
      comment: document.querySelector("#new-comment").value,
    };
    console.log(ramenObj);
    fetch("http://localhost:3000/ramens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ramenObj),
    })
      .then((res) => {
        res.json();
        handleClick(ramenObj);
      })
      .then((data) => console.log(data))
      .catch((error) => console.log("Unable to Send data", error));
  });
};

const displayRamens = () => {
  // Add code

  fetch("http://localhost:3000/ramens")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((imgArr, index) => {
        let imgTag = document.createElement("img");
        imgTag.src = imgArr.image;
        imgTag.addEventListener("click", () => {
          handleClick(imgArr);
        });
        // handleClick(imgArr.image[0]);
        if (index === 0) {
          handleClick(imgArr);
        }

        ramenDivImg.appendChild(imgTag);
      });
    })
    .catch((error) =>
      console.log("Unable to get the ramens from the server", error)
    );
};

const main = () => {
  // Invoke displayRamens here
  displayRamens();
  // Invoke addSubmitListener here
  addSubmitListener();
};

main();

// Export functions for testing
export { displayRamens, addSubmitListener, handleClick, main };
