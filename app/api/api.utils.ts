export const NotFoundResponse = () =>
  new Response('Not found', { status: 404 });

export const BadRequestResponse = () =>
  new Response('Bad request', { status: 400 });
