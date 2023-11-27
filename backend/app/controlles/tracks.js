const { httpError } = require('../helpers/handleError')
const userModel = require('../models/users')
const PORT = process.env.PORT || 3000
const URL_PUBLIC = process.env.URL_PUBLIC || '/'
const getItems = async(req, res) => {
    try {
        const listAll = [{
                "_id": 1,
                "name": "Getting Over",
                "album": "One Love",
                "cover": "data:image/jpeg;base64,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",
                "artist": {
                    "name": "David Guetta",
                    "nickname": "David Guetta",
                    "nationality": "FR"
                },
                "duration": {
                    "start": 0,
                    "end": 333
                },
                "url": `${URL_PUBLIC}/track.mp3`
            },
            {
                "_id": 2,
                "name": "Snow Tha Product || BZRP Music Sessions #39",
                "album": "BZRP Music Sessions",
                "cover": "https://is5-ssl.mzstatic.com/image/thumb/Features125/v4/9c/b9/d0/9cb9d017-fcf6-28c6-81d0-e9ac5b0f359e/pr_source.png/800x800cc.jpg",
                "artist": {
                    "name": "Snow",
                    "nickname": "Snow",
                    "nationality": "US"
                },
                "duration": {
                    "start": 0,
                    "end": 333
                },
                "url": `${URL_PUBLIC}/track-1.mp3`
            },
            {
                "_id": 3,
                "name": "Calypso (Original Mix)",
                "album": "Round Table Knights",
                "cover": "https://cdns-images.dzcdn.net/images/cover/1db3f8f185e68f26feaf0b9d72ff1645/350x350.jpg",
                "artist": {
                    "name": "Round Table Knights",
                    "nickname": "Round Table Knights",
                    "nationality": "US"
                },
                "duration": {
                    "start": 0,
                    "end": 333
                },
                "url": `${URL_PUBLIC}/track-2.mp3`
            },
            {
                "_id": 4,
                "name": "Bad Habits",
                "album": "Ed Sheeran",
                "cover": "https://www.lahiguera.net/musicalia/artistas/ed_sheeran/disco/11372/tema/25301/ed_sheeran_bad_habits-portada.jpg",
                "artist": {
                    "name": "Ed Sheeran",
                    "nickname": "Ed Sheeran",
                    "nationality": "UK"
                },
                "duration": {
                    "start": 0,
                    "end": 333
                },
                "url": `${URL_PUBLIC}/track-4.mp3`
            },
            {
                "_id": 5,
                "name": "BEBE (Official Video)",
                "album": "Giolì & Assia",
                "cover": "https://i.scdn.co/image/ab67616d0000b27345ca41b0d2352242c7c9d4bc",
                "artist": {
                    "name": "Giolì & Assia",
                    "nickname": "Giolì & Assia",
                    "nationality": "IT"
                },
                "duration": {
                    "start": 0,
                    "end": 333
                },
                "url": `${URL_PUBLIC}/track-3.mp3`
            },
            {
                "_id": 6,
                "name": "T.N.T. (Live At River Plate, December 2009)",
                "album": "AC/DC",
                "cover": "https://cdns-images.dzcdn.net/images/cover/ba5eaf2f3a49768164d0728b7ba64372/500x500.jpg",
                "artist": {
                    "name": "AC/DC",
                    "nickname": "AC/DC",
                    "nationality": "US"
                },
                "duration": {
                    "start": 0,
                    "end": 333
                },
                "url": `${URL_PUBLIC}/track-5.mp3`
            },
            {
                "_id": 7,
                "name": "50 Cent - Candy Shop (feat. Olivia)",
                "album": "50 Cent",
                "cover": "https://i.scdn.co/image/ab67616d0000b27391f7222996c531b981e7bb3d",
                "artist": {
                    "name": "50 Cent",
                    "nickname": "50 Cent",
                    "nationality": "US"
                },
                "duration": {
                    "start": 0,
                    "end": 333
                },
                "url": `${URL_PUBLIC}/track-6.mp3`
            },
            {
                "_id": 8,
                "name": "Bésame💋",
                "album": "Valentino Ft MTZ Manuel Turizo (Video Oficial)",
                "cover": "https://i1.sndcdn.com/artworks-000247627460-1hqnjr-t500x500.jpg",
                "artist": {
                    "name": "Valentino",
                    "nickname": "Valentino",
                    "nationality": "CO"
                },
                "duration": {
                    "start": 0,
                    "end": 333
                },
                "url": `${URL_PUBLIC}/track-7.mp3`
            }
        ]
        res.send({ data: listAll })
    } catch (e) {
        httpError(res, e)
    }
}

const getItem = (req, res) => {

}

const createItem = async(req, res) => {
    try {
        const { name, age, email } = req.body
        const resDetail = await userModel.create({
            name,
            age,
            email
        })
        res.send({ data: resDetail })
    } catch (e) {
        httpError(res, e)
    }
}


const updateItem = (req, res) => {

}

const deleteItem = (req, res) => {

}

module.exports = { getItem, getItems, deleteItem, createItem, updateItem }