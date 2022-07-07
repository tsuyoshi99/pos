import { observable, action, computed, makeObservable } from "mobx";
import axios from "../axios";

class AuthStore {
  @observable authenticatedUser = {};
  @observable token = null;

  constructor() {
    makeObservable(this);
  }

  @action register = (user) => {
    return axios.post("/auth/register", user); // returns a promise
  };

  @action login = (user) => {
    return axios.post("/auth/login", user); // returns a promise
  };

  @action setAuthenticatedUser = (user) => {
    this.authenticatedUser = user;
  };
}

export default new AuthStore();
