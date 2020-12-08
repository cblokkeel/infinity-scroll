const imageContainer = document.querySelector('#image-container')
const loader = document.querySelector('#loader')

let ready = false
let imagesLoaded = 0
let totalImages = 0
let photosArray = []

let apiCount = 5 
const apiKey = 'A2BMf-05LYa2m3mmPxoUlQsYloPozAv_Oi9w8QWV3y8'
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${apiCount}&query=`

const imageLoaded = () => {
    imagesLoaded++
    if (imagesLoaded === totalImages) {
        ready = true
        loader.hidden = true
        apiCount = 20
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${apiCount}&query=`
    }
}

const setAttributes = (element, attributes) => {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

const getPhotos = async () => {
    try {
        const res = await fetch(apiUrl)
        photosArray = await res.json()
        displayPhotos()
    } catch (err) {
        console.log('error happened', err)
    }
}

const displayPhotos = () => {
    imagesLoaded = 0
    totalImages = photosArray.length
    photosArray.forEach(photo => {
        const item = document.createElement('a')
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })

        const img = document.createElement('img')
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,    
            title: photo.alt_description    
        })
        img.addEventListener('load', imageLoaded)
        item.appendChild(img)
        imageContainer.appendChild(item)
    })
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1300 && ready) {
        getPhotos()
        ready = false
    }
})

getPhotos()