const { setBase64, setSHA256, getBase64 } = require('../../lib/utils/cryto')
// 取得使用者列表
async function getUserList (queryFun, res, errorData, {
  pageSize,
  currentPage,
  filter
}) {
  const from = (pageSize * (currentPage - 1) )
  const sql = `
    SELECT
      user_id,
      user_name,
      user_account,
      menu_id,
      menu_name
    FROM
      (
        SELECT * FROM user
        WHERE user_void = 0
        LIMIT ${from}, ${pageSize}
      ) AS temp_user
    LEFT JOIN usermenu ON
      usermenu.userMenu_userId = temp_user.user_id AND
      usermenu.userMenu_void = 0
    LEFT JOIN menu ON 
      menu.menu_id = usermenu.userMenu_menuId AND
      menu.menu_void = 0
  `

  let sqlData = []
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
// 取的使用者數量
async function getUserCount (queryFun, res, errorData, filter) {
  const sql = `
    SELECT 
      COUNT(1)
    FROM 
      user
    WHERE user_void = 0
  `
  let sqlData = null
  try {
    sqlData = await queryFun(sql)

  } catch (e) {
    console.log(e)
    res.send(errorData)

  } finally {
    const resData = sqlData[0]['COUNT(1)']
    return resData
  }
}
// 取得單一使用者
async function getUser (queryFun, res, errorData, userId = 0) {
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
      user_void = 0 AND
      user_id = ${userId}
  `

  let sqlData = []
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
        // resData[item.user_id].menuList.push({
        //   id: item.menu_id,
        //   name: item.menu_name
        // })
        resData[item.user_id].menuList.push(item.menu_id) 
      }
    })
    console.log(resData)

    const temp = Object.values(resData)
    if (temp.length > 0) {
      return temp[0]
    } else {
      return {
        name: '',
        account: '',
        password: '',
        menuList: []
      }
    }
  }
}
// 新增使用者
async function createUser (queryFun, res, errorData, {
  name = '',
  account = '',
  password = ''
}) {
  const sql = `
    INSERT INTO 
      user
      (user_name, user_account, user_password)
    VALUES
      ("${name}", "${setBase64(account)}", "${setSHA256(password)}")
  ;`

  let resId = null
  try {
    sqlData = await queryFun(sql)

    const { insertId } = sqlData
    resId = insertId
  } catch (e) {
    console.log(e)
    res.send(errorData)
  } finally {
    return resId
  }
}
// 新增使用者後 接者新增 使用者對應的功能選單
async function createUserMenu (queryFun, res, errorData, {
  userId = 0,
  menuList = []
}) {
  if (menuList.length <= 0) return

  const sql = `
    INSERT INTO 
      usermenu
      (userMenu_userId, userMenu_menuId)
    VALUES
      ${menuList.map(menuId => {
        return `(${userId}, ${menuId})`
      }).join(', ')}
  ;`

  try {
    sqlData = await queryFun(sql)
  } catch (e) {
    console.log(e)
    res.send(errorData)
  }
}
// 更新使用者資料 包含 對應功能選單
async function updateUser (queryFun, res, errorData, {
  userId = 0,
  name = '',
  account = '',
  password = ''
}) {
  const sqlColumnList = [
    {
      column: 'user_name',
      value: name
    },
    {
      column: 'user_account',
      value: setBase64(account)
    }
  ]

  if (password !== '') {
    sqlColumnList.push({
      column: 'user_password',
      value: setSHA256(password)
    })
  }

  const sql = `
    UPDATE 
      user
    SET 
      ${sqlColumnList.map(item => {
        return `${item.column} = "${item.value}"`
      }).join(', ')}
    WHERE
      user.user_id = ${userId}
  ;`

  try {
    sqlData = await queryFun(sql)
  } catch (e) {
    console.log(e)
    res.send(errorData)
  }
}
// 作廢使用者 所有對應功能選單
async function voidUserMenu (queryFun, res, errorData, userId = 0) {
  const sql = `
    UPDATE 
      usermenu
    SET 
      userMenu_void = 1
    WHERE
      userMenu_userId = ${userId}
  ;`

  try {
    sqlData = await queryFun(sql)
  } catch (e) {
    console.log(e)
    res.send(errorData)
  }
}
// 作廢使用者
async function deleteUser (queryFun, res, errorData, userId = 0) {
  const sql = `
    UPDATE 
      user
    SET 
      user_void = 1
    WHERE
      user_id = ${userId}
  ;`

  try {
    sqlData = await queryFun(sql)
  } catch (e) {
    console.log(e)
    res.send(errorData)
  }
}

async function updateUserMenu (queryFun, res, errorData, {
  userId = 0,
  menuList = []
}) {
  if (menuList.length <= 0) return

  const sql = `
    INSERT INTO 
      usermenu
      (userMenu_userId, userMenu_menuId, userMenu_void)
    VALUES
      ${menuList.map(menuId => {
        return `(${userId}, ${menuId}, 0)`
      }).join(', ')}
    ON DUPLICATE KEY UPDATE
      userMenu_void = 0
  ;`

  try {
    sqlData = await queryFun(sql)
  } catch (e) {
    console.log(e)
    res.send(errorData)
  }
}

module.exports = function (app, db, sendData, errorData) {
  const { queryFun } = db

  app.post('/menu/getUserList', async (req, res) => {
    const postData = req.body
    const { 
      pageSize = 10,
      currentPage = 1,
      filter = {}
    } = postData
    
    const resData = await getUserList(queryFun, res, errorData, {
      pageSize,
      currentPage,
      filter
    })

    sendData.data = resData
    res.send(sendData)
  })

  app.post('/menu/getUserCount', async (req, res) => {
    const postData = req.body
    const { filter = {} } = postData
    
    const resData = await getUserCount(queryFun, res, errorData, filter)

    sendData.data = resData
    res.send(sendData)
  })

  app.post('/menu/getUser', async (req, res) => {
    const postData = req.body
    const { userId = 0 } = postData

    const resData = await getUser(queryFun, res, errorData, userId)

    sendData.data = resData
    res.send(sendData)
  })

  app.post('/menu/createUser', async (req, res) => {
    const postData = req.body
    const { 
      name = '',
      account = '',
      password = '',
      menuList = []
    } = postData

    const newUserId = await createUser(queryFun, res, errorData, {
      name,
      account,
      password
    })

    await createUserMenu(queryFun, res, errorData, {
      userId: newUserId,
      menuList
    })

    sendData.data = { newUserId }
    res.send(sendData)
  })

  app.put('/menu/updateUser', async (req, res) => {
    const postData = req.body
    const {
      userId = 0,
      name = '',
      account = '',
      password = '',
      menuList = []
    } = postData

    await Promise.all([
      updateUser(queryFun, res, errorData, {
        userId,
        name,
        account,
        password
      }),
      voidUserMenu(queryFun, res, errorData, userId)
    ])

    await updateUserMenu(queryFun, res, errorData, {
      userId,
      menuList
    })

    sendData.data = { userId }
    res.send(sendData)
  })

  app.delete('/menu/deleteUser', async (req, res) => {
    const postData = req.body
    const { userId = 0 } = postData

    await deleteUser(queryFun, res, errorData, userId)

    sendData.data = { userId }
    res.send(sendData)
  })
}