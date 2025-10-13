import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, throwError } from "rxjs";

import { ERROR_MESSAGES_TOKEN, ErrorCode } from "@core/constants/error-messages";
import { Notification } from "@core/services/common";
import { Auth } from "@core/services/api";

export const httpErrorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const notification = inject(Notification);
  const errorMessages = inject(ERROR_MESSAGES_TOKEN);
  const auth = inject(Auth);
  const refreshToken = localStorage.getItem("r_token");

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && error.error?.code === ErrorCode.INVALID_SESSION && !!refreshToken) {       
        auth.refreshToken(refreshToken).subscribe()
      }
      if (error.error?.code === ErrorCode.INTERNAL_ERROR && error.status === 500) {
        auth.removeToken();
      }
      if (error.error?.code && error.status !== 0) {
        const errorCode = error.error.code as ErrorCode;
        const message = errorMessages[errorCode] ?? errorMessages[ErrorCode.UNKNOWN_ERROR];
        
        notification.error(message);
      } else {
        notification.error(errorMessages[ErrorCode.UNKNOWN_ERROR]);
      }

      return throwError(() => error)
    })
  );
};
