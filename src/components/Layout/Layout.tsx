import Header from "../Header/Header";

import "react-toastify/dist/ReactToastify.css";

import { Outlet } from "react-router";
import { observer } from "mobx-react-lite";

function Layout() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}

export default observer(Layout);
