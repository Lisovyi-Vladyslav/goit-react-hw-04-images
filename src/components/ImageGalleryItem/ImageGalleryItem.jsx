import React, { Component } from "react";
import {GalleryItem, GalleryImage} from './ImageGalleryItem.styled'
export class ImageGalleryItem extends Component {


  render() {
    const {webformatURL, largeImageURL, hendlOpenModal} = this.props
    return (<>
      {
  <GalleryItem onClick={() => hendlOpenModal(largeImageURL)}>
  <GalleryImage src={webformatURL} alt=""/>
</GalleryItem>
}      
    </>)
      ;
  }
}