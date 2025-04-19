import React from 'react'
import { FiSearch } from 'react-icons/fi'
import { Input, SearchIcon,  SearchContainer} from './styles'

const SearchBar = ({value, onChange}) => {
  return (
    <SearchContainer>
      <SearchIcon>
        <FiSearch size={20} />
      </SearchIcon>
        <Input type="text" placeholder="Perquisar..." value={value} onChange={(e) => onChange(e.target.value)} />
    </SearchContainer>
    
  )
}

export {SearchBar}