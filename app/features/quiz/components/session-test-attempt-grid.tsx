import { useState } from "react";
import { IoFlagSharp } from "react-icons/io5";
import { Button } from "~/components/ui/button";
import EmptyMessage from "~/components/ui/empty-message";
import type { Question } from "~/types/api";
import { createStudentAnswer } from "../api/answer/create-student-answer";
import toast from "react-hot-toast";
import { getErrorMessage } from "~/lib/error";
import { useAuth } from "~/lib/auth";

interface Props {
  questions: Question[];
  attemptId: string;
  onFinish: (id: string) => void;
}

const SessionTestAttemptGrid = ({ questions, attemptId, onFinish }: Props) => {
  const [isFlagged, setIsFlagged] = useState<boolean[]>(
    questions.map((_) => false)
  );
  const [answers, setAnswers] = useState<string[]>(questions.map((_) => ""));

  const [idx, setIdx] = useState(0);
  const { user } = useAuth();

  const handleClickFlag = (flag: boolean) => {
    setIsFlagged(
      isFlagged.map((e, index) => {
        if (index == idx) return !flag;
        return e;
      })
    );
  };

  const updateQuestion = (e: Question, idx: number) => {
    setIdx(idx);
  };

  const updateAnswer = async (id: string) => {
    const newAns = answers.map((e, index) => (index == idx ? id : e));

    setAnswers(newAns);
    window.localStorage.setItem(`Attempt:${attemptId}`, newAns.join(","));
  };

  const onPrev = () => {
    setIdx(idx == 0 ? 0 : idx - 1);
  };

  const onNext = () => {
    setIdx(idx == questions.length - 1 ? questions.length - 1 : idx + 1);
  };

  const finish = async () => {
    //save all answers
    console.log(questions);
    console.log(answers);
    const toastId = toast.loading("Submitting...");
    try {
      await Promise.all(
        answers.map(
          async (option, idx) =>
            await createStudentAnswer({
              data: {
                attempt_id: attemptId,
                question_id: questions[idx].id,
                user_id: user?.id!,
                option_id: option,
              },
            })
        )
      );
      onFinish(toastId);
    } catch (error) {
      toast.error(getErrorMessage(error), {
        id: toastId,
      });
    }
  };

  return (
    <>
      {questions[idx] ? (
        <>
          <div className="flex flex-1 flex-col bg-white shadow rounded-md p-7 gap-3 h-fit">
            <div className="text-xl font-bold">Questions</div>
            <div className="flex gap-2">
              {questions.map((e, index) => (
                <>
                  {index == idx ? (
                    <Button className={`w-10 h-10 flex justify-center items-center text-white bg-accent rounded-md ${isFlagged[index] ? "bg-red-400 text-white" : ""}`}>
                      {index + 1}
                    </Button>
                  ) : (
                    <Button
                      className={`w-10 h-10 flex justify-center items-center text-accent bg-white rounded-md border-2 border-accent hover:text-white ${isFlagged[index] ? "bg-red-400 text-white" : ""}`}
                      onClick={() => updateQuestion(e, index)}
                    >
                      {index + 1}
                    </Button>
                  )}
                </>
              ))}
            </div>
            <Button
              className="text-white hover:bg-white hover:text-black hover:border hover:border-black"
              onClick={finish}
            >
              Finish Attempt
            </Button>
          </div>
          <div className="flex-2 flex-col bg-white shadow rounded-md p-7">
            <div className="flex justify-between items-center mb-2">
              <div className="text-xl font-bold">Question {idx + 1}</div>
              <div
                className={`border cursor-pointer rounded-full p-2 border-accent ${
                  isFlagged[idx] ? "bg-accent" : "bg-white"
                }`}
                onClick={() => handleClickFlag(isFlagged[idx])}
              >
                <IoFlagSharp
                  className={`text-md ${
                    isFlagged[idx] ? "text-white" : "text-accent"
                  }`}
                />
              </div>
            </div>
            <div>{questions[idx].question}</div>
            <form action="" className="flex flex-col gap-2 mt-2">
              {questions[idx].options.map((e) => (
                <div className="flex gap-2" key={e.id}>
                  <input
                    type="radio"
                    name={`option-${idx}`}
                    id={e.id}
                    onChange={() => updateAnswer(e.id)}
                    checked={e.id === answers[idx]}
                  />
                  <label htmlFor={e.id}>{e.option}</label>
                </div>
              ))}
            </form>
            <div className="flex justify-between mt-5">
              <Button
                className="text-white border bg-accent rounded-md p-2 px-4"
                onClick={onPrev}
              >
                <div>Prev</div>
              </Button>
              <Button
                className="text-white border bg-accent rounded-md p-2 px-4"
                onClick={onNext}
              >
                <div>Next</div>
              </Button>
            </div>
          </div>
        </>
      ) : (
        <EmptyMessage
          title="No question yet"
          text="There is no question in the test! please contact your instructor to fix this issue"
        />
      )}
    </>
  );
};

export default SessionTestAttemptGrid;
