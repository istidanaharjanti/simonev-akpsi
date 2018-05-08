import Cookies from 'js-cookie';

const cookies = Cookies.get('userSession');


const items = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
  },
]

if (typeof cookies !== 'undefined') {
  const sessionCookie = JSON.parse(Cookies.get('userSession'))
  const userData = sessionCookie.data ? sessionCookie.data : {}
  if (userData.jabatan === 'kabag' || userData.jabatan === 'kabiro') {
    items.push({
      name: 'Data Paket',
      url: '/data-paket',
      icon: 'icon-folder'
    })
  }
  if (userData.jabatan === 'kpa') {
    items.push({
      name: 'Data Paket',
      url: '/data-paket-kpa',
      icon: 'icon-folder'
    })
  }
}


export default {
  items
};