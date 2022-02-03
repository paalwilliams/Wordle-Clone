export const genResultSquare = (guesses: string[], answer: string) => {
    const gb = "🟩";
    const bb = "⬛";
    const ob = "🟧";

    let resultText = ""

    for (let word of guesses) {
        var answerArr = answer.toLowerCase().split('');
        var wordArr = word.toLowerCase().split('');
        wordArr.forEach((char, index) => {
            if (answerArr[index] == char) {
                resultText += gb;
            } else if (answerArr.indexOf(char) >= 0) {
                resultText += ob;
            } else {
                resultText += bb
            }

        })
        resultText += "\n"
    }
    // console.log(resultText)
    return resultText;
}