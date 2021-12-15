import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

export default function NewTweet({ onSubmit }) {
	const [displayForm, setDisplayForm] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		const { content, location } = e.target.elements;
		setDisplayForm(false);
		onSubmit({
			content: content.value,
			location: location.value,
		});
	};
	return displayForm ? (
		<Form className="mb-4" onSubmit={handleSubmit}>
			<Form.Group className="mb-3">
				<Form.Label>Content</Form.Label>
				<Form.Control
					required
					placeholder="Write your tweet"
					as="textarea"
					name="content"
					rows={3}
				/>
			</Form.Group>
			<Form.Group className="mb-3">
				<Form.Label>Location</Form.Label>
				<Form.Control
					type="text"
					placeholder="Location"
					required
					name="location"
				/>
			</Form.Group>
			<Button variant="primary" type="Submit" className="me-3">
				Submit
			</Button>
			<Button variant="secondary" onClick={() => setDisplayForm(false)}>
				Cancel
			</Button>
		</Form>
	) : (
		<Button
			variant="primary"
			className="mb-3"
			onClick={() => setDisplayForm(true)}>
			New Tweet
		</Button>
	);
}
