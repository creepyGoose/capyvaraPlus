/* eslint-disable @next/next/link-passhref */
import { gql, GraphQLClient } from 'graphql-request'
import Section from '../components/Section'
import Image from 'next/image'
import NavBar from '../components/NavBar'
import Link from 'next/link'

export const getStaticProps = async () => {   
  const graphQLClient = new GraphQLClient(process.env.API_MANAGEMENT, {
    headers: {
      "Authorization" : `Bearer ${process.env.API_ACCESS}`
    }
  })  

const videosQuery = gql`
 query {
    videos {
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
    }
 }`

const accountQuery = gql`
query {
   account(where: { id: "cktlrk8egoj100b320gfam2d7"}) {
   username
   avatar {
    url
  }
}
}
`

 const data = await graphQLClient.request(videosQuery)
 const videos = data.videos
 const accountData = await graphQLClient.request(accountQuery)
 const account = accountData.account

 return {
   props: {
     videos, 
     account
   }
 }

}

const Home = ({videos, account}) => { 
  const randomVideo = (videos) => {
    return videos[Math.floor(Math.random()*videos.length)]
  } 
  
const filterVideos = (videos, genre) => {
    return videos.filter((videos) => videos.tags.includes(genre))
  }

const unSeenVideos = (videos) => {
      return videos.filter(video => video.seen == false || video.seen == null)
}
  return (
    <>
    <NavBar account={account}/>
       <div className='app'>
         <div className='main-video'>
           <Image src= {randomVideo(videos).thumbnail.url}
           alt={randomVideo(videos).title} width={1480} height={1000}/>
         </div>

        <div className="video-feed">
         <Link href='#disney'><div className='franchise' id='disney'></div></Link>
         <Link href='#pixar'><div className='franchise' id='pixar'></div></Link>
         <Link href='#marvel'><div className='franchise' id='marvel'></div></Link>
         <Link href='#nat-geo'><div className='franchise' id='nat-geo'></div></Link>
         <Link href='#star-wars'><div className='franchise' id='star-wars'></div></Link>
      </div>
         <Section genre = {'Recomendado para você'} videos={unSeenVideos(videos)} />
         <Section id='disney' genre  = {'Disney'} videos={filterVideos(videos, 'disney')}/>
         <Section id='pixar' genre = {'Pixar'} videos={filterVideos(videos, 'pixar')}/>
         <Section id='marvel' genre = {'Marvel'} videos={filterVideos(videos, 'marvel')}/>
         <Section id='nat-geo' genre = {'Nat Geo'} videos={filterVideos(videos, 'nat-geo')}/>         
         <Section id='star-wars' genre = {'Star Wars'} videos={filterVideos(videos, 'star-wars')}/>    
       </div>      
    </>
  )
}

export default Home 