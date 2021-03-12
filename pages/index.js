import Loader from '@components/Loader.js'
import { toast } from 'react-hot-toast'

export default function IndexPage() {
  return (
    <main>
      <div>IndexPage page</div>
      <button type='button' onClick={() => toast.success('hello toast!')}>
        Toast Me
      </button>
      <Loader show />
    </main>
  )
}
