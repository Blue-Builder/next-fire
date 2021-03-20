import { auth, googleAuthProvider } from '@lib/index.js'

export default function EnterPage() {
  const user = null
  const username = null

  return (
    // if user is signed out <SignInButton/>
    // if user is signed in, but missing username <UsernameForm/>
    // if user is signed in and has username <SignOutButton/>
    <main>
      {!user && <SignInButton />}
      {user && !username && <UsernameForm />}
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
    <button type='button' onClick={signInWithGoogle}>
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
function UsernameForm() {}
