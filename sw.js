var CACHE_NAME = 'myChache';
var urlsToCache = [
    "/",
    "/index.html",
    "/index.php",
    "/manifest.json",
    "/conposer.json",
    "/sw.js",
    "Build/Structure-WebGL.data.unityweb",
    "Build/Structure-WebGL.flamework.js.unityweb",
    "Build/Structure-WebGL.loader.js",
    "Build/Structure-WebGL.wasm.unityweb",
    "TemplateData/style.css",
    "TemplateData/maskable_icon_x192.png",
    "TemplateData/maskable_icon_x512.png",
    "TemplateData/android-chrome-192x192.png",
    "TemplateData/android-chrome-512x512.png",
    "TemplateData/apple-touch-icon.png",
    "TemplateData/fullscreen-button.png",
    "TemplateData/progress-bar-empty-dark.png",
    "TemplateData/progress-bar-empty-light.png",
    "TemplateData/progress-bar-full-dark.png",
    "TemplateData/progress-bar-full-light.png",
    "TemplateData/unity-logo-dark.png",
    "TemplateData/unity-logo-light.png",
    "TemplateData/webgl-logo.png",
];

//installイベントの場合
//前述のファイルパスをすべてキャッシュに登録する
self.addEventListener('install', function(event) {
    event.waitUntil(caches.open(CACHE_NAME).then(function(cache) {
        return cache.addAll(urlsToCache);
    }));
});

//fetchイベントの場合
//ウェブサイトへのアクセスが成功すれば取得できた内容をキャッシュに保存した上でアプリで表示する。
//ウェブサイトへのアクセスが失敗すれば保存されているキャッシュをアプリで表示する。
self.addEventListener('fetch', function(event) {
   event.respondWith(async function() {
        try{
            var res = await fetch(event.request);
            var cache = await caches.open(CACHE_NAME);
            cache.put(event.request.url, res.clone());
            return res;
        }
        catch(error){
            console.log('Using cache');
            return caches.match(event.request);
        }
    }());
});
