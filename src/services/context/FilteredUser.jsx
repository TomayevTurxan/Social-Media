import { createContext, useState } from "react";
import { PropTypes } from "prop-types";
export const FilterUserContext = createContext("");

const FilterUserContextProvider = ({children})=>{
    let [filteredUsers, setFilteredUsers] = useState();

    return <FilterUserContext.Provider value={{filteredUsers,setFilteredUsers}}>
        {children}
    </FilterUserContext.Provider>
}

FilterUserContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export default FilterUserContextProvider