import { HttpError } from 'wasp/server';


export const getConnectedApps = async (args, context) => {
    if (!context.user) {
      throw new HttpError(401);
    }
    // fetch apps from db and add mock 'connections' attribute;
    const apps = await context.entities.WebsocketApp.findMany({
      where: {
        userId: context.user.id
      }
    });
  
    return apps.map(app => ({
      ...app,
      connections: Math.floor(Math.random() * 5) + 1
    }));
  };