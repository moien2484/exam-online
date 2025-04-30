import React, { useEffect, useState } from "react";
import "./TableQuestion.css"
import AllQuestions from "../../data";
export default function TableQuestion() {
  const [loadingtime, setloadingtime] = useState(5);
  const [CurrentQuestion, setCurrentQuestion] = useState(0);
  const [Questions, setQuestions] = useState(AllQuestions);
  const [showresult, setshowresult] = useState(false);
  const [score, setscore] = useState(0);
  const [unansweredQuestions, setUnansweredQuestions] = useState([]);

  const handleTimeout = () => {
    if (showresult) return; // اگر آزمون تمام شده، تابع اجرا نشود

    setUnansweredQuestions((prev) => {
      const alreadyExists = prev.some(
        (q) => q.id === Questions.quiz[CurrentQuestion].question.id
      );
      return alreadyExists
        ? prev
        : [...prev, Questions.quiz[CurrentQuestion].question];
    });

    console.log(Questions.quiz[CurrentQuestion]);
    NextQuestion(false);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setloadingtime((prevtime) => {
        if (prevtime !== 1) {
          return prevtime - 1;
        } else {
          handleTimeout();
          return 5;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [CurrentQuestion, showresult]);

  const NextQuestion = (correct) => {
    if (correct) {
      setscore((event) => event + 1);
    }
    if (CurrentQuestion === Questions.quiz.length - 1) {
      setshowresult(true);
    } else {
      setCurrentQuestion((event) => event + 1);
      setloadingtime(5);
    }
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-1 col-sm-1 col-md-2 col-lg-2 col-xl-2"></div>
          <div className="col-10 col-sm-10 col-md-8 col-lg-8 col-xl-8">
            <div className="card card-main w-50 shadow">
              <div className="card-body">
                {showresult ? (
                  <div>
                    <p className="result-score">you scored {score} out of 6</p>
                    <h5 className="title-result-unanswer">
                      Unanswered Questions:
                    </h5>
                    {unansweredQuestions.length > 0 ? (
                      <ul className="parent-unanswer">
                        {unansweredQuestions.map((q) => (
                          <li className="unanswer-question" key={q.id}>
                            {q.QuestionsText}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="unanswer-question">
                        All questions were answered!
                      </p>
                    )}
                  </div>
                ) : (
                  <div>
                    <h5 className="card-title title-custom text-white">
                      question {CurrentQuestion + 1} / 6
                    </h5>

                    <p className="card-text card-text-custom">
                      {Questions.quiz[CurrentQuestion].question.QuestionsText}
                    </p>
                    <section>
                      {Questions.quiz[
                        CurrentQuestion
                      ].question.QuestionOption.map((answer) => (
                        <span
                          href="#"
                          key={answer.id}
                          onClick={() => NextQuestion(answer.iscorrect)}
                          className="OptionQuiz shadow"
                        >
                          {answer.answerTex}
                        </span>
                      ))}
                    </section>
                    <section>
                      <div className="loading"></div>
                      <div className="loadingtime">{loadingtime}</div>
                    </section>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-1 col-sm-1 col-md-2 col-lg-2 col-xl-2"></div>
        </div>
      </div>
    </>
  );
}
