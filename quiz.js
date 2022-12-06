let currentquestion = 0

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'f6ebee82a0msh8f3f073cf6919aep19a727jsn791ff740db8b',
		'X-RapidAPI-Host': 'ases-quiz-api1.p.rapidapi.com'
	}
};



    async function getData(){
        const url1 = 'https://the-trivia-api.com/api/questions?categories=film_and_tv,food_and_drink,music,science&limit=10&region=IN&tags=marvel,dc,comics,video_games,the_internet,science,batman,cartoons,food,india,mcu,rap,religion,technology,young_adult'
        const url2 = 'https://animechan.vercel.app/api/random'
    
        const responses = await Promise.all([fetch(url1), fetch(url2)])
    
        const data1 = await responses[0].json()
        dataset = data1
        const data2 = await responses[1].json()
        
       const ans =  displayQuestion(data1)
        displayQuote(data2)
        checkAnswer(data1)
        // do what you want with data1 and data2 here
    }

    getData()



function displayQuote(data) {
    if(data.quote.length > 100) {
        fetch('https://animechan.vercel.app/api/random')
        .then(response => response.json())
        .then(data => {displayQuote(data)})
    } else {
    let quote = document.getElementById('quote')
    quote.innerHTML = ` ${data.quote} - ${data.character} `
    }
}

let dataset = null
 let scores = 0
let correct = null
function displayQuestion(data) {
    dataset = data
    let ques = data[currentquestion].question
    let options = data[currentquestion].incorrectAnswers
     correct = data[currentquestion].correctAnswer
    options.push(correct)
    options.sort()
   
    let question = document.getElementById('question')
    question.innerHTML = ` ${ques} `
    let option1 = document.getElementById('a_text')
    option1.innerHTML = ` ${options[0]} `
    let option2 = document.getElementById('b_text')
    option2.innerHTML = ` ${options[1]} `
    let option3 = document.getElementById('c_text')
    option3.innerHTML = ` ${options[2]} `
    let option4 = document.getElementById('d_text')
    option4.innerHTML = ` ${options[3]} `
    
}

let quesAns = []

function checkAnswer(data) {
    
    let sumbit = document.getElementById('submit')
sumbit.addEventListener('click', () => {
    const radio = document.querySelector('input[type=radio]:checked')
    
    const answer = document.getElementById(`${radio.id}_text`).innerHTML
    
    
    if(answer.trim() == data[currentquestion].correctAnswer) {
        
        scores += 1
        quesAns.push({question: data[currentquestion].question, Youranswer: answer,correctAnswer: data[currentquestion].correctAnswer, correct: true})
    } else {
        quesAns.push({question: data[currentquestion].question, Youranswer: answer,correctAnswer:data[currentquestion].correctAnswer ,correct: false})
    }
    if(currentquestion < 9) {
    currentquestion++
    displayQuestion(dataset)
    const quizNo = document.getElementById('quizNos')
    quizNo.innerHTML = ` ${currentquestion + 1} `
    radio.checked = false
    } else {
        
        
        const quizEl = document.getElementById('quiz')
        if(scores == 10) {
            quizEl.innerHTML = `<h1> You got ${scores} out of 10</h1><br><h2> You are a true anime fan 🔥🔥</h2>`
            const gifsData = gif('dance+memes')
            
        } else if(scores >= 7 && scores < 10) {
            quizEl.innerHTML = `<h1> You passed the quiz with ${scores} out of 10 </h1>`
            const gifsData = gif('hood+dance+memes')
            
        } else if(scores > 5 && scores < 7) {
            quizEl.innerHTML = `<h1> You passed the quiz with ${scores} out of 10 </h1>`
            const gifsData = gif('think+memes')
            
        } else if(scores > 2 && scores <= 5) {
            quizEl.innerHTML = `<h1> You failed the quiz with ${scores} out of 10 ☠️</h1>`
            const gifsData = gif('anime+loser+memes')
            
        }   
         else if(scores > 0 && scores <= 2) {
            quizEl.innerHTML = `<h1> You failed the quiz with ${scores} out of 10 ☠️</h1>`
            const gifsData = gif('sad+meme')
            
        }   
         else if(scores == 0) {
            quizEl.innerHTML = `<h1> You failed the quiz with ${scores} out of 10 ☠️</h1>`
            const gifsData = gif('dead+memes')
            
        }   
       
        createdivs(quesAns)
    }

})
}

const gif = async (what) => {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=detZlwGuDjwNl5ZBeZwS3jswkNJtQTPu&q=${what}+&limit=25&offset=0&rating=pg-13&lang=en`
    const response = await fetch(url)
    const data = await response.json()
    imgEl = document .createElement('img')
    imgEl.src = data.data[Math.floor(Math.random() * 25)].images.original.url
    const quizEl = document.getElementById('quiz')
    quizEl.appendChild(imgEl)
    imgEl.style.width = '100%'
    imgEl.style.textAlign = 'center'
    return data
}

let secondHtml = null

const createdivs = (data) => {
    const quizEl = document.getElementById('quiz')
    buttonRel = document.createElement('button')
    buttonAns = document.createElement('button')
    buttonRel.innerHTML = 'Reload'
    buttonRel.addEventListener('click', () => {
        location.reload()
    })
    quizEl.appendChild(buttonRel)
    buttonRel.classList.add('reload')
    buttonAns.innerHTML = 'Show Answers'
    buttonAns.addEventListener('click', () => {
       showans(quesAns)
})
    quizEl.appendChild(buttonAns)   
    buttonAns.classList.add('ans')  

}

const showans = (data) => {

    
    const anscontainer = document.getElementById('showAns')
  
    data.forEach((item,index) => {
        
        const divEL = document.createElement('div')
        divEL.classList.add('ansElement')
        
        const ques = document.createElement('p')
        ques.innerHTML = `Question ${index + 1}: ${item.question}`
        const Yourans = document.createElement('p')
        Yourans.innerHTML = `Your answer: ${item.Youranswer}`
        const ans = document.createElement('p')
        ans.innerHTML = `Correct Answer: ${item.correctAnswer}`
        const correct = document.createElement('p')
        if(item.correct) {
            correct.innerHTML = 'Correct'
            correct.style.color = 'green'
        } else {
            correct.innerHTML = 'Wrong'
            correct.style.color = 'red'
        }
        divEL.appendChild(ques)
        divEL.appendChild(Yourans)
        divEL.appendChild(ans)
        divEL.appendChild(correct)
        anscontainer.appendChild(divEL)
    })

}

