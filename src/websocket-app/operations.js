import { HttpError } from 'wasp/server';
import crypto from 'crypto';

// key is something like this: 91034534ee23a8350520
const generateAppCredentials = () => {
  return {
    key: crypto.randomBytes(8).toString('hex'),
    secret: `secret_${crypto.randomBytes(32).toString('hex')}`
  };
};

export const createWebsocketApp = async ({ name, description }, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  const credentials = generateAppCredentials();

  const app = await context.entities.WebsocketApp.create({
    data: {
      name,
      description,
      key: credentials.key,
      secret: credentials.secret,
      user: { connect: { id: context.user.id } },
    },
  });

  return app;
}

export const deleteWebsocketApp = async ({ id }, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  const app = await context.entities.WebsocketApp.findUnique({
    where: { id },
    select: { userId: true }
  });

  if (!app) {
    throw new HttpError(404, 'WebSocket app not found');
  }

  if (app.userId !== context.user.id) {
    throw new HttpError(403, 'Not authorized to delete this app');
  }

  return context.entities.WebsocketApp.delete({
    where: { id }
  });
}

export const getAllWebsocketAppsByUser = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  return context.entities.WebsocketApp.findMany({
    where: { 
      userId: context.user.id 
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
}

export const updateWebsocketApp = async ({ id, data }, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  const app = await context.entities.WebsocketApp.findUnique({
    where: { id },
    select: { userId: true }
  });

  if (!app) {
    throw new HttpError(404, 'WebSocket app not found');
  }

  if (app.userId !== context.user.id) {
    throw new HttpError(403, 'Not authorized to update this app');
  }

  return context.entities.WebsocketApp.update({
    where: { id },
    data
  });
}

// export const deleteTask: DeleteTask<Pick<Task, 'id'>, Task> = async ({ id }, context) => {
//   if (!context.user) {
//     throw new HttpError(401);
//   }

//   const task = await context.entities.Task.delete({
//     where: {
//       id,
//     },
//   });

//   return task;
// };
// //#endregion

// //#region Queries
// export const getGptResponses: GetGptResponses<void, GptResponse[]> = async (_args, context) => {
//   if (!context.user) {
//     throw new HttpError(401);
//   }
//   return context.entities.GptResponse.findMany({
//     where: {
//       user: {
//         id: context.user.id,
//       },
//     },
//   });
// };

// export const getAllTasksByUser: GetAllTasksByUser<void, Task[]> = async (_args, context) => {
//   if (!context.user) {
//     throw new HttpError(401);
//   }
//   return context.entities.Task.findMany({
//     where: {
//       user: {
//         id: context.user.id,
//       },
//     },
//     orderBy: {
//       createdAt: 'desc',
//     },
//   });
// };

// export const getAllWebsocketAppsByUser: GetAllWebsocketAppsByUser<void, WebsocketApp[]> = async (_args, context) => {
//   if (!context.user) {
//     throw new HttpError(401);
//   }
//   return context.entities.WebsocketApp.findMany({
//     where: {
//       user: {
//         id: context.user.id,
//       },
//     },
//   });
// };
// //#endregion
