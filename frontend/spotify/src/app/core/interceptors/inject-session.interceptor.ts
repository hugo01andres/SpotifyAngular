import { HttpInterceptorFn } from '@angular/common/http';

export const injectSessionInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Hola', req);
  
  return next(req);
};
