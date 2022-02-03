import { Button, Grid, TextField, Typography } from "@mui/material";
import { ReactHTMLElement, useState } from 'react';

interface IGuessGridProps {
    addGuess: Function
}
const GuessGrid = (props: IGuessGridProps) => {

    const { addGuess } = props;

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
            height: "75px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "",
            color: "white",
        },
        container: {
            minWidth: "400px",
            width: "30%",
            border: "1px solid white",
            margin: "0 auto",
            marginTop: "50px",
        },

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
        setGuess({
            ...guess,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {
        let word = ""
        Object.entries(guess).forEach((x: any) => {
            word += x[1];
        })
        if (word.length === 7) {
            addGuess(word)
            setGuess(initialState);
        }
    }
    return <>
        <Grid container sx={styles.container}>
            <Grid item xs={12 / 7} sx={styles.input}>
                <TextField value={guess[0].toUpperCase()} onChange={handleChange} InputProps={genInputProps("0")} inputProps={{ maxLength: 1 }} />
            </Grid>
            <Grid item xs={12 / 7} sx={styles.input}>
                <TextField value={guess[1].toUpperCase()} onChange={handleChange} InputProps={genInputProps("1")} inputProps={{ maxLength: 1 }} />
            </Grid>
            <Grid item xs={12 / 7} sx={styles.input}>
                <TextField value={guess[2].toUpperCase()} onChange={handleChange} InputProps={genInputProps("2")} inputProps={{ maxLength: 1 }} />
            </Grid>
            <Grid item xs={12 / 7} sx={styles.input}>
                <TextField value={guess[3].toUpperCase()} onChange={handleChange} InputProps={genInputProps("3")} inputProps={{ maxLength: 1 }} />
            </Grid>
            <Grid item xs={12 / 7} sx={styles.input}>
                <TextField value={guess[4].toUpperCase()} onChange={handleChange} InputProps={genInputProps("4")} inputProps={{ maxLength: 1 }} />
            </Grid>
            <Grid item xs={12 / 7} sx={styles.input}>
                <TextField value={guess[5].toUpperCase()} onChange={handleChange} InputProps={genInputProps("5")} inputProps={{ maxLength: 1 }} />
            </Grid>
            <Grid item xs={12 / 7} sx={styles.input}>
                <TextField value={guess[6].toUpperCase()} onChange={handleChange} InputProps={genInputProps("6")} inputProps={{ maxLength: 1 }} />
            </Grid>
            <Grid item xs={12} sx={styles.input}>
                <Button onClick={handleSubmit}>Submit Your Guess</Button>
            </Grid>
        </Grid>
    </>;
};

export default GuessGrid;
