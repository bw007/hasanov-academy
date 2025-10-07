import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from "@angular/common/http";
import { inject } from "@angular/core";
import { Auth } from "@core/services/api";

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const auth = inject(Auth);
  
  const accessToken = auth.accessToken();
  const publicEndpoints = ["signin", "signup", "refresh-token", "verify-email"];
  const isPublicEndpoint = publicEndpoints.some(endpoint => 
    req.url.includes(endpoint)
  );

  if (isPublicEndpoint || !accessToken) {
    return next(req);
  }

  const authRequest = req.clone({
    setHeaders: { Authorization: `Bearer ${accessToken}` }
  })

  return next(authRequest);
};
