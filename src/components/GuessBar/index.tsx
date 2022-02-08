import { Box, Divider, Grid, Typography } from "@mui/material";
import { useEffect, useState } from 'react';
import Keyboard from "../Keyboard";
import { v4 as uuid } from 'uuid'
import WordleNotifbar from "../WordleNotifBar";
import Loading from "../Utils/Loading";
import { IGuessGridProps } from "../../types";
import wordList from '../lib/wordList.json';
import { flexbox } from "@mui/system";


const GuessBar = (props: IGuessGridProps) => {

    const { addGuess, guesses, answer } = props;

    interface INotifState {
        open: boolean,
        message: string
    }
    let [notif, setNotif] = useState<INotifState>({
        open: false,
        message: ""
    });

    const [guess, setGuess] = useState<string[]>([]);
    const styles = {
        input: {
            border: ".5px solid white",
            height: `${350 / answer.length}px`,
            width: `${350 / answer.length}px`,
            backgroundColor: "",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        container: {
            minWidth: "300px",
            maxWidth: "450px",
            margin: "0 auto",
            marginTop: "10px",
            display: "flex",
            justifyContent: "center"
        },
    }

    const handleAddCharacter = (char: string) => {
        if (guess.length < answer.length) {
            setGuess((currentGuess) => [...currentGuess, char])
        }
    }

    const handleBackspace = (e: KeyboardEvent | React.MouseEvent<Element, MouseEvent>): void => {
        setGuess((currentGuess) => {
            let backSpacedGuess = currentGuess.slice(0, currentGuess.length - 1);
            return [...backSpacedGuess]

        })
    }

    const handleSubmit = (): void => {
        let word = guess.join('')
        if (word.length !== answer.length) {
            setNotif({
                open: true,
                message: "Not enough characters."
            });
            setTimeout(() => {
                setNotif({
                    open: false,
                    message: ""
                });
            }, 1000)
        }
        else {
            addGuess(word.toLowerCase())
            setGuess([]);
        }
    }
    if (answer) {
        return <>
            <Divider />
            <Grid container sx={styles.container} >
                {answer.split('').map((_: string, index: number) => {
                    return (
                        <Grid item sx={styles.input} key={uuid()}>
                            <Box>
                                <Typography sx={{ fontSize: "24px", color: "white", fontWeight: "bold" }}>
                                    {guess[index]}
                                </Typography>
                            </Box>
                        </Grid>)
                })}
            </Grid>
            <Keyboard guesses={guesses} answer={answer} handleKeyClick={handleAddCharacter} handleBackspace={handleBackspace} submitFunc={handleSubmit} />
            {notif.open ? <WordleNotifbar message={notif.message} duration={1000} /> : ""}
        </>;
    } else {
        return <Loading />
    }
};

export default GuessBar;

