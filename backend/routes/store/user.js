// const { userData } = require('./FakeData')

module.exports = function (app, db, sendData, errorData) {
  const { queryFun } = db

  app.post('/store/user', async (req, res) => {
    const postData = req.body

    const sql = `
      SELECT
        user_id,
        user_name,
        user_account,
        user_password
      FROM user
      WHERE user_id = ${postData.userId}
    ;`

    let sqlData = null
    let resData = null
    try {
      sqlData = await queryFun(sql)

    } catch (e) {
      console.log(e)
      res.send(errorData)

    } finally {
      resData = sqlData[0]

      sendData.data = {
        id: null,
        name: null
      }
      res.send(sendData)
    }
  })
}