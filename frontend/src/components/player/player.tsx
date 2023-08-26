import { Grid, Paper, Typography } from "@mui/material"

import './player.css';

export type PlayerCardProps = {
    number: 1 | 2;
    name: string;
}

const PlayerCardWithPowers = (props: PlayerCardProps) => {
    return (
        <>
        <Paper elevation={3} className={props.number === 1 ? "playerCard left" : "playerCard right"} sx={{backgroundColor: "rgb(255,255,255,0.8)"}}>
            <div className="info">
                <img src={"./repogotchi"+props.number+".png"} className="avatar"/>
                <span>
                    <Typography variant="h6">
                        {props.name}
                    </Typography>
                </span>
            </div>
            <div className={props.number === 1 ? "newPlayerCard newLeft" : "newPlayerCard newRight"}>
                <div className="row1">
                    <img src="./heart.png" />
                    <img src="./heart.png" />
                    <img src="./heart.png" />
                </div>
                <div className="row2">
                    <img src="./sword.png" />
                    <img src="./shield.png" />
                </div>
            </div>
        </Paper>
        </>
    )
}

const PlayerCard = (props: PlayerCardProps) => {
    return (
        <div>
            <Paper elevation={1} className={props.number === 1 ? "playerCard left" : "playerCard right"}>
                {/* <div> */}
                <img src={"./repogotchi"+props.number+".png"} className="avatar"/>
                <div className="health">
                    <img src="./heart.png" className="heart"/>
                    <img src="./heart.png" className="heart"/>
                    <img src="./heart.png" className="heart"/>
                </div>
                
                {/* </div> */}
                {/* <div>
                    <img src="./sword.png" />
                </div> */}
            </Paper>
        </div>
    )
}


export default PlayerCardWithPowers;