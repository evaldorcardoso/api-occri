const loginForm = document.getElementById('login-form');
const emailField = document.getElementById('email');
const passwordField = document.getElementById('password');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = emailField.value;
  const password = passwordField.value;

  console.log(firebase);
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(({ user }) => {
      return user.getIdToken().then((idToken) => {
        console.log(idToken);
        token.innerHTML = idToken;
        loginForm.style.display = 'none';
        quotes.classList.remove('d-none');
      });
    })
    .then(() => {
      return firebase.auth().signOut();
    })
    .catch((err) => {
      console.error(err.message);
      error.innerHTML = err.message;
    });
});
