import { Grid, Typography } from "@mui/material";

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
            height: "75px",
            width: "75px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: ""
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
            <Grid item xs={12 / 7} sx={genResultStyles(0)}>
                {guess ? <Typography>{guess[0].toUpperCase()}</Typography> : <Typography />}
            </Grid>
            <Grid item xs={12 / 7} sx={genResultStyles(1)}>
                {guess ? <Typography>{guess[1].toUpperCase()}</Typography> : <Typography />}
            </Grid>
            <Grid item xs={12 / 7} sx={genResultStyles(2)}>
                {guess ? <Typography>{guess[2].toUpperCase()}</Typography> : <Typography />}
            </Grid>
            <Grid item xs={12 / 7} sx={genResultStyles(3)}>
                {guess ? <Typography>{guess[3].toUpperCase()}</Typography> : <Typography />}
            </Grid>
            <Grid item xs={12 / 7} sx={genResultStyles(4)}>
                {guess ? <Typography>{guess[4].toUpperCase()}</Typography> : <Typography />}
            </Grid>
            <Grid item xs={12 / 7} sx={genResultStyles(5)}>
                {guess ? <Typography>{guess[5].toUpperCase()}</Typography> : <Typography />}
            </Grid>
            <Grid item xs={12 / 7} sx={genResultStyles(6)}>
                {guess ? <Typography>{guess[6].toUpperCase()}</Typography> : <Typography />}
            </Grid>
        </>
    );
};

export default GameBoardRow;
