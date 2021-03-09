import { useRouter } from "next/router";

export default function Game() {
	const Router = useRouter();

	return <h1>{Router.query.nick}</h1>;
}
