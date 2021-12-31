module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '4915bcddf8887edfdf628e95afec7973'),
  },
});
