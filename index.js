/*  ============================================================
    LUGX GAMING — index.js
    ============================================================
    JavaScript Concepts Covered:
    ✅ Functions (regular + arrow)
    ✅ DOM manipulation
    ✅ Type Conversions (String, Number, Boolean)
    ✅ Comparisons
    ✅ Conditions  – if/else, ternary (?), optional chaining
    ✅ Logical operators  ||  &&  !
    ✅ Loops: while, do…while, for, break & continue
    ✅ Variables (var, let, const)
    ✅ Interactive Functions (prompt, alert, confirm)
    ✅ Pseudo-classes used via JS class-toggling
    ============================================================ */

/* ================================================================
   1. DATA – Game lists (used by loops)
   ================================================================ */

const trendingGames = [
  {
    img: "images/trending-01.jpg",
    genre: "Action / RPG",
    title: "Assassin's Creed",
  },
  {
    img: "images/trending-02.jpg",
    genre: "Open World",
    title: "Cyberpunk 2077",
  },
  { img: "images/trending-03.jpg", genre: "Adventure", title: "God of War" },
  { img: "images/trending-04.jpg", genre: "Dark Fantasy", title: "Elden Ring" },
];

const mostPlayedGames = [
  { img: "images/top-game-01.jpg", genre: "Action", title: "Assassin's Creed" },
  {
    img: "images/top-game-02.jpg",
    genre: "Open World",
    title: "Cyberpunk 2077",
  },
  { img: "images/top-game-03.jpg", genre: "Adventure", title: "God of War" },
  { img: "images/top-game-04.jpg", genre: "Fantasy", title: "Elden Ring" },
  { img: "images/top-game-05.jpg", genre: "Shooter", title: "Halo Infinite" },
  { img: "images/top-game-06.jpg", genre: "RPG", title: "The Witcher 3" },
];

const categories = [
  { genre: "Action", img: "images/categories-01.jpg" },
  { genre: "RPG", img: "images/categories-02.jpg" },
  { genre: "Adventure", img: "images/categories-03.jpg" },
  { genre: "Shooter", img: "images/categories-04.jpg" },
  { genre: "Strategy", img: "images/categories-05.jpg" },
];

/* ================================================================
   2. HELPER FUNCTIONS
   ================================================================ */

// Function: create a DOM element with class name
function createElement(tag, className) {
  var el = document.createElement(tag);
  if (className) el.className = className;
  return el;
}

// Function: set the current year in footer elements
function setFooterYear() {
  var year = new Date().getFullYear();
  // for loop to update all footer year spans
  var yearSpans = document.querySelectorAll("#footerYear");
  for (var i = 0; i < yearSpans.length; i++) {
    yearSpans[i].textContent = String(year); // Type Conversion: Number → String
  }
}
// bavly
/* ================================================================
   3. RENDER TRENDING CARDS (for loop + DOM)
   ================================================================ */

function renderTrendingCards() {
  var container = document.getElementById("trendingCard");
  if (!container) return; // guard (&&-style short-circuit)

  // for loop
  for (var i = 0; i < trendingGames.length; i++) {
    var game = trendingGames[i];

    // نعمل div جديد ونحط فيه الـ HTML مرة واحدة
    var card = document.createElement("div");
    card.className = "card";

    card.innerHTML ='<img src="' + game.img +'" alt="' + game.title +'">' +
      '<div class="cardInfo">' +
        '<div class="cardName">' + 
          "<p>" + game.genre + "</p>" +
          "<h3>" + game.title + "</h3>" +
        "</div>" +
        '<a href="#" class="icon">' +
          '<img src="images/online-shopping.png" alt="Buy ' + game.title + '">' +
        "</a>" +
      "</div>";

    container.appendChild(card);
  }
}

/* ================================================================
   4. RENDER MOST-PLAYED CARDS (while loop + DOM)
   ================================================================ */

