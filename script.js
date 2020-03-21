import { answers } from "./answers/index"

const mainButton = document.querySelector(".main-btn")
const resultAreaCZ = document.querySelector(".result-area-cz")

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
        resultAreaCZ.innerHTML = answer || ""
    } else {
        resultArea.innerHTML = "No results. Try again please."
    }
}

recorderCZ.onresult = ((event) => onResult(event, "cs"))
// recorderEN.onresult = ((event) => onResult(event))

const handleOnClick = () => {
    if (listening) {
        mainButton.innerHTML = "start"
    } else {
        mainButton.innerHTML = "stop"
        // recorderEN.start()
        recorderCZ.start()
    }

    listening = !listening
}

mainButton.addEventListener("click", handleOnClick)