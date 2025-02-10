"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Lottie from "lottie-react";

import ImageUpload from "@/components/diary/ImageUpload";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogHeader,
} from "@/components/ui/dialog";
import { baseUrl, userId } from "@/config";
import axios from "axios";
import warmSmile from "@/public/warm-smile.json";
import loudlyCrying from "@/public/loudly-crying.json";
import { leapfrog } from "ldrs";
import { useRouter } from "next/navigation";
import { useSetAtom } from "jotai";
import { selectedDateAtom } from "@/components/diary/Calendar";
import Loader from "@/components/general/Loader";

leapfrog.register();

const formSchema = z.object({
    diary: z
        .string()
        .min(0)
        .max(2000, { message: "Diary exceed character limit" }),
    photos: z.any(),
});

const Input = () => {
    const { push } = useRouter();
    const setDate = useSetAtom(selectedDateAtom);

    const [open, setOpen] = useState<boolean>(false);
    const [errorDialog, setErrorDialog] = useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            diary: "",
            photos: undefined,
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);

        let formData = new FormData();
        formData.append("userId", userId);
        formData.append("diary", values.diary);

        let req = async () => {
            setOpen(true);
            // await new Promise((resolve) => setTimeout(() => resolve("yay"), 5000));
            try {
                const res = await axios.post(`${baseUrl}/diary/analyze`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                console.log(res);

                if (res.status >= 200 && res.status < 300) {
                    setOpen(false);
                    const data = res.data;

                    console.log(data);

                    setDate(new Date());
                    push("/diary");
                } else {
                    setErrorDialog(true);
                }
            } catch (error) {
                console.log(error);
                setOpen(false);
                setErrorDialog(true);
            }
        };

        req();
    };

    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-3 min-h-screen"
                >
                    <FormField
                        control={form.control}
                        name="diary"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xl font-semibold">
                                    Tell us more about your day
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Today i felt..."
                                        className="resize-none text-body-1 min-h-48"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="photos"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xl font-semibold">
                                    Upload your photos
                                </FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        onChange={field.onChange}
                                        value={field.value}
                                        className="border-border rounded-lg"
                                    />
                                </FormControl>{" "}
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Align bottom */}
                    <Button className="w-full" type="submit">
                        Continue
                    </Button>
                </form>
            </Form>

            {/* Dialog for analyzing */}
            <Dialog open={open}>
                <DialogContent className="p-4 max-w-[90dvw] rounded-lg">
                    <DialogHeader>
                        <div className="flex justify-center w-full">
                            <Lottie
                                className="size-36"
                                animationData={warmSmile}
                                loop={true}
                            />
                        </div>
                        <DialogTitle className="flex justify-center gap-1 text-center">
                            Analyzing
                            <div className="relative top-2">
                                <Loader />
                            </div>
                        </DialogTitle>
                        <DialogDescription className="text-center">
                            Please wait for a bit while we are trying to analyzing through
                            your diary, it won't be long we promise 😉
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            {/* Dialog for error */}
            <Dialog open={errorDialog} onOpenChange={setErrorDialog}>
                <DialogContent className="p-4 max-w-[90dvw] rounded-lg">
                    <DialogHeader>
                        <div className="flex justify-center w-full">
                            <Lottie
                                className="size-36"
                                animationData={loudlyCrying}
                                loop={true}
                            />
                        </div>
                        <DialogTitle className="flex justify-center gap-1 text-center">
                            Oops
                        </DialogTitle>
                        <DialogDescription className="text-center">
                            It looks like something went wrong with the server, please try
                            again sometime later 😢
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Input;