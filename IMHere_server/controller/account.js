const exec = require('../db/mysql')


const login = async (username, password) => {
    console.log(username)
    const username1 = JSON.stringify(username)
    const sql = `
    select userid from user where username= ? and password= ?
`
    const rows = await exec([
        [sql, [username, password]]
    ])
    return rows[0][0] || {} //返回二维数组，只有一个值
}

const register = async (Data = {}) => {
    const username = Data.username
    const password = Data.password
    // const account = Data.account
    if (Data.email) {
        email = Data.email
    } else {
        email = 'NULL'
    }
    if (Data.mobile) {
        mobile = Data.mobile
    } else {
        mobile = 0
    }
    const sql = `
        insert into user (username, password, email, mobile)
        values (?,?,?,?);
    `
    const insertData = await exec([
        [sql, [username, password, email,mobile]]
    ])
    if (insertData[0].affectedRows > 0) {
        return true
    }
    return false
}


const delaccount = async userid => {

    const sql = `delete from user where userid=?;`
    const delData = await exec([
        [sql, [userid]]
    ])
    if (delData[0].affectedRows > 0) {
        return true
    }
    return false
}

module.exports = {
    login,
    register,
    delaccount
}