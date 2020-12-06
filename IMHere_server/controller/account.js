const exec = require('../db/mysql')

const login = async (username, password) => {
    const username1 = JSON.stringify(username)
    const sql = `
    select username from user where username= ? and password= ?
`
    const rows = await exec([[sql,[username,password]]])
    return rows[0][0] || {}  //返回二维数组，只有一个值
}

const register = async (Data = {}) => {
    const username = Data.username
    const password = Data.password
    const account = Data.account
    if(Data.email){
        email = Data.email
    }else{
        email = 'NULL'
    }
    const sql = `
        insert into user (username, password, account, email)
        values (?,?,?,?);
    `
    const insertData = await exec([[sql,[username,username,account,email]]])
    if (insertData[0].affectedRows > 0) {
        return true
    }
    return false
}


module.exports = {
    login,
    register
}