import { useCallback, useEffect, useState } from 'react';
import { IResultsState } from "../../types";
import GameBoard from "../GameBoard";
import GuessBar from "../GuessBar";
import Header from "../Header";
import wordList from '../lib/wordList.json';
import ResultsModal from "../ResultsModal";
import SettingsModal from "../SettingsModal";
import { genResultSquare } from "../Utils/genResultSquare";
import { setDailyWordIndex } from "../Utils/localStorage";
import { getWordListBasedOnDifficulty, getWordOfDayIndex } from "../Utils/wordOfDay";
const GameContainer = () => {

    const initialResultState = {
        open: false,
        message: "You won!",
        resultsSquare: "",
    }

    const [guesses, setGuesses] = useState<string[]>([]);
    const [answer, setAnswer] = useState<string>("");
    const [settingsOpen, setSettingsOpen] = useState<boolean>(false)

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
            if (guesses[guesses.length - 1] === answer || guesses.length === answer.length) {
                setResult({
                    open: true,
                    message: buildResultsMessageCB(),
                    resultsSquare: genResultSquare(guesses, answer)
                })
                return;
            }
        }
    }, [guesses, answer, buildResultsMessageCB])

    const genRandomIndex = (wordList: string[]) => {
        const n: number = Math.floor(Math.random() * wordList.length);
        return n;
    }

    const getSettingsFromLocalStorage = () => {
        const retrievedSettings = localStorage.getItem('wordleCloneSettings');
        let parsedSettings: any;
        if (retrievedSettings) {
            parsedSettings = JSON.parse(retrievedSettings);
        }
        if (parsedSettings) {
            return parsedSettings;
        }
    }

    useEffect(() => {
        let settings = getSettingsFromLocalStorage()
        let answer: string;
        let index: number;
        if (settings) {
            let difficulty = getWordListBasedOnDifficulty(settings.hardMode);
            if (settings.dailyWordChallenge) {
                index = getWordOfDayIndex();
                if (index === settings.dailyWordIndex) {
                    setResult({
                        open: true,
                        message: "You've already played today, try again tomorrow for a new word.",
                        resultsSquare: ""
                    })
                }
                setDailyWordIndex(index)
            }
            else {
                index = genRandomIndex((wordList as any)[difficulty])
            }
            answer = (wordList as any)[difficulty][index]
            setAnswer(answer.toLowerCase())
        }
        else {
            openSettings()
        }
    }, [])

    const openSettings = () => {
        setSettingsOpen(true)
    }

    const closeSettings = () => {
        setSettingsOpen(false)
    }


    return (
        <>
            <Header handleSettingsClick={openSettings} />
            <SettingsModal isOpen={settingsOpen} closeSettings={closeSettings} />
            <ResultsModal open={result.open} result={result} guesses={guesses.length} answer={answer} />
            <GameBoard guesses={guesses} answer={answer} addGuess={addGuess} />
            <GuessBar addGuess={addGuess} guesses={guesses} answer={answer} />
        </>
    );
};

export default GameContainer;
