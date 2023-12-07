import { createContext, useState } from "react";
import { PropTypes } from "prop-types";
export const UserContext = createContext("");

const UserContextProvider = ({children})=>{
    let[users,setUsers] = useState([]);
    return <UserContext.Provider value={{users,setUsers}}>
        {children}
    </UserContext.Provider>
}

UserContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export default UserContextProvider