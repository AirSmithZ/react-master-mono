import React from "react";
import { HashRouter, useRoutes } from "react-router-dom";
import { router } from "./router/index";

const Routers = () => useRoutes(router);

export default function app() {
	return (
		<HashRouter>
			<Routers />
		</HashRouter>
	);
}
