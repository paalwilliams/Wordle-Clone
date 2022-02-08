/*
    Props Interface Declaration for Project Components
*/

export interface IGameBoardProps {
    guesses: string[];
    answer: string
    addGuess: Function
}

export interface IGameBoardRowProps {
    guess?: string,
    answer: string
}

export interface IResultsModalProps {
    open: boolean,
    result: any,
    guesses: number,
    answer: string,
}

export interface IGuessGridProps {
    addGuess: Function,
    guesses: string[],
    answer: string
}

export interface IKeyboardProps {
    guesses: string[],
    answer: string,
    handleKeyClick: (char: string) => void,
    submitFunc: () => void,
    handleBackspace: (e: (KeyboardEvent | React.MouseEvent<HTMLDivElement, MouseEvent>)) => void
}

export interface IWordleNotifBarProps {
    message: string,
    duration: number
}


/*
    Interface Declaration for Project State
*/

export interface IResultsState {
    open: boolean,
    message: string,
    resultsSquare: string
}

export interface IGuessState {
    [key: string]: string,
}
