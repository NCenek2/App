import React from "react";
import "./DogAPI.css";

const DogAPI = () => {
  const [countdown, setCountdown] = React.useState(3);
  const [appReady, setAppReady] = React.useState(false);
  const [list, setList] = React.useState([]);
  const [apiTiming, setApiTiming] = React.useState(false);
  const [startSelect, setStartSelect] = React.useState(false);
  const [finishSelect, setFinishSelect] = React.useState(false);
  const [leftList, setLeftList] = React.useState([]);

  React.useEffect(() => {
    if (!appReady) {
      const handleCountdown = setInterval(() => {
        setCountdown((prevCount) => {
          const newCount = prevCount - 1;
          if (newCount < 0) {
            setAppReady(true);
            return;
          }
          return newCount;
        });
      }, 995);

      return () => window.clearInterval(handleCountdown);
    }
    return undefined;
  }, [appReady]);

  React.useEffect(() => {
    const timerLogic = setTimeout(() => {
      setApiTiming(true);
    }, 3000);
    return () => clearTimeout(timerLogic);
  }, []);

  const updatingUrlList = () =>
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((response) => response.json())
      .then((data) => setList((prevList) => [...prevList, data]));

  React.useEffect(() => {
    updatingUrlList();
    updatingUrlList();
    updatingUrlList();
    updatingUrlList();
    updatingUrlList();
    updatingUrlList();

    return undefined;
  }, []);

  const handleStart = () => {
    setList((prevList) =>
      prevList.map((item, index) => {
        return { ...item, id: index, border: false };
      })
    );
    setStartSelect(true);
  };

  const handleClick = (event) => {
    const { id } = event.target;
    console.log("clicked", id);
    setList((prevList) =>
      prevList.map((item) => {
        if (item.id == id) {
          console.log(id);
          return { ...item, border: !item.border };
        }
        return { ...item };
      })
    );
  };
  const handleFinish = () => {
    setFinishSelect(true);
    setLeftList(list.filter((item) => item.border === true));
  };
  const handleBack = () => {
    setFinishSelect(false);
  };

  return (
    <div className="dog-app">
      <main className="dog-api-container">
        <h2 className="dog-api-title">
          {startSelect && !finishSelect && "List of Dogs"}
          {leftList.length > 1 && finishSelect && "Selected Dogs"}
          {leftList.length == 1 && finishSelect && "Selected Dog"}
          {leftList.length < 1 && finishSelect && "No Dogs Selected"}
        </h2>
        {startSelect && (
          <section className="starting-dogs-container">
            {startSelect &&
              !finishSelect &&
              list.map((item) => (
                <article
                  key={item.id}
                  id={item.id}
                  onClick={(event) => handleClick(event)}
                  className={`starting-image-container ${
                    item.border && "show-border"
                  }`}
                >
                  <img
                    src={`${item.message}`}
                    alt=""
                    className="starting-image"
                  ></img>
                </article>
              ))}
          </section>
        )}
        {!appReady && countdown > 0 && (
          <p className="dog-countdown">{countdown}</p>
        )}
        {apiTiming && !startSelect && (
          <button
            onClick={() => handleStart()}
            className="btn btn-dark dog-btn"
          >
            Start
          </button>
        )}
        {startSelect && !finishSelect && (
          <button
            onClick={() => handleFinish()}
            className="btn btn-dark dog-btn"
          >
            Finished
          </button>
        )}
        {finishSelect && leftList.length < 1 && (
          <button onClick={() => handleBack()} className="btn btn-dark dog-btn">
            Back
          </button>
        )}

        {finishSelect && (
          <section className="left-container">
            {leftList.map((item) => (
              <article
                className={`finishing-image-container ${
                  leftList.length === 1 && "one-card"
                } ${leftList.length === 2 && "two-cards"} ${
                  leftList.length === 3 && "three-cards"
                } ${leftList.length === 4 && "four-cards"} ${
                  leftList.length === 5 && "five-cards"
                } ${leftList.length === 6 && "all-cards"}`}
              >
                <img
                  key={item.id}
                  id={item.id}
                  src={`${item.message}`}
                  className="finishing-image"
                ></img>
              </article>
            ))}
          </section>
        )}
      </main>
    </div>
  );
};

export default DogAPI;
