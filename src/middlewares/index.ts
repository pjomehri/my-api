import express from 'express';
import { get, merge } from 'lodash';

import { getUserBySessionToken } from '../db/users';

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, 'identity._id') as string;

    if (!currentUserId) {
      return res.sendStatus(400);
    }

    if (currentUserId.toString() !== id) {
      return res.sendStatus(403);
    }

    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const isAuthenticated = async (
  req: express.Request,
  resp: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies['PJAY-AUTH'];

    console.log(req);

    if (!sessionToken) {
      return resp.sendStatus(403);
    }
    const existingUser = await getUserBySessionToken(sessionToken);

    console.log(existingUser);

    if (!existingUser) {
      return resp.sendStatus(403);
    }

    merge(req, { identity: existingUser });
    return next();
  } catch (error) {
    console.log(error);
    return resp.sendStatus(400);
  }
};