function renderMostPlayedCards() {
  var container = document.getElementById("mostCards");
  if (!container) return;

  var i = 0;
  // while loop
  while (i < mostPlayedGames.length) {
    var game = mostPlayedGames[i];

    // break: skip index 99 (never triggers here, demonstrates break)
    if (i === 99) break;

    // continue: skip any game whose title is empty (defensive)
    if (!game.title) {
      i++;
      continue;
    }

    // Ternary (?) – is this a premium game?
    var isPremium = i < 2 ? true : false;

    // نعمل الكارد بـ innerHTML مرة واحدة
    var card = document.createElement("div");
    card.className = "card";

    card.innerHTML =
      '<div class="cardImg">' +
      '<img src="' +
      game.img +
      '" alt="' +
      game.title +
      '">' +
      "</div>" +
      '<div class="cardInfo">' +
      '<p class="genre">' +
      game.genre +
      "</p>" +
      '<h3 class="cardName">' +
      game.title +
      "</h3>" +
      '<button class="btn">Explore</button>' +
      "</div>";

    // Logical operator &&: add premium class only if needed
    isPremium && card.classList.add("premiumCard");

    // Arrow function on the Explore button
    card.querySelector(".btn").addEventListener("click", () => {
      alert("🎮 Exploring: " + game.title + "\nGenre: " + game.genre);
    });

    container.appendChild(card);
    i++;
  }
}

/* ================================================================
   5. RENDER CATEGORY CARDS (do…while loop + DOM)
   ================================================================ */

function renderCategoryCards() {
  var container = document.getElementById("categoryCards");
  if (!container) return;

  var j = 0;
  // do…while loop
  do {
    var cat = categories[j];
    var card = createElement("div", "card");

    var genreDiv = createElement("div", "genre");
    genreDiv.textContent = cat.genre;

    var imgDiv = createElement("div", "cardImg");
    var img = createElement("img");
    img.src = cat.img;
    img.alt = cat.genre;

    imgDiv.appendChild(img);
    card.appendChild(genreDiv);
    card.appendChild(imgDiv);
    container.appendChild(card);

    j++;
  } while (j < categories.length);
}

/* ================================================================
   6. SEARCH FUNCTIONALITY (Type Conversion + Conditions + DOM)
   ================================================================ */

function initSearch() {
  var searchInput = document.getElementById("searchInput");
  var searchBtn = document.getElementById("searchBtn");
  var searchResult = document.getElementById("searchResult");

  if (!searchBtn || !searchInput || !searchResult) return;

  // Arrow function as event handler
  searchBtn.addEventListener("click", () => {
    var query = searchInput.value; // raw string from DOM

    // Type Conversion: String → Boolean (truthy check)
    var hasQuery = Boolean(query.trim());

    // Condition with logical operator !
    if (!hasQuery) {
      searchResult.style.color = "#ff6b6b";
      searchResult.textContent = "⚠️ Please type a game name first!";
      return;
    }

    // Comparisons + logical operator ||
    var queryLower = query.toLowerCase();
    var found = false;
    var foundGame = null;

    // for loop to search through all game lists
    var allGames = trendingGames.concat(mostPlayedGames);
    for (var k = 0; k < allGames.length; k++) {
      var gameName = allGames[k].title.toLowerCase();

      // Comparison using includes
      if (gameName.includes(queryLower)) {
        found = true;
        foundGame = allGames[k];
        break; // break – no need to keep searching
      }
    }

    // Ternary operator (non-traditional use of ?)
    searchResult.style.color = found ? "#4cff91" : "#ff6b6b";
    searchResult.textContent = found
      ? "✅ Found: " + foundGame.title + " (" + foundGame.genre + ")"
      : '❌ "' + query + '" not found. Try another game!';

    // Clear input after search
    searchInput.value = "";
  });

  // Allow pressing Enter to search
  searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") searchBtn.click();
  });
}

