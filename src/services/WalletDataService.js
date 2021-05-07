import http from "../utils/http-mock";

class WalletDataService {
  initialise(data) {
    return http().post(`/init`, data);
  }

  enable(token) {
    return http(token).post(`/wallet`);
  }

  getBalance(token) {
    return http(token).get(`/wallet`);
  }

  deposit(data, token) {
    return http(token).post(`/wallet/deposits`, data);
  }

  withdraw(data, token) {
    return http(token).post(`/wallet/withdrawals`, data);
  }

  disable(data, token) {
    return http(token).patch(`/wallet`, data);
  }
}

export default new WalletDataService();