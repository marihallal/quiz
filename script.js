const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const explainElement = document.getElementById('explain');
const grafElement = document.getElementById('grafico');
let shuffledQuestions, currentQuestionIndex;
let quizScore =0;

let img = document.createElement('img');
let parent = document.getElementById('media');
parent.append(img);

startButton.addEventListener('click', startGame);

nextButton.addEventListener('click' ,() => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() -0.5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
    quizScore = 0;
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    img.src = question.media;
    questionElement.innerHTML = question.question;
    question.answers.forEach((answer) => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
    explainElement.innerHTML = question.explain;
    grafElement.innerHTML = question.grafico;
}



function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    explainElement.classList.add('hide');
    img.classList.add('hide');
    grafElement.classList.add("hide");
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach((button) => {
        setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex +1) {
        nextButton.classList.remove("hide");
    } else {
        startButton.innerText = "Recomeçar";
        startButton.classList.remove("hide");
    }
    if(selectedButton.dataset = correct) {
        quizScore++;
    }
    explainElement.classList.remove('hide');
    grafElement.classList.remove("hide");
    document.getElementById('right-answers').innerHTML = quizScore;
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if(correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    };
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const questions = [
    {
        question: 'Entre 2008 e 2018 o percentual da população desnutrida no Brasil…',
        explain: "O percentual da população desnutrida no Brasil permaneceu em 2,5% durante os anos de 2008 e 2018. No mesmo período, a média mundial caiu de 10,3% para 8,9%",
        media: "grafico.png",
        grafico: "<iframe src='https://flo.uri.sh/visualisation/9690820/embed' title='Interactive or visual content' class='flourish-embed-iframe' frameborder='0' scrolling='yes' style='width:90%;height:500px;margin-left:4px;' sandbox='allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation'></iframe><div style='width:100%!;margin-top:4px!important;text-align:right!important;'><a class='flourish-credit' href='https://public.flourish.studio/visualisation/9690820/?utm_source=embed&utm_campaign=visualisation/9690820' target='_top' style='text-decoration:none!important'><img alt='Made with Flourish' src='https://public.flourish.studio/resources/made_with_flourish.svg' style='width:105px!important;height:16px!important;border:none!important;margin:0!important;'> </a></div>",
        answers : [
            { text: '...caiu pela metade', correct: false},
            { text: '...permaneceu estável', correct: true},
            { text: '...aumentou em 24,3%', correct: false},
            { text: '...aumentou em 43,8%', correct: false}
        ],
    },
    {
        question: 'Na comparação entre 2000 e 2020, o número de <b>mortes por desnutrição</b> entre crianças com menos de 1 ano…',
        explain: 'O Brasil conseguiu reduzir significativamente a morte de crianças por desnutrição nas duas últimas décadas. Em 2000, foram registradas 1.462 mortes de bebês com menos de um ano de idade. Vinte anos depois o número caiu para 289.',
        grafico: "<iframe src='https://flo.uri.sh/visualisation/9671655/embed' title='Interactive or visual content' class='flourish-embed-iframe' frameborder='0' scrolling='yes' style='width:90%;height:500px;margin-left:4px;' sandbox='allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation'></iframe><div style='width:100%!;margin-top:4px!important;text-align:right!important;'><a class='flourish-credit' href='https://public.flourish.studio/visualisation/9671655/?utm_source=embed&utm_campaign=visualisation/9671655' target='_top' style='text-decoration:none!important'><img alt='Made with Flourish' src='https://public.flourish.studio/resources/made_with_flourish.svg' style='width:105px!important;height:16px!important;border:none!important;margin:0!important;'> </a></div>",
        media: "grafico.png",
        answers: [
            { text: '...reduziu 80%', correct: true},
            { text: '...permaneceu estáveis', correct: false},
            { text: '...aumentou 4%', correct: false},
            { text: '...aumentou 42%', correct: false}
        ],
    },
    {
        question: 'Qual <b>faixa etária</b> concentra o maior número de mortes por desnutrição nos últimos 20 anos (2000 a 2020)?',
        explain: 'Ao contrário do que muitos pensam, os idosos são o grupo mais afetado pela desnutrição no Brasil. De acordo com o Sistema Único de Saúde, 46% das pessoas que morreram por desnutrição no período (2000-2020) tinham mais de 80 anos.',
        media: "grafico.png",
        grafico: "<iframe src='https://flo.uri.sh/visualisation/9656254/embed' title='Interactive or visual content' class='flourish-embed-iframe' frameborder='0' scrolling='yes' style='width:90%;height:500px;margin-left:4px;' sandbox='allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation'></iframe><div style='width:100%!;margin-top:4px!important;text-align:right!important;'><a class='flourish-credit' href='https://public.flourish.studio/visualisation/9656254/?utm_source=embed&utm_campaign=visualisation/9656254' target='_top' style='text-decoration:none!important'><img alt='Made with Flourish' src='https://public.flourish.studio/resources/made_with_flourish.svg' style='width:105px!important;height:16px!important;border:none!important;margin:0!important;'> </a></div>",
        answers : [
            { text: 'Crianças até 1 ano', correct: false},
            { text: 'Crianças entre 5 e 9 anos', correct: false},
            { text: 'Adultos entre 18 e 59 anos', correct: false},
            { text: 'Idosos com mais de 80 anos', correct: true}
        ],
    },
    {
        question: 'Qual o percentual de famílias Nordestinas e Sulistas, respectivamente, que afirmavam viver em <b>segurança alimentar</b> entre novembro e dezembro de 2020?',
        explain: "De acordo com a pesquisa 'Efeitos da pandemia na alimentação e na situação da segurança alimentar no Brasil', há uma grande desigualdade entre as regiões brasileiras quando o assunto é segurança alimentar. O Nordeste é o local onde há mais insegurança alimentar – estima-se que 73% dos habitantes estejam nessa situação. Em seguia vem o Norte (67,7%) e o Centro-Oeste. O Sudeste (53,5%) e o Sul (51,6%) são os que menos sofrem com falta de comida.",
        grafico: "<iframe src='https://flo.uri.sh/visualisation/9670339/embed' title='Interactive or visual content' class='flourish-embed-iframe' frameborder='0' scrolling='yes' style='width:90%;height:500px;margin-left:4px;' sandbox='allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation'></iframe><div style='width:100%!;margin-top:4px!important;text-align:right!important;'><a class='flourish-credit' href='https://public.flourish.studio/visualisation/9670339/?utm_source=embed&utm_campaign=visualisation/9670339' target='_top' style='text-decoration:none!important'><img alt='Made with Flourish' src='https://public.flourish.studio/resources/made_with_flourish.svg' style='width:105px!important;height:16px!important;border:none!important;margin:0!important;'> </a></div>",
        media: "grafico.png",
        answers : [
            { text: '40,8% e 60,2%', correct: false},
            { text: '26,9% e 48,4%', correct: true},
            { text: '12,1% e 35,3%', correct: false},
            { text: '62,9% e 70,1%', correct: false}
        ],
    },
    {
        question: "Entre 2000 e 2020, o número de morte de idosos (acima de 60 anos) por desnutrição...",
        explain: 'O número de morte por desnutrição entre idosos é grande e continua crescendo. Em 2020, eles foram 56,5% das vítimas de doenças relacionadas ao problema.',
        media: "grafico.png",
        grafico: "<iframe src='https://flo.uri.sh/visualisation/9689757/embed' title='Interactive or visual content' class='flourish-embed-iframe' frameborder='0' scrolling='yes' style='width:90%;height:500px;margin-left:4px;' sandbox='allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation'></iframe><div style='width:80%!;margin-top:4px!important;text-align:right!important;'><a class='flourish-credit' href='https://public.flourish.studio/visualisation/9689757/?utm_source=embed&utm_campaign=visualisation/9689757' target='_top' style='text-decoration:none!important'><img alt='Made with Flourish' src='https://public.flourish.studio/resources/made_with_flourish.svg' style='width:105px!important;height:16px!important;border:none!important;margin:0!important;'> </a></div>",
        answers : [
            { text: '...aumentou 20%', correct: false},
            { text: '...caiu 25%', correct: false},
            { text: '...aumentou 30%', correct: true},
            { text: '...permaneceu estável', correct: false}
        ],
    },
    {
        question: "Qual Estado tem o menor consumo de carne per capita no Brasil, segundo o IBGE?",
        explain: 'O Espírito Santo é o Estado que menos consome carne de acordo com a Pesquisa de Orçamentos Familiares de 2017/2018. Em média, cada cidadão come 15,62 Kg de carne no ano.',
        media: "grafico.png",
        grafico: "<iframe src='https://flo.uri.sh/visualisation/9694153/embed' title='Interactive or visual content' class='flourish-embed-iframe' frameborder='0' scrolling='yes' style='width:90%;height:500px;margin-left:4px;' sandbox='allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation'></iframe> <div style='width:80%!;margin-top:4px!important;text-align:right!important;'><a class='flourish-credit' href='https://public.flourish.studio/visualisation/9694153/?utm_source=embed&utm_campaign=visualisation/9694153' target='_top' style='text-decoration:none!important'><img alt='Made with Flourish' src='https://public.flourish.studio/resources/made_with_flourish.svg' style='width:105px!important;height:16px!important;border:none!important;margin:0!important;'> </a></div>",
        answers : [
            { text: 'Paraná', correct: false},
            { text: 'Distrito Federal', correct: false},
            { text: 'Tocantins', correct: false},
            { text: 'Espírito Santo', correct: true}
        ],
    },
]
