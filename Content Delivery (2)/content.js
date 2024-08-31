const viewAllPartsBtn = document.getElementById("viewAllPartsBtn");
const navigationMenu = document.getElementById("navigationMenu");

viewAllPartsBtn.addEventListener("click", () => {
  navigationMenu.classList.toggle("active");
});

// Close menu when clicking outside
document.addEventListener("click", (event) => {
  if (
    !navigationMenu.contains(event.target) &&
    event.target !== viewAllPartsBtn
  ) {
    navigationMenu.classList.remove("active");
  }
});

// Example function to load content (you would implement this to fetch and display the selected part)
function loadPart(partId) {
  // This is a placeholder function. In a real application, you would fetch the content for the selected part
  // and update the page accordingly.
  console.log(`Loading content for ${partId}`);
  // Update page content here
  navigationMenu.classList.remove("active");
}

// Add click event listeners to navigation links
document.querySelectorAll(".navigation-menu a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const partId = e.target.getAttribute("href").substring(1);
    loadPart(partId);
  });
});
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const elements = document.querySelectorAll(".navigable-element"); // Add this class to elements you want to navigate between

let leftWeight = 50;
let rightWeight = 50;
const beam = document.querySelector(".beam");
const weightA = document.querySelector(".weight-a");
const weightB = document.querySelector(".weight-b");
const message = document.getElementById("message");

function adjustWeight(side, amount) {
  if (side === "left") {
    leftWeight = Math.max(0, Math.min(100, leftWeight + amount));
    rightWeight = Math.max(0, Math.min(100, rightWeight - amount));
  } else {
    rightWeight = Math.max(0, Math.min(100, rightWeight + amount));
    leftWeight = Math.max(0, Math.min(100, leftWeight - amount));
  }
  updateSeesaw();
}

function updateSeesaw() {
  const rotation = (leftWeight - rightWeight) / 2;
  beam.style.transform = `rotate(${rotation}deg)`;
  weightA.style.transform = `translateY(${-(leftWeight - 50)}px)`;
  weightB.style.transform = `translateY(${-(rightWeight - 50)}px)`;

  if (leftWeight === rightWeight) {
    message.textContent = "Perfect balance! This represents equality.";
  } else {
    message.textContent =
      "Unequal rights lead to imbalance. Try to achieve equilibrium!";
  }
}

updateSeesaw();
