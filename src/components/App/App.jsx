import { useState } from 'react';

import {Searchbar} from '../Searchbar/Searchbar'
import { ImageGallery } from '../ImageGallery/ImageGallery'

import { SearchForm } from '../SearchForm/SearchForm'




export function App() {
const [search, setSearch] = useState('');

const handlSearcPhoto = (search) => {
     setSearch({ search });
   };
  
  return (
    <>
        <Searchbar>
          <SearchForm handlSearcPphoto={handlSearcPhoto} />
        </Searchbar>
      <ImageGallery searcPhoto={search} />
    </>
  )
}



