import { HttpError } from 'wasp/server';

export const getConnectedApps = async (args, context) => {
    if (!context.user) {
      throw new HttpError(401);
    }

    // Get all apps for the user
    const apps = await context.entities.WebsocketApp.findMany({
      where: {
        userId: context.user.id
      }
    });
    
    const appIds = apps.map(app => app.id);
    const metrics = await context.entities.AppMetrics.findMany({
      where: {
        id: {
          in: appIds
        }
      }
    });

    const appsWithMetrics = apps.map(app => {
      const latestMetric = metrics.find(metric => metric.id === app.id);
      return {
        ...app,
        soketi_connected: latestMetric?.metrics?.soketi_connected || 0
      };
    });
  
    return appsWithMetrics;
  };