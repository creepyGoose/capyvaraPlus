/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import { gql, GraphQLClient } from 'graphql-request'
import { useState } from 'react'

export const getServerSideProps = async(pageContext) => {
    const graphQLClient = new GraphQLClient(process.env.API_MANAGEMENT, {
        headers: {
          "Authorization" : `Bearer ${process.env.API_ACCESS}`
        }
      })  
    const pageSlug = pageContext.query.slug


const query = gql`
 query($pageSlug: String!) {
     video(where: {
         slug: $pageSlug
     }) {
         createdAt,
         id,
         title,
         description,
         seen,
         slug,
         tags,          
         thumbnail {
             url
         },
         mp4 {
             url
         }
     }
   }`

const variables = {
    pageSlug, 
}

const data = await graphQLClient.request(query, variables)
const video = data.video

return {
    props: {
        video
    }
  }  
}

const changeToSeen = async (slug) => {
    await fetch('api/changeToSeen', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ slug })
    })

}

const Video = ({video}) => {  
    const [watching, setWatching] = useState(false)
     return (
        <>
        {!watching && <img className='video-image' src={video.thumbnail.url} 
        alt={video.title} />}
        {!watching&& <div className='info'>
            <p>{video.tags.join(', ')}</p>
            <p>{video.description}</p>
            <a href="/"><p>Voltar</p></a>
            <button className={'video-overlay'}
            onClick={()=> {
                changeToSeen(video.slug)
               watching ? setWatching(false): setWatching(true)
            }}>ASSISTIR</button>                            
          </div>}
          {watching && (
              <video width='100%' controls >
                  <source src={video.mp4.url} type='video/mp4'/>
              </video>
          )}
          <div className={'info-footer'}
            onClick={() => watching ? setWatching(false): null}>
          </div>
        </>
     )
}

export default Video