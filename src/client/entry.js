import React from "react";
import { render, Router } from "react-router";
import routes from "../shared/routes";

render(<Router routes={routes}/>, document.getElementById('app'));
