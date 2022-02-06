import { Box, Grid, Typography } from "@mui/material";
import { useState, useRef, useEffect, ChangeEvent } from 'react';
import Keyboard from "../Keyboard";
import { v4 as uuid } from 'uuid'
import WordleNotifbar from "../WordleNotifBar";
import Loading from "../Utils/Loading";

interface IGuessGridProps {
    addGuess: Function,
    guesses: any,
    answer: any
}
const GuessGrid = (props: IGuessGridProps) => {

    const { addGuess, guesses, answer } = props;
    let [notif, setNotif] = useState<boolean>(false);
    let [refIndex, setRefIndex] = useState(0);

    const textInputRefs = useRef<HTMLInputElement[]>([])
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


    const [guess, setGuess] = useState<any>(initialState);
    const styles = {
        input: {
            border: "1px solid white",
            height: "50px",
            display: "flex",
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
            marginTop: "50px",
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
            marginTop: "50px",

        }

    }

    const genInputProps = (name: string) => {
        return {
            style: {
                color: "white"
            },
            maxLength: 1,
            name,
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        setGuess({
            ...guess,
            // [e.target.name]: textInputRefs[e.target.name]?.current?.value
        })
    }

    useEffect(() => {
        textInputRefs?.current[refIndex]?.focus();
    }, [refIndex])

    const handleVirtualKeyClick = (e: any) => {
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

    // const handleKeyEvent = (e: any) => {
    //     let alphabet = 'abcdefghiujklmnopqrstuvwxyz'.split('');
    //     if (alphabet.includes(e.key)) {
    //         guess[refIndex] = e.key
    //         let newRefIndex = refIndex + 1;
    //         setRefIndex(newRefIndex);
    //     }
    // }

    const handleBackspace = (e: any) => {
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


    const handleSubmit = () => {
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
