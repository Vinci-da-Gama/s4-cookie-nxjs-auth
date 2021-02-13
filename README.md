https://github.com/zeit/next.js/tree/60f782c1ef71ab748af4f484889841351520c09f/examples/with-cookie-auth

Use any email from https://jsonplaceholder.typicode.com/users to login, user website is the password. e.g. Lucio_Hettinger@annie.ca / demarco.info

[Persistent Data in Next](https://github.com/zeit/next.js/issues/2252#issuecomment-353992669)

- Create a custom document (pages/\_document.js) which is only executed server side, then read req.session and render it as a global object inside a script tag.
- Something like that, then in your pages you can have a high order component (to reuse code) which can check if it's running server side then use req.session, if it's client side then read from the window to get the session data from the already rendered info.
