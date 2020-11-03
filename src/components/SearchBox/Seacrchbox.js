import React from 'react'

// instead of props keyword use the object
const Searchbox = ({placeholder,handleChange})=>{
    return(
        <input type='search'
        className='search'
        placeholder={placeholder}
        onChange={handleChange}
        />
    )
}

export default Searchbox;