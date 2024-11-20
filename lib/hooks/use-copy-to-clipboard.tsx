import { useState } from "react";
import toast from "react-hot-toast";

export interface useCopyToClipboardProps {
	timeout?: number;
}

export function useCopyToClipboard({
	timeout = 2000,
}: useCopyToClipboardProps) {
	const [isCopied, setIsCopied] = useState<boolean>(false);

	const copyToClipboard = (value: string) => {
		if (typeof window === "undefined" || !navigator.clipboard?.writeText) {
			return;
		}

		if (!value) {
			return;
		}

		navigator.clipboard.writeText(value).then(() => {
			setIsCopied(true);
			toast.success("Copied to clipboard", {
				position: "top-right",
				icon: "📋",
				className: "dark:bg-background ",
				duration: 1000,
			});
			setTimeout(() => {
				setIsCopied(false);
			}, timeout);
		});
	};

	return { isCopied, copyToClipboard };
}
