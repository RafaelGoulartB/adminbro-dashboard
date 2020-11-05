import AdminBro from 'admin-bro'
import AdminBroMongoose from '@admin-bro/mongoose'

import Users from './db/Users'
import Cotations from './db/Cotations'

export { }

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
        },
        actions: {
          myNewAction: {
            // create a totally new action
            icon: 'View',
            actionType: 'record',
            handler: () => { }
          }
        }
      }
    },
    {
      resource: Cotations,
      options: {
        navigation: contentNavigation,
        properties: {
          name: { isVisible: true },
          price: { isVisible: true, type: 'number' },
          city: { isVisible: { list: false, filter: true, show: true, edit: true } },
          history: { isVisible: false },
          updatedAt: { isVisible: { list: true, filter: true, show: true, edit: false } },
          createdAt: { isVisible: { list: true, filter: true, show: true, edit: false } }
        }
      }
    }
  ],
  locale: {
    language: 'pl',
    translations: {
      labels: {
        Users: 'Usuarios',
        Cotations: 'Cotações'
      }
    }
  },
  dashboard: {
    handler: async () => {
      return { some: 'output' }
    },
    component: AdminBro.bundle('./components/my-dashboard-component')
  },
  rootPath: '/admin'
})

module.exports = adminBroOptions
