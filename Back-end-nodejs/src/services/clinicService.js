import db from '../models/index';
require('dotenv').config();

let createClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.address || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            } else {
                await db.Clinic.create({
                    name: data.name,
                    address: data.address,
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

let getAllClinic = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Clinic.findAll({

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
            reject(e);
        }
    })
}


let getDetailClinicById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            } else {
                let data = await db.Clinic.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: [
                        'name','address','descriptionHTML', 'descriptionMarkdown','image' //trong data có 2 trường descriptionHTML và descriptionMarkdown
                    ],
                })

                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary');

                }

                if (data) {
                    let doctorClinic = [];
                    doctorClinic = await db.Doctor_Infor.findAll({
                        where: {
                            clinicId: inputId,
                        },
                        attributes: [
                            'doctorId'
                        ],
                    })

                    data.doctorClinic = doctorClinic //gán vào data thêm trường doctorClinic
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


let deleteClinic = (clinicId) => {
    return new Promise(async (resolve, reject) => {
       try {
            let foundClinic = await db.Clinic.findOne({
                where: { id: clinicId }
            })
            if (!foundClinic) {
                resolve({
                    errCode: 2,
                    errMessage: ` The clinic isn't exist`
                })
            }
            await db.Clinic.destroy({
                where: { id: clinicId }
            })
            resolve({
                errCode: 0,
                message: `The clinic is deleted`  
            })
       } catch (e) {
            reject(e)
       }
    })
}


let updateClinicData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.name || !data.address || !data.descriptionHTML || !data.descriptionMarkdown) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameter'
                })
            }
            let clinic = await db.Clinic.findOne({
                where: { id: data.id },
                raw: false
            })
            if (clinic) {
                clinic.name = data.name;
                clinic.address = data.address;
                clinic.descriptionHTML = data.descriptionHTML;
                clinic.descriptionMarkdown = data.descriptionMarkdown;
                if (data.imageBase64) {
                    clinic.image = data.imageBase64;
                }
                await clinic.save();

                resolve({
                    errCode: 0,
                    message: 'Update the clinic success!'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Clinic not found'
                });
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createClinic: createClinic,
    getAllClinic: getAllClinic,
    getDetailClinicById: getDetailClinicById,
    deleteClinic: deleteClinic,
    updateClinicData: updateClinicData
}