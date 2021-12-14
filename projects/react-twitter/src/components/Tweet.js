import React from 'react';
import { Card } from 'react-bootstrap';
export const Tweet = ({ title = '' }) => {
	return (
		<Card className={'mb-4'}>
			<Card.Body>
				<Card.Title>@jcarranzav1</Card.Title>
				<Card.Subtitle className="mb-2 text-muted">
					1 minute ago
				</Card.Subtitle>
				<Card.Text>{title}</Card.Text>
				<Card.Link href="#">2 likes</Card.Link>
				<Card.Link href="#">0 comments</Card.Link>
			</Card.Body>
		</Card>
	);
};
