import { createContext, useState } from "react";
import { PropTypes } from "prop-types";
export const UserContextItem = createContext("");

const UserContextProviderItem = ({children})=>{
    let[user,setUser] = useState( JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")) : [] );
    return <UserContextItem.Provider value={{user,setUser}}>
        {children}
    </UserContextItem.Provider>
}

UserContextProviderItem.propTypes = {
    children: PropTypes.node.isRequired,
}

export default UserContextProviderItem