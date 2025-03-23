import { tryCatch } from "@/lib/utils/try-catch";

type Success<T> = {
	data: T;
	error: null;
};

type Failure<E> = {
	data: null;
	error: E;
};

type Result<T, E = Error> = Success<T> | Failure<E>;

export class ApiError extends Error {
	status: number;
	statusText: string;

	constructor(status: number, statusText: string, message?: string) {
		super(message || `API Error: ${status} ${statusText}`);
		this.status = status;
		this.statusText = statusText;
		this.name = "ApiError";
	}
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export interface ApiOptions extends Omit<RequestInit, "body"> {
	body?: unknown;
}

export const fetchApi = async <T>(
	endpoint: string,
	options: ApiOptions = {},
): Promise<Result<T, ApiError>> => {
	const normalizedEndpoint = !endpoint.startsWith("/")
		? `/${endpoint}`
		: endpoint;

	const url = `${API_URL}${normalizedEndpoint}`;

	const fetchOptions: RequestInit = {
		...options,
		body: options.body ? JSON.stringify(options.body) : null,
	};

	if (options.body && typeof options.body === "object") {
		fetchOptions.headers = {
			"Content-Type": "application/json",
			...options.headers,
		};
	}

	return tryCatch<T, ApiError>(
		fetch(url, fetchOptions).then(async (response) => {
			if (!response.ok) {
				throw new ApiError(
					response.status,
					response.statusText,
					await response.text().catch(() => "Failed to parse error response"),
				);
			}

			const contentType = response.headers.get("content-type");
			if (contentType?.includes("application/json")) {
				return response.json() as Promise<T>;
			}
			return {} as T;
		}),
	);
};

export const get = <T>(
	endpoint: string,
	options: Omit<ApiOptions, "method" | "body"> = {},
) => {
	return fetchApi<T>(endpoint, { ...options, method: "GET" });
};

export const post = <T>(
	endpoint: string,
	data?: unknown,
	options: Omit<ApiOptions, "method"> = {},
) => {
	return fetchApi<T>(endpoint, { ...options, method: "POST", body: data });
};

export const put = <T>(
	endpoint: string,
	data?: unknown,
	options: Omit<ApiOptions, "method"> = {},
) => {
	return fetchApi<T>(endpoint, { ...options, method: "PUT", body: data });
};

export const del = <T>(
	endpoint: string,
	options: Omit<ApiOptions, "method"> = {},
) => {
	return fetchApi<T>(endpoint, { ...options, method: "DELETE" });
};
