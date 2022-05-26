const mysql = require('mysql')

const dbSetting = {
  host: '127.0.0.1',
  user: 'root',
  password: '',
  port: 3306,
  database: 'manage'
}

/**
 * 用sql 語法操作 mysql資料庫
 * @param {String} sql 
 * @returns {Object}
 */
const queryFun = function(sql) {
  const con = mysql.createConnection(dbSetting)

  return new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) {
        reject('抓取資料失敗')
        // throw(err)
      }
      resolve(result)
    })

    con.end()
  })
}

module.exports = {
  mysql,
  dbSetting,
  queryFun
}