import { getAssignmentAnswerByAssignment } from "~/features/assignment/api/answer/get-assignment-answer-by-assignment"
import type { Route } from "./+types/assignment-answers"
import { Link, useRevalidator } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import { DefaultTableHeader } from "~/components/ui/table-header";
import TableLayout from "~/components/layouts/table-layout";
import EmptyMessage from "~/components/ui/empty-message";
import { Button } from "~/components/ui/button";
import { exportToExcel, importExcel } from "~/lib/excel";
import type { AssignmentAnswer, AssignmentResult } from "~/types/api";
import { getAssignmentResultByAssignment } from "~/features/assignment/api/result/get-assignment-result-by-assignment";
import { getEnrollmentByBootcamp } from "~/features/enrollments/api/get-enrollment-by-bootcamp";
import AssignmentAnswerRow from "~/components/assignment/assignment-answer-row";
import { useRef, useState, type ChangeEvent } from "react";
import toast from "react-hot-toast";
import { getErrorMessage } from "~/lib/error";
import { Progress } from "~/components/ui/progress";
import { createAssignmentResult } from "~/features/assignment/api/result/create-assignment-result";
import { updateAssignmentResult } from "~/features/assignment/api/result/update-assignment-result";
import { AssignmentResultType } from "~/types/enum";
import AssignmentAnswerGrid from "~/features/assignment/components/assignment-answer-grid";

export const loader = async ({ params }: Route.LoaderArgs) => {

    const {data: answers} = await getAssignmentAnswerByAssignment(params.assignment).catch(() => ({data: []}))
    const {data: results} = await getAssignmentResultByAssignment(params.assignment).catch(() => ({data: []}))
    const {data: enrollments} = await getEnrollmentByBootcamp(params.bootcamp).catch(() => ({data: []}));
    
    return {
        answers: answers.reduce((acc, item) => {
            acc[item.user_id] = item;
            return acc;  
        }, {} as Record<string, AssignmentAnswer>), 
        results: results.reduce((acc, item) => {
            acc[item.user_id] = item;
            return acc;
        }, {} as Record<string, AssignmentResult>), 
        enrollments, 
        assignment: params.assignment, 
        session: params.session, 
        bootcamp: params.bootcamp}
    
}


const AssignmentAnswers = ({loaderData}:Route.ComponentProps) => {

    const {answers,enrollments, assignment, results, session, bootcamp} = loaderData
    

    return (
    <div className="flex flex-col w-full gap-y-4 bg-white rounded-lg shadow-md p-5">
            <div className={'w-full flex items-center'}>
                <Link to={`/bootcamps/${bootcamp}/session/${session}`}>
                    <button
                        className="w-12 h-12 flex items-center justify-center bg-accent text-white rounded-full shadow-md">
                        <FaArrowLeft/>
                    </button>
                </Link>
                <h2 className={'font-bold text-left w-full text-4xl text-slate-700 p-6 h-full'}>Assignment Answers</h2>
            </div>
            
            <AssignmentAnswerGrid   
                assignment={assignment}
                enrollments={enrollments}
                results={results}
                answers={answers} 
            />
    </div>)
}

export default AssignmentAnswers