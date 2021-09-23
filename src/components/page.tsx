import { makeStyles, Button, Typography } from "@mui/material";
import React, { useState } from "react"

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const toggle = () => {

}

const Page = (props: any) => {

    const { children } = props

    const [toggle, setToggle] = useState<boolean>(false);
    
    return (
        <div>
            <Button onClick={() => setToggle(!toggle)} variant="contained"><Typography>Test</Typography></Button>
            {toggle && (children)}
        </div>
    );
}

export default Page