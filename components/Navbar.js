import { selectUser, selectUsername } from '@lib/redux/authSlice'
import Link from 'next/link'
import { useSelector } from 'react-redux'

export default function Navbar() {
  const user = useSelector(selectUser)
  const username = useSelector(selectUsername)

  return (
    <nav className='navbar'>
      <ul>
        {/* home link */}
        <li>
          <Link href={{ pathname: '/' }}>
            <button type='button' className='btn-logo'>
              FEED
            </button>
          </Link>
        </li>

        {/*  user is signed-in AND has username */}
        {username && (
          <>
            <li className='push-left'>
              <Link href={{ pathname: '/admin' }}>
                <button type='button' className='btn-blue'>
                  Write Posts
                </button>
              </Link>
            </li>
            <li>
              <Link href={{ pathname: `/${username}` }}>
                <img src={user?.photoURL} alt='user profile' />
              </Link>
            </li>
          </>
        )}

        {/*  user is not signed-in OR has not created username */}
        {!username && (
          <li>
            <Link href={{ pathname: '/enter' }}>
              <button type='button' className='btn-blue'>
                Log in
              </button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}
