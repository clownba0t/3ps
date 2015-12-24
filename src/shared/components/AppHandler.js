import React from "react";
import AppNavBar from "./AppNavBar.js"

export default class AppHandler extends React.Component {
    render() {
        return (
            <div>
                <AppNavBar/>
                <div class="container">
                    Content
                </div>
            </div>
        )
    }
}
