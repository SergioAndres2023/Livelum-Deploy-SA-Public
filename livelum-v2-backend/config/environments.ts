export const isDevelopment = (env?: string): boolean => {
  return env === 'development' || env === 'dev';
};

export const isProduction = (env?: string): boolean => {
  return env === 'production' || env === 'prod';
};

export const isTest = (env?: string): boolean => {
  return env === 'test' || env === 'testing';
};
