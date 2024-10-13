// index.js
let ramenDivImg = document.querySelector("#ramen-menu");

let ramenForm = document.querySelector("#new-ramen");
let detailImage = document.querySelector(".detail-image");
let detailName = document.querySelector(".name");
let detailRestaurant = document.querySelector(".restaurant");
let detailRating = document.querySelector("#rating-display");
let detailComment = document.querySelector("#comment-display");

//updte rating and comment
let editRamenForm = document.querySelector("#edit-ramen");
let editRamenRating = document.querySelector("#new-rating-edit");
let editRamenComment = document.querySelector("#new-comment-edit");
let currentRamenObj = null;

// Callbacks
const handleClick = (ramen) => {
  currentRamenObj = ramen;
  detailImage.src = ramen.image;
  detailName.textContent = ramen.name;
  detailRestaurant.textContent = ramen.restaurant;
  detailComment.textContent = ramen.comment;
  detailRating.textContent = ramen.rating;

  // Add code
};

const addSubmitListener = () => {
  // Add code
  ramenForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let ramenObj = {
      name: document.querySelector("#new-name").value,
      restaurant: document.querySelector("#new-restaurant").value,
      image: document.querySelector("#new-image").value,
      rating: document.querySelector("#new-rating").value,
      comment: document.querySelector("#new-comment").value,
    };
    fetch("http://localhost:3000/ramens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ramenObj),
    })
      .then((res) => res.json())
      .then((data) => {
        handleClick(ramenObj);
        console.log(data);
      })
      .catch((error) => console.log("Unable to Send data", error));
  });

  editRamenForm.addEventListener("submit", (e) => {
    e.preventDefault();
    editRamen(currentRamenObj);
  });
};
function editRamen(editRamenObj) {
  editRamenObj.comment = editRamenComment.value;
  editRamenObj.rating = editRamenRating.value;
  fetch(`http://localhost:3000/ramens/${editRamenObj.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(editRamenObj),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => console.log("error updating", error));

  detailComment.textContent = editRamenObj.comment;
  detailRating.textContent = editRamenObj.rating;
}

const displayRamens = () => {
  // Add code

  fetch("http://localhost:3000/ramens")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((Obj, index) => {
        let imgTag = document.createElement("img");
        imgTag.src = Obj.image;
        let div = document.createElement("div");
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Remove";
        deleteBtn.addEventListener("click", () => {
          deleteRamen(Obj);
          imgTag.remove();
          div.remove();
        });
        imgTag.addEventListener("click", () => {
          handleClick(Obj);
        });
        if (index === 0) {
          handleClick(Obj);
        }
        div.appendChild(deleteBtn);
        ramenDivImg.appendChild(imgTag);
        ramenDivImg.appendChild(div);
      });
    })
    .catch((error) =>
      console.log("Unable to get the ramens from the server", error)
    );
};

function deleteRamen(anyObj) {
  if (currentRamenObj) {
    detailImage.src = "";
    detailName.textContent = "";
    detailRestaurant.textContent = "";
    detailRating.textContent = "";
    detailComment.textContent = "";
  }
}

const main = () => {
  // Invoke displayRamens here
  displayRamens();
  // Invoke addSubmitListener here
  addSubmitListener();
};

main();

// Export functions for testing
export { displayRamens, addSubmitListener, handleClick, main };
