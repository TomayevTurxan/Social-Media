import { createContext, useState } from "react";
import { PropTypes } from "prop-types";
export const AdminContextItem = createContext("");

const AdminContextProviderItem = ({children})=>{
    let[admmin,setAdmin] = useState( JSON.parse(localStorage.getItem("admin")) ? JSON.parse(localStorage.getItem("admin")) : [] );
    return <AdminContextItem.Provider value={{admmin,setAdmin}}>
        {children}
    </AdminContextItem.Provider>
}

AdminContextProviderItem.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AdminContextProviderItem