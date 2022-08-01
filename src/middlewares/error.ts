import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
// import { errorCatalog, ErrorTypes } from '../errors/catalog';

const errorHandler: ErrorRequestHandler = (
  err: Error | ZodError,
  _req,
  res,
  _next,
) => {
  // o instanceof verifica se esse é erro é uma instância do ZodError
  if (err instanceof ZodError) {
    // se for nós sabemos que é um erro de validação e podemos usar o status 400 e a própria mensagem do zod para retornar a response
    return res.status(400).json({ message: err.issues });
  }

  // const messageAsErrorType = err.message as keyof typeof ErrorTypes;

  // const mappedError = errorCatalog[messageAsErrorType];
  // if (mappedError) {
  //   const { httpStatus, message } = mappedError;
  //   return res.status(httpStatus).json({ message });
  // }
  console.error(err);
  return res.status(500).json({ message: err.message });
};

export default errorHandler;