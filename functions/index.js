const {initializeApp} = require("firebase-admin/app");
const functions = require("firebase-functions");
const {getFirestore} = require("firebase-admin/firestore");
const pokemon = require ('pokemontcgsdk')

initializeApp();

exports.createSet = functions
    .firestore.document("/sets/{documentId}")
    .onCreate(async (collection, context) => {
        const db = getFirestore();
        pokemon.configure({apiKey: "6461b57a-0319-4fd7-b28e-87c4bcb5739e"})
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



