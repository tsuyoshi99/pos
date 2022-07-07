import { observable, action, computed, makeObservable } from "mobx";

class ErrorMessageStore {
  @observable errorMessage = [];

  constructor() {
    makeObservable(this);
  }

  @action setErrorMessage = (errorMessage) => {
    this.errorMessage = errorMessage;
  };

  @action addErrorMessage = (errorMessage) => {
    this.errorMessage.push(errorMessage);
  };

  @action removeErrorMessage = (errorMessage) => {
    this.errorMessage.splice(this.errorMessage.indexOf(errorMessage), 1);
  };
}

export default new ErrorMessageStore();
