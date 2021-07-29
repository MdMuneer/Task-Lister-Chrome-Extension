import React, { useState, useEffect } from "react";
import "../App.css";

//for local STorage

const getLocalItems = () => {
	let list = localStorage.getItem("tasks");

	if (list) {
		return JSON.parse(localStorage.getItem("tasks"));
	} else {
		return [];
	}
};

const Todo = () => {
	const [inputData, setInputData] = useState("");
	const [items, setItems] = useState(getLocalItems());
	const [toggleSubmit, setToggleSubmit] = useState(true);
	const [isEditItem, setIsEditItem] = useState(null);

	const addItem = () => {
		if (!inputData) {
			alert('Please Enter a Task')
		} else if(inputData && !toggleSubmit) {
			setItems(
				items.map((element)=> {
					if(element.id === isEditItem) {
						return{...element, name:inputData}
					}
					return element
				})
				)
			setToggleSubmit(true);
			setInputData('');

			setIsEditItem(null);
		}

		 else {
			const allInputData = {
				id: new Date().getTime().toString(),
				name: inputData,
			};
			setItems([...items, allInputData]);
			setInputData("");
		}
	};

	const deleteItem = (id) => {
		const updatedItems = items.filter((element) => {
			return id !== element.id;
		});
		setItems(updatedItems);
	};

	//edit task

	const editItem = (id) => {
		let newEditItem = items.find((element) => {
			return element.id === id;
		});
		console.log(newEditItem);

		setToggleSubmit(false);
		setInputData(newEditItem.name);

		setIsEditItem(id);
	};

	const removeAll = () => {
		setItems([]);
	};

	//adding data to local storage

	useEffect(() => {
		localStorage.setItem("tasks", JSON.stringify(items));
	}, [items]);

	return (
		<>
			<div className="main-div">
				<div className="child-div">
					<h2>List your Tasks</h2>

					<div className="addItems">
						<input
							type="text"
							placeholder="Add Tasks..."
							value={inputData}
							onChange={(e) => setInputData(e.target.value)}
						/>
						{toggleSubmit ? (
							<i
								className="fa fa-plus add-btn"
								title="Add-Task"
								onClick={addItem}
							></i>
						) : (
							<i
								className="far fa-edit add-btn"
								title="Edit-Task"
								onClick={addItem}
							></i>
						)}
					</div>

					<div className="showItems">
						{/*current task is element*/}
						{items.map((element) => {
							return (
								<div className="eachItem" key={element.id}>
									<h3>{element.name}</h3>
									<div className="todo-btn">
										<i
											className="far fa-edit add-btn"
											title="edit-Task"
											onClick={() => editItem(element.id)}
										></i>
										<i
											className="far fa-trash-alt add-btn"
											title="Delete-Task"
											onClick={() =>
												deleteItem(element.id)
											}
										></i>
									</div>
								</div>
							);
						})}
					</div>

					<div className="showItems">
						<button
							className="btn "
							data-sm-link-text="Remove All"
							onClick={removeAll}
						>
							<span>Clear TaskList </span>
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Todo;