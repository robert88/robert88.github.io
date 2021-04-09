import React, { FC } from "react";
import {
  createStore,
  combineReducers,
  Unsubscribe,
  applyMiddleware,
  Action,
} from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import axios from "axios";

enum TestActionTypes {
  THUNK_ACTION,
}

function reducer1(state: any, action: Action) {
  if (state == null) {
    return {};
  }
  if (action.type == TestActionTypes.THUNK_ACTION) {
    return { test: 2 };
  }
  return state;
}

function reducer2(state: any, action: Action): any {
  if (state == null) {
    return {};
  }
  return state;
}

var a = combineReducers({ reducer1, reducer2 });

const store = createStore(a, applyMiddleware(thunk as ThunkMiddleware));

class App extends React.Component {
  state = { test: 1 };

  change = () => {
    debugger;

    store.dispatch((dispatch) => {
      const url: string =
        "https://events02.huawei.com/isdm_sys_module/event/58098302/form/getFormStatusOn?timeStamp=91425&access_token=null";
      axios(url, {}).then((ret: any) => {
        dispatch({ type: TestActionTypes.THUNK_ACTION });
      });
    });
  };
  handler = () => {
    this.setState(store.getState().reducer1);
  };
  unsubscribe: Unsubscribe | undefined;
  componentDidMount() {
    this.unsubscribe = store.subscribe(this.handler);
  }
  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
  render() {
    return (
      <>
        <div onClick={this.change}>{this.state.test}</div>
        <Bpp></Bpp>
      </>
    );
  }
}

class Bpp extends React.Component {
  state = { test: 1 };
  change = () => {
    store.dispatch({ type: "ok" });
  };
  handler = () => {
    this.setState(store.getState().reducer1);
  };
  unsubscribe: Unsubscribe | undefined;
  componentDidMount() {
    this.unsubscribe = store.subscribe(this.handler);
  }
  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
  render() {
    return (
      <>
        <div style={{ border: "1px solid red" }} onClick={this.change}>
          {this.state.test}
        </div>
      </>
    );
  }
}
export default App;
