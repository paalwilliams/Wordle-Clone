import React, { useEffect, useState } from 'react';
import GameBoard from "../GameBoard";
import GuessBar from "../GuessBar";
import Keyboard from "../Keyboard";
import wordList from '../lib/wordList.json';
import ResultsModal from "../ResultsModal";
import { getDailyWord, setDailyWord } from "../Utils/localStorage";
const GameContainer = () => {

    const initialResultState = {
        open: false,
        message: "You won!"
    }

    const buildResultsMessage = () => {
        let status = "You lost!"
        let numGuesses = guesses.length;
        if (guesses.includes(answer)) {
            status = "You won!"
        }
        return `${status}. You used ${numGuesses} guesses.`
    }


    const [guesses, setGuesses] = useState<string[]>([]);
    const [answer, setAnswer] = useState<string>("");

    const [result, setResult] = useState<any>(initialResultState);

    const addGuess = (guess: string) => {
        setGuesses([...guesses, guess])
    }

    useEffect(() => {
        if (guesses.length === 5) {
            setResult({
                open: true,
                message: buildResultsMessage()
            })
        }
    }, [guesses])

    const genRandomIndex = (wordList: string[]) => {
        const n = Math.floor(Math.random() * wordList.length);
        return n
    }

    useEffect(() => {
        let answer = wordList.wordList[genRandomIndex(wordList.wordList)];
        setAnswer(answer)
    }, [])


    return (
        <>
            <ResultsModal open={result.open} result={result} />
            <GameBoard guesses={guesses} answer={answer} />
            <GuessBar addGuess={addGuess} />
            <Keyboard guesses={guesses} answer={answer} />
        </>
    );
};

export default GameContainer;
