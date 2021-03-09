import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/pages/Home.module.css";

export default function Index() {
	const [room, setRoom] = useState("");
	const router = useRouter();
	const nickInput = useRef<HTMLInputElement>(null);
	const span = useRef<HTMLSpanElement>(null);

	function nickIsValid(nick: string): boolean {
		if (nick.match(/[^0-9a-zA-Z]/g) || nick === "") return false;
		return true;
	}

	function removeClass(input: HTMLInputElement) {
		input.className = styles.entrada;
		span.current!.style.visibility = "hidden";
	}

	function PlaySelectedRoom() {
		const nick = nickInput.current.value;
		console.log(nickInput.current.value);
		if (!nickIsValid(nick)) {
			nickInput.current.className = styles.entrada + " " + styles.inputError;
			span.current.style.visibility = "visible";
			return;
		}

		router.push({ pathname: "/game", search: `?room=${room}&nick=${nick}` });
	}

	return (
		<div className={styles.content}>
			<p className={styles.title}> TypeRoyale</p>
			<div className={styles.usernameContainer}>
				<input
					className={styles.entrada}
					type="text"
					placeholder="Insira seu Nick"
					ref={nickInput}
					onFocus={event => {
						removeClass(event.target);
					}}
				/>
				<span className={styles.error} ref={span}>
					Somente numeros e letras, sem espaços ou caracteres especiais
				</span>
			</div>
			<div className={styles.joinContainer}>
				<div className={styles.inputFields}>
					<input
						className={styles.entrada}
						type="text"
						placeholder="Numero da sala"
						onChange={event => {
							setRoom(event.target.value);
						}}
					/>
					<button className={styles.botao} onClick={PlaySelectedRoom}>
						Entrar na Sala
					</button>
				</div>
				<hr className={styles.divisora} />
				<div className={styles.randomField}>
					<p>Sala aleatoria</p>
					<button className={styles.botao}>Sala aleatoria</button>
				</div>
			</div>
		</div>
	);
}
