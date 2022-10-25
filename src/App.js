import "./App.css";
import Form from "./components/Form";
import Joyride, { ACTIONS, EVENTS, STATUS } from "react-joyride";
import a11yChecker from "a11y-checker";
import { useMount, useSetState } from "react-use";

function App() {
  const [{ run, steps, stepIndex }, setState] = useSetState({
    stepIndex: 3,
    run: true,
    steps: [
      {
        target: ".mystep",
        content:
          "Welcome to the To-Do List. A place where you can keep all your points noted",
      },
      {
        target: ".input",
        content: "You can input your data here.",
      },
      {
        target: ".add-task",
        content: "By clicking this button, you can save the details.",
      },
      {
        target: ".form",
        content: "The list of pending works will be displayed here.",
      },
      {
        target: ".check",
        content: "Click on this to indicate that you have completed the task",
      },
      {
        target: ".ip-edit",
        content: "Click on this button to edit your response",
      },
      {
        target: ".ip-delete",
        content: "Click this to delete your response",
      },
    ],
  });

  const handleJoyrideCallback = (data) => {
    const { action, index, status, type } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setState({ run: false, stepIndex: 0 });
    } else if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      setState({ stepIndex: index + (action === ACTIONS.PREV ? -1 : 1) });
    }
  };

  useMount(() => {
    a11yChecker();
  });

  // console.groupCollapsed(type);
  // console.log(data);
  // console.groupEnd();
  return (
    <div className="wrapper">
      <Joyride
        continuous
        showSkipButton
        showProgress
        callback={handleJoyrideCallback}
        run={run}
        steps={steps}
        stepIndex={stepIndex}
      />
      <h1 className="mystep">Todo List</h1>
      <Form />

      {/* <div
        style={{
          diplay: "flex",
        }}
      >
        <button
          style={{
            padding: "10px 20px",
            margin: "20px",
          }}
          className="secondstep"
        >
          Second
        </button>
        <button
          style={{
            padding: "10px 20px",
            margin: "20px",
          }}
          className="thirdstep"
        >
          Second
        </button>
        <button
          style={{
            padding: "10px 20px",
            margin: "20px",
          }}
          className="3step"
        >
          Second
        </button>
        <button
          style={{
            padding: "10px 20px",
            margin: "20px",
          }}
          className="abc"
        >
          Second
        </button>
        <button
          style={{
            padding: "10px 20px",
            margin: "20px",
          }}
          className="efg"
        >
          Second
        </button>
        <button
          style={{
            padding: "10px 20px",
            margin: "20px",
          }}
          className="hij"
        >
          Second
        </button>
      </div> */}
    </div>
  );
}

export default App;

/*
import "./App.css";
import Form from "./components/Form";
import Joyride from "react-joyride";

function App() {
  return (
    <div className="wrapper">
      <Joyride
        steps={[
          {
            target: ".my-first-step",
            // content: 'This is my awesome feature!',
            // U can write html code in content inside ()
            content: (
              <div>
                You can render anything!
                <br />
                <h3>Like this H3 title</h3>
              </div>
            ),
          },
          {
            target: ".my-other-step",
            content: "This another awesome feature!",
          },
        ]}
      />
      <h1 className="my-first-step"> Todo List </h1> <Form />
      <button className="my-other-step">Working</button>
    </div>
  );
}

export default App;*/
