"use client";
import React, { useState, useEffect } from "react";
import AnimatedEmoji from "./AnimatedEmoji";
import PersonalizedMessage from "./PersonalizedMessage";
import StatusMessage from "./StatusMessage";
import ReasonSection from "./ReasonSection";
import Tips from "./Tips";
import { Diary, parseDiary } from "@/app/types/diary";
import { userId } from "@/config";
import axios from "axios";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { selectedDateAtom } from "./Calendar";
import EmptyDiary from "./EmptyDiary";
import Loader from "../general/Loader";

const diaryAtom = atom<Diary | undefined>(undefined);

const DailyUserContent = () => {
    const date = useAtomValue(selectedDateAtom);

    const [diary, setDiary] = useAtom(diaryAtom);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<String | null>(null);


    useEffect(() => {
        const req = async () => {
            setLoading(true);
            setError(null);

            try {
                const res = await axios.get(`/api/diary/${userId}/${date}`);
                if (res.status === 404) {

                }
                const diaryData = res.data as string;
                setDiary(parseDiary(diaryData));
            } catch (error) {
                console.error(error);
            }
        };

        req();
    }, [date]);

    if (!diary) {
        return (
            <div>
                <Loader />
            </div>
        );
    }

    return diary!.data.length > 0 ? (
        <div>
            <AnimatedEmoji />
            <StatusMessage />
            <PersonalizedMessage />
            <ReasonSection />
            <Tips />
        </div>
    ) : (
        <EmptyDiary />
    );
};

export default DailyUserContent;
export { diaryAtom };