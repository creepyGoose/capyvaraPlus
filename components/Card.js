/* eslint-disable @next/next/no-img-element */
 

const Card = ({thumbnail}) => {
    return (
      <img className = "card" src = {thumbnail.url}  alt={thumbnail.title}  
        />
    )}


export default Card