const questions = [
  {
    question:
      'What is included in the definition of "the State" as per the Constitution?',
    options: [
      "a) Only the Government of India",
      "b) The Government and Parliament of India, the Government and Legislature of each State, and all local or other authorities within the territory of India or under the control of the Government of India",
      "c) Only the Parliament of India",
      "d) Only the local authorities",
    ],
    correctAnswer: "b",
  },
  {
    question:
      "According to Article 13, what happens to laws that are inconsistent with the provisions of the Constitution?",
    options: [
      "a) They remain in force",
      "b) They are void to the extent of their inconsistency",
      "c) They are automatically amended",
      "d) They are subject to review by the Supreme Court",
    ],
    correctAnswer: "b",
  },
  {
    question: "Article 14 guarantees which of the following rights?",
    options: [
      "a) Right to equality before the law and equal protection of the laws",
      "b) Right to freedom of speech",
      "c) Right to religious freedom",
      "d) Right to form associations",
    ],
    correctAnswer: "a",
  },
  {
    question:
      "Under Article 15, the State is prohibited from discriminating against any citizen on the grounds of which of the following?",
    options: [
      "a) Education level",
      "b) Religion, race, caste, sex, place of birth",
      "c) Economic status",
      "d) Physical appearance",
    ],
    correctAnswer: "b",
  },
  {
    question:
      "Which article in the Constitution deals with the abolition of 'Untouchability'?",
    options: [
      "a)  Article 17",
      "b) Article 19",
      "c) Article 21",
      "d) Article 24",
    ],
    correctAnswer: "a",
  },
  {
    question:
      "According to Article 19, which of the following is NOT a right conferred to citizens?",
    options: [
      "a) Right to freedom of speech and expression",
      "b) Right to assemble peacefully and without arms",
      "c) Right to bear arms",
      "d) Right to move freely throughout the territory of India",
    ],
    correctAnswer: "c",
  },
  {
    question:
      "What is the minimum age below which a child cannot be employed in any factory or mine as per Article 24?",
    options: ["a) 10 years", "b) 12 years", "c) 14 years", "d) 16 years"],
    correctAnswer: "c",
  },
  {
    question: "Article 25 provides all persons with the freedom to do what?",
    options: [
      "a) Profess, practice, and propagate religion",
      "b) Form political parties",
      "c) Own property",
      "d) Vote in elections",
    ],
    correctAnswer: "a",
  },
  {
    question:
      "Which of the following articles states that no religious instruction shall be provided in any educational institution wholly maintained out of State funds?",
    options: [
      "a) Article 25",
      "b) Article 26",
      "c) Article 27",
      "d) Article 28",
    ],
    correctAnswer: "d",
  },
  {
    question: "What does Article 30 guarantee to minorities?",
    options: [
      "a) Right to vote",
      "b) Right to establish and administer educational institutions of their choice",
      "c) Right to freedom of speech",
      "d) Right to free legal aid",
    ],
    correctAnswer: "b",
  },
];

let currentQuestionIndex = 0;
let score = 0;
let shuffledQuestions = [];

function shuffleQuestions() {
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
}

function loadQuestion(index) {
  const quizContainer = document.getElementById("quiz-container");
  quizContainer.innerHTML = "";

  const questionObj = shuffledQuestions[index];
  const questionElement = document.createElement("div");
  questionElement.className = "question active";
  questionElement.innerHTML = `
        <p>${questionObj.question}</p>
        ${questionObj.options
          .map(
            (option, i) => `
            <label><input type="radio" name="answer" value="${String.fromCharCode(
              97 + i
            )}"> ${option}</label>
        `
          )
          .join("")}
    `;
  quizContainer.appendChild(questionElement);
}

function nextQuestion() {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');
  if (selectedAnswer) {
    if (
      selectedAnswer.value ===
      shuffledQuestions[currentQuestionIndex].correctAnswer
    ) {
      score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
      loadQuestion(currentQuestionIndex);
    } else {
      showResult();
    }
  } else {
    alert("Please select an answer before proceeding.");
  }
}

function showResult() {
  const result = document.getElementById("result");
  result.textContent = `You got ${score} out of ${shuffledQuestions.length} correct.`;
  result.style.display = "block";
  document.getElementById("next-button").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  shuffleQuestions();
  loadQuestion(currentQuestionIndex);
});
