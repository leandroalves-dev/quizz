const questions = [
  {
    "titulo": "Quiz sobre Maceió",
    "perguntas": [
      {
        "pergunta": "Qual é a capital de Alagoas?",
        "opcoes": [
          "Recife",
          "Salvador",
          "Maceió",
          "Aracaju"
        ],
        "resposta": "Maceió"
      },
      {
        "pergunta": "Qual é a famosa praia de Maceió conhecida pelas suas águas claras e piscinas naturais?",
        "opcoes": [
          "Praia do Francês",
          "Praia de Pajuçara",
          "Praia de Jatiúca",
          "Praia de Ponta Verde"
        ],
        "resposta": "Praia de Pajuçara"
      },
      {
        "pergunta": "Qual é o nome do famoso mercado de artesanato em Maceió?",
        "opcoes": [
          "Mercado Central",
          "Feira de Artesanato",
          "Mercado das Artes",
          "Feirinha de Pajuçara"
        ],
        "resposta": "Feirinha de Pajuçara"
      },
      {
        "pergunta": "Qual é o nome da lagoa localizada em Maceió, conhecida por suas águas de cor azul turquesa?",
        "opcoes": [
          "Lagoa Manguaba",
          "Lagoa do Mundaú",
          "Lagoa da Anta",
          "Lagoa da Pajuçara"
        ],
        "resposta": "Lagoa do Mundaú"
      },
      {
        "pergunta": "Qual é o nome do bairro histórico em Maceió, conhecido por suas construções coloniais e ruas de paralelepípedo?",
        "opcoes": [
          "Jaraguá",
          "Farol",
          "Ponta Grossa",
          "Cruz das Almas"
        ],
        "resposta": "Jaraguá"
      }
    ]
  }
];

const container = document.querySelector('.container');
const titleQuizz = document.querySelector('.title-quizz');
const contentQuizz = document.querySelector('.content-quizz');
const quizz = document.querySelector('.quizz');
const contentOptions = document.querySelector('.content-options');
const respostas = document.querySelector('.respostas');
const contentScore = document.querySelector('.content-score');

let actual = 0;
let points = 0;
let indx = '';

function init(){    
    createQuestion(0);
}

function createQuestion(i){ 

	const buttons = respostas.querySelectorAll('button');
	buttons.forEach(function(btn){
		btn.remove();
	});

    const titleDoQuiz = document.querySelector('#titleDoQuiz');
    titleDoQuiz.textContent = questions[0].titulo;

	const qtdaPerguntas = titleQuizz.querySelector('.qtdaPerguntas');
	qtdaPerguntas.textContent = i + 1;

	const totalPerguntas = titleQuizz.querySelector('.totalPerguntas');
	totalPerguntas.textContent = questions[0].perguntas.length;

	const quizz = contentQuizz.querySelector('.quizz');
    quizz.textContent = questions[0].perguntas[i].pergunta;

	questions[0].perguntas[i].opcoes.forEach(function(items){

		const buttonClone = document.querySelector('.template-option').cloneNode('true');
		const textAnswer = buttonClone.querySelector('.text');
		textAnswer.textContent = items;

		buttonClone.classList.remove('hide');
		buttonClone.classList.remove('template-option');

		buttonClone.setAttribute('data-response', items);

		respostas.appendChild(buttonClone);
		answersRandom();
		
		indx = i;

		buttonClone.addEventListener('click', function(){
			checkAnswer(this, indx);
		});
		
	});

	actual++;
}

function answersRandom(){

	const buttons = respostas.querySelectorAll('button');
	const buttonRandom = [...buttons];

	buttonRandom.sort( () => {
		return Math.random() - 0.5;
	})
	buttonRandom.forEach( button => {
		respostas.appendChild(button)
	});
}

function checkAnswer(btn, indx){
	
	const buttons = respostas.querySelectorAll('button');

	buttons.forEach(function(button){
		button.classList.add('active');
		if( button.getAttribute(`data-response`) === questions[0].perguntas[indx].resposta ){
			button.classList.add('check-ok');
			if( btn === button ){
				points++;
				//console.log(points);
			}
		}else{
			
			button.classList.add('check-error');
		}
		
	});

	showAnswers();

}

function showAnswers(){

	setTimeout( function() {

		if( actual >= questions[0].perguntas.length ){
			showSucessMessage();
			return;
		}

		createQuestion(actual);

	}, 1200);

}

function showSucessMessage(){
	
	hideBlocks();

	const score = ((points / questions[0].perguntas.length) * 100).toFixed(2);
	const percent = contentScore.querySelector('.percent');
	percent.textContent = `${score}%`;

	const titleFinish = contentScore.querySelector('h2');

	if( +score >= 100 ){
		titleFinish.textContent = 'UAAUUU! Você gosta mesmo de Maceió hein :)';
		percent.classList.add('alto');
	}else if( +score >= 50 ){
		titleFinish.textContent = 'Parabéns!!!';
	}else if( +score <= 0 ){
		titleFinish.textContent = 'Xiiii! Você precisa conhecer Maceió URGENTE!!!';
		percent.classList.add('baixo');
	}else{
		titleFinish.textContent = 'Você precisa vir mais vezes à Maceió!';
	}

	const correctAnswers = contentScore.querySelector('#correct-answers');
	correctAnswers.textContent = points;

	const questionsQty = contentScore.querySelector('#questions-qty');
	questionsQty.textContent = questions[0].perguntas.length;

}

function hideBlocks(){
	contentScore.classList.toggle('hide');
    titleQuizz.classList.toggle('hide');
    quizz.classList.toggle('hide');
    contentOptions.classList.toggle('hide');

	if( !contentOptions.classList.contains('paddingNone') && !contentQuizz.classList.contains('paddingNone') ){
		container.classList.add('paddingNone');
		contentQuizz.classList.add('paddingNone');
	}else{
		container.classList.remove('paddingNone');
		contentQuizz.classList.remove('paddingNone');
	}
}

const restart = document.querySelector('#restart');

restart.addEventListener('click', () =>{

	actual = 0;
	points = 0;
    hideBlocks();	
	init();
});

init();