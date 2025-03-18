import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
	const [wishList, setWishList] = useState<string[]>(() => {
		// Чтобы избежать пропадания данных при перезагрузке приложения, сдела функцию проверки локального хранилища и установки его содержимого как значения по умолчанию
		const savedWishList = localStorage.getItem("wishList");
		return savedWishList ? JSON.parse(savedWishList) : [];
	});
	// Состояние инпута
	const [wishValue, setWishValue] = useState<string>("");

	// Обработчик поля ввода
	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setWishValue(e.target.value);
	};

	// Обработчик добавления элемента
	const handleAddOneItem = () => {
		if (wishValue.trim() !== "") {
			const renewedWishList = [...wishList, wishValue];
			setWishList(renewedWishList);
			setWishValue("");
		}
	};

	// Обработчик добавления элемента по нажатию на клавишу ввода
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && wishValue.trim() !== "") {
			setWishList([...wishList, wishValue]);
			setWishValue("");
		}
	};

	// Обработчик удаления элемента
	const handleDeleteWish = (index: number) => {
		const renewedWishList = wishList.filter((_, i) => i !== index);
		setWishList(renewedWishList);
	};

	// Сохраняю список элементов в localStorage при его изменении
	useEffect(() => {
		localStorage.setItem("wishList", JSON.stringify(wishList));
	}, [wishList]);

	// Стилизация компонентов
	const containerStyle: React.CSSProperties = {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		gap: "20px",
		padding: "50px",
		border: "1px solid white",
		borderRadius: "30px",
		margin: "40px 50px",
	};

	const inputStyle: React.CSSProperties = {
		padding: "20px",
		fontSize: "16px",
		marginBottom: "10px",
		width: "300px",
		border: "1px solid white",
		background: "#323131",
		borderRadius: "30px",
		color: "white",
	};

	const buttonStyle: React.CSSProperties = {
		padding: "10px 20px",
		fontSize: "16px",
		cursor: "pointer",
		borderRadius: "30px",
		color: "white",
		border: "1px solid white",
		background: "#323131",
		wordBreak: "normal",
	};

	const listStyle: React.CSSProperties = {
		display: "flex",
		flexDirection: "column",
		gap: "15px",
		padding: "0",
		width: "300px",
	};

	const listItemStyle: React.CSSProperties = {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		padding: "10px 20px",
		border: "1px solid white",
		borderRadius: "30px",
		color: "white",
		wordBreak: "break-all",
	};

	const messageStyle: React.CSSProperties = {};

	return (
		<div style={containerStyle}>
			<input
				value={wishValue}
				onChange={handleInput}
				onKeyDown={handleKeyDown}
				placeholder="Введи свое желание"
				style={inputStyle}
			/>

			<button onClick={handleAddOneItem} style={buttonStyle}>
				Добавить
			</button>
			{wishList.length === 0 ? (
				<p style={messageStyle}>Пока желаний нет</p>
			) : (
				<ul style={listStyle}>
					{wishList.map((wish, index) => (
						<li key={uuidv4()} style={listItemStyle}>
							{wish}
							<button
								onClick={() => handleDeleteWish(index)}
								style={buttonStyle}
							>
								Удалить
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default App;
