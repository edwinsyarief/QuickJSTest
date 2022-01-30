import React, { useState, useEffect } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { addDummy, fetchAsync, selectDummy } from "./dummySlice";

export function Dummy() {
	const list = useAppSelector(selectDummy);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(fetchAsync());
	}, []);

	return (
		<div>
			<p>
			This data is fetched from:
			</p>
			<pre>
				https://getpantry.cloud/apiv1/pantry/f335f7b0-f9e7-4493-8f74-fcfa82435647/basket/TestList
			</pre>
			{list.map((item, index) => (
				<div key={item.id}>{item.value}</div>
			))}
			<p>
				<button
					onClick={() => {
						dispatch(addDummy({ id: list.length + 1, value: `Data ${list.length + 1}` }));
					}}>
					Add
				</button>
			</p>
		</div>
	);
}
