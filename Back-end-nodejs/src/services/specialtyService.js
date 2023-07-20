import db from '../models/index';
require('dotenv').config();

let createSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            } else {
                await db.Specialty.create({
                    name: data.name,
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

let getAllSpecialty = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Specialty.findAll({

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


let getDetailSpecialtyById = (inputId, location) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId || !location) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            } else {
                let data = await db.Specialty.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: [
                        'descriptionHTML', 'descriptionMarkdown' //trong data có 2 trường descriptionHTML và descriptionMarkdown
                    ],
                })

                if (data) {
                    let doctorSpecialty = [];
                    if (location === 'ALL') {
                        doctorSpecialty = await db.Doctor_Infor.findAll({
                            where: {
                                specialtyId: inputId,
                            },
                            attributes: [
                                'doctorId', 'provinceId'
                            ],
                        })
                    } else {
                        //find by location
                        doctorSpecialty = await db.Doctor_Infor.findAll({
                            where: {
                                specialtyId: inputId,
                                provinceId: location
                            },
                            attributes: [
                                'doctorId', 'provinceId'
                            ],
                        })
                    }
                    data.doctorSpecialty = doctorSpecialty //gán vào data thêm trường doctorSpecialty
                } else data = {}
                resolve({
                    errCode: 0,
                    errMessage: "OK",
                    data
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let updateSpecialtyData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.name || !data.descriptionHTML || !data.descriptionMarkdown) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameter'
                })
            }
            let specialty = await db.Specialty.findOne({
                where: { id: data.id },
                raw: false
            })
            if (specialty) {
                specialty.name = data.name;
                specialty.descriptionHTML = data.descriptionHTML;
                specialty.descriptionMarkdown = data.descriptionMarkdown;
                if (data.imageBase64) {
                    specialty.image = data.imageBase64;
                }
                await specialty.save();

                resolve({
                    errCode: 0,
                    message: 'Update the specialty success!'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Specialty not found'
                });
            }
        } catch (e) {
            reject(e)
        }
    })
}

let deleteSpecialty = (specialtyId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let foundSpecialty = await db.Specialty.findOne({
                where: { id: specialtyId }
            })
            if (!foundSpecialty) {
                resolve({
                    errCode: 2,
                    errMessage: ` The specialty isn't exist`
                })
            }
            await db.Specialty.destroy({
                where: { id: specialtyId }
            })
            resolve({
                errCode: 0,
                message: `The specialty is deleted`
            })
        } catch (e) {
            reject(e)
        }
    })
}



module.exports = {
    createSpecialty: createSpecialty,
    getAllSpecialty: getAllSpecialty,
    getDetailSpecialtyById: getDetailSpecialtyById,
    deleteSpecialty: deleteSpecialty,
    updateSpecialtyData: updateSpecialtyData,
}