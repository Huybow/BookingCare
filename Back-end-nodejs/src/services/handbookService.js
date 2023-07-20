import db from '../models/index';
require('dotenv').config();

let createHandbook = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            } else {
                await db.Handbook.create({
                    name: data.name,
                    author: data.author,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown
                })
                resolve({
                    errCode: 0,
                    errMessage: "OK"
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllHandbook = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Handbook.findAll({
            });
            if (data && data.length > 0) {
                data.map(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary');
                    return item;
                })
            }
            resolve({
                errCode: 0,
                errMessage: "OK",
                data
            })
        } catch (e) {
            reject(e)
        }
    })
}

let getDetailHandbookById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            } else {
                let data = await db.Handbook.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: [
                        'name','descriptionHTML', 'descriptionMarkdown', 'image'
                    ],  
                })
                if (data) {
                    
                } else data = {}
                resolve({
                    errCode: 0,
                    errMessage: "OK",
                    data
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteHandbook = (handbookId) => {
    return new Promise(async (resolve, reject) => {
       try {
            let foundHandbook = await db.Handbook.findOne({
                where: { id: handbookId }
            })
            if (!foundHandbook) {
                resolve({
                    errCode: 2,
                    errMessage: ` The handbook isn't exist`
                })
            }
            await db.Handbook.destroy({
                where: { id: handbookId }
            })
            resolve({
                errCode: 0,
                message: `The handbook is deleted`  
            })
       } catch (e) {
            reject(e)
       }
    })
}

let updateHandbookData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.name || !data.author || !data.descriptionHTML || !data.descriptionMarkdown) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameter'
                })
            }
            let handbook = await db.Handbook.findOne({
                where: { id: data.id },
                raw: false
            })
            if (handbook) {
                handbook.name = data.name;
                handbook.author = data.author;
                handbook.descriptionHTML = data.descriptionHTML;
                handbook.descriptionMarkdown = data.descriptionMarkdown;
                if (data.imageBase64) {
                    handbook.image = data.imageBase64;
                }
                await handbook.save();

                resolve({
                    errCode: 0,
                    message: 'Update the hand book success!'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Hand book not found'
                });
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createHandbook: createHandbook,
    getAllHandbook: getAllHandbook,
    getDetailHandbookById: getDetailHandbookById,
    deleteHandbook: deleteHandbook,
    updateHandbookData: updateHandbookData
}