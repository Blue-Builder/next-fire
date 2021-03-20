import { auth, firestore } from '@lib/firebase'
import { updateUser, updateUsername } from '@lib/redux/authSlice'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

// eslint-disable-next-line import/prefer-default-export
export const useUser = (store) => {
  const [user] = useAuthState(auth)

  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe

    if (user) {
      const ref = firestore.collection('users').doc(user.uid)
      unsubscribe = ref.onSnapshot((doc) => {
        store.dispatch(updateUser(user.uid))
        store.dispatch(updateUsername(doc.data()?.username))
      })
    } else {
      store.dispatch(updateUser(null))
      store.dispatch(updateUsername(null))
    }
    // cleanup function
    return unsubscribe
  }, [store, user])
}
