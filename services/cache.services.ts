import { Image } from "@prisma/client";

const nodecache = require("node-cache");

const appCache = new nodecache();

export const addToCache = (key: string, items: Image[]) => {
  appCache.set(key, items);
};

export const removeFromCache = (key: string) => {
  appCache.del(key);
};

export const retrieveFromCache = (key: string): undefined | Image[] => {
  if (appCache.has(key)) {
    return appCache.get(key);
  }
};
