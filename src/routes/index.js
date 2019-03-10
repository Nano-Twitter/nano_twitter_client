import _ from 'lodash'
let routes = [
    {
        path: '/login',
        name: 'login',
        authentication: false,
        login: true, // jump to home if logged in
        icon: '',
        menu: false// show in menu?
    },
    {
        path: '/register',
        name: 'register',
        authentication: false,
        login: false, // jump to home if logged in
        icon: '',
        menu: false// show in menu?
    },
    {
        path: '/home',
        name: 'home',
        authentication: true,
        login: false, // jump to home if logged in
        icon: '',
        menu: true
    },
    {
        path: '/',
        name: 'home',
        authentication: true,
        login: false, // jump to home if logged in
        icon: '',
        menu: true,
        exact: true
    },
]
let defaultRoute = {
    menu: false,
    authentication: false,
    login: false,
    exact: false
}
routes = routes.map((val) => _.assign({}, defaultRoute, val))

let menuRoutes = _.filter(routes, { menu: true, authentication: true })
let unLogMenuRoutes = _.filter(routes, { menu: true, authentication: false })
export default { routes, menuRoutes, unLogMenuRoutes }
