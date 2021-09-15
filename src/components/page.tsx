import React, { useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core'

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

    const classes = useStyles();
    return (
        <div>
            <Button onClick={() => setToggle(!toggle)} variant="contained"><Typography>Test</Typography></Button>
            {toggle && (<>
                <br />
                Cool Guy
            </>)}
        </div>
    );
}

export default Page