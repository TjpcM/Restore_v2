import { useDispatch, useSelector } from "react-redux"
import { decrement, increment, type CounterState } from "./counterReducer";
import { Button, ButtonGroup, Typography } from "@mui/material";


export default function ContactPage() {
const data = useSelector((state: CounterState) => state.data);
const dispatch = useDispatch();
    return ( 
    <>
     <Typography variant="h2">Contact Page</Typography>
    <Typography variant="body1">The data is: {data}</Typography>

<ButtonGroup>
    <Button onClick={() => dispatch(increment())} variant="contained" color="secondary">Increment</Button>
    <Button onClick={() => dispatch(increment(5))} variant="contained" color="primary">Increment by 5</Button>
    <Button onClick={() => dispatch(decrement())} variant="contained" color="error">Decrement</Button>
</ButtonGroup>
    </>
  );
}