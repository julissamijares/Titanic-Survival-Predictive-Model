const questionDisplay = document.querySelector('#questions')
const answerDisplay = document.querySelector('#answer')
const nextButton = document.createElement('button'); // Create a button for navigating to the next question
nextButton.textContent = 'Next';
nextButton.addEventListener('click', showNextQuestion);


const questions = [
    {
       id: 0,
       text: "Pick a Gender:",
       answers: [
           {
               text: "Male",
               image: "https://images.entertainment.ie/uploads/2018/11/07112156/jack-dawson-titanic.jpg?w=1280&h=768&q=high"            
           },
           {
               text: "Female",
               image: "https://i.pinimg.com/originals/7a/e9/52/7ae9527d309330d7e778bfd9ec9967c6.jpg"
           }
       ]
    },
    {
        id: 1,
        text: "Pick a Title:",
        answers: [
            {
                text: "Mr",
                image: "https://media.distractify.com/brand-img/PVb8fb4pG/0x0/titanic-jonathan-hyde-1675958618226.jpg"
            },
            {
                text: "Mrs",
                image: "https://media.distractify.com/brand-img/OVJb737o0/0x0/titanic-kathy-bates-1675958460664.jpg"
            },
            {
                text: "Miss",
                image: "https://www.thesun.co.uk/wp-content/uploads/2017/01/nintchdbpict0002934722341.jpg"
            },
            {
                text: "Master",
                image: "https://hips.hearstapps.com/hmg-prod/images/irishboy1-1510178307.jpg"
            }
        ]
    },
    {
        id: 2,
        text: "Pick a Economic Class:",
        answers: [
            {
                text: "1st Class = Upper",
                image: "https://dreamstobecome.com/wp-content/uploads/2016/02/12376545323_d588231669_b.jpg"
            },
            {
                text: "2nd Class = Middle",
                image: "https://i.pinimg.com/originals/36/1b/b6/361bb683ce8aa92f12bfcc65b9384948.jpg"
            },
            {
                text: "3rd Class = Lower",
                image: "https://imgix.ranker.com/list_img_v2/2266/2802266/original/what-was-third-class-like-on-the-titanic"
            }
        ]
    },
    {
        id: 3,
        text: "Embarkment Point:",
        answers: [
            {
                text: "Cherbourg",
                image: "https://mahlerfoundation.org/wp-content/uploads/2016/05/terminal1.JPG"
            },
            {
                text: "Queenstown",
                image: "https://i.ytimg.com/vi/yT-lLl2i3_w/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDaJCh4zeCTwBCqmf-slmSLnp171g"
            },
            {
                text: "Southampton",
                image: "https://www.gpsmycity.com/img/gd/4819.jpg"
            }
        ]
    } 
];


// need to have a default answer to compensate for lack of combination data

let currentQuestionIndex = 0
const chosenAnswers = []

function populateQuestion() {
    const question = questions[currentQuestionIndex];

    // Clear previous content in questionDisplay
    questionDisplay.innerHTML = '';

    const titleBlock = document.createElement('div');
    titleBlock.id = question.id;
    titleBlock.classList.add('title-block');
    const titleHeading = document.createElement('h2');
    titleHeading.textContent = question.text;
    titleBlock.append(titleHeading);
    questionDisplay.append(titleBlock);

    const answersBlock = document.createElement('div');
    answersBlock.id = question.id + "-questions";
    answersBlock.classList.add('answer-options');

    question.answers.forEach(answer => {
        const answerBlock = document.createElement('div');
        answerBlock.classList.add('answer-block');
        const answerImage = document.createElement('img');
        answerImage.setAttribute('src', answer.image);
        answerImage.setAttribute('alt', answer.text);

        const answerTitle = document.createElement('h3');
        answerTitle.textContent = answer.text;

        answerBlock.append(answerImage, answerTitle);
        answerBlock.addEventListener('click', () => handleClick(answer.text)); // Use answer text for simplicity

        answersBlock.append(answerBlock);
    });

    questionDisplay.append(answersBlock);

    // Filter available answers for the second question based on the first question's choice
    if (currentQuestionIndex === 1) {
        const previousAnswer = chosenAnswers[0]; // Get the answer from the first question
        const filteredAnswers = question.answers.filter(answer => {
            if (previousAnswer === "Male") {
                return answer.text === "Mr" || answer.text === "Master";
            } else if (previousAnswer === "Female") {
                return answer.text === "Mrs" || answer.text === "Miss";
            }
            return true; // Return all options if no filter is needed
        });

        // Clear previous content in answersBlock
        answersBlock.innerHTML = '';

        filteredAnswers.forEach(answer => {
            const answerBlock = document.createElement('div');
            answerBlock.classList.add('answer-block');
            const answerImage = document.createElement('img');
            answerImage.setAttribute('src', answer.image);
            answerImage.setAttribute('alt', answer.text);

            const answerTitle = document.createElement('h3');
            answerTitle.textContent = answer.text;

            answerBlock.append(answerImage, answerTitle);
            answerBlock.addEventListener('click', () => handleClick(answer.text));

            answersBlock.append(answerBlock);
        });

        questionDisplay.append(answersBlock);
    }
}

