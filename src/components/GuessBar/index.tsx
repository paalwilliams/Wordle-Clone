import { Box, Button, Grid, TextField } from "@mui/material";
import { useState, useRef } from 'react';
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
    const [notif, setNotif] = useState<boolean>(false);

    const gridContainerRef = useRef<HTMLDivElement>(null);
    const initialState = {
        "0": "",
        "1": "",
        "2": "",
        "3": "",
        "4": "",
        "5": "",
        "6": "",
    }

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

    const handleChange = (e: any) => {
        e.preventDefault();
        // if (gridContainerRef.current) {
        //     // console.log(gridContainerRef.current.children[1].children[0])
        // }
        setGuess({
            ...guess,
            [e.target.name]: e.target.value
        })
    }

    const handleKeyClick = (e: any) => {
        e.preventDefault();
        console.log(e.target.lastChild.data)

    }

    const handleSubmit = () => {
        let word = ""
        Object.entries(guess).forEach((x: any) => {
            word += x[1];
        })
        if (word.length === answer.length) {
            addGuess(word)
            setGuess(initialState);
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
            <Grid container sx={styles.container} ref={gridContainerRef}>
                {answer ? answer.split('').map((_: string, index: number) => {

                    return (<Grid item xs={12 / answer.length} sx={styles.input} key={uuid()}>
                        <TextField value={guess[index].toUpperCase()} onChange={handleChange} InputProps={genInputProps(index.toString())} inputProps={{ maxLength: 1 }} key={uuid()} />
                    </Grid>)
                }) : ""}
            </Grid>
            <Keyboard guesses={guesses} answer={answer} handleKeyClick={handleKeyClick} submitFunc={handleSubmit} />
            {notif ? <WordleNotifbar message="Not Enough Characters" duration={1000} /> : ""}
        </>;
    } else {
        return <Loading />
    }
};

export default GuessGrid;
