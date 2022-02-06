export interface IGameBoardProps {
    guesses: string[];
    answer: string
}

export interface IGameBoardRowProps {
    guess?: string,
    answer: string
}

export interface IResultsState {
    open: boolean,
    message: string,
    resultsSquare: string
}

export interface IGuessState {
    [key: string]: string,
}