populateQuestion();



function handleClick(chosenAnswer) {
    chosenAnswers.push(chosenAnswer);
    showNextQuestion();
}


function showNextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        populateQuestion();
    } else {
        // All questions answered, show result
        showAnswer();
    }
}

const userAnswers = {};


const answers = [
    {
        combination: [
            ["Female", "Mrs", "1st Class = Upper", "Cherbourg"],
            ["Female", "Mrs", "1st Class = Upper", "Queenstown"],
            ["Female", "Mrs", "1st Class = Upper", "Southampton"],
            ["Female", "Miss", "1st Class = Upper", "Cherbourg"],
            ["Female", "Miss", "1st Class = Upper", "Queenstown"],
            ["Female", "Miss", "1st Class = Upper", "Southampton"],
            ["Female", "Mrs", "2nd Class = Middle", "Cherbourg"],
            ["Female", "Mrs", "2nd Class = Middle", "Queenstown"],
            ["Female", "Mrs", "2nd Class = Middle", "Southampton"],
            ["Female", "Miss", "2nd Class = Middle", "Cherbourg"],
            ["Female", "Miss", "2nd Class = Middle", "Queenstown"],
            ["Female", "Miss", "2nd Class = Middle", "Southampton"],
            ["Male", "Mr", "1st Class = Upper", "Cherbourg"],
            ["Male", "Mr", "1st Class = Upper", "Queenstown"],
            ["Male", "Mr", "1st Class = Upper", "Southampton"],
            ["Male", "Master", "1st Class = Upper", "Cherbourg"],
            ["Male", "Master", "1st Class = Upper", "Queenstown"],
            ["Male", "Master", "1st Class = Upper", "Southampton"]
        ],
        text: "Survived",
        image: "https://www.denverpost.com/wp-content/uploads/2016/05/20120316__titanic-film-1p1.jpg?w=600",
        alt: "Survived"
    },
    {
        combination: [
            ["Male", "Mr", "2nd Class = Middle", "Cherbourg"],
            ["Male", "Mr", "2nd Class = Middle", "Queenstown"],
            ["Male", "Mr", "2nd Class = Middle", "Southampton"],
            ["Male", "Master", "2nd Class = Middle", "Cherbourg"],
            ["Male", "Master", "2nd Class = Middle", "Queenstown"],
            ["Male", "Master", "2nd Class = Middle", "Southampton"],
            ["Male", "Mr", "3rd Class = Lower", "Cherbourg"],
            ["Male", "Mr", "3rd Class = Lower", "Queenstown"],
            ["Male", "Mr", "3rd Class = Lower", "Southampton"],
            ["Male", "Master", "3rd Class = Lower", "Cherbourg"],
            ["Male", "Master", "3rd Class = Lower", "Queenstown"],
            ["Male", "Master", "3rd Class = Lower", "Southampton"],
            ["Female", "Mrs", "3rd Class = Lower", "Cherbourg"],
            ["Female", "Mrs", "3rd Class = Lower", "Queenstown"],
            ["Female", "Mrs", "3rd Class = Lower", "Southampton"],
            ["Female", "Miss", "3rd Class = Lower", "Cherbourg"],
            ["Female", "Miss", "3rd Class = Lower", "Queenstown"],
            ["Female", "Miss", "3rd Class = Lower", "Southampton"]
        ],
        text: "Did not Survive",
        image: "https://i.pinimg.com/originals/6c/a4/40/6ca440a7fdf5619b962acbd4a451771c.jpg",
        alt: "Did not Survive"
    }
];


