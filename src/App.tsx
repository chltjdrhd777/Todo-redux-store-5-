import React, { Fragment } from "react";
import styled from "styled-components";
import {
  faPen,
  faEraser,
  faBell,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import {
  InitialState,
  booleanDispatch,
  typingEvent,
  addTodoAction,
  deleteTodoAction,
  TodosStructure,
  editTextAction,
} from "./TodoPropStorage";

////////when this todo is planed///
const today = new Date();
//////////////////////////////////

///Note!
//If I want to make containers which

//1. all contents are inline
//2. but want them to be stocked in block way

//If so, I should make "div" container <------- which secure enough space
//then, make container which has inline nature
function App<_InitialStateType>({
  state,
  booleanFunction,
  textRefresh,
  addTodoFunction,
  deleteTodosFunction,
  editTextChangeFunction,
}: any) {
  const { inputText, todos } = state;
  const grantEdit = (id: any) => booleanFunction(id);
  const finishEdit = (id: any) => booleanFunction(id);
  const deTectOnchange = (e: any) => textRefresh(e.target.value);
  const addTodo = (e: any) => {
    e.preventDefault();
    if (inputText === "") {
      alert("input Something");
    } else {
      addTodoFunction(inputText);
      textRefresh("");
    }
  };
  const deleteTodos = (id: any) => deleteTodosFunction(id);
  const editTextChange = (id: any, text: string) =>
    editTextChangeFunction(id, text);
  const makingNewArray = Object.values<TodosStructure>(todos);
  /////////How can we access to the object's properties
  //const test = { a: "hi", b: "delete" };
  //delete test.b; <---how to delete properties of
  //console.log(test) = {a:"hi"}

  //const test2 = { "1": "no" };
  //test2["1"] = "hi";
  //console.log(test2["1"]); = hi
  console.log(todos);
  return (
    <Fragment>
      <Head>What you have to do right now</Head>
      <HowManyUndone>
        <UndoneBell>
          <FontAwesomeIcon icon={faBell} />
          <UndoneCounter>{makingNewArray.length}</UndoneCounter>
        </UndoneBell>
      </HowManyUndone>
      <ListContainer>
        {makingNewArray.map((everyTodos) => (
          <ToDoUpdates key={everyTodos.key}>
            <WhenToDo>{today.toLocaleDateString("ko-KR")}</WhenToDo>
            <Todobars>
              {everyTodos.boolAlternate ? (
                <EditableText
                  value={everyTodos.text}
                  onChange={(e: any) =>
                    editTextChange(everyTodos.id, e.target.value)
                  }
                />
              ) : (
                <TodoText>{everyTodos.text}</TodoText>
              )}

              <TodoEditTools>
                {everyTodos.boolAlternate ? (
                  <ButtonConfirm onClick={() => finishEdit(everyTodos.id)}>
                    <FontAwesomeIcon icon={faCheck} />
                  </ButtonConfirm>
                ) : (
                  <Fragment>
                    <ButtonEdit onClick={() => grantEdit(everyTodos.id)}>
                      <FontAwesomeIcon icon={faPen} />
                    </ButtonEdit>
                    <ButtonDelete onClick={() => deleteTodos(everyTodos.id)}>
                      <FontAwesomeIcon icon={faEraser} />
                    </ButtonDelete>
                  </Fragment>
                )}
              </TodoEditTools>
            </Todobars>
          </ToDoUpdates>
        ))}
      </ListContainer>

      <TotalCounter onSubmit={addTodo}>
        <TypingBar
          value={inputText}
          onChange={deTectOnchange}
          placeholder="Type what you gotta do"
        />
        <Dissemination>enroll</Dissemination>
      </TotalCounter>
    </Fragment>
  );
}

//to pile contents in the column, display:flex + flex-direction:column
const Head = styled.header`
  color: white;
  font-size: 35px;
  font-weight: 700;
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HowManyUndone = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 30px;
`;
const UndoneBell = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: white;
  margin-right: 20px;
  color: #ffa502;
  background-color: #7bed9f;
  position: relative;
`;

const UndoneCounter = styled(UndoneBell)`
  background-color: white;
  width: 20px;
  height: 20px;
  color: black;
  font-size: 15px;
  font-weight: 500;
  position: absolute;
  top: -10px;
  right: -25px;
`;
///////////////////////////////////
const ListContainer = styled.section`
  padding-top: 10px;
  background-color: white;
  width: 95%;
  height: 380px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 330px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: auto;
`;

const ToDoUpdates = styled.div``;

const WhenToDo = styled.span`
  margin-left: 5px;
  margin-right: 1px;
  height: 30px;
  font-size: 12px;
  font-weight: 600;
  color: #40739e;
`;

const Todobars = styled.div`
  font-size: 20px;
  background-color: white;
  box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1);
  padding: 10px;
  border-radius: 15px;
  margin-bottom: 10px;
  margin-left: 3px;
  box-sizing: border-box;
  border: 1px solid;
  display: inline-block;
`;

//span = It means I intend to set the container as inline box
//blcok = I want to occupy the whole length (can change width, height + allowing line change)
//inline = I want to occupy only my space (cannot change width, height + disapproving line change)
//inline-block = inline + blcok(no line change but can change width, height)
const TodoText = styled.span`
  margin-left: 10px;
  margin-right: 15px;
`;

const EditableText = styled.input`
  margin-left: 10px;
  margin-right: 15px;
  font-size: 20px;
  font-family: Times New Roman—Local file;
  border: none;
  &:focus {
    outline: none;
  }
`;

///////////////////////////////////////
const TodoEditTools = styled.div`
  width: 60px;
  display: inline-block;
`;

const ButtonEdit = styled.button`
  background-color: white;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in;
  &:active,
  &:focus {
    outline: none;
  }
  &:hover {
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(1px);
  }
`;

const ButtonDelete = styled(ButtonEdit)`
  margin-left: 3px;
`;

const ButtonConfirm = styled(ButtonEdit)`
  margin-left: 20px;
`;

///////////////////////////////////////////////

/////score//////
const TotalCounter = styled.form`
  position: absolute;
  top: 521px;
  width: 100%;
  height: 88px;
  background-color: none;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const TypingBar = styled.input`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 50px;
  background-color: white;
  font-size: 50px;
  font-weight: 700;
  border: none;
  font-size: 20px;
  font-weight: 300;
  font-family: "Comic Sans MS", cursive, sans-serif;
  &:focus {
    ::placeholder {
      color: transparent;
    }
    outline: none;
  }
`;

const Dissemination = styled.button`
  margin-right: 30px;
  margin-left: 10px;
  width: 60px;
  height: 60px;
  background-color: #dff9fb;
  border-radius: 35%;
  border: outset;
  border-width: 5px;
  font-weight: 700;
  transition: all 0.2s ease-out;
  &:hover {
    transform: translateY(-1px);
  }
  &:active,
  &:focus {
    outline: none;
  }
  &:active {
    transform: translateY(1px);
  }
`;

//////////////////////////////////////////////////////////////////////
//dispatch({}) send {} to action in redux storage.
function mapStateToProps(state: InitialState) {
  return { state };
}

function mapDispatchToProps(dispatch: any) {
  return {
    booleanFunction: (id: any) => dispatch(booleanDispatch(id)),
    textRefresh: (typing: string) => dispatch(typingEvent(typing)),
    addTodoFunction: (value: string) => dispatch(addTodoAction(value)),
    deleteTodosFunction: (id: any) => dispatch(deleteTodoAction(id)),
    editTextChangeFunction: (id: any, text: string) =>
      dispatch(editTextAction(id, text)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
