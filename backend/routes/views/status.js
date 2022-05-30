const { setCookie, getCookie } = require('../../lib/utils/cookie')

async function getUserData (res, queryFun, userId) {
  const sql = `
    SELECT
      user_id,
      user_name
    FROM 
      user
    WHERE 
      user_id = ${userId} AND
      user_void = 0
  ;`

  let sqlData = null
  try {
    sqlData = await queryFun(sql)

  } catch (e) {
    console.log(e)
    res.send(errorData)

  } finally {
    resData = sqlData[0]

    let userData = {
      id: resData.user_id,
      name: resData.user_name
    }

    return userData
  }
}

async function getMenuData (res, queryFun, userId) {
  const sql = `
    SELECT
      menu_id,
      menu_name,
      menu_router,
      menu_icon
    FROM 
      userMenu
    INNER JOIN menu ON 
      menu.menu_id = userMenu_menuId AND
      menu.menu_void = 0
    WHERE 
      userMenu_userId = ${userId} AND
      userMenu_void = 0
  ;`

  let sqlData = null
  try {
    sqlData = await queryFun(sql)
    console.log(sqlData)
  } catch (e) {
    console.log(e)
    res.send(errorData)

  } finally {
    let menuData = sqlData.map(data => {
      return {
        id: data.menu_id,
        name: data.menu_name,
        router: data.menu_router,
        icon: data.menu_icon
      }
    })

    return menuData
  }
}

module.exports = function (app, db, sendData) {
  const { queryFun } = db

  app.post('/views/status', async (req, res) => {
    const postData = req.body

    let userId = postData.userId

    let resData = await Promise.all([
      getUserData(res, queryFun, userId),
      getMenuData(res, queryFun, userId)
    ])

    let statusData = JSON.stringify({
      userData: resData[0],
      menuData: resData[1]
    })
    setCookie(res, 'statusData', statusData)

    res.send(sendData)
  })
}