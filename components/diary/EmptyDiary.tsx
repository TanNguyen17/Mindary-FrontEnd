import Lottie from "lottie-react";
import React from "react";
import loudlyCrying from "@/public/loudly-crying.json";

const EmptyDiary = () => {
	return (
		<main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
			<div className="text-center">
				{/* <img className="block" src="1466623.png" alt="logo" /> */}
				{/* <img className="primary w-50" src="/empty.svg" alt="logo" /> */}
				<div className="flex justify-center w-full">
					<Lottie
						className="size-48"
						animationData={loudlyCrying}
						loop={true}
					/>
				</div>
				<h1 className=" primary mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
					Oops!
				</h1>
				<p className="mt-6 text-base leading-7 text-gray-600">
					You have not written anything here yet!
				</p>
			</div>
		</main>
	);
};

export default EmptyDiary;