const db = require('../db')
const Sequelize = require('sequelize')

// 定义模型
var Api = db.define('apis', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    desc: {
        type: Sequelize.STRING
    },
    project_id: {
        type: Sequelize.UUID,
        allowNull: false
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false
    },
    method: {
        type: Sequelize.STRING,
        defaultValue: '',
        allowNull: true
    },
    body: {
        type: Sequelize.JSON,
        defaultValue: {},
        allowNull: true
    },
    headers: {
        type: Sequelize.JSON,
        defaultValue: '',
        allowNull: true
    },
    data: {
        type: Sequelize.JSON,
        defaultValue: '',
        allowNull: true
    },
    state: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
});

function addApi (api) {
    const { project_id, name, url, desc, headers, method, body, data } = api
    return Api.create({
        project_id,
        name,
        url,
        desc,
        headers,
        method,
        body,
        data,
        state: 1
    })
}

function selectOneApi (id) {
    return Api.findOne({
        where: {
            id: id,
            state: 1
        },
        raw: true
    })
}

function findOneApiByUrl ({ url, project_id, method = 'get', headers }) {
    return Api.findOne({
        where: {
            url,
            project_id,
            method: method.toLowerCase(),
            // headers,
            state: 1
        },
        raw: true
    })
}

function validate ({ url, project_id, }) {
    return Api.findOne({
        where: {
            url,
            project_id,
        },
        raw: true
    })
}

function selectAllApi (id) {
    return Api.findAll({
        where: {
            project_id: id,
            state: 1
        },
        raw: true,
        order: [['createdAt', 'DESC']]
    })
}

function selectApiByCondiction (condiction) {
    return Api.findAll({
        where: condiction,
        raw: true
    })
}

function deleteApi (project_id) {

    return Api.destroy({
        where: { project_id }
    })
}

function deleteOneApi (id) {

    return Api.destroy({
        where: { id }
    })
}

function updateApi (content, condition) {
    return Api.update(content, condition)
}

// Api.sync({
//     force: true     //可不传， 若为true则会删除之前的同名表，  如果为false 创建表，如果原来存在，则不创建
// }).then(function () {
//     // Table created
//     return Api.create({
//         name: 'test',
//         desc: 'test',
//         project_id: 'example',
//         url: 'xxx',
//     });
// })

module.exports = {
    addApi,
    selectAllApi,
    selectOneApi,
    deleteApi,
    updateApi,
    deleteOneApi,
    selectApiByCondiction,
    findOneApiByUrl,
    validate
}