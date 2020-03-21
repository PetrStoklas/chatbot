import { answers } from "./answers/index.js"

const mainButton = document.querySelector(".main-btn")
const resultAreaCZ = document.querySelector(".result-area-cz")
const answerAreaCZ = document.querySelector(".answer-area-cz")

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
// const recorderEN = new SpeechRecognition()
const recorderCZ = new SpeechRecognition()


let listening = false

recorderCZ.continuous = true
// recorderEN.continuous = true
recorderCZ.lang = "cs"

recorderCZ.onspeechstart = (() => console.log('MLUVIS'))
// recorderEN.onspeechstart = (() => console.log('SPEAKING'))

recorderCZ.onspeechend = (() => console.log('PRESTAL MLUVIT'))
// recorderEN.onspeechend = (() => console.log('STOPPED SPEAKING'))

const onResult = (event, lang = "en") => {
    const resultArea = lang === "en" ? resultAreaEN : resultAreaCZ

    if (event && event.results[0] && event.results[0][0]) {
        const textRecognised = event.results[0][0].transcript
        resultArea.innerHTML = textRecognised
        const answer = answers(textRecognised)
        answerAreaCZ.innerHTML = answer || ""
    } else {
        resultArea.innerHTML = "No results. Try again please."
    }

    mainButton.innerHTML = "start"
    listening = !listening
}

recorderCZ.onresult = ((event) => onResult(event, "cs"))
// recorderEN.onresult = ((event) => onResult(event))

const handleOnClick = () => {
    console.log('click')
    if (listening) {
        mainButton.innerHTML = "start"
        mainButton.bgColor = "green"
    } else {
        mainButton.innerHTML = "stop"
        mainButton.bgColor = "red"
        // recorderEN.start()
        recorderCZ.start()
    }

    listening = !listening
}

mainButton.addEventListener("click", handleOnClick)