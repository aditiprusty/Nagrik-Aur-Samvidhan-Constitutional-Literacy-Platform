const wheel = document.getElementById('wheel');
        const spinButton = document.getElementById('spinButton');
        const questionDiv = document.getElementById('question');
        const optionsDiv = document.getElementById('options');
        const feedbackDiv = document.getElementById('feedback');

        const questions = [
            {
                q: "What does Article 14 of the Indian Constitution guarantee?",
                o: ["Right to Equality", "Right to Freedom", "Right to Property", "Right to Education"],
                a: 0
            },
            {
                q: "Which of these is NOT a Fundamental Right?",
                o: ["Right to Freedom", "Right to Property", "Right against Exploitation", "Right to Constitutional Remedies"],
                a: 1
            },
            {
                q: "How many Fundamental Duties are there in the Indian Constitution?",
                o: ["9", "10", "11", "12"],
                a: 2
            },
            {
                q: "Which part of the Indian Constitution contains the Directive Principles of State Policy?",
                o: ["Part II", "Part III", "Part IV", "Part V"],
                a: 2
            },
            {
                q: "When were the Fundamental Duties added to the Indian Constitution?",
                o: ["1950", "1976", "1989", "2002"],
                a: 1
            }
        ];

        function getRandomQuestion() {
            return questions[Math.floor(Math.random() * questions.length)];
        }

        function displayQuestion(question) {
            questionDiv.textContent = question.q;
            optionsDiv.innerHTML = '';
            question.o.forEach((option, index) => {
                const button = document.createElement('button');
                button.textContent = option;
                button.addEventListener('click', () => checkAnswer(index, question.a));
                optionsDiv.appendChild(button);
            });
        }

        function checkAnswer(selectedIndex, correctIndex) {
            const options = optionsDiv.getElementsByTagName('button');
            for (let option of options) {
                option.disabled = true;
            }
            
            if (selectedIndex === correctIndex) {
                feedbackDiv.textContent = "Congratulations! That's correct!";
                feedbackDiv.className = 'correct';
            } else {
                feedbackDiv.textContent = `Sorry, that's incorrect. The correct answer is: ${questions[0].o[correctIndex]}`;
                feedbackDiv.className = 'incorrect';
            }
        }

        function spin() {
            const rotation = 3600 + Math.floor(Math.random() * 360);
            wheel.style.transform = `rotate(${rotation}deg)`;
            spinButton.disabled = true;

            setTimeout(() => {
                const question = getRandomQuestion();
                displayQuestion(question);
                localStorage.setItem('lastSpinTime', Date.now());
            }, 5000);
        }

        function checkSpinEligibility() {
            const lastSpinTime = localStorage.getItem('lastSpinTime');
            if (lastSpinTime) {
                const currentTime = Date.now();
                const timeDiff = currentTime - parseInt(lastSpinTime);
                const hoursSinceLastSpin = timeDiff / (1000 * 60 * 60);
                
                if (hoursSinceLastSpin < 24) {
                    spinButton.disabled = true;
                    const remainingHours = Math.ceil(24 - hoursSinceLastSpin);
                    spinButton.textContent = `Spin again in ${remainingHours} hours`;
                }
            }
        }

        spinButton.addEventListener('click', spin);
        checkSpinEligibility();