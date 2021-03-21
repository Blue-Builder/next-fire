import Loader from '@components/Loader.js'
// import { selectUser } from '@lib/redux/authSlice'
import { toast } from 'react-hot-toast'
// import { useSelector } from 'react-redux'

export default function IndexPage() {
  // const user = useSelector(selectUser)
  // const username = useSelector(selectUsername)

  return (
    <main>
      <div>IndexPage page</div>

      {/* {user && <div>{user}</div>} */}
      {/* {username && <div>{username}</div>} */}

      <button type='button' onClick={() => toast.success('hello toast!')}>
        Toast Me
      </button>
      <Loader show />
    </main>
  )
}
