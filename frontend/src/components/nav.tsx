import { Tooltip, Typography } from '@mui/material';
import './nav.css';

const Nav = () => {
    // const nav = useNavigate();
    const restart = () => window.location.reload()

    return (
        <nav className="appNav">
            <Tooltip title="Back to Main Menu">
                <div className="logo" onClick={restart}>
                    <Typography variant="overline" display="block" component="h2" sx={{textAlign: 'center'}}>
                        STUDY DUEL
                    </Typography>
                </div>
            </Tooltip>
            <Tooltip title="Start a New Game">
                <div className="newGame" onClick={restart}>
                    <span>New Game</span>
                </div>
            </Tooltip>
        </nav>
    )
}

export default Nav;