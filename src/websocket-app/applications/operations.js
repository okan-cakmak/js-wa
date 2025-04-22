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

export const getApplication = async ({ id }, context) => {
  if (!context.user) {
    throw new HttpError(401)
  }

  if (!id) {
    throw new HttpError(400, 'Application ID is required')
  }

  const app = await context.entities.WebsocketApp.findFirst({
    where: { 
      id: id.toString(),
      userId: context.user.id 
    }
  })

  if (!app) {
    throw new HttpError(404, 'Application not found')
  }

  // Get latest metrics for the app
  const latestMetric = await context.entities.AppMetrics.findFirst({
    where: { id: app.id },
    orderBy: { createdAt: 'desc' }
  });

  const metrics = latestMetric?.metrics || {};

  return {
    ...app,
    soketi_connected: metrics.soketi_connected || 0,
    soketi_new_connections_total: metrics.soketi_new_connections_total || 0,
    soketi_new_disconnections_total: metrics.soketi_new_disconnections_total || 0,
    soketi_socket_received_bytes: metrics.soketi_socket_received_bytes || 0,
    soketi_socket_transmitted_bytes: metrics.soketi_socket_transmitted_bytes || 0,
    soketi_ws_messages_received_total: metrics.soketi_ws_messages_received_total || 0,
    soketi_ws_messages_sent_total: metrics.soketi_ws_messages_sent_total || 0
  }
}

export const createApplication = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401)
  }

  // Check if user already has an application
  const existingApps = await context.entities.WebsocketApp.findMany({
    where: { userId: context.user.id }
  })

  if (existingApps.length > 0) {
    throw new HttpError(403, 'Currently, you can only create one application at a time')
  }

  // Create the application
  const app = await context.entities.WebsocketApp.create({
    data: {
      name: args.name || 'New Application',
      description: args.description || '',
      userId: context.user.id,
      key: generateRandomString(32),
      secret: generateRandomString(32)
    }
  })

  // If a subscription plan was provided, update the user's subscription plan
  if (args.subscriptionPlan) {
    await context.entities.User.update({
      where: { id: context.user.id },
      data: { 
        subscriptionPlan: args.subscriptionPlan
      }
    })
  }

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
      enabled: args.enabled !== undefined ? args.enabled : app.enabled,
      enableUserAuthentication: args.enableUserAuthentication !== undefined ? args.enableUserAuthentication : app.enableUserAuthentication
    }
  })
}

export const deleteApplication = async ({ id }, context) => {
  if (!context.user) {
    throw new HttpError(401)
  }

  const app = await context.entities.WebsocketApp.findFirst({
    where: { id, userId: context.user.id }
  })

  if (!app) {
    throw new HttpError(404, 'Application not found')
  }

  // Delete any associated metrics
  await context.entities.AppMetrics.deleteMany({
    where: { id }
  })

  // Delete the application
  return context.entities.WebsocketApp.delete({
    where: { id }
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