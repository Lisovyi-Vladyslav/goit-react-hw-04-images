import axios from 'axios';
import {useState, useEffect, } from 'react'

import { Gallery } from "./ImageGallery.styled"
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem'
import { Loader } from '../Loader/Loader'
import { Modal } from '../Modal/Modal'
import { Button } from '../Button/Button'



export function ImageGallery({searcPhoto}) {
  const [isLoading, setIsLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [page, setPage] = useState(1);
  const [totalHits, totalHitsPage] = useState(1);
  //  const firsRender = useRef(true);
  
    const hendlOpenModal = (largeImageURL) => {
      setLargeImageURL(largeImageURL);
      setOpenModal(true)
  }

 const hendlCloseModal = () => {
     setOpenModal(false)
  }

const loadMore = () => {
  setPage(prevPage => prevPage + 1)
}

  const fetchUser = async (pages) => {
        setIsLoading(prevIsLoading => !prevIsLoading)
   try {

    
       const ulr = `https://pixabay.com/api/?q=${searcPhoto.search.search}&page=${pages}&key=31729330-76a93a375c4da5def12e352a3&image_type=photo&orientation=horizontal&per_page=12`;
    
       const photo = await axios.get(ulr);
     //  photo.data.hits]);
     totalHitsPage(photo.data.totalHits)
      setPhotos(prevPhotos => [...prevPhotos, ...photo.data.hits])
     } catch (error) {
       } finally {
       setIsLoading(prevIsLoading => !prevIsLoading);
     } 
    
  }
  useEffect(() => {
    setPhotos([]);
    setPage(1);
     if (searcPhoto !== '') {
       fetchUser(1);
     }
      setPhotos([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searcPhoto]);

  
  useEffect(() => {
    if (page !== 1) {
       fetchUser(page);
    }
       
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
 
 
  return (
    <>
        <Gallery>{
        photos.map(({ id, webformatURL, largeImageURL }) => (
          <ImageGalleryItem key={id} webformatURL={webformatURL} largeImageURL={largeImageURL} hendlOpenModal={hendlOpenModal}></ImageGalleryItem>
        ))}  
    </Gallery>
        {isLoading && <Loader/>}
        {openModal && <Modal hendlCloseModal={hendlCloseModal}>
        <img src={largeImageURL} alt="" width="600" height="400"/>
        </Modal>}
     {photos.length !== 0 && photos.length !== totalHits && <Button loadMore={loadMore} />}
    </>
  )
}
