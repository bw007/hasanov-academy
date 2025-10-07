import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from "@angular/common/http";

export const urlInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const baseUrl = "http://localhost:3000/api/v1/";

  if (!req.url.startsWith('http')) {
    const url = `${baseUrl.replace(/\/$/, '')}/${req.url.replace(/^\//, '')}`;

    const reqClone = req.clone({ url });

    return next(reqClone);
  };

  return next(req);
};
