/* This file is from the code-along dated 2026-02-02. */

import { useContext, useState } from "react";
import { Grid } from "../../components/grid/grid";
import { Input } from '../../components/Input/Input'
import { Submit } from '../../components/Submit/Submit'
import { AuthContext } from "../../context/AuthContext";

export function Login() {
  const [error, setError] = useState<string | null>(null);
  /* Just like in the navbar component, the useContext hook is taking a context as an argument 
  so that a deconstructing assignment can be performed. */
  const { userData, setUserData } = useContext(AuthContext);

  /* This function is called by the form's on-submit attribute (see return statement below)
  instead of being called by a button. */
  function postLogin(e: React.SubmitEvent) {
    e.preventDefault()
    // Gem input values
    const userName = e.target.email.value
    const passWord = e.target.password.value

    // Opret body (URLSearchParams)
    const body = new URLSearchParams()

    // append input values til body
    /* That is not the safest way of logging in, as we learned in class from Heinz, 
    but this is what Kasper taught that day. 
    Maybe we just have to learn this way of doing it too. */
    body.append('username', userName)
    body.append('password', passWord)

    const url = "http://localhost:4000/login";

    // POST body til backend server og håndter response (success/error)
    /* The data stored in state userData will also be saved in local storage (see AuthContextProvider.tsx).
    About the error message being issued by the client:
    Q1: This isn't try...catch. It's then...catch. Explanation:

    ".then().catch() is the "old" way. The newer async/await syntactic sugar is so much better to write, read, deal with and also avoids a fair amount of headaches. – 
    Jeremy Thille
    Commented Sep 28, 2021 at 12:58 (...)
    If you're using await to handle the Promise then you wrap it in a try/catch. Think of await as a way to make asynchronous operations semantically similar to synchronous operations (at least within the context of the function in which it's being awaited, consuming code notwithstanding).
    But if you're not using await and are instead handling the Promise by appending .then() to it then you'd append a .catch() to that chain to catch failures from within the asynchronous operation.
    edited Apr 26, 2024 at 14:20
    answered Sep 28, 2021 at 12:58
    David"
    https://stackoverflow.com/questions/69362121/when-should-i-use-try-catch-instead-of-then-catch

    "MissinqLink
    7 mdr. siden
    async/await are syntactic sugar for .then() and .catch() with callbacks. In my opinion 
    async/await is generally more readable and easier to maintain. There are some subtle differences. 
    You can call await on anything but if you attatch .then() to an object that isn’t thenable, it will throw an error."
    https://www.reddit.com/r/learnjavascript/comments/1m1b448/async_await_vs_fetch_then_catch/
    
    About try...catch:
    "The try...catch statement is comprised of a try block and either a catch block, a finally block, or both. 
    The code in the try block is executed first, 
    and if it throws an exception, the code in the catch block will be executed. 
    The code in the finally block will always be executed before control flow exits the entire construct."
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
    */
    fetch(url, { method: 'POST', body: body })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data)
        setError('')
      })
      .catch((error) => {
        console.error('Error logging in: ', error)
        setError('Der opstod en fejl - prøv igen')
      })
  };

  console.log('UserData: ', userData);

  return (
    <>
      {userData && (
        <b>
          Velkommen {userData.user.firstname} {userData.user.lastname}
        </b>
      )}
      {error && <b>{error}</b>}
      <form style={{ width: '30vw' }} onSubmit={(e) => postLogin(e)}>
        <Grid gtr={'1fr 1fr 1fr'} gap={8}>
          <Input type='email' name='email' label='Email' />
          <Input type='password' name='password' label='Password' />
          <Submit value='Login' />
        </Grid>
      </form>
    </>
  );
};
