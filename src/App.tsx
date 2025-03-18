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
		padding: "30px",
		border: "1px solid white",
		borderRadius: "30px",
		margin: "5px",
	};

	const inputStyle: React.CSSProperties = {
		padding: "20px",
		fontSize: "16px",
		marginBottom: "10px",
		minWidth: "180px",
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
		minWidth: "180px",
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

	const listTextStyle: React.CSSProperties = {
		paddingRight: "10px",
	};

	const messageStyle: React.CSSProperties = {
		fontSize: "18px",
		color: "white",
	};

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
							<div style={listTextStyle}>{wish}</div>
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

// Стили записаны в переменные и добавлены в атрибут style. Я не стал записывать содержимое непосредственно в разметке для сохранения читаемости кода.
// Классы я не стал добавлять за их ненадобностью. Однако без них все равно трудно ориентироваться в девтулзах.
// Тем не менее, мне привычней писать стили в модулях (см. мои пет-проекты), а не инлайнить их.

// Для адаптации работы с бекендом:
// - записывал бы в стейт не только строку с новым желанием, а типизированный объект, содержащий стрку с ним и сгенерированный уникальный идентификатор для новой записи, например через uuid.
// - в методе удаления обращался бы к подлежащему удалению объекту по идентификатору, а не по индексу как в коде выше,
// - использовал бы хук useReducer вместо useState, поскольку необходимо следить за большим числом состояний (ошибок с разными кодами, состояния загрузки).

// При работе с бекенодом я бы работал через try...catch чтобы сразу обрабатывать ошибки и возводить состояния. Для этого:
// - избавился от логики сохранения данных в локальное хранилище,
// - добавил бы состояния
// ---- для разного типа ошибок (чтобы добавлять отчеты в разметку в случае неудач запросов),
// ---- для "ожидания ответа" - для показа пользователю состояния загрузки данных (прелодера) и соответствующие компоненты в разметку через условный рендеринг
// - при инициализации приложения в хуке useEffect выполнял бы отдельно описанную функцию, выполняющую GET-запрос для получения списка, затем устанавливаал бы список в стейт,
// - в методах добавления и удаления использовал бы отдельно описанные функции с POST и "DELETE"-запросами).
