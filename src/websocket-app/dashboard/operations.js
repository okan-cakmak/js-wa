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
      const metricsData = latestMetric?.metrics || {};
      
      return {
        ...app,
        soketi_connected: metricsData.soketi_connected || 0,
        soketi_new_connections_total: metricsData.soketi_new_connections_total || 0,
        soketi_new_disconnections_total: metricsData.soketi_new_disconnections_total || 0,
        soketi_socket_received_bytes: metricsData.soketi_socket_received_bytes || 0,
        soketi_socket_transmitted_bytes: metricsData.soketi_socket_transmitted_bytes || 0,
        soketi_ws_messages_received_total: metricsData.soketi_ws_messages_received_total || 0,
        soketi_ws_messages_sent_total: metricsData.soketi_ws_messages_sent_total || 0
      };
    });
  
    return appsWithMetrics;
  };