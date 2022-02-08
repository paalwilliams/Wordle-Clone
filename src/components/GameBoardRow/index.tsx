import { Grid, Typography } from "@mui/material";
import { v4 as uuid } from 'uuid'
import { IGameBoardRowProps } from "../../types";

const GameBoardRow = (props: IGameBoardRowProps) => {

    const { answer, guess } = props;

    const genResultStyles = (index: number) => {

        const styles = {
            color: "white",
            height: `${320 / answer.length}px`,
            width: `${320 / answer.length}px`,
            border: ".5px solid white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "",
        }

        if (guess) {

            let answerArr = answer.split('');
            let guessArr = guess.split('');
            if (answerArr[index] === guessArr[index]) {
                styles.backgroundColor = "green"
            } else if (answerArr.indexOf(guessArr[index]) >= 0) {
                styles.backgroundColor = "orange"
            }
        }

        return styles;
    }


    return (
        <>
            {answer.split('').map((_: string, index: number) => {
                return (
                    <Grid item xs={1} sx={genResultStyles(index)} key={uuid()} >
                        {guess ? <Typography key={uuid()} sx={{ fontWeight: "bold", fontSize: "24px" }}>{guess[index].toUpperCase()}</Typography> : <Typography />
                        }
                    </Grid >
                )
            })}
        </>
    );
};

export default GameBoardRow;
