const mysql = require('mysql')
const { dbSetting } = require('./db')

const con = mysql.createConnection(dbSetting)

function exec(sql) {
  sql = 'select * from users;'

  con.query(sql, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      console.log(result)
    }
  })

  con.end()
}
exec()