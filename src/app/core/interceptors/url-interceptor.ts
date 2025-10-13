import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from "@angular/common/http";
import { environment } from "environments/environment";

export const urlInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  if (!req.url.startsWith('http')) {
    const url = `${environment.apiUrl.replace(/\/$/, '')}/${req.url.replace(/^\//, '')}`;

    const reqClone = req.clone({ url });

    return next(reqClone);
  };

  return next(req);
};
