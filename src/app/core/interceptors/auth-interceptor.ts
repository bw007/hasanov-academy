import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from "@angular/common/http";

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const accessToken = localStorage.getItem("access_token");
  
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
