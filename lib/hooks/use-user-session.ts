import { useCallback, useEffect, useState } from "react";

import { AppConfig, UserSession } from "@stacks/connect-react";

import { useIsMounted } from "@/lib/hooks/use-is-mounted";

export const useUserSession = () => {
	const [userSession, setUserSessionState] = useState<UserSession | null>(null);
	const isMounted = useIsMounted();

	useEffect(() => {
		if (!userSession) {
			const appConfig = new AppConfig(["store_write", "publish_data"]);
			const newUserSession = new UserSession({ appConfig });
			if (isMounted()) {
				setUserSessionState(newUserSession);
			}
		}
	}, [userSession, isMounted]);

	const setUserSession = useCallback(
		(newSession: UserSession) => {
			if (isMounted()) {
				setUserSessionState(newSession);
			}
		},
		[isMounted],
	);

	return { userSession, setUserSession };
};
