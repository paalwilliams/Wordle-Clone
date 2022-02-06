import { Box, Grid, Typography } from "@mui/material";
import { useState, useRef, useEffect, ChangeEvent, HtmlHTMLAttributes } from 'react';
import Keyboard from "../Keyboard";
import { v4 as uuid } from 'uuid'
import WordleNotifbar from "../WordleNotifBar";
import Loading from "../Utils/Loading";
import { IGuessState } from "../../types";

interface IGuessGridProps {
    addGuess: Function,
    guesses: any,
    answer: any
}
const GuessGrid = (props: IGuessGridProps) => {

    const { addGuess, guesses, answer } = props;
    let [notif, setNotif] = useState<boolean>(false);
    let [refIndex, setRefIndex] = useState(0);

    const initialState = {
        "0": "",
        "1": "",
        "2": "",
        "3": "",
        "4": "",
        "5": "",
        "6": "",
    }

    useEffect(() => {
        // window.addEventListener('keydown', handleKeyEvent)
    }, [])


    const [guess, setGuess] = useState<IGuessState>(initialState);
    const styles = {
        input: {
            border: ".5px solid white",
            height: "50px",
            display: "flex",
            borderRadius: "5px",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "",
            color: "white",
        },
        container: {
            minWidth: "300px",
            width: "30%",
            maxWidth: "450px",
            margin: "0 auto",
            marginTop: "30px",
        },
        box: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "",
            minWidth: "300px",
            width: "30%",
            maxWidth: "450px",
            margin: "0 auto",
            marginTop: "20px",
        }
    }

    const handleVirtualKeyClick = (e: any): void => {

        e.preventDefault();
        if (refIndex === answer.length) {
            return;
        }
        setGuess({
            ...guess,
            [refIndex]: e.target.textContent.toUpperCase()
        })
        let newRefIndex = refIndex + 1;
        setRefIndex(newRefIndex);
    }

    const handleBackspace = (e: MouseEvent): void => {
        e.preventDefault();
        if (refIndex > 0) {
            setGuess({
                ...guess,
                [refIndex - 1]: ""
            })
            let newRefIndex = refIndex - 1;
            setRefIndex(newRefIndex);
        }

    }

    const handleSubmit = (): void => {
        let word = ""
        Object.entries(guess).forEach((x: any) => {
            word += x[1];
        })
        if (word.length === answer.length) {
            addGuess(word.toLowerCase())
            setGuess(initialState);
            setRefIndex(0)
        }
        else {
            setNotif(true);
            setTimeout(() => {
                setNotif(false);
            }, 1000)
        }
    }
    if (answer) {
        return <>
            <Grid container sx={styles.container} >
                {answer.split('').map((_: string, index: number) => {
                    return (<Grid item xs={12 / answer.length} sx={styles.input} key={uuid()}>
                        <Box>
                            <Typography>
                                {guess[index]}
                            </Typography>
                        </Box>
                    </Grid>)
                })}
            </Grid>
            <Keyboard guesses={guesses} answer={answer} handleKeyClick={handleVirtualKeyClick} handleBackspace={handleBackspace} submitFunc={handleSubmit} />
            {notif ? <WordleNotifbar message="Not Enough Characters" duration={1000} /> : ""}
        </>;
    } else {
        return <Loading />
    }
};

export default GuessGrid;
