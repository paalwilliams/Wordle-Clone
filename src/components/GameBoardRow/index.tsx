import { Grid, Typography } from "@mui/material";
import { v4 as uuid } from 'uuid'

interface IGameBoardRowProps {
    guess?: string,
    answer: string
}

const GameBoardRow = (props: IGameBoardRowProps) => {

    const { answer, guess } = props;

    const genResultStyles = (index: number) => {

        const styles = {
            border: "1px solid white",
            color: "white",
            height: "50px",
            width: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "",
        }

        if (guess) {

            let answerArr = answer.split('');
            let guessArr = guess.split('');
            console.log(answerArr)
            console.log(guessArr[index])
            console.log(answerArr.indexOf(guessArr[index]))

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
                    <Grid item xs={12 / answer.length} sx={genResultStyles(index)} key={uuid()}>
                        {guess ? <Typography key={uuid()}>{guess[index].toUpperCase()}</Typography> : <Typography />}
                    </Grid>
                )
            })}
        </>
    );
};

export default GameBoardRow;
