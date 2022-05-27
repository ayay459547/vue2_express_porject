const { setBase64, setSHA256 } = require('../../lib/utils/cryto')

module.exports = function (app, db, sendData) {
  const { queryFun } = db

  app.post('/views/login', async (req, res) => {
    const postData = req.body

    const sql = `
      SELECT
        user_id,
        user_name
      FROM user
      WHERE 
        user_account = "${setBase64(postData.account)}" AND
        user_password = "${setSHA256(postData.password)}" AND
        user_void = 0
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

      let userId = resData?.user_id ?? 0

      sendData.data = userId

      res.send(sendData)
    }
  })
}