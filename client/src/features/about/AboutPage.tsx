import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, Typography } from "@mui/material";
import { useLazyGet400ErrorQuery, useLazyGet401ErrorQuery, useLazyGet404ErrorQuery, useLazyGet500ErrorQuery, useLazyGetValidationErrorQuery } from "./errorApi";
import { useState } from "react";


export default function AboutPage() {
  const [validatinonErrors, setValidationErrors] = useState<string[]>([]);

  const [trigger400Error] = useLazyGet400ErrorQuery(); //lazy query hook to trigger error for testing middleware
  const [trigger401Error] = useLazyGet401ErrorQuery(); //lazy query hook to trigger error for testing middleware
  const [trigger404Error] = useLazyGet404ErrorQuery(); //lazy query hook to trigger error for testing middleware
  const [trigger500Error] = useLazyGet500ErrorQuery(); //lazy query hook to trigger error for testing middleware
  const [triggerValidationError] = useLazyGetValidationErrorQuery(); //lazy query hook to trigger e rror for testing middleware

  const getValidationError = async () => {
    try {
      await triggerValidationError().unwrap();

    } catch (error: unknown) {
      if (error && typeof error === 'object' && typeof (error as { message: string }).message === 'string') {
        const errorArray = (error as { message: string }).message.split(',');
        console.log(errorArray);
        setValidationErrors(errorArray);
      }
    }
  }
    return (
      <Container maxWidth="lg">
          <Typography gutterBottom variant="h3">Errors for Testing</Typography>
        <ButtonGroup>
          <Button variant="contained" onClick={() => trigger400Error()
            .catch(err => console.log(err))}>Test 400 Error</Button>
          <Button variant="contained" onClick={() => trigger401Error()
            .catch(err => console.log(err))}>Test 401 Error</Button>
          <Button variant="contained" onClick={() => trigger404Error()
            .catch(err => console.log(err))}>Test 404 Error</Button>
          <Button variant="contained" onClick={() => trigger500Error()
            .catch(err => console.log(err))}>Test 500 Error</Button>
          <Button variant="contained" onClick={getValidationError}>Test Validation Error</Button>
        </ButtonGroup>
        {validatinonErrors.length > 0 && (

          <Alert severity="error">
            <AlertTitle>Validation Errors</AlertTitle>
            <List>
              {validatinonErrors.map(err => (
                <ListItem key={err}>{err}</ListItem>
              ))}
            </List>
          </Alert>

        )
        }
      </Container>
    )
  }
;