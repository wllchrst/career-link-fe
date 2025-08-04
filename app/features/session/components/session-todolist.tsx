import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";
import AssignmentCard from "~/components/assignment/assignment-card";
import EvaluationCard from "~/components/evaluation/question-user-card";
import AccordionLayout from "~/components/layouts/accordion-layout";
import SessionDataCard from "~/components/session/session-data-card";
import TestCard from "~/components/test/test-card";
import { Button } from "~/components/ui/button";
import EmptyMessage from "~/components/ui/empty-message";
import { Form } from "~/components/ui/form";
import { Progress } from "~/components/ui/progress";
import { createEvalAnswer } from "~/features/evaluation/api/create-evaluation-answer";
import { getErrorMessage } from "~/lib/error";
import {
  isClockInOpen,
  isClockInRange,
  isClockOutOpen,
} from "~/lib/validation";
import { useRole } from "~/provider/role-testing-provider";
import type {
  Assignment,
  AssignmentAnswer,
  Attendance,
  EvaluationQuestion,
  Session,
  SessionData,
  SessionTest,
  StudentAttempt,
  StudentScore,
} from "~/types/api";
import { TestType } from "~/types/enum";

interface Props {
  attendanceOnClick: () => void;
  session: Session;
  attendances: Attendance[];
  sessionData: SessionData[];
  preTest: SessionTest;
  postTest: SessionTest;
  assignment?: Assignment | undefined;
  attemptsPretest: StudentScore[];
  attemptsPosttest: StudentScore[];
  evaluationQuestions: EvaluationQuestion[];
}

const SessionTodolist = ({
  attendanceOnClick,
  attendances,
  session,
  sessionData,
  preTest,
  postTest,
  assignment,
  attemptsPretest,
  attemptsPosttest,
  evaluationQuestions,
}: Props) => {
  const { role } = useRole();
  const [answers, setAnswers] = useState<string[]>(evaluationQuestions.map(_ => ""))
  const [progress, setProgress] = useState(0)


  const setAnswer = (idx:number, answer:string) => {
    setAnswers((prev) => {
      console.log(answer)
      prev[idx] = answer
      return prev
    })
  }

  const onSubmit = async (e:FormEvent) => {
    e.preventDefault()
    const toastId = toast.loading(`Submitting Evaluation...`);

    try {
      console.log(answers)
      for(let i = 0;i < evaluationQuestions.length;i++){
        await createEvalAnswer({ 
          data: {
            question_id: evaluationQuestions[i].id,
            session_id: session.id,
            answer: answers[i],
          }
        });
        setProgress(prev => prev + 100 / evaluationQuestions.length);
      }
      setProgress(100);
      toast.success("Evaluation Submitted!", { id: toastId })
    } catch (error) {
      toast.error(getErrorMessage(error), {
          id: toastId,
      });
    }finally{
      setAnswers(evaluationQuestions.map(_ => ""))
      setTimeout(() => {
          setProgress(0)
      }, 3000);
    }
  }

  return (
    <>
      <h2
        className={
          "font-semibold text-left text-4xl text-slate-700 py-6 w-full h-full"
        }
      >
        To Do List
      </h2>
      <div className={"flex flex-col gap-y-6 mb-8"}>
        {role == "user" ? (
          ((isClockInOpen(session) && isClockInRange(session)) ||
            isClockOutOpen(session)) && (
            <Button onClick={attendanceOnClick} className="w-1/6">
              Session Clock in/out
            </Button>
          )
        ) : (
          <Link to={`attendance`}>
            <Button className="w-1/6">View Attendances</Button>
          </Link>
        )}
        <AccordionLayout text={"Pretest"}>
          <TestCard
            testType={TestType.PRE_TEST}
            sessionId={session.id}
            test={preTest}
            attempts={attemptsPretest}
          />
        </AccordionLayout>
        <AccordionLayout
          text={"Material"}
          isLocked={role == "user" && attemptsPretest.length < 1}
        >
          <SessionDataCard sessionData={sessionData} session={session} />
        </AccordionLayout>
        <AccordionLayout
          text={"Post Test"}
          isLocked={
            role == "user" &&
            (attemptsPretest.length < 1 || attendances.length < 1)
          }
        >
          <TestCard
            testType={TestType.POST_TEST}
            sessionId={session.id}
            test={postTest}
            attempts={attemptsPosttest}
          />
        </AccordionLayout>
        <AccordionLayout
          text={"Assignment"}
          isLocked={role == "user" && attemptsPosttest.length < 1}
        >
          <AssignmentCard
            session={session}
            assignment={assignment}
          />
        </AccordionLayout>
        <AccordionLayout text={"Evaluation"} isLocked={false}>
          {progress > 0 && <Progress value={progress} className="w-full"/>}
          {role == "admin" ? (
            <Button className={"p-2 w-40 bg-purple-600 hover:bg-purple-500"}>
              <Link to={"evaluation"}>Manage Evaluation</Link>
            </Button>
          ) : (
              evaluationQuestions.length > 0 ? 
              <form onSubmit={onSubmit}>
                  {evaluationQuestions.map((e, idx) => (
                    <EvaluationCard idx={idx} question={e} setAnswer={setAnswer}/>
                  ))}
                  <Button>Submit</Button>
              </form>
              :
              <>
                <EmptyMessage text="There is no evaluation. Please contact your instructor!" title="No Evaluation form yet."/>
            
              </>
          )}
        </AccordionLayout>
      </div>
    </>
  );
};

export default SessionTodolist;
