const userData = {
  id: 1,
  name: 'xiechenchan'
}

const menuData = [
  {
    id: 1,
    icon: 'fa-solid fa-file-signature',
    name: '基本資料',
    router: 'Setting'
  },
  {
    id: 2,
    icon: 'fa-solid fa-user-gear',
    name: '使用者管理',
    router: 'Users'
  },
  {
    id: 3,
    icon: 'fa-solid fa-id-card',
    name: '帳號管理',
    router: 'Account'
  },
  {
    id: 4,
    icon: 'fa-solid fa-bars-progress',
    name: '系統管理',
    router: 'System'
  }
]

module.exports = {
  userData,
  menuData
}