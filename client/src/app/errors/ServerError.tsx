import {  Divider, Paper, Typography} from "@mui/material";
import  { useLocation } from "react-router";

export default function ServerError() {
    const {state} = useLocation();
  return (
    <Paper>
        <Typography gutterBottom variant="h5">Server Error</Typography>
        {state.error ? (
            <>
            <Typography gutterBottom variant="h3" sx={{px:4, pt:2}}>
                {state.error.title}
            </Typography>
            <Divider/>
            <Typography gutterBottom variant="body1" sx={{px:4, pt:2}}>
                {state.error.detail }
            </Typography>
            </>
        ) : (
            <Typography gutterBottom variant="h5" sx={{px:4, pt:2}} color="secondary">
                Server error
            </Typography>
        )}
    </Paper>
  )
}