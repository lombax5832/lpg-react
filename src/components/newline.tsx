import { Component } from "react";

const styles = {
    spacer: {
        width: '100%'
    }
}

// Literally just inserts a fullwidth div to force a newline
class NewLine extends Component {
    render() {
        return(
            <div style={styles.spacer}></div>
        )
    }
}

export default NewLine