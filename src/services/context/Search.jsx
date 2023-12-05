import { createContext, useState } from "react";
import { PropTypes } from "prop-types";
export const SearchContext = createContext("");

const SearchContextProvider = ({children})=>{
    let[search,setSearch] = useState("");
    return <SearchContext.Provider value={{search,setSearch}}>
        {children}
    </SearchContext.Provider>
}

SearchContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export default SearchContextProvider