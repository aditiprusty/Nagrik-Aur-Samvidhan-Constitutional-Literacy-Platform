document.addEventListener("DOMContentLoaded", () => {
    const board = document.querySelector(".board");
    const rollDiceBtn = document.getElementById("rollDice");
    const diceResult = document.getElementById("diceResult");
    const playerPosition = document.getElementById("playerPosition");
    const questionPopup = document.getElementById("questionPopup");
    const questionText = document.getElementById("question");
    const correctBtn = document.getElementById("answerCorrect");
    const incorrectBtn = document.getElementById("answerIncorrect");
    const ans = document.getElementById("answer");
    const rollDiceAgainBtn = document.getElementById("rollDiceAgain");
    const playerToken = document.getElementById("playerToken");

    let currentPos = 1;

    const questions = [
    // Preamble
    { question: "What does the Preamble of the Constitution declare India as?", answer: "Correct" }, // Sovereign, Socialist, Secular, Democratic Republic
    { question: "Does the Preamble mention 'Justice' as one of its objectives?", answer: "Correct" },
    { question: "Is 'Liberty' mentioned in the Preamble?", answer: "Correct" },
    { question: "Does the Preamble refer to 'Equality of status and opportunity'?", answer: "Correct" },
    { question: "Is 'Fraternity' mentioned in the Preamble?", answer: "Correct" },
    { question: "Was the word 'Secular' in the original Preamble of the Constitution?", answer: "Incorrect" }, // Added by the 42nd Amendment
    { question: "Does the Preamble mention 'Union of States'?", answer: "Correct" },
    { question: "Is 'Unity and integrity of the Nation' a goal in the Preamble?", answer: "Correct" },
    { question: "Does the Preamble state that the Constitution was adopted by 'We, the People of India'?", answer: "Correct" },
    { question: "Is 'Justice - Social, Economic, and Political' one of the objectives of the Preamble?", answer: "Correct" },
    
    // Fundamental Rights - Right to Equality
    { question: "Is 'Equality before law' a Fundamental Right?", answer: "Correct" },
    { question: "Does the Constitution prohibit discrimination on the grounds of religion?", answer: "Correct" },
    { question: "Can the State make any law that denies equality before the law?", answer: "Incorrect" },
    { question: "Is 'Abolition of Untouchability' a Fundamental Right?", answer: "Correct" },
    { question: "Are titles such as 'Sir' allowed under the Indian Constitution?", answer: "Incorrect" }, // Titles are abolished
    { question: "Can the State make special provisions for women and children?", answer: "Correct" },
    { question: "Does the Constitution allow discrimination based on race?", answer: "Incorrect" },
    { question: "Is 'Equality of opportunity in matters of public employment' a Fundamental Right?", answer: "Correct" },
    { question: "Is 'Untouchability' mentioned in Article 17 of the Constitution?", answer: "Correct" },
    { question: "Can the State provide reservation in public employment for backward classes?", answer: "Correct" },

    // Fundamental Rights - Right to Freedom
    { question: "Is 'Freedom of Speech and Expression' a Fundamental Right?", answer: "Correct" },
    { question: "Can freedom of speech be restricted in the interest of the sovereignty of India?", answer: "Correct" },
    { question: "Is the right to form associations or unions guaranteed by the Constitution?", answer: "Correct" },
    { question: "Can the State impose restrictions on freedom of assembly for public order?", answer: "Correct" },
    { question: "Is 'Right to Education' a Fundamental Right?", answer: "Correct" },
    { question: "Is the right to practice any profession, or to carry on any occupation, trade, or business a Fundamental Right?", answer: "Correct" },
    { question: "Can the State restrict the movement of people in certain areas?", answer: "Correct" },
    { question: "Is the right to reside and settle in any part of India a Fundamental Right?", answer: "Correct" },
    { question: "Is 'Freedom of the Press' explicitly mentioned as a Fundamental Right?", answer: "Incorrect" }, // It is implied under Freedom of Speech
    { question: "Does the Constitution protect against double jeopardy (being tried twice for the same offence)?", answer: "Correct" },

    // Fundamental Rights - Right against Exploitation
    { question: "Is 'Prohibition of Human Trafficking' a Fundamental Right?", answer: "Correct" },
    { question: "Can children under the age of 14 work in factories?", answer: "Incorrect" }, // Prohibited
    { question: "Is forced labor (begar) allowed under the Constitution?", answer: "Incorrect" },
    { question: "Does the Constitution allow the State to impose compulsory service for public purposes?", answer: "Correct" },
    { question: "Is it a crime to employ children in hazardous industries?", answer: "Correct" },
    { question: "Can forced labor be justified under any circumstances in India?", answer: "Incorrect" },
    
    // Fundamental Rights - Right to Freedom of Religion
    { question: "Is 'Freedom of Conscience' a Fundamental Right?", answer: "Correct" },
    { question: "Can the State regulate religious practices for social welfare?", answer: "Correct" },
    { question: "Is 'Right to Manage Religious Affairs' a Fundamental Right?", answer: "Correct" },
    { question: "Can religious institutions receive government funding for religious promotion?", answer: "Incorrect" }, // They cannot be funded for religious promotion
    { question: "Can a person be forced to pay taxes for the promotion of any particular religion?", answer: "Incorrect" },
    { question: "Does the Constitution allow religious instruction in State-funded schools?", answer: "Incorrect" },
    { question: "Is the wearing of kirpans by Sikhs protected under the Constitution?", answer: "Correct" },
    { question: "Can the State make laws for social reform that affect religious practices?", answer: "Correct" },
    { question: "Does the Constitution allow religious worship in State-maintained institutions?", answer: "Incorrect" },

    // Fundamental Rights - Cultural and Educational Rights
    { question: "Can minorities establish and administer their own educational institutions?", answer: "Correct" },
    { question: "Does the Constitution protect the right of any section of citizens to conserve their culture?", answer: "Correct" },
    { question: "Can a minority's right to administer educational institutions be restricted?", answer: "Incorrect" },
    { question: "Is 'Protection of Interests of Minorities' a Fundamental Right?", answer: "Correct" },
    { question: "Does the Constitution allow the State to discriminate against minority institutions?", answer: "Incorrect" },
    { question: "Can the State compulsorily acquire property of minority educational institutions?", answer: "Correct" }, // With fair compensation
    { question: "Is the right to admission in educational institutions a Fundamental Right?", answer: "Correct" },

    // Fundamental Rights - Right to Constitutional Remedies
    { question: "Can citizens approach the Supreme Court if their Fundamental Rights are violated?", answer: "Correct" },
    { question: "Does the Supreme Court have the power to issue writs for the enforcement of Fundamental Rights?", answer: "Correct" },
    { question: "Can the right to move the Supreme Court for enforcement of Fundamental Rights be suspended?", answer: "Correct" }, // Only during a state of emergency
    { question: "Is 'Right to Constitutional Remedies' considered the heart and soul of the Constitution?", answer: "Correct" }, // Dr. B.R. Ambedkar's view
    { question: "Can Parliament empower lower courts to issue writs for enforcement of Fundamental Rights?", answer: "Correct" },
    
    // Directive Principles of State Policy
    { question: "Are the Directive Principles of State Policy enforceable by any court?", answer: "Incorrect" },
    { question: "Is 'Right to Work' mentioned in the Directive Principles of State Policy?", answer: "Correct" },
    { question: "Do the Directive Principles promote equal pay for equal work?", answer: "Correct" },
    { question: "Does the State have a duty to promote village panchayats?", answer: "Correct" },
    { question: "Is free legal aid a part of the Directive Principles of State Policy?", answer: "Correct" },
    { question: "Can the Directive Principles override Fundamental Rights?", answer: "Incorrect" },
    { question: "Is the protection of the environment mentioned in the Directive Principles?", answer: "Correct" },
    { question: "Does the Directive Principles advocate for the separation of judiciary from the executive?", answer: "Correct" },
    { question: "Is 'Uniform Civil Code' a Directive Principle of State Policy?", answer: "Correct" },
    { question: "Do the Directive Principles aim to raise the level of nutrition and public health?", answer: "Correct" },

    // Fundamental Duties
    { question: "Is it a duty of every citizen to uphold and protect the sovereignty of India?", answer: "Correct" },
    { question: "Is defending the country a Fundamental Duty of citizens?", answer: "Correct" },
    { question: "Are citizens required to respect the National Flag and National Anthem?", answer: "Correct" },
    { question: "Is promoting harmony and the spirit of brotherhood a Fundamental Duty?", answer: "Correct" },
    { question: "Does the Constitution mandate citizens to preserve the rich heritage of India's culture?", answer: "Correct" },
    { question: "Is it a Fundamental Duty to develop scientific temper and humanism?", answer: "Correct" },
    { question: "Are citizens required to safeguard public property and abjure violence?", answer: "Correct" },
    { question: "Is providing education to children a Fundamental Duty?", answer: "Correct" },
    { question: "Does the Constitution require citizens to protect the natural environment?", answer: "Correct" }
    ]


    function movePlayer(position) {
        const square = document.getElementById(`square-${position}`);
        const rect = square.getBoundingClientRect();
        const boardRect = board.getBoundingClientRect();

        // Calculate the offset of the square within the board
        const offsetX = rect.left - boardRect.left + (rect.width / 2) - (playerToken.offsetWidth / 2);
        const offsetY = rect.top - boardRect.top + (rect.height / 2) - (playerToken.offsetHeight / 2);

        // Move the token to the calculated position
        playerToken.style.left = `${offsetX}px`;
        playerToken.style.top = `${offsetY}px`;
    }

    rollDiceBtn.addEventListener("click", () => {
        ans.textContent = "";
        let roll = Math.floor(Math.random() * 6) + 1;
        diceResult.textContent = roll;
        correctBtn.disabled = false;
        incorrectBtn.disabled = false;
        questionPopup.classList.add("active");
        const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        questionText.textContent = randomQuestion.question;

        correctBtn.onclick = () => {
            if (randomQuestion.answer === "Correct") {
                currentPos += roll;
                if (currentPos >= 100) {
                    currentPos = 100;
                }
                playerPosition.textContent = currentPos;
                ans.textContent = "Correct Answer🥳";
            } else {
                currentPos -= roll;
                if (currentPos < 1) currentPos = 1;
                playerPosition.textContent = currentPos;
                ans.textContent = "Wrong Answer😓";
            }
            correctBtn.disabled = true;
            incorrectBtn.disabled = true;
            movePlayer(currentPos);
        };

        incorrectBtn.onclick = () => {
            if (randomQuestion.answer === "Incorrect") {
                currentPos += roll;
                if (currentPos >= 100) {
                    currentPos = 100;
                }
                playerPosition.textContent = currentPos;
                ans.textContent = "Correct Answer🥳";
            } else {
                currentPos -= roll;
                if (currentPos < 1) currentPos = 1;
                playerPosition.textContent = currentPos;
                ans.textContent = "Wrong Answer😓";
            }
            correctBtn.disabled = true;
            incorrectBtn.disabled = true;
            movePlayer(currentPos);
        };
    });

    rollDiceAgainBtn.addEventListener("click", () => {
        ans.textContent = "";
        let roll = Math.floor(Math.random() * 6) + 1;
        diceResult.textContent = roll;
        correctBtn.disabled = false;
        incorrectBtn.disabled = false;
        questionPopup.classList.add("active");
        const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        questionText.textContent = randomQuestion.question;

        correctBtn.onclick = () => {
            if (randomQuestion.answer === "Correct") {
                currentPos += roll;
                if (currentPos > 100) currentPos = 100;
                playerPosition.textContent = currentPos;
                ans.textContent = "Correct Answer🥳";
            } else {
                currentPos -= roll;
                if (currentPos < 1) currentPos = 1;
                playerPosition.textContent = currentPos;
                ans.textContent = "Wrong Answer😓";
            }
            correctBtn.disabled = true;
            incorrectBtn.disabled = true;
            movePlayer(currentPos);
        };

        incorrectBtn.onclick = () => {
            if (randomQuestion.answer === "Incorrect") {
                currentPos += roll;
                if (currentPos > 100) currentPos = 100;
                playerPosition.textContent = currentPos;
                ans.textContent = "Correct Answer🥳";
            } else {
                currentPos -= roll;
                if (currentPos < 1) currentPos = 1;
                playerPosition.textContent = currentPos;
                ans.textContent = "Wrong Answer😓";
            }
            correctBtn.disabled = true;
            incorrectBtn.disabled = true;
            movePlayer(currentPos);
        };
    });
});
