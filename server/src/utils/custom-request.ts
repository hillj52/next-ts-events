import { Request } from 'express';

interface CustomRequest<Body = any> extends Request {
  body: Body;
}

export default CustomRequest;
