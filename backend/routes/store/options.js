async function getMenuList (queryFun, res, errorData) {
  const sql = `
    SELECT
      menu_id,
      menu_name
    FROM
      menu
    WHERE
      menu.menu_void = 0
  `

  let sqlData = null
  try {
    sqlData = await queryFun(sql)

  } catch (e) {
    console.log(e)
    res.send(errorData)

  } finally {
    let resData = []

    sqlData.forEach(item => {
      resData.push({
        id: item.menu_id,
        name: item.menu_name
      })
    })

    return resData
  }
}

module.exports = function (app, db, sendData, errorData) {
  const { queryFun } = db

  app.get('/store/options', async (req, res) => {
    let resData = await getMenuList(queryFun, res, errorData)

    sendData.data = resData
      
    res.send(sendData)
  })
}