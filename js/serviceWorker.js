const staticTodoApp = "ToDoApp-site-v1"
const assets = [
	"/",
	"/index.html",
	"/homePage.html",
	"/signUp.html",
	"/css/globalStyles.css",
	"/css/loginSignupStyles.css",
	"/css/styles.css",
	"/js/login.js",
	"/scripts/signUp.js",
	"/scripts/script.js",
	"/scripts/utils.js",
]

self.addEventListener("install", installEvent => {
	installEvent.waitUntil(
		caches.open(staticTodoApp).then(cache => {
			cache.addAll(assets)
		})
	)
})

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})