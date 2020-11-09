import AdminBro from 'admin-bro'
import AdminBroMongoose from '@admin-bro/mongoose'
import bcrypt from 'bcrypt'

import Users from './db/Users'
import Cotations from './db/Cotations'

AdminBro.registerAdapter(AdminBroMongoose)

const contentNavigation = {
  name: 'Dados'
}

const canEditCotations = ({ currentAdmin, record }: any) => {
  return currentAdmin && (
    currentAdmin.role === 'admin' ||
    currentAdmin._id === record.param('ownerId')
  )
}
const canModifyUsers = ({ currentAdmin }: any) => currentAdmin && currentAdmin.role === 'admin'

const adminBroOptions = new AdminBro({
  resources: [
    {
      resource: Users,
      options: {
        navigation: contentNavigation,
        properties: {
          email: { isVisible: { list: true, filter: true, show: true, edit: true }, type: 'email' },
          encryptedPassword: { isVisible: false, type: 'password' },
          password: {
            type: 'password',
            isVisible: {
              list: false, edit: true, filter: false, show: false
            }
          },
          updatedAt: { isVisible: { list: true, filter: true, show: true, edit: false } },
          createdAt: { isVisible: { list: true, filter: true, show: true, edit: false } }
        },
        actions: {
          new: {
            before: async (request: any) => {
              if (request.payload.password) {
                request.payload = {
                  ...request.payload,
                  encryptedPassword: await bcrypt.hash(request.payload.password, 10),
                  password: undefined
                }
              }
              return request
            },
            isAccessible: canModifyUsers
          },
          edit: { isAccessible: canModifyUsers },
          delete: { isAccessible: canModifyUsers }
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
          history: { isVisible: { list: false, filter: false, show: true, edit: false } },
          ownerId: { isVisible: { edit: false, show: true, list: true, filter: true } },
          updatedAt: { isVisible: { list: true, filter: true, show: true, edit: false } },
          createdAt: { isVisible: { list: true, filter: true, show: true, edit: false } }
        },
        actions: {
          edit: {
            isAccessible: canEditCotations,
            // Add price to history
            after: async (originalResponse: any, request: any, context: any) => {
              const dateNow = new Date()

              if (request.method === 'post') {
                const cotation: any = await Cotations.findByIdAndUpdate(request.payload._id, {
                  ...request.payload
                }, { new: true })

                cotation.history.push({
                  x: `${dateNow.getDate()}/${dateNow.getMonth() + 1}/${dateNow.getFullYear()}`,
                  y: request.payload.price
                })

                if (cotation.history.length > 6) cotation.history.shift()

                cotation.save()
              }

              return originalResponse
            }
          },
          delete: { isAccessible: canEditCotations },
          new: {
            before: async (request: any, { currentAdmin }: any) => {
              const dateNow = new Date()

              request.payload = {
                ...request.payload,
                ownerId: currentAdmin._id,
                history: [{
                  x: `${dateNow.getDate()}/${dateNow.getMonth() + 1}/${dateNow.getFullYear()}`,
                  y: request.payload.price
                }]
              }
              return request
            }
          }
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

export default adminBroOptions
