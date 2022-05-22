const userData = {
  id: 1,
  name: 'xiechenchan'
}

const menuData = [
  {
    id: 1,
    icon: 'fas home',
    name: '基本設定',
    router: 'Setting'
  },
  {
    id: 2,
    icon: 'fas users',
    name: '使用者管理',
    router: 'Users'
  },
  {
    id: 3,
    icon: 'fas users',
    name: '帳號管理',
    router: 'Account'
  },
  {
    id: 4,
    icon: 'fas users',
    name: '權限管理',
    router: 'System'
  }
]

module.exports = {
  userData,
  menuData
}