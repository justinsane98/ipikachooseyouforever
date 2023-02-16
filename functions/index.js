const {initializeApp} = require("firebase-admin/app");
const functions = require("firebase-functions");
const {getFirestore} = require("firebase-admin/firestore");
const pokemon = require ('pokemontcgsdk')
const timestamp = require('time-stamp')

initializeApp();

pokemon.configure({apiKey: "6461b57a-0319-4fd7-b28e-87c4bcb5739e"})
const db = getFirestore();

exports.createSet = functions
    .firestore.document("/sets/{documentId}")
    .onCreate(async (collection, context) => {
        await pokemon.card.all({ q: `set.id:${collection.id}`})
        .then((cards) => {            
            cards.forEach((card) => {
                if(card.supertype === "Pokémon") {
                    db.collection(`sets/${collection.id}/cards`).doc(card.id).set(
                        {
                            id: card.id,
                            name: card.name,
                            image: card.images.large ?? card.images.small ?? "",
                            price: card.cardmarket.prices.averageSellPrice ?? card.cardmarket.prices.avg30
                        }
                    )
                }
            })
        })
        return Promise.resolve();
    });


exports.fetchAvailableSets = functions
    .https.onRequest(async (req, res) => {
        let setCount = 0;
        await pokemon.set.all().then((sets) => {
            sets.forEach((set, index) => {
                db.collection("availableSets").doc(set.id).set({
                    id: set.id,
                    name: set.name,
                    series: set.series,
                    total: set.total,
                    releaseDate: set.releaseDate,
                    standard: set.legalities.standard === "Legal" ? true : false,
                    expanded: set.legalities.expanded === "Legal" ? true : false,
                    unlimited: set.legalities.unlimited === "Legal" ? true : false,
                    updatedAt: set.updatedAt,
                    lastFetched: timestamp('YYYY/MM/DD HH:mm:ss')
                })
            })
        })
        res.status(200).send(setCount + " sets available");
        return Promise.resolve();
    });

