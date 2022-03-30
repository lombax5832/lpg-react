import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Component } from 'react';


class AlertDialog extends Component <{action: any, triggerOpenDialog: boolean, closeDialogFCN: any, dialogName: string},{dialogOpen: boolean}> {
 

    constructor(props) {
        super(props);

        this.handleClose.bind(this);
        this.state = {
            dialogOpen: this.props.triggerOpenDialog
        }
    }

    handleCancel = () => {
        // Keep the button disabled
        this.props.action(false, this.props.dialogName)
        // Close the dialog
        this.props.closeDialogFCN(this.props.dialogName)
        // this.props.setStateOfParent({ dialogOpen: false })
        // do nothing
    };

    handleClose = () => {
        // Enable the button
        this.props.action(true, this.props.dialogName)
        // Close the dialog
        this.props.closeDialogFCN(this.props.dialogName)
        // Stop the corresponding service
        // http request goes here
    };

    render() {
        return (
            <div>
                < Dialog
                    open={this.props.triggerOpenDialog}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {`Stop ${this.props.dialogName} ?`}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {`STOP ${this.props.dialogName } by closing the service?`}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={this.handleCancel}>DO NOT STOP</Button>
                        <Button variant="contained" color="error" onClick={this.handleClose} autoFocus>
                            STOP
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default AlertDialog