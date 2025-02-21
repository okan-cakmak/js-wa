import { HttpError } from 'wasp/server';

export const getApplications = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401)
  }

  return context.entities.WebsocketApp.findMany({
    where: { userId: context.user.id },
    orderBy: { createdAt: 'desc' }
  })
}

export const createApplication = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401)
  }

  const app = await context.entities.WebsocketApp.create({
    data: {
      name: args.name || 'New Application',
      description: args.description || '',
      userId: context.user.id,
      key: generateRandomString(32),
      secret: generateRandomString(32)
    }
  })

  return app
}

export const updateApplication = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401)
  }

  const app = await context.entities.WebsocketApp.findFirst({
    where: { id: args.id, userId: context.user.id }
  })

  if (!app) {
    throw new HttpError(404, 'Application not found')
  }

  return context.entities.WebsocketApp.update({
    where: { id: args.id },
    data: {
      enabled: args.enabled !== undefined ? args.enabled : app.enabled
    }
  })
}

function generateRandomString(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
} 