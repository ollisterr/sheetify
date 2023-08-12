export const isSSR = typeof window === 'undefined';

export const getRouteParamFromSlug = (slug: string | string[] | undefined) => {
  if (Array.isArray(slug)) {
    return slug[slug.length - 1];
  } else {
    return slug;
  }
};

export const getRouteParamFromUrl = (url: string) => {
  const routeParams = url.split('/');
  return routeParams[routeParams.length - 1];
};