/* ================================================================
   7. VISIT COUNTER (localStorage + Type Conversion)
   ================================================================ */

function updateVisitCounter() {
  var visitMsg = document.getElementById("visitMsg");
  if (!visitMsg) return;

  // Type Conversion: String (localStorage) → Number
  var rawCount = localStorage.getItem("lugxVisits") || "0";
  var visitCount = Number(rawCount) + 1;

  // Save back as String
  localStorage.setItem("lugxVisits", String(visitCount));

  // Ternary + Comparison
  var label =
    visitCount === 1
      ? "🎮 Welcome! This is your first visit to LUGX Gaming."
      : "🎮 Welcome back! You have visited " + visitCount + " times.";

  visitMsg.textContent = label;
}

/* ================================================================
   8. HAMBURGER MENU TOGGLE (DOM + Conditions + Logical Operator)
   ================================================================ */

function initHamburgerMenu() {
  var toggleBtn = document.getElementById("menuToggle");
  var navLinks = document.getElementById("headerLinks");

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener("click", function () {
    // Logical operator !: flip the open state
    var isOpen = navLinks.classList.contains("open");
    isOpen ? navLinks.classList.remove("open") : navLinks.classList.add("open");
  });
}

/* ================================================================
   9. SIGN-IN MODAL (DOM + Conditions + Loops + Type Conversion)
   ================================================================ */

// Hardcoded users – in a real project this would be from a server
var validUsers = [
  { username: "admin", password: "1234" },
  { username: "gamer", password: "lugx" },
  { username: "player", password: "play" },
];

function initSignInModal() {
  var signInBtns = document.querySelectorAll("#signInBtn");
  var overlay = document.getElementById("modalOverlay");
  var closeBtn = document.getElementById("modalClose");
  var submitBtn = document.getElementById("modalSubmit");
  var modalMsg = document.getElementById("modalMsg");

  if (!overlay) return;

  // for loop over all sign-in buttons (header might repeat on mobile)
  for (var s = 0; s < signInBtns.length; s++) {
    signInBtns[s].addEventListener("click", function () {
      overlay.classList.add("active");
    });
  }

  // Close on overlay background click
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) overlay.classList.remove("active");
  });

  closeBtn &&
    closeBtn.addEventListener("click", function () {
      overlay.classList.remove("active");
    });

  // Login submit
  submitBtn &&
    submitBtn.addEventListener("click", function () {
      var username = document.getElementById("modalUsername").value.trim();
      var password = document.getElementById("modalPassword").value;

      // Type Conversion: Boolean – check if fields are filled
      var isValid = Boolean(username) && Boolean(password);

      if (!isValid) {
        modalMsg.style.color = "#ff6b6b";
        modalMsg.textContent = "⚠️ Please fill in both fields.";
        return;
      }

      var loggedIn = false;
      // for loop to check credentials
      for (var u = 0; u < validUsers.length; u++) {
        // Comparison ===
        if (
          validUsers[u].username === username &&
          validUsers[u].password === password
        ) {
          loggedIn = true;
          break;
        }
      }

      // Condition + ternary
      if (loggedIn) {
        modalMsg.style.color = "#4cff91";
        modalMsg.textContent = "✅ Welcome, " + username + "! Redirecting…";
        // Close modal after 1.5s
        setTimeout(function () {
          overlay.classList.remove("active");
          modalMsg.textContent = "";
        }, 1500);
      } else {
        modalMsg.style.color = "#ff6b6b";
        // Non-traditional ?: used to build message
        modalMsg.textContent = !username
          ? "⚠️ Username is required."
          : "❌ Wrong username or password.";
      }
    });
}

/* ================================================================
   10. CONTACT FORM VALIDATION (contactUs.html)
        Conditions, Type Conversions, Loops, DOM
   ================================================================ */

