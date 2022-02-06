import React, { useCallback, useEffect, useState } from 'react';
import { IResultsState } from "../../types";
import GameBoard from "../GameBoard";
import GuessBar from "../GuessBar";
import wordList from '../lib/wordList.json';
import ResultsModal from "../ResultsModal";
import { genResultSquare } from "../Utils/genResultSquare";
const GameContainer = () => {

    const initialResultState = {
        open: false,
        message: "You won!",
        resultsSquare: ""
    }

    const [guesses, setGuesses] = useState<string[]>([]);
    const [answer, setAnswer] = useState<string>("");

    const [result, setResult] = useState<IResultsState>(initialResultState);

    const buildResultsMessage = (): string => {
        let status = "You lost!"
        let numGuesses = guesses.length;
        if (guesses.includes(answer)) {
            status = "You won!"
        }
        return `${status} You used ${numGuesses} guess${numGuesses !== 1 ? "es" : ""}. The correct word was ${answer.toUpperCase()}`
    }

    const buildResultsMessageCB = useCallback(buildResultsMessage, [guesses, answer])

    const addGuess = (guess: string) => {
        setGuesses([...guesses, guess])
    }

    useEffect(() => {
        if (guesses.length) {
            if (guesses[guesses.length - 1] === answer) {
                setResult({
                    open: true,
                    message: buildResultsMessageCB(),
                    resultsSquare: genResultSquare(guesses, answer)
                })
                return;
            }
            if (guesses.length === answer.length) {
                setResult({
                    open: true,
                    message: buildResultsMessageCB(),
                    resultsSquare: genResultSquare(guesses, answer)
                })
            }
        }
    }, [guesses, answer, buildResultsMessageCB])

    const genRandomIndex = (wordList: string[]) => {
        const n: number = Math.floor(Math.random() * wordList.length);
        return n;
    }

    useEffect(() => {
        let answer: string = wordList.wordList[genRandomIndex(wordList.wordList)];
        setAnswer(answer.toLowerCase())
    }, [])


    return (
        <>
            <ResultsModal open={result.open} result={result} guesses={guesses.length} answer={answer} />
            <GameBoard guesses={guesses} answer={answer} />
            <GuessBar addGuess={addGuess} guesses={guesses} answer={answer} />
        </>
    );
};

export default GameContainer;
