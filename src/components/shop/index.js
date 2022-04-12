import Shop from "./shop";
import Sidebar from "./sidebar";

const Shopping = () => {
    return (
        <>
            {window.location.pathname == '/admin' || window.location.pathname == '/login' ? (
                <p></p>
            ) : (
                <Sidebar />
            )}
            <Shop />
        </>
    )
}

export default Shopping;