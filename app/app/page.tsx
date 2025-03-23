"use client";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { get } from "@/lib/api";

const Loader = () => {
	return <LoaderCircle className="animate-spin" />;
};

export default function Home() {
	const query = useQuery({
		queryKey: ["hello"],
		queryFn: async () => {
			const res = await get<{ message: string }>("/api/hello");

			if (res.error) {
				throw res.error;
			}

			return res.data;
		},
	});

	const { data, isLoading } = query;
	return (
		<div className="flex min-h-screen flex-col items-center justify-center p-5 font-mono">
			<div className="space-y-4 p-5">
				<div>
					<p className="flex items-center gap-3">
						api endpoint:
						<span className="inline-flex items-center rounded-md border border-neutral-700 px-2.5 py-0.5 text-xs font-semibold transition-colors">
							/api/hello
						</span>
					</p>
				</div>

				{isLoading ? (
					<Loader />
				) : (
					<>
						<div className="my-4 h-[1px] w-full bg-neutral-700" />
						<div className="mt-3 flex flex-col gap-2">
							<p className="pl-1">message:</p>
							<pre className="inline-flex items-center rounded-md border border-neutral-700 px-2.5 py-3 text-xs font-semibold transition-colors">
								{data?.message}
							</pre>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
