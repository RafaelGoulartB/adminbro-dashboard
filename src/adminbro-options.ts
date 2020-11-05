import AdminBro from 'admin-bro'
import AdminBroMongoose from '@admin-bro/mongoose'

export { }

const Cotations = require('./db/Cotations')
const Users = require('./db/Users')

AdminBro.registerAdapter(AdminBroMongoose)

const contentNavigation = {
  name: 'Dados'
}

const adminBroOptions = new AdminBro({
  resources: [
    {
      resource: Users,
      options: {
        navigation: contentNavigation,
        properties: {
          email: { isVisible: { list: true, filter: true, show: true, edit: true }, type: 'email' },
          password: { isVisible: { list: false, filter: false, show: false, edit: true }, type: 'password' },
          updatedAt: { isVisible: { list: true, filter: true, show: true, edit: false } },
          createdAt: { isVisible: { list: true, filter: true, show: true, edit: false } }
        }
      }
    },
    { resource: Cotations, options: { navigation: contentNavigation } }
  ],
  locale: {
    translations: {
      labels: {
        Users: 'Usuarios',
        Cotations: 'Cotações'
      }
    }
  },
  rootPath: '/admin'
})

module.exports = adminBroOptions
