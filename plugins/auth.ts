export default defineNuxtPlugin(() => {
  addRouteMiddleware('auth', () => {
    const userCookie = useCookie('userCookie');
    const user = userCookie.value;

    // @ts-ignore
    if (!user || (user && !user.uid)) {
      console.log('-----');
      // @ts-ignore
      console.log('Cookie not detected / auth middleware');
      console.log('-----');
      return navigateTo('/login');
    }
  });
  addRouteMiddleware('no-auth', async () => {
    const userCookie = useCookie('userCookie');
    const user = userCookie.value;

    // @ts-ignore
    if (user && user.uid) {
      console.log('-----');
      // @ts-ignore
      console.log('Cookie detected / no auth middleware: ', user.uid);
      console.log('-----');
      return navigateTo('/home');
    }
  });
});
