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
	const containerStyle: React.CSSProperties = {};

	const inputStyle: React.CSSProperties = {};

	const buttonStyle: React.CSSProperties = {};

	const listStyle: React.CSSProperties = {};

	const listItemStyle: React.CSSProperties = {};

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
