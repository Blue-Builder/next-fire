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

    // set user logic
    if (user) {
      store.dispatch(updateUser({ uid: user?.uid, displayName: user?.displayName, photoURL: user?.photoURL }))
    } else {
      store.dispatch(updateUser(null))
    }

    // set username logic
    if (user) {
      const ref = firestore.collection('users').doc(user.uid)
      unsubscribe = ref.onSnapshot((doc) => {
        store.dispatch(updateUsername(doc.data()?.username))
      })
    } else {
      store.dispatch(updateUsername(null))
    }

    // cleanup function
    return unsubscribe
  }, [store, user])
}
