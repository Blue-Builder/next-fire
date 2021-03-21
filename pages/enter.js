import { auth, firestore, googleAuthProvider } from '@lib/firebase'
import { selectUser, selectUsername } from '@lib/redux/authSlice'
import { debounce } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function EnterPage() {
  const user = useSelector(selectUser)
  const username = useSelector(selectUsername)

  return (
    // if user is signed out <SignInButton/>
    // if user is signed in, but missing username <UsernameForm/>
    // if user is signed in and has username <SignOutButton/>
    <main>
      {!user && <SignInButton />}
      {user && !username && <UsernameForm user={user} username={username} />}
      {user && username && <SignOutButton />}
    </main>
  )
}

// sign in with google button
function SignInButton() {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider)
  }

  return (
    <button type='button' onClick={signInWithGoogle} className='btn-google'>
      <img src='/google.png' alt='sign in with google' /> Sign in with Google
    </button>
  )
}

// sign out button
function SignOutButton() {
  return (
    <button type='button' onClick={() => auth.signOut()}>
      Sign Out
    </button>
  )
}

// username form
function UsernameForm({ user, username }) {
  const [formValue, setFormValue] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [loading, setLoading] = useState(false)

  /*
  hit database for username match after each debounced change
  useCallback is required for debounce to work
  */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkUsername = useCallback(
    debounce(async (displayName) => {
      if (displayName.length >= 3) {
        const ref = firestore.doc(`usernames/${displayName}`)
        const { exists } = await ref.get()
        // eslint-disable-next-line no-console
        console.log('Firestore read executed!')
        setIsValid(!exists)
        setLoading(false)
      }
    }, 500),
    []
  )

  useEffect(() => {
    checkUsername(formValue)
  }, [checkUsername, formValue])

  const onChange = (e) => {
    // force form value typed in form to match correct format
    const val = e.target.value.toLowerCase()
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/

    // only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val)
      setLoading(false)
      setIsValid(false)
    }

    if (re.test(val)) {
      setFormValue(val)
      setLoading(true)
      setIsValid(false)
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    // create refs for both documents
    const userDoc = firestore.doc(`users/${user.uid}`)
    const usernameDoc = firestore.doc(`usernames/${formValue}`)

    // commit both docs together as a batch write
    const batch = firestore.batch()
    batch.set(userDoc, { username: formValue, photoURL: user.photoURL, displayName: user.displayName })
    batch.set(usernameDoc, { uid: user.uid })

    await batch.commit()
  }

  return (
    !username && (
      <section>
        <h3>Choose Username</h3>
        <form onSubmit={onSubmit}>
          <input type='text' name='username' placeholder='username' value={formValue} onChange={onChange} />
          <UsernameMessage username={formValue} isValid={isValid} loading={loading} />
          <button type='submit' className='btn-green' disabled={!isValid}>
            Choose
          </button>

          {/* debug */}
          <h3>Debug State</h3>
          <div>
            Username: {formValue}
            <br />
            Loading: {loading.toString()}
            <br />
            Username valid: {isValid.toString()}
          </div>
        </form>
      </section>
    )
  )
}

function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <p>Checking...</p>
  }
  if (isValid) {
    return <p className='text-success'>{username} is available!</p>
  }
  if (!loading && !isValid) {
    return <p className='text-danger'>{username} is already taken!</p>
  }
  return <p />
}
