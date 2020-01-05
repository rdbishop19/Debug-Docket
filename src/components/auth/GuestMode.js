import React from 'react'
import { Typography, Button, useTheme } from '@material-ui/core'

export default function GuestMode(props) {
    return (
        <div style={{ width: "200px", margin: "0 auto", textAlign: "center"}} >
                <Typography variant="subtitle1">
                    Afraid of bugs?
                </Typography>
                <Button color="secondary" 
                        variant="contained" 
                        style={{ textAlign: "center", width: "100%"}}
                        onClick={()=> props.history.push("/")}
                        >
                    Use Guest Mode
                </Button>
			</div>
    )
}
