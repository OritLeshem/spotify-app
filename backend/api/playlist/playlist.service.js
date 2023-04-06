const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId
// let filterBy="draw"
async function query() {
    try {

        const collection = await dbService.getCollection('playlist')
        var playlists = await collection.find().toArray()
        return playlists
    } catch (err) {
        logger.error('cannot find playlists', err)
        throw err
    }
}


async function getById(playlistId) {
    try {
        const collection = await dbService.getCollection('playlist')
        const playlist = await collection.findOne({ _id: new ObjectId(playlistId) });
        return playlist
    } catch (err) {
        logger.error(`while finding playlist ${playlistId}`, err)
        throw err
    }
}
async function remove(playlistId) {
    try {
        const collection = await dbService.getCollection('playlist')
        // await collection.deleteOne({ _id: ObjectId(playlistId) })
        await collection.deleteOne({ _id: new ObjectId(playlistId) });

        return playlistId
    } catch (err) {
        logger.error(`cannot remove playlist ${playlistId}`, err)
        throw err
    }
}
async function add(playlist) {
    try {

        const collection = await dbService.getCollection('playlist')
        await collection.insertOne(playlist)
        return playlist
    } catch (err) {
        logger.error('cannot insert playlist', err)
        throw err
    }
}
async function update(playlist) {
    try {
        const playlistToSave = {
            name: playlist.name,
            imgUrl: playlist.imgUrl,
            songs: playlist.songs,
            createdBy: playlist.createdBy,

        }
        const collection = await dbService.getCollection('playlist')
        await collection.updateOne({ _id: new ObjectId(playlist._id) }, { $set: playlistToSave })
        return playlist
    } catch (err) {
        logger.error(`cannot update playlist ${playlist._id}`, err)
        throw err
    }

}


module.exports = {
    remove,
    query,
    getById,
    add,
    update,

}