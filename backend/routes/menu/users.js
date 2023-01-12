const { setBase64, setSHA256, getBase64 } = require('../../lib/utils/cryto')

async function getUserList (queryFun, res, errorData) {
  const sql = `
    SELECT
      user_id,
      user_name,
      user_account,
      menu_id,
      menu_name
    FROM
      user
      LEFT JOIN usermenu ON
        usermenu.userMenu_userId = user.user_id AND
        usermenu.userMenu_void = 0
      LEFT JOIN menu ON 
        menu.menu_id = usermenu.userMenu_menuId AND
        menu.menu_void = 0
    WHERE
      user_void = 0
  `

  let sqlData = null
  try {
    sqlData = await queryFun(sql)

  } catch (e) {
    console.log(e)
    res.send(errorData)

  } finally {
    let resData = {}

    sqlData.forEach(item => {
      if (!resData.hasOwnProperty(item.user_id)) {
        resData[item.user_id] = {
          id: item.user_id,
          name: item.user_name,
          account: getBase64(item.user_account),
          menuList: []
        }
      }

      if (![undefined, null].includes(item.menu_id)) {
        resData[item.user_id].menuList.push({
          id: item.menu_id,
          name: item.menu_name
        })      
      }
    })

    return Object.values(resData)
  }
}

module.exports = function (app, db, sendData, errorData) {
  const { queryFun } = db

  app.get('/menu/userList', async (req, res) => {
    let resData = await getUserList(queryFun, res, errorData)

    sendData.data = resData
    res.send(sendData)
  })

  app.post('/menu/users', async (req, res) => {
    const postData = req.body
    const { 
      userName = '',
      account: userAccount = '',
      password: userPassword = ''
    } = postData

    const sql = `
      INSERT INTO user
        (user_name, user_account, user_password)
      VALUES
        ("${userName}", "${setBase64(userAccount)}", "${setSHA256(userPassword)}")
    ;`

    try {
      sqlData = await queryFun(sql)
  
    } catch (e) {
      console.log(e)
      res.send(errorData)
  
    } finally {
      const { insertId: newUserId } = sqlData
      console.log('newUserId => ', newUserId)
    }

    sendData.data = {}
    res.send(sendData)
  })
}