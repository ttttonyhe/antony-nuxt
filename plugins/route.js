// Import & configure progress bar feature
import NProgress from "nprogress"
import 'nprogress/nprogress.css'
NProgress.configure({
  easing: 'ease-in-out',
  speed: 500,
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.2
})

export default ({
  app
}) => {
  /* Before & after switching to a new route */
  app.router.beforeEach((to, from, next) => {
    // Change Title According to Path
    if (to.meta.title) {
      document.title = to.meta.title;
    }
    // Start progress bar
    NProgress.start();
    next();
  })
  app.router.afterEach(() => {
    // Complete progress bar
    NProgress.done();
  })
}
