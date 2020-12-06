const exec = require('../db/mysql')


const getinfo = async (userid) => {
    const sql = `select * from user where userid=?`
    const rows = await exec([[sql,[userid]]])
    return rows[0][0]||{}
}


const updateinfo = async (userid, Data = {}) => {

    const username = Data.username
    const email = Data.email

    const sql = `
        update user set username=?, email=? where userid=? `

    const updateData = await exec([[sql,[username,email,userid]]])
    if (updateData[0].affectedRows > 0) {
        return true
    }
    return false
}

const delaccount = async userid => {
    const sql = `delete from user where userid=?;`
    const delData = await exec([[sql,[userid]]])
    if (delData[0].affectedRows > 0) {
        return true
    }
    return false
}

module.exports = {
    getinfo,
    updateinfo,
    delaccount
}