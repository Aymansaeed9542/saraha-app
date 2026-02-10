export const successResponse = ({res, status = 200, message = 'Success', data = undefined} = {}) => {
  return res.status(status).json({ success, message, data});
};
