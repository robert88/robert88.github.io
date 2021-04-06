```javascript

import React,{FC} from "react"
import {createStore, combineReducers,compose,applyMiddleware,Action} from "redux"
import thunk from "redux-thunk"
import axios from "axios"


function reducer1(state:any,action:Action){
  console.log(1,action);
  if(state==null){
    return {}
  }
  if(action.type=="ok"){
    return {test:2}
  }
  return state
}


function reducer2(state:any,action:Action):any{
  console.log(2,action);
  if(state==null){
    return {}
  }

  return state
}

function actionCreator(params:Object){
    return axios("http://pv.sohu.com/cityjson",params).then((ret: any)=>{
      console.log(ret)
    })
  
}

var a = combineReducers({reducer1,reducer2});


const store = createStore(a,applyMiddleware(thunk))

class App extends React.Component{
   state={test:1}
  change=()=>{
    store.dispatch({type:"ok"})
  }
  handler=()=>{
    this.setState(store.getState().reducer1)
  }
  componentDidMount(){
   var unsubscribe = store.subscribe(this.handler)
  }
  render(){
    return (
      <>
      <div onClick={this.change}>{this.state.test}</div>
      <Bpp></Bpp>
      </>
    )
  }
}

class Bpp extends React.Component{
  state={test:1}
 change=()=>{
   store.dispatch({type:"ok"})
 }
 handler=()=>{
   this.setState(store.getState().reducer1)
 }
 componentDidMount(){
  this.unsubscribe = store.subscribe(this.handler)
 }
 componentWillUnMount(){
  this.unsubscribe();
 }
 render(){
   return (
     <>
     <div style={{border:"1px solid red"}} onClick={this.change}>{this.state.test}</div>
     </>
   )
 }
}
export default App;

```

redux init ={ reducer init / action init / store init} => ui init = {ui componentDidMount回调 => store.subscribe / ui componentWillUnMount回调=> unSubscribe}


ui click事件 = >ui的方法 => 调用store.dispatch => 调用subscribe监听的方法 ui handler = > store.getState => ui.setState


