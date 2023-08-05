export default {
  request: function (req, token) {
    // If refresh, add refresh_token to request data
    if (req.url === this.options.refreshData.url) {
      req.data = Object.assign(
        {
          refresh_token: this.token(this.options.refreshTokenKey),
        },
        this.options.refreshData.data
      );
      console.log(req.data);
    }

    this.drivers.http.setHeaders.call(this, req, {
      Authorization: "Bearer " + token,
    });
  },
  response: function (res) {
    const resData = res.data || {};

    // Store refresh_token if present
    this.token(
      this.options.refreshTokenKey,
      resData[this.options.refreshTokenKey]
    );

    // Return access_token (auto stored)
    return resData[this.options.tokenDefaultKey];
  },
};
