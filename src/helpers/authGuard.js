export default (to, from, next) => {
  const token = localStorage.getItem('netPixAuthToken');

  if (!token) {
    next({
      name: 'SignIn'
    });
  } else {
    next();
  }
};
