import React from 'react'
import { useTheme, Typography, Paper } from '@material-ui/core'

export default function CommentCard({ comment }) {
    const { text, user, timestamp } = comment
    const theme = useTheme()
    const { palette: { type, primary, secondary, error }} = theme
    const styles = {
        cardStyle: {
            margin: "20px 25px",
        },
        nameStyle: {
            // color: type === 'light' ? primary.main : secondary.main
            color: secondary.dark
        }
    }
    return (
        <div style={styles.cardStyle}>
            <Typography>
                <span style={styles.nameStyle}>{user.firstName}{' '}{user.lastName}{' '}</span>
            {/* </Typography> */}
            {/* <Typography> */}
                <span>{new Date(timestamp).toLocaleString()}</span>
            </Typography>
            <Typography>
                {text}
            </Typography>
        </div>
    )
}
