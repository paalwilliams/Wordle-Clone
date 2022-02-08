import { Box, Divider, Grid, Typography } from "@mui/material";
import { useEffect, useState } from 'react';
import Keyboard from "../Keyboard";
import { v4 as uuid } from 'uuid'
import WordleNotifbar from "../WordleNotifBar";
import Loading from "../Utils/Loading";
import { IGuessGridProps } from "../../types";
import wordList from '../lib/wordList.json';


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
            marginTop: "15px",
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
                    return (<Grid item xs={12 / answer.length} sx={styles.input} key={uuid()}>
                        <Box>
                            <Typography>
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

