import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

interface IKeyboardProps {
    guesses: string[],
    answer: string
}
const Keyboard = (props: IKeyboardProps) => {
    const { guesses, answer } = props

    const [guessedLetters, setGuessedLetters] = useState<any>();
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')

    useEffect(() => {

        const allGuessedCharacters = guesses.join('').split('');
        const uniqueGuessedCharacters = allGuessedCharacters.filter((val: string, index: number, self) => self.indexOf(val) === index)
        setGuessedLetters(uniqueGuessedCharacters);

    }, [guesses])

    const styles = {
        keyboard: {
            width: "500px",
            margin: "0 auto",
            marginTop: "50px"
        }
    }

    const genKeyStyles = (character: string, index: number) => {
        if (guessedLetters) {

            const styles = {
                border: "1px solid white",
                width: "50px",
                color: "white",
                textAlign: "center",
                backgroundColor: ""
            };

            if (answer.indexOf(character) >= 0 && guessedLetters.indexOf(character) >= 0) {
                styles.backgroundColor = "green"
            }
            return styles
        }
    }

    return <Grid container sx={styles.keyboard}>
        {alphabet.map((letter: string, index) => {
            return (
                <>
                    <Grid item sx={genKeyStyles(letter, index)} key={uuid()}>
                        <Typography key={uuid()}>{letter}</Typography>
                    </Grid>
                </>
            )

        })}
    </Grid>;
};

export default Keyboard;
