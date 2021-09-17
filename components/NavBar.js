/* eslint-disable @next/next/no-img-element */
import Link from 'next/Link'
import Image from 'next/Image'
import logo from '../public/logotipo.png'

const NavBar = ({account}) => {
       return  (
           <div className="navbar">
            <div className='logo-wrapper'>
            <Link href='/'><Image src={logo} alt="Capyvara Logo" width={300} height={50}></Image></Link>
                </div> 

              <div className='account-info'>
                  <p>Olá, {account.username} </p>
                  <img className='avatar' src={account.avatar.url} alt='avatar'/>
              </div>
           </div>
       )   
}

export default NavBar