function initContactForm() {
  var sendBtn = document.getElementById("sendBtn");
  var formFeedback = document.getElementById("formFeedback");

  if (!sendBtn) return;

  sendBtn.addEventListener("click", function () {
    var name = document.getElementById("contactName").value.trim();
    var email = document.getElementById("contactEmail").value.trim();
    var ageRaw = document.getElementById("contactAge").value;
    var msg = document.getElementById("contactMsg").value.trim();

    // Type Conversion: String → Number
    var age = Number(ageRaw);

    // Build array of validation rules to loop through
    var errors = [];

    // Condition with logical operator !
    if (!name) errors.push("Name is required.");
    if (!email || !email.includes("@"))
      errors.push("A valid email is required.");

    // Comparison + Type Conversion Boolean
    if (!Boolean(ageRaw) || age < 5 || age > 120)
      errors.push("Please enter a valid age (5–120).");
    if (!msg) errors.push("Message cannot be empty.");

    if (errors.length > 0) {
      formFeedback.style.color = "#ff6b6b";

      // while loop to build error string
      var errorText = "";
      var ei = 0;
      while (ei < errors.length) {
        errorText += "⚠️ " + errors[ei];
        // continue equivalent: append separator only if not last
        if (ei < errors.length - 1) errorText += "  |  ";
        ei++;
      }
      formFeedback.textContent = errorText;
      return;
    }

    // All good – show success using ternary
    var isAdult = age >= 18;
    var ageNote = isAdult
      ? "You are an adult gamer 🎮"
      : "Young gamer detected 🕹️";

    formFeedback.style.color = "#4cff91";
    formFeedback.textContent =
      "✅ Message sent, " +
      name +
      "! " +
      ageNote +
      " We'll reply to " +
      email +
      " soon.";

    // Reset fields using for loop
    var fields = ["contactName", "contactEmail", "contactAge", "contactMsg"];
    for (var fi = 0; fi < fields.length; fi++) {
      var el = document.getElementById(fields[fi]);
      if (el) el.value = "";
    }
  });
}

/* ================================================================
   11. "VIEW ALL" BUTTONS – confirm dialog (Interactive Functions)
   ================================================================ */

function initViewAllButtons() {
  var trendingAllBtn = document.getElementById("viewAllTrending");
  var mostAllBtn = document.getElementById("viewAllMost");

  // Arrow function assigned to variable
  var handleViewAll = (section) => {
    // confirm() – interactive function
    var confirmed = confirm("Do you want to see all " + section + " games?");
    // Logical operator &&
    confirmed &&
      alert("🚀 Loading all " + section + " games… (Feature coming soon!)");
  };

  trendingAllBtn &&
    trendingAllBtn.addEventListener("click", () => handleViewAll("Trending"));
  mostAllBtn &&
    mostAllBtn.addEventListener("click", () => handleViewAll("Most Played"));
}

/* ================================================================
   12. SCROLL ANIMATION – IntersectionObserver (bonus polish)
   ================================================================ */

function initScrollReveal() {
  var cards = document.querySelectorAll(".card");

  // for loop over NodeList
  for (var ci = 0; ci < cards.length; ci++) {
    cards[ci].style.opacity = "0";
    cards[ci].style.transform = "translateY(30px)";
    cards[ci].style.transition = "opacity 0.5s ease, transform 0.5s ease";
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  // while loop to observe
  var oi = 0;
  while (oi < cards.length) {
    observer.observe(cards[oi]);
    oi++;
  }
}

/* ================================================================
   13. MAIN INIT — runs after DOM is fully loaded
   ================================================================ */

document.addEventListener("DOMContentLoaded", function () {
  // Set footer year
  setFooterYear();

  // Render dynamic card sections
  renderTrendingCards();
  renderMostPlayedCards();
  renderCategoryCards();

  // Init interactive features
  initSearch();
  updateVisitCounter();
  initHamburgerMenu();
  initSignInModal();
  initContactForm();
  initViewAllButtons();

  // Scroll reveal after cards are rendered
  initScrollReveal();
});
