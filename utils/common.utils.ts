import { GetServerSidePropsResult } from 'next';

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

export const isEditRoute = (
  slug: string | string[],
): slug is [string, 'edit'] => {
  return Array.isArray(slug) && slug.length === 2 && slug[1] === 'edit';
};

export const isEditPathname = (
  pathname: string,
): pathname is `${string}/edit` => /^.*\/edit$/.test(pathname);

export const trimEditPathname = (pathname: string) =>
  isEditPathname(pathname) ? pathname.replace(/^(.*)\/edit$/, '$1') : pathname;

export const isServerSideProps = <T>(
  props: GetServerSidePropsResult<T>,
): props is { props: T } => 'props' in props;
