import { Tooltip, Typography } from '@mui/material';
import './nav.css';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
    const nav = useNavigate();

    return (
        <nav className="appNav">
            <Tooltip title="Back to Main Menu">
            <div className="logo" onClick={() => nav("/")}>
                <Typography variant="overline" display="block" component="h2" sx={{textAlign: 'center'}}>
                    STUDY DUEL
                </Typography>
            </div>
            </Tooltip>
            {/* <div>
                New Game
            </div> */}
        </nav>
    )
}

export default Nav;