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
    // Start progress bar
    NProgress.inc();
    next();
  })
  app.router.afterEach(() => {
    // Complete progress bar
    NProgress.done();
  })
}
