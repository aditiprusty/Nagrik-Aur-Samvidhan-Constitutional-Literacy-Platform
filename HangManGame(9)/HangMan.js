const articles = [
    { number: "12", hint: "Definition of 'State' under the Constitution" },
    { number: "13", hint: "Laws inconsistent with or in derogation of Fundamental Rights" },
    { number: "14", hint: "Right to Equality before the law" },
    { number: "15", hint: "Prohibition of discrimination on grounds of religion, race, caste, sex or place of birth" },
    { number: "16", hint: "Equality of opportunity in public employment" },
    { number: "17", hint: "Abolition of Untouchability" },
    { number: "18", hint: "Abolition of titles except military and academic distinctions" },
    { number: "19", hint: "Protection of certain rights regarding freedom of speech, etc." },
    { number: "20", hint: "Protection in respect of conviction for offenses" },
    { number: "21", hint: "Protection of life and personal liberty" },
    { number: "21A", hint: "Right to education for children aged 6-14 years" },
    { number: "22", hint: "Protection against arrest and detention in certain cases" },
    { number: "23", hint: "Prohibition of human trafficking and forced labor" },
    { number: "24", hint: "Prohibition of child labor in hazardous jobs" },
    { number: "25", hint: "Freedom of conscience and free profession, practice, and propagation of religion" },
    { number: "26", hint: "Freedom to manage religious affairs" },
    { number: "27", hint: "Freedom from payment of taxes for promotion of any religion" },
    { number: "28", hint: "Freedom from religious instruction in state-funded educational institutions" },
    { number: "29", hint: "Protection of interests of minorities" },
    { number: "30", hint: "Right of minorities to establish and administer educational institutions" },
    { number: "32", hint: "Right to Constitutional Remedies" },
    { number: "36", hint: "Definition of 'State' in the context of Directive Principles" },
    { number: "37", hint: "Application of the Directive Principles" },
    { number: "38", hint: "State to secure a social order for the promotion of welfare" },
    { number: "39", hint: "Certain principles of policy to be followed by the State" },
    { number: "39A", hint: "Equal justice and free legal aid" },
    { number: "40", hint: "Organization of village panchayats" },
    { number: "41", hint: "Right to work, education, and public assistance" },
    { number: "42", hint: "Provision for just and humane conditions of work and maternity relief" },
    { number: "43", hint: "Living wage, etc., for workers" },
    { number: "43A", hint: "Participation of workers in management of industries" },
    { number: "44", hint: "Uniform Civil Code for the citizens" },
    { number: "45", hint: "Provision for early childhood care and education" },
    { number: "46", hint: "Promotion of educational and economic interests of Scheduled Castes, Scheduled Tribes, and other weaker sections" },
    { number: "47", hint: "Duty of the State to raise the level of nutrition and standard of living and to improve public health" },
    { number: "48", hint: "Organization of agriculture and animal husbandry" },
    { number: "48A", hint: "Protection and improvement of environment and safeguarding of forests and wildlife" },
    { number: "49", hint: "Protection of monuments and places of national importance" },
    { number: "50", hint: "Separation of judiciary from executive in public services" },
    { number: "51", hint: "Promotion of international peace and security" },
    { number: "51A", hint: "Fundamental Duties of citizens" }
];

let selectedArticle = "";
let hint = "";
let guessedNumber = [];
let wrongGuesses = 0;
const maxWrongGuesses = 6;

const wordElement = document.getElementById("word");
const alphabetElement = document.getElementById("alphabet");
const hangmanElement = document.getElementById("hangman");
const messageElement = document.getElementById("message");
const hintElement = document.getElementById("hint");

function resetGame() {
    // Reset game variables
    wrongGuesses = 0;
    guessedNumber = [];

    // Randomly select an article
    const randomIndex = Math.floor(Math.random() * articles.length);
    selectedArticle = articles[randomIndex].number;
    hint = articles[randomIndex].hint;

    // Display the hint
    hintElement.innerHTML = "Hint: " + hint;

    // Reset display elements
    wordElement.innerHTML = "_ ".repeat(selectedArticle.length);
    hangmanElement.innerHTML = `Wrong guesses: ${wrongGuesses}/${maxWrongGuesses}`;
    messageElement.innerHTML = "";

    // Create number buttons (0-9)
    alphabetElement.innerHTML = "";
    for (let i = 0; i <= 9; i++) {
        const numberButton = document.createElement("span");
        numberButton.classList.add("letter");
        numberButton.innerHTML = i;
        numberButton.addEventListener("click", () => guessNumber(i.toString(), numberButton));
        alphabetElement.appendChild(numberButton);
    }
}

function guessNumber(number, numberButton) {
    numberButton.classList.add("used");
    numberButton.removeEventListener("click", () => guessNumber(number, numberButton));

    if (selectedArticle.includes(number)) {
        // Correct guess
        for (let i = 0; i < selectedArticle.length; i++) {
            if (selectedArticle[i] === number) {
                guessedNumber[i] = number;
            }
        }
        wordElement.innerHTML = guessedNumber.join(" ");
        checkWin();
    } else {
        // Incorrect guess
        wrongGuesses++;
        hangmanElement.innerHTML = `Wrong guesses: ${wrongGuesses}/${maxWrongGuesses}`;
        checkLoss();
    }
}

function checkWin() {
    if (guessedNumber.join("") === selectedArticle) {
        messageElement.innerHTML = "Congratulations! You've correctly guessed the article number!";
        disableAlphabet();
    }
}

function checkLoss() {
    if (wrongGuesses >= maxWrongGuesses) {
        messageElement.innerHTML = `Game Over! The correct article number was "${selectedArticle}".`;
        disableAlphabet();
    }
}

function disableAlphabet() {
    const letters = document.querySelectorAll(".letter");
    letters.forEach(letter => letter.removeEventListener("click", guessNumber));
}

// Initialize game
resetGame();