// Function to show the answer based on whether the passenger survived or not
function showAnswer() {
    let result = answers[0]; // Default to the first answer object if no match is found
    const chosenSet = new Set(chosenAnswers); // Set of chosen answers

    // Loop through each answer object in the 'answers' array
    for (const answer of answers) {
        let combinationMatches = true; // Assume all elements in the combination match

        // Check if each element in the combination array is in the chosen answers
        for (const item of answer.combination) {
            if (!chosenSet.has(item)) {
                combinationMatches = false;
                break;
            }
        }

        // If all elements in the combination match the chosen answers, set the result
        if (combinationMatches) {
            result = answer;
            break; // Exit the loop early since a match is found
        }
    }

    // Hide the questions section
    questionDisplay.style.display = 'none';

    // Create and display the result block
    const answerBlock = document.createElement('div');
    // Example: Handle touch events in addition to click events
    answerBlock.addEventListener('touchstart', () => handleClick(answer.text));
    answerBlock.classList.add('result-block');
    const answerTitle = document.createElement('h3');
    answerTitle.textContent = result.text;
    const answerImage = document.createElement('img');
    answerImage.setAttribute('src', result.image);
    answerImage.setAttribute('alt', result.alt);

    answerBlock.append(answerTitle, answerImage);
    answerDisplay.innerHTML = ''; // Clear previous content
    answerDisplay.append(answerBlock);

    // Apply corresponding effects based on the result
    if (result.text === "Did not Survive") {
        applyRainEffect(); // Apply rain effect
        document.body.classList.add('not-survived-page'); // Add custom class for styling
    } else if (result.text === "Survived") {
        createConfetti(); // Apply confetti effect
        document.body.classList.add('survived-page'); // Add custom class for styling
    }
}




const disableQuestionBlock = (questionId, chosenAnswer) => {
    const currentQuestionBlock = document.getElementById(questionId + "-questions");

    if (currentQuestionBlock) {
        // If it's a clicker option question
        Array.from(currentQuestionBlock.children).forEach(block => {
            if (block.children.item(1).innerText !== chosenAnswer) {
                block.style.opacity = "50%";
            }
        });
    } else {
        // If it's an input field question, disable the input field
        const inputBlock = document.getElementById(questionId);
        if (inputBlock) {
            inputBlock.querySelector('input').disabled = true;
        }
    }
};


// Function to restart the quiz by refreshing the page
const restartQuiz = () => {
    location.reload();
};

// Event listener for the restart button
document.getElementById('restartButton').addEventListener('click', restartQuiz);


// Function to apply rain effect dynamically
function applyRainEffect() {
    const rainContainer = document.createElement('div');
    rainContainer.classList.add('rain-container');

    document.body.appendChild(rainContainer);

    const droplets = 500; // Number of raindrops

    for (let r = 0; r < droplets; r++) {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const o = Math.random() * 0.8 + 0.2; // Opacity between 0.2 and 1
        const a = Math.random() * 0.5 + 0.5; // Animation duration between 0.5 and 1 seconds
        const d = (Math.random() * 2) - 1; // Random delay for animation
        const s = Math.random(); // Scale for raindrop size

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'rain__drop');
        svg.setAttribute('viewBox', '0 0 5 50');
        svg.style.setProperty('--x', x);
        svg.style.setProperty('--y', y);
        svg.style.setProperty('--o', o);
        svg.style.setProperty('--a', a);
        svg.style.setProperty('--d', d);
        svg.style.setProperty('--s', s);

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('stroke', 'none');
        path.setAttribute('d', 'M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z');

        svg.appendChild(path);
        rainContainer.appendChild(svg);
    }
}


function createConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.classList.add('confetti-container');

    const colors = ['#9b59b6', '#3498db', '#e74c3c', '#f39c12', '#2ecc71']; // Array of colors
    const shapes = ['confetti--square', 'confetti--triangle', 'confetti--star']; // Array of shapes

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');

        // Randomly select color and shape
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
        
        confetti.classList.add(randomShape);
        confetti.style.backgroundColor = randomColor;
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
        confettiContainer.appendChild(confetti);
    }

    document.body.appendChild(confettiContainer);
